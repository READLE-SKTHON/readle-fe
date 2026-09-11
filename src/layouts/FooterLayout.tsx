import { Outlet } from "react-router-dom";

import FooterNavigation from "@/components/common/footer/FooterNavigation";

export default function FooterLayout() {
  return (
    <div className="min-h-screen">
      <main className="pb-24">
        <Outlet />
      </main>

      <FooterNavigation />
    </div>
  );
}
