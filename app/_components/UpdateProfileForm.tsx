import { TGuest } from "@/_lib/data-service";
import { updateProfileAction } from "@/_lib/actions";
import Image from "next/image";
import FormButton from "@/_components/FormButton";

type IProps = {
  children: React.ReactNode;
  guest: TGuest;
};

export default function UpdateProfileForm({ children, guest }: IProps) {
  const { fullName, email, nationalID, countryFlag } = guest;
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateProfileAction}
    >
      <div className="space-y-2">
        <label>姓名</label>
        <input
          name="fullName"
          disabled
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>邮箱地址</label>
        <input
          name="email"
          disabled
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">您来自哪里？</label>
          <Image
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
            width={20}
            height={20}
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">国家/地区ID</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <FormButton />
      </div>
    </form>
  );
}
