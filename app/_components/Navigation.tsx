import { auth } from "@/_lib/auth";
import Image from "next/image";
import { NavLink } from "./NavLink";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <NavLink href="/">首页</NavLink>
        </li>
        <li>
          <NavLink href="/cabins">房间</NavLink>
        </li>
        <li>
          <NavLink href="/about">介绍</NavLink>
        </li>
        <li>
          {session?.user?.image ? (
            <NavLink href="/account">
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
            </NavLink>
          ) : (
            <NavLink href="/account">个人中心</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
