import { prisma } from '@/lib/prisma';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us | KC Bazar',
  description: 'Get in touch with KC Bazar. We are here to help with your enquiries.',
};

export default async function ContactPage() {
  const settings = await prisma.setting.findUnique({ where: { id: 'site-settings' } });
  return <ContactClient settings={settings} />;
}
