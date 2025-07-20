'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'My Projects' },
  { href: '/shops', label: 'Shops' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About us' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border shadow mb-6">
      <ul className="flex space-x-4 px-4 py-4">
        {navItems.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className={`hover:underline ${pathname === i.href ? 'text-blue-600 font-bold' : ''}`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
