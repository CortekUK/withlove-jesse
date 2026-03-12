import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <>{children}</>;
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
