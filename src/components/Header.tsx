import Link from "next/link"

const Header = () => {
  return (
    <header className='h-50 container mx-auto flex flex-col items-center border-b border-gray-500'>
      <h1 className='uppercase '>
        <Link href={"/"}>
          <span className='READING p-4'>Book</span>
        </Link>
        <span> </span>
        <Link href={"/search"}>
          <span className='TBR hover:animate-pulse p-4'>Ok</span>
        </Link>
        <span> </span>
        <Link href={"/collection/"}>
          <span className='READ hover:animate-pulse p-4'>Ok</span>
        </Link>
        <span> </span>
        <Link href={"/import/"}>
          <span className='DNF hover:animate-pulse p-4'>Ok</span>
        </Link>
      </h1>
    </header>
  )
}

export default Header
