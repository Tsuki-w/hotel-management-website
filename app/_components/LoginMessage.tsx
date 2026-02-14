import Link from "next/link";

type IProps = {
  cabinId: number;
};

function LoginMessage({ cabinId }: IProps) {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        请先登录以立即预约此房间
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(`/cabins/${cabinId}`)}`}
          className="underline text-accent-500"
        >
          登录
        </Link>
      </p>
    </div>
  );
}

export default LoginMessage;
