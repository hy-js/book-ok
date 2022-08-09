// Modules
import axios from "axios"
// Next/React
import { useRouter } from "next/router"
// Types
import { CollectionBook } from "../lib/types"

const UpdateButton = ({ book }: CollectionBook) => {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const updateBook = async (status: string) => {
    const id = book.id
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/update",
        headers: {},
        data: {
          id,
          status
        }
      })
      await router.push("/shelves")
      // await refreshData()
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <div className='border-b border-gray-500'>
      <div className='grid grid-cols-2 grid-rows-2 '>
        <button
          onClick={() => updateBook("READING")}
          className='READING  m-2 px-3 text-white rounded'>
          <h5>READING</h5>
        </button>
        <button
          onClick={() => updateBook("TBR")}
          className='TBR  m-2 px-3 text-white rounded'>
          <h5>TBR</h5>
        </button>
        <button
          onClick={() => updateBook("READ")}
          className='READ  m-2 px-3 text-white rounded'>
          <h5>READ</h5>
        </button>
        <button
          onClick={() => updateBook("DNF")}
          className='DNF  m-2 px-3 text-white rounded'>
          <h5>DNF</h5>
        </button>
      </div>
      {/* <div className='grid grid-cols-3'>
        <button
          onClick={() => selectBook("OWNED")}
          className='bg-red-300 m-2 px-3  rounded'>
          <h5>OWNED</h5>
        </button>
        <button
          onClick={() => selectBook("WANT")}
          className='bg-orange-300   m-2 px-3  rounded'>
          <h5>WANT</h5>
        </button>
        <button
          onClick={() => selectBook("FAVOURITE")}
          className='bg-green-300 m-2 px-3  rounded'>
          <h5>FAVOURITE</h5>
        </button>
      </div> */}
    </div>
  )
}

export default UpdateButton
