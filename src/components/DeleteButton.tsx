// Modules
import axios from "axios"
// Next/React
import { useRouter } from "next/router"
// Types
import { CollectionBook } from "../lib/types"

const DeleteButton = ({ book }: CollectionBook) => {
  const router = useRouter()

  const deleteBook = async (id: number) => {
    try {
      await axios({
        method: "post",
        url: `/api/collection/delete/`,
        headers: {},
        data: {
          id,
        }
      })
      await router.push("/collection")
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <button
      onClick={() => deleteBook(book.id)}
      className='bg-red-500 px-3 text-white rounded'>
      <h5>Delete All History</h5>
    </button>
  )
}

export default DeleteButton
