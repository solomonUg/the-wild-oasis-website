import Link from 'next/link'
import React from 'react'

export default function Navigation() {
  return (
    <nav className="hidden sm:flex z-10 text-xl items-center justify-center">
      <ul className='flex gap-16 '>
          <li className="hover:text-accent-400 transition-colors"><Link href={"/"}>Home</Link></li>
          <li className="hover:text-accent-400 transition-colors"><Link href={"/cabins"}>Cabins</Link></li>
          <li className="hover:text-accent-400 transition-colors"><Link href={"/about"}>About</Link></li>
          <li className="hover:text-accent-400 transition-colors"><Link href={"/account"}>Guest Area</Link></li>
        </ul>
    </nav>
  )
}
