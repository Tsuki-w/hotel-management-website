import SignInButton from "../_components/SignInButton";

type IProps = {
  searchParams: Promise<{ callbackUrl: string; error: string }>;
};

export default async function Page({ searchParams }: IProps) {
  const { callbackUrl, error } = await searchParams;

  const errorMap: Record<string, string> = {
    AccessDenied: "访问被拒绝：账户创建失败或系统错误",
    OAuthAccountNotLinked: "该邮箱已通过其他方式注册，请使用原有方式登录",
    Configuration: "系统配置错误",
  };

  const errorMessage = error
    ? (errorMap[error] ?? "登录过程中发生未知错误")
    : "";

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">登录以访问您的个人中心</h2>
      <SignInButton callbackUrl={callbackUrl} errorMessage={errorMessage} />
    </div>
  );
}
