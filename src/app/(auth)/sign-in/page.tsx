"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login, type State } from "@/actions/sign-in";
import AuthInput from "@/components/auth/auth-input";

export default function SignInPage() {
  const initialState: State = { errors: {}, message: null };
  const [state, formAction, isPending] = useActionState(login, initialState);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const isFormValid =
    values.email.trim() !== "" && values.password.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 sm:gap-10">
      <div className="relative h-[192px] w-[270px] sm:h-[154px] sm:w-[340px]">
        <Image src="/logo.svg" fill alt="글로벌 노마드" priority />
      </div>

      <form
        action={formAction}
        className="flex w-87.5 flex-col items-center gap-7 sm:w-160"
      >
        <div className="flex w-full flex-col gap-4">
          <AuthInput
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={values.email}
            onChange={handleChange}
            error={state.errors?.email}
          />

          <AuthInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
            error={state.errors?.password}
          />
        </div>

        {state.message && (
          <p className="text-red-primary text-sm font-bold">{state.message}</p>
        )}

        <div className="flex w-full flex-col gap-4">
          <button
            disabled={!isFormValid || isPending}
            className="bg-nomad-black w-full rounded-[6px] py-4 font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>

          <p className="text-center text-gray-900">
            회원이 아니신가요?{" "}
            <Link
              href="/sign-up"
              className="text-nomad-black underline underline-offset-4"
            >
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
