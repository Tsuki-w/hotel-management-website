import SignInButton from "../_components/SignInButton";

type IProps = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default async function Page({ searchParams }: IProps) {
  const { callbackUrl: encodedCallbackUrl } = await searchParams;
  const callbackUrl = decodeURIComponent(encodedCallbackUrl);
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">登录以访问您的个人中心</h2>
      <SignInButton callbackUrl={callbackUrl} />
    </div>
  );
}
