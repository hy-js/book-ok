import Link from "next/link"

const Header = () => {
  return (
    <header className='container mx-auto flex flex-col items-center p-4'>
      <Link href={'/'}>
      <h1 className='uppercase'>
        <span className="READING">Bo</span>
        <span className="TBR">ok</span>
        <span> </span>
        <span className="READ">Ok</span>
        </h1>
      </Link>
    </header>
  )
}

export default Header
