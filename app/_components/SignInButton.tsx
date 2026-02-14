"use client";

import Image from "next/image";
import { signInAction } from "@/_lib/actions";
import { useActionState, useEffect } from "react";
import { useToaster } from "./ToasterProvider";

type IProps = {
  callbackUrl: string;
  errorMessage?: string;
};

function SignInButton({ callbackUrl, errorMessage }: IProps) {
  const { error } = useToaster();
  const signInWithData = async (prevState: any, formData: FormData) => {
    return await signInAction(prevState, formData, callbackUrl);
  };
  const [state, formAction, isPending] = useActionState(signInWithData, {
    success: "",
    err: "",
  });
  // 1.处理发起登录阶段的错误
  // 用户点击按钮 -> Server Action 执行出错 -> 返回 state.err
  // 页面未刷新，直接通过 React State 获取错误
  useEffect(() => {
    if (state.err) {
      error(state.err);
    }
  }, [state, error]);

  // 2.处理OAuth回调阶段的错误
  // Github授权 ->校验失败 -> 重定向回 /login?error=... -> Page 组件传入 errorMessage
  // 页面已刷新，通过URL参数获取错误
  useEffect(() => {
    if (errorMessage) {
      error(errorMessage);
    }
  }, [errorMessage, error]);

  return (
    <form action={formAction}>
      <button
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium disabled:cursor-not-allowed"
        disabled={isPending}
      >
        <Image src="/github.png" alt="Github logo" height="24" width="24" />
        <span>{isPending ? "登录中..." : "使用 Github 登录"}</span>
      </button>
    </form>
  );
}

export default SignInButton;
