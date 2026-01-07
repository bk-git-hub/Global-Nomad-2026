"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { signUp, type State } from "@/actions/sign-up";
import AuthInput from "@/components/auth/auth-input";

export default function SignUpPage() {
  const initialState: State = { errors: {}, message: null };
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const isFormValid = Object.values(values).every((v) => v.trim() !== "");

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
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={values.nickname}
          onChange={handleChange}
          error={state.errors?.nickname}
        />

        <AuthInput
          label="비밀번호"
          name="password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          value={values.password}
          onChange={handleChange}
          error={state.errors?.password}
        />

        <AuthInput
          label="비밀번호 확인"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={values.passwordCheck}
          onChange={handleChange}
          error={state.errors?.passwordCheck}
        />

        {state.message && (
          <p className="text-red-primary text-sm font-bold">{state.message}</p>
        )}

        <button
          disabled={!isFormValid || isPending}
          className="bg-nomad-black w-full rounded-[6px] py-4 font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
        >
          {isPending ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}
