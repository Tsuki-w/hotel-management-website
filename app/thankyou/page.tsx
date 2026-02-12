import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">感谢您的选择!</h1>
      <Link
        href="/account/reservation"
        className="underline text-xl text-accent-500 inline-block"
      >
        管理您的预定 &rarr;
      </Link>
    </div>
  );
}
