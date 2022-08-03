import { useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"

const Roadmap = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <main className='mb-auto h-10'>
        <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
          <Header />
          <div className='flex flex-col items-stretch h-full'>
            <h2 className='READING capitalize'>Roadmap</h2>
            <h3>Coming Soon: Import your data from CSV</h3>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default Roadmap
