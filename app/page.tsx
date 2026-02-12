import Image from "next/image";

export default async function Page() {
  return (
    <main className="mt-24">
      <Image
        src="https://pjlxgflmrejgipvxmjgr.supabase.co/storage/v1/object/public/customer-images/background.png"
        fill
        quality={80}
        priority
        alt="群山与森林中的两间木屋"
        className="object-cover object-top"
      />
      <h1 className="relative text-5xl font-bold text-center">欢迎来到 云栖</h1>
    </main>
  );
}
