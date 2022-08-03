import React, { useState, useRef } from "react"
import Papa from "papaparse"

const Upload = () => {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  const handleUploadCSV = () => {
    setUploading(true)

    const input = inputRef?.current
    const reader = new FileReader()
    const [file] = input.files

    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target.result, { header: true })

      fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          csv: csv?.data
        })
      })
        .then(() => {
          setUploading(false)
        })
        .catch((error) => {
          setUploading(false)
          console.warn(error)
        })
    }

    reader.readAsText(file)
  }

  return (
    <div>
      <h4 className='page-header mb-4'>Upload a CSV</h4>
      <div className='mb-4'>
        <input
          ref={inputRef}
          disabled={uploading}
          type='file'
          accept='.csv'
          className='form-control'
        />
      </div>
      <button
        onClick={handleUploadCSV}
        disabled={uploading}
        className='btn btn-primary'>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}

Upload.propTypes = {}

export default Upload
