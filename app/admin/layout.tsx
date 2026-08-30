import { adminLogout } from "@/lib/actions/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="font-semibold text-gray-800">
            ⚙️ Admin Dashboard
          </span>
          <form action={adminLogout}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
