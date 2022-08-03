import { useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"

const Import = () => {
  return (
    <>
      <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
        <Header />
        <div className='flex flex-col items-stretch h-full'>
          <h2 className='DNF capitalize'>import</h2>
          <h3>Coming Soon: Import your data from CSV</h3>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Import
