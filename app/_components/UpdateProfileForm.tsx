"use client";

import { TGuest } from "@/_lib/data-service";
import { updateProfileAction } from "@/_lib/actions";
import Image from "next/image";
import { useToaster } from "./ToasterProvider";
import { useActionState, useEffect } from "react";

type IProps = {
  children: React.ReactNode;
  guest: TGuest;
};

export default function UpdateProfileForm({ children, guest }: IProps) {
  const { fullName, email, nationalID, countryFlag } = guest;
  const { success, error } = useToaster();
  const [state, formAction, isPending] = useActionState(updateProfileAction, {
    success: "",
    err: "",
  });

  useEffect(() => {
    if (state?.success) {
      success(state.success);
    }
    if (state?.err) {
      error(state.err);
    }
  }, [state, success, error]);

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={formAction}
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
        <button
          className="bg-accent-500 rounded-sm px-6 py-1 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={isPending}
        >
          {isPending ? "更新中..." : "更新个人信息"}
        </button>
      </div>
    </form>
  );
}
