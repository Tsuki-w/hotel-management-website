import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        height="60"
        width="60"
        alt="云栖酒店 logo"
        src="https://pjlxgflmrejgipvxmjgr.supabase.co/storage/v1/object/public/cabin-images/icon.png"
      />
      <span className="text-xl font-semibold text-primary-100">云栖酒店</span>
    </Link>
  );
}

export default Logo;
