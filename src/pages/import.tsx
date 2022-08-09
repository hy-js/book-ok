import { useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"

const Import = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <main className='mb-auto h-max'>
        <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
          <div className='flex flex-col items-stretch h-full'>
            <h2 className='DNF capitalize'>import</h2>
            <h3>Coming Soon: Import your data from CSV</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Import
