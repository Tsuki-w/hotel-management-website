// 导航栏占位符
export default function NavigationSkeleton() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li className="w-12 h-6 bg-primary-800 rounded animate-pulse"></li>
        <li className="w-12 h-6 bg-primary-800 rounded animate-pulse"></li>
        <li className="w-20 h-6 bg-primary-800 rounded animate-pulse"></li>
      </ul>
    </nav>
  );
}
