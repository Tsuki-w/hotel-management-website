import Link from "next/link";
import { auth } from "@/_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors font-bold"
          >
            房间
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors font-bold"
          >
            介绍
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              <div className="flex items-center gap-x-3">
                <span className="mr-2 font-bold">个人中心</span>
                <Image
                  src={session.user.image}
                  alt={session.user.name || "头像"}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              </div>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors font-bold"
            >
              个人中心
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
