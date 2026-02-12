import Image from "next/image";
import Link from "next/link";
import { getCabins } from "@/_lib/data-service";

export default async function Page() {
  const cabins = await getCabins();
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          在云栖，听见山的声音
        </h1>

        <div className="space-y-8">
          <p>
            在多洛米蒂山脉的深处，时间走得慢了一些。云栖酒店坐落于群山的怀抱之中，这里不仅是避世的居所，更是我们为你私藏的一段山野生活。
          </p>
          <p>
            我们悉心守护着这 {cabins.length}{" "}
            栋散落在林间的居所，希望它们能成为你在荒野中的温暖锚点。你可以漫步在清晨的冷杉林里，呼吸微凉的空气；也可以在入夜后，缩进热气腾腾的木桶浴缸，仰望那片从未被霓虹遮掩的璀璨星河。
          </p>
          <p>
            在这里，生活的重心会自然而然地回到最简单的事物上：围坐火堆旁的私语、木柴噼啪的声响，以及与家人共度的纯粹瞬间。放下琐碎，在山的褶皱里找回久违的松弛。
          </p>
        </div>
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          src="https://pjlxgflmrejgipvxmjgr.supabase.co/storage/v1/object/public/customer-images/about1.png"
          alt="一家人坐在木屋前的火坑旁"
          className="rounded-2xl object-cover"
          quality={80}
          fill
        />
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          src="https://pjlxgflmrejgipvxmjgr.supabase.co/storage/v1/object/public/customer-images/about2.png"
          alt="经营云栖酒店的家族合照"
          fill
          className="object-cover"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          三代传承，守候这一方草木
        </h1>

        <div className="space-y-8">
          <p>
            自 1962
            年起，云栖便一直是我们的家。从祖父母在山间打下第一根木桩开始，这片山林就承载了我们家族对“好客”二字最质朴的理解：
            <strong>像照料家人一样，照顾每一位远道而来的朋友。</strong>
          </p>
          <p>
            六十多年来，山脊的轮廓未曾改变，我们对这里的热爱亦如往昔。在云栖，你不会感到自己只是一个匆匆过客，而更像是阔别重逢的老友。
          </p>
          <p>
            欢迎来到我们的家。在这个充满温情与静谧气息的地方，续写属于你的山间故事。
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              选一间心仪的居所
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
