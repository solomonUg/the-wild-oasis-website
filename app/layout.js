import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "./globals.css";



export const metadata = {
  title: "The wild oasis",
  description: "true taste of leisure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header  className="w-full flex justify-between px-8 ">
          <Logo/>
          <Navigation/>
        </header>
          <main >{children}</main>
      </body>
    </html>
  );
}
