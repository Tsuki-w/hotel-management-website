import { auth } from "@/_lib/auth";

export const metadata = {
  title: "账户",
};

const Page = async () => {
  const session = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      欢迎，{session?.user?.name}
    </h2>
  );
};
export default Page;
