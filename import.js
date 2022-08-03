import { useState } from "react"
import { CSVReader } from "react-papaparse"

import Header from "./src/components/Header"
import Footer from "./src/components/Footer"

const Import = () => {
  const handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }
  return (
    <>
      <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
        <Header />
        <div className='flex flex-col items-stretch h-full'>
          <h2 className='DNF capitalize'>Import to Collection</h2>
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}>
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>

          <ul className='flex flex-col'></ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Import
