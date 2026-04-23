import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function StorefrontLayout({ children }) {
  let settings = null;
  let categories = [];
  try {
    const [s, c] = await Promise.all([
        prisma.setting.findUnique({ where: { id: "site-settings" } }),
        prisma.category.findMany({ where: { parentId: null }, take: 10, orderBy: { name: 'asc' } })
    ]);
    settings = s;
    categories = c;
  } catch (err) {
    console.error("Error fetching data in storefront layout:", err);
  }

  return (
    <>
      <Header initialSettings={settings} />
      <main>{children}</main>
      <Footer settings={settings} categories={categories} />
    </>
  );
}
