"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      router.push("/search");
      return;
    }

    const params = new URLSearchParams();
    params.set("keyword", trimmedKeyword);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="shadow-nomad-card relative z-10 mx-auto -mt-15 flex h-32.5 w-86 flex-col gap-4 rounded-3xl bg-white px-6 py-4"
    >
      <p className="font-bold text-gray-900">무엇을 체험하고 싶으신가요?</p>

      <div className="flex w-full gap-3">
        <div className="flex flex-1 items-center rounded-sm border border-gray-800 py-1 pr-4 pl-2 transition-colors focus-within:border-gray-600">
          <Image src={"/bed.svg"} width={24} height={24} alt="검색" />
          <input
            type="text"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            className="ml-2 h-10 w-full text-sm focus:outline-none"
            placeholder="내가 원하는 체험은"
          />
        </div>

        <button
          type="submit"
          className="bg-nomad-black shrink-0 rounded-sm px-5 py-2 font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
        >
          검색하기
        </button>
      </div>
    </form>
  );
}
