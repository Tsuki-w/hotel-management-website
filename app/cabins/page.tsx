import CabinList from "@/_components/CabinList";
import Spinner from "@/_components/Spinner";
import { Suspense } from "react";
import Filter from "@/_components/Filter";
import ReservationReminder from "@/_components/ReservationReminder";

export const metadata = {
  title: "房间",
};

type IProps = {
  searchParams: Promise<{
    capacity: "all" | "small" | "medium" | "large";
  }>;
};

export default async function Page({ searchParams }: IProps) {
  const { capacity } = await searchParams;
  const filter = capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        在山野间，寻一处心安
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        这里的每一间房间，都是我们为你从山林中借来的静谧空间。
        坐落于阿尔卑斯山脉的群山怀抱中，这里没有城市的喧嚣，只有清晨穿过冷杉林的初阳和夜晚触手可及的璀璨星河。
        你可以在私人热水浴缸中洗去一身疲惫，或是在露台上听风穿过山谷。
        这不只是一次下榻，更是一次回归，在属于你的家外之家中，重拾对大自然的热爱与向往。
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* 在 Next.js App Router 中，同一页面内仅更新 URL 参数（search params）时，
      默认情况下 React 会尝试进行“软导航”。它会保留当前显示的 UI，并在后台获取新数据，直到新 UI 准备好才进行替换。
      因此，原本包裹 CabinList 的 Suspense 不会被触发，因为 React 认为这是一个组件更新而不是重新挂载。
      为了在切换 Filter 时强制显示加载状态，需要给 <Suspense> 组件添加一个唯一的 key 。
      当 key 发生变化时，React 会认为这是一个全新的组件，从而销毁旧的并挂载新的。 */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
