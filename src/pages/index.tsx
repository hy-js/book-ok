import LoginButton from "../components/LoginButton"

export default function Index() {
  return (
    <main className='mb-auto h-max'>
      <div className=' min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
        <div className='flex flex-col items-stretch h-full'>
          <h2 className='bg-gray-200 capitalise border-b '>Welcome</h2>
          <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
            <li className='p-2'>
              <h3>Profile - track your reading with stats</h3>
            </li>
            <li className='p-2'>
              <h3>Shelve - list your books</h3>
            </li>
            <li className='p-2'>
              <h3>Search - find more books</h3>
            </li>
            <li className='p-2 '>
              <h3>Collect - organise your colelction</h3>
            </li>
          </ul>
          <h2 className='bg-gray-200 capitalise '>Account</h2>
          <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
            <li className='p-2'>
              <h3>View your profile</h3>
              <LoginButton />
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
