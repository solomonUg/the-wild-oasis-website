import LogoImg from '@/public/logo.png'
import Link from 'next/link';

function Logo() {
  return (
    <Link href='/' className="flex  items-center gap-4 z-10">
      <img src='/logo.png' height="60" width="60" alt="The Wild Oasis logo" />
      <span className="hidden sm:flex text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
