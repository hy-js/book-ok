import Searchbar from "@/components/Searchbar"
import Booklist from "@/components/Booklist"

const Search = () => {
  return (
    <main className='mb-auto h-1'>
      <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6'>
        <div className='flex flex-col items-stretch h-full'>
          <h2 className='READ capitalize'>Open Library results</h2>
          <Searchbar />
        </div>
      </div>
    </main>
  )
}

export default Search
