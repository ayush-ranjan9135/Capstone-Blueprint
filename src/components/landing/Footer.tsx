import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';

export default function Footer() {
  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'AI Assistant', href: '#product' },
      { name: 'Collaboration', href: '#features' },
      { name: 'Security', href: '#security' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'How It Works', href: '#' },
      { name: 'FAQ', href: '#faq' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-6 block">
              <Logo size="sm" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Turn scattered work into organized progress. TaskMatrix brings tasks, projects, collaboration, and AI assistance into one focused workspace.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="relative inline-block text-gray-500 hover:text-white transition-all duration-300 text-sm group hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-fit py-1">
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="relative inline-block text-gray-500 hover:text-white transition-all duration-300 text-sm group hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-fit py-1">
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex justify-between lg:flex-col gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="relative inline-block text-gray-500 hover:text-white transition-all duration-300 text-sm group hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-fit py-1">
                      {link.name}
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">Legal</h3>
              <ul className="space-y-3 flex flex-col">
                {links.legal.map((link) => (
                  <Link key={link.name} href={link.href} className="relative inline-block text-gray-500 hover:text-white transition-all duration-300 text-sm group hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-fit py-1">
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} TaskMatrix. Built by Ayush Ranjan.
          </p>
          <div className="flex gap-4">
            {/* Social links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
