import CabinCard from "@/_components/CabinCard";
import { getCabins } from "@/_lib/data-service";

type IProps = {
  filter: "all" | "small" | "medium" | "large";
};

export default async function CabinList({ filter }: IProps) {
  let cabins = await getCabins();
  const cabinFilterMap = {
    all: cabins,
    small: cabins.filter((cabin) => cabin.maxCapacity <= 3),
    medium: cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    ),
    large: cabins.filter((cabin) => cabin.maxCapacity > 7),
  };
  cabins = cabinFilterMap[filter];
  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] grid-rows-auto  gap-5">
        {cabins.length > 0 &&
          cabins.map((cabin) => <CabinCard cabin={cabin} key={cabin.id} />)}
      </div>
    </>
  );
}
