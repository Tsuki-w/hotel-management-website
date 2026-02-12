"use client";

import { useFormStatus } from "react-dom";

type IProps = {
  text?: string;
};

export default function Button({ text }: IProps) {
  // useFormStatus 只能“向上”感知父级 <form> 的状态，所以封装一个按钮作为 <form> 的子组件
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 rounded-sm px-6 py-1 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "更新中..." : text || "更新个人信息"}
    </button>
  );
}
