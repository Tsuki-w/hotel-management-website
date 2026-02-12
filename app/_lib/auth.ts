import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // 触发登录时执行
    // NextAuth会将github登录返回的数据映射成一个标准对象自动注入回调参数
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email || "");
        // 如果没有该用户会后台创建一个
        if (!existingGuest && user.email && user.name) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    // 触发会话创建时执行
    async session({ session }) {
      try {
        const guest = await getGuest(session.user.email || "");
        if (guest) {
          session.user.id = guest.id.toString();
        }
        return session;
      } catch {
        return session;
      }
    },
  },
});
