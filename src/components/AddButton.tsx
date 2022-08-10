// Modules
import axios from "axios"
// Next/React
import { useRouter } from "next/router"
// Types
import { CollectionBook } from "@/lib/types"

const AddButton = ({ book }: CollectionBook) => {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const createBook = async (key: string) => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/collection/create",
        headers: {},
        data: {
          key
        }
      })
      await router.push("/collection")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      className='bg-blue-500 mr-3 px-3 text-white rounded'
      onClick={() => {
        createBook(book.key)
      }}>
      <h5>Add to Collection</h5>
    </button>
  )
}

export default AddButton
