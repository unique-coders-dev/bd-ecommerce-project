import { prisma } from "@/lib/prisma";
import InfoPage from "@/components/InfoPage";

export default async function Page() {
  const settings = await prisma.setting.findUnique({ where: { id: 'site-settings' } });
  return <InfoPage title="Shipping Policy" content={settings?.shippingPolicy} />;
}
