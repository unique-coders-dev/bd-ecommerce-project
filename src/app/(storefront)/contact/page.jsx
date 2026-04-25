import { prisma } from '@/lib/prisma';
import ContactClient from './ContactClient';

export async function generateMetadata() {
  const settings = await prisma.setting.findUnique({ where: { id: 'site-settings' } });
  const siteName = settings?.siteName || 'Mailbon';
  return {
    title: `Contact Us | ${siteName}`,
    description: `Get in touch with ${siteName}. We are here to help with your enquiries.`,
  };
}

export default async function ContactPage() {
  const settings = await prisma.setting.findUnique({ where: { id: 'site-settings' } });
  return <ContactClient settings={settings} />;
}
