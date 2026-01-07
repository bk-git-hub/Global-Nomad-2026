"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn } from "/auth"; // 프로젝트의 auth.ts 경로에 맞춰 임포트
import { AuthError } from "next-auth";

// 상단 스키마 정의 생략 (이전과 동일)
const SignUpSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
    nickname: z.string().min(2, { message: "닉네임은 2자 이상이어야 합니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type State = {
  errors: {
    email?: string[];
    nickname?: string[];
    password?: string[];
    passwordCheck?: string[];
  };
  message: string | null;
};

export async function signUp(
  prevState: State,
  formData: FormData,
): Promise<State> {
  // 데이터 검증
  const validatedFields = SignUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "입력 정보를 확인해 주세요.",
    };
  }

  const { email, nickname, password } = validatedFields.data;

  // 백엔드 회원가입 API 호출
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        errors: {},
        message: data.message || "회원가입 중 오류가 발생했습니다.",
      };
    }

    // 회원가입 성공 시 자동 로그인 시도
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        errors: {},
        message:
          "회원가입은 성공했으나 로그인에 실패했습니다. 로그인 페이지로 이동해 주세요.",
      };
    }
    // 예외 처리
    return { errors: {}, message: "서버 연결에 실패했습니다." };
  }
  redirect("/");
}
