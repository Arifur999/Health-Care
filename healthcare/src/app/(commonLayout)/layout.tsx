import PublicFooter from "@/components/modules/home/PublicFooter";
import PublicNavbar from "@/components/modules/home/PublicNavbar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { getUserInfo } from "@/services/auth.services";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getUserInfo();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNavbar currentUser={currentUser} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <WhatsAppButton />
    </div>
  );
}
