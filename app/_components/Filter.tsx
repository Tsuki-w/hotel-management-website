"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams(); //next没有setSearchParams
  const router = useRouter();
  const pathname = usePathname();
  const handleFilter = (filter: "all" | "small" | "medium" | "large") => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  const activeFilter = searchParams.get("capacity") ?? "all";

  return (
    <div className="border border-primary-800">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        所有房间
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        1&mdash;3
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        8&mdash;12
      </button>
    </div>
  );
}
