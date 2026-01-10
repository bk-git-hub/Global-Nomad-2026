import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  nickname: string;
  size?: "sm" | "md";
}

export default function Avatar({ src, nickname, size = "sm" }: AvatarProps) {
  const fallbackText = nickname ? nickname.slice(0, 2) : "??";
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={`${sizeClasses} bg-nomad-black relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 font-semibold text-white`}
    >
      {src ? (
        <Image
          src={src}
          width={30}
          height={30}
          alt={nickname}
          className="object-cover"
        />
      ) : (
        <span className="tracking-tighter uppercase">{fallbackText}</span>
      )}
    </div>
  );
}
