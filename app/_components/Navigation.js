import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
 
  return (
    <nav className="hidden sm:flex z-10 text-xl items-center justify-center">
      <ul className="flex gap-16 ">
        <li className="hover:text-accent-400 transition-colors">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hover:text-accent-400 transition-colors">
          <Link href={"/cabins"}>Cabins</Link>
        </li>
        <li className="hover:text-accent-400 transition-colors">
          <Link href={"/about"}>About</Link>
        </li>

        {session?.user?.image ? (
          <li className="hover:text-accent-400 transition-colors">
            <Link href={"/account"} className="flex gap-3">
              <span> Guest Area </span>
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          </li>
        ) : (
          <li className="hover:text-accent-400 transition-colors">
            <Link href={"/account"}>Guest Area</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
