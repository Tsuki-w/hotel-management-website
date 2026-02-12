"use client";

type IProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: IProps) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">加载数据时出错！</h1>
      <p className="text-lg">{error.message || "发生未知错误"}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        重试
      </button>
    </main>
  );
}
