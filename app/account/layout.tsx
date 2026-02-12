import SideNavigation from "@/_components/SideNavigation";
import SignOutButton from "@/_components/SignOutButton";

type IProps = {
  children: React.ReactNode;
};

export default function layout({ children }: IProps) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">
      {/* sticky需要子元素高度小于父容器，h-fit避免高度被grid布局拉伸至与右侧内容一致导致sticky属性失效 */}
      <div className="py-1 h-fit sticky top-0">
        <SideNavigation>
          <SignOutButton />
        </SideNavigation>
      </div>
      <div className="py-1 grid-col-2/3">{children}</div>
    </div>
  );
}
