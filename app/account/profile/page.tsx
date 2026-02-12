import UpdateProfileForm from "@/_components/UpdateProfileForm";
import SelectCountry from "@/_components/SelectCountry";
import { auth } from "@/_lib/auth";
import { getGuest } from "@/_lib/data-service";
import { Suspense } from "react";
import Spinner from "@/_components/Spinner";

export const metadata = {
  title: "更新认证",
};

export default async function Page() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        更新您的认证信息
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        提供以下信息将使您的入住过程更快、更顺畅
      </p>
      <Suspense fallback={<Spinner />}>
        <GuestFetcher />
      </Suspense>
    </div>
  );
}

async function GuestFetcher() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email || "");
  return (
    <UpdateProfileForm guest={guest}>
      <SelectCountry
        name="nationality"
        id="nationality"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        defaultCountry={guest.nationality}
      />
    </UpdateProfileForm>
  );
}
