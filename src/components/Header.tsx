import Link from "next/link";
import { AnimateSharedLayout, motion } from "framer-motion"
import { useRouter } from "next/dist/client/router"
import { isActiveLink } from "../lib/utils"

const links: { top: string; color: string; name: string; href: string }[] = [
  {
    top: "BOOK",
    color: "READING",
    name: "Collect",
    href: "/collection"
  },
  {
    top: "OK",
    color: "TBR",
    name: "Profile",
    href: "/profile"
  },
  {
    top: "OK",
    color: "READ",
    name: "Shelve",
    href: "/shelves"
  },
  {
    top: "OK",
    color: "DNF",
    name: "Search",
    href: "/search"
  }
]

const Header = () => {
  const router = useRouter()
  return (
    <header className='flex justify-center items-center mb-4 min-h-[100px]'>
      <AnimateSharedLayout>
        <nav className='flex'>
          {links.map(({ name, href, top, color }) => (
            <Link key={name} href={href}>
              <a className='mr-6 sm:mr-8 flex flex-col relative'>
                <h2 className={color}>{top}</h2>
                {name}
                {isActiveLink(href, router.pathname) && (
                  <motion.div
                    layoutId='navigation-underline'
                    className='navigation-underline'
                    animate
                  />
                )}
              </a>
            </Link>
          ))}
        </nav>
      </AnimateSharedLayout>
    </header>
  )
}

export default Header;
