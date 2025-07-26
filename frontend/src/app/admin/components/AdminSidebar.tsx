'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-gray-100 p-4 shadow-md text-black">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <nav className="flex flex-col gap-2">
        <Link
          href="/admin/dashboard"
          className='px-3 py-2 rounded hover:bg-gray-200'>
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
