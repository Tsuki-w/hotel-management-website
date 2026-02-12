"use client";
import { useRouter } from "next/navigation";

type IProps = {
  error: Error;
};

export default function Error({ error }: IProps) {
  const router = useRouter();
  console.log(error.message);
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">加载房间数据时出错！</h1>
      <p className="text-lg">{error.message || "发生未知错误"}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={() => router.back()}
      >
        返回
      </button>
    </main>
  );
}
