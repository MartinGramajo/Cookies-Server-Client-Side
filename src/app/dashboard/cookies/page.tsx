import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  // Esa condición la agregamos porque en un punto de nuestro app
  // las cookies no están seteadas es decir que son null por ende nos aseguramos
  // que tengan un valor por defecto, en ese caso de 1
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  // para tener todas las cookies

  const allCookies = cookieStore.getAll();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  );
}
