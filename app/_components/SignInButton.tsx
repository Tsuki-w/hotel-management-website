import Image from "next/image";
import { signInAction } from "@/_lib/actions";

type IProps = {
  callbackUrl: string;
};

function SignInButton({ callbackUrl }: IProps) {
  return (
    <form action={signInAction.bind(null, callbackUrl)}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image src="/github.png" alt="Github logo" height="24" width="24" />
        <span>使用 Github 登录</span>
      </button>
    </form>
  );
}

export default SignInButton;
