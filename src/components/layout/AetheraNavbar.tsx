import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  activePage?: string;
};

export default function AetheraNavbar({ activePage = '' }: Props) {
  const [activeMenu, setActiveMenu] = useState(activePage);

  const menuItems = [
    { label: 'Certificate', href: '/syllabus' },
    { label: 'About', href: '/about' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto font-inter bg-transparent">
      {/* Logo */}
      <Link to="/" className="text-3xl tracking-tight font-instrument text-black font-normal">
        StackSprint<sup className="text-xs font-sans align-top leading-none font-normal">®</sup>
      </Link>

      {/* Menu Items */}
      <div className="hidden md:flex items-center gap-8">
        {menuItems.map((item) => {
          const isLink = item.href.startsWith('/') && !item.href.startsWith('/#');
          const isActive = activeMenu === item.label;
          const className = `text-sm font-medium transition-colors ${isActive ? 'text-black font-semibold' : 'text-black/70 hover:text-black'
            }`;

          return isLink ? (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setActiveMenu(item.label)}
              className={className}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActiveMenu(item.label)}
              className={className}
            >
              {item.label}
            </a>
          );
        })}
      </div>

      {/* CTA Button */}
      <Link
        to="/login"
        className="bg-black text-white rounded-full px-6 py-2.5 text-sm font-medium hover:scale-[1.03] hover:bg-zinc-900 transition-all duration-300 shadow-sm"
      >
        Start Your Sprint
      </Link>
    </nav>
  );
}
