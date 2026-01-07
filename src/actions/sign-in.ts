"use server";

import { z } from "zod";
import { signIn } from "/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const SignInSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export type State = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message: string | null;
};

export async function login(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "입력 정보를 확인해 주세요.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {},
            message: "이메일 또는 비밀번호가 일치하지 않습니다.",
          };
        default:
          return { errors: {}, message: "로그인 중 에러가 발생했습니다." };
      }
    }
    throw error;
  }

  redirect("/");
}
