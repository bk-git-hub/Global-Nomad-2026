import { auth, signOut } from "/auth";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/avatar";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  if (!session || !user)
    return (
      <header className="flex w-screen justify-between p-5">
        <Link href={"/"}>
          <Image
            src={"/logo_small.svg"}
            width={172}
            height={30}
            alt="홈으로 이동"
          />
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href={"/sign-in"}>로그인</Link>
          <Link href={"/sign-up"}>회원가입</Link>
        </div>
      </header>
    );

  console.log(user);
  return (
    <header className="flex w-screen justify-between p-5">
      <Link href={"/"}>
        <Image
          src={"/logo_small.svg"}
          width={172}
          height={30}
          alt="홈으로 이동"
        />
      </Link>
      <div className="px-1s flex items-center gap-1">
        <Avatar nickname={user.nickname} src={user.image} />
        <span className="font-medium">{user.nickname}</span>
      </div>
      {/* <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          로그아웃
        </button>
      </form> */}
    </header>
  );
}
