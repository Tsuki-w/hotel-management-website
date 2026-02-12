import Navigation from "@/_components/Navigation";
import Logo from "@/_components/Logo";
import { Suspense } from "react";
import NavigationSkeleton from "@/_components/NavigationSkeleton";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5 grid-row-1/2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Suspense fallback={<NavigationSkeleton />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
