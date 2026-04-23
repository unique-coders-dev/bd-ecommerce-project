import AdminLayoutClient from "./AdminLayoutClient";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const session = await auth();
  
  const settings = await prisma.setting.findUnique({
    where: { id: "site-settings" },
  });
  
  return (
    <AdminLayoutClient user={session?.user} siteSettings={settings}>
      {children}
    </AdminLayoutClient>
  );
}
