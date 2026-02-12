import {
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { getCabin, getCabins } from "@/_lib/data-service";
import TextExpander from "@/_components/TextExpander";
import Reservation from "@/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/_components/Spinner";
import { getSettings } from "@/_lib/data-service";

type IProps = {
  params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: IProps) {
  const { cabinId } = await params;
  const { name } = await getCabin(Number(cabinId));
  return {
    title: `房间 ${name}`,
  };
}

/**
 * 构建时通过 generateStaticParams 获取所有 ID，为每个 ID 生成静态 HTML。
 * 用户访问时直接返回生成的 HTML
 */
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));
  return ids;
}

export default async function Page({ params }: IProps) {
  const { cabinId } = await params;
  const [cabin, settings] = await Promise.all([
    getCabin(Number(cabinId)),
    getSettings(),
  ]);
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative -translate-x-3">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 bg-primary-950 p-6 pb-1 text-center">
            房间 {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                最多供 <span className="font-bold">{maxCapacity}</span> 人入住
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MoonIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                最多预定{" "}
                <span className="font-bold">
                  {settings[0].maxBookingLength}
                </span>{" "}
                晚
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                位于意大利 <span className="font-bold">多洛米蒂</span> 山脉
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                隐私 <span className="font-bold">100%</span> 保障
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10">
          现在预订房间 {name}，到店支付。
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} settings={settings} />
        </Suspense>
      </div>
    </div>
  );
}
