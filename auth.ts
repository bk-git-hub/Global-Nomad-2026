import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.email("유효한 이메일 형식이 아닙니다."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

const BackendUserSchema = z.object({
  id: z.union([z.string(), z.number()]).transform((val) => String(val)),
  nickname: z.string(),
  profileImageUrl: z.url().nullable(),
});

const LoginResponseSchema = z.object({
  user: BackendUserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials) {
        // 클라이언트 입력값 검증
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error(
            "Invalid credentials format:",
            parsedCredentials.error.format(),
          );
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          // 백엔드 API 호출
          const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) return null;

          const rawData = await res.json();

          // 백엔드 응답 구조 검증
          const parsedResponse = LoginResponseSchema.safeParse(rawData);

          if (!parsedResponse.success) {
            console.error(
              "Backend response validation failed:",
              parsedResponse.error,
            );
            return null;
          }

          const { user, accessToken, refreshToken } = parsedResponse.data;

          // 검증된 데이터 반환
          return {
            ...user,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("Login Auth Error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nickname = user.nickname;
        token.profileImageUrl = user.profileImageUrl;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.nickname as string;
        session.user.image = token.profileImageUrl as string;
        session.user.nickname = token.nickname as string;
      }
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    },
  },
});
