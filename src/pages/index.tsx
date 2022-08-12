import Head from "next/head"
import { getSession } from "next-auth/react"
import { useState } from "react"
import { prisma } from "@/lib/primsa"
import Image from "next/image"
import LoginButton from "@/components/LoginButton"
import axios from "axios"

export default function Home({ session, profile }) {
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("/api/profile/update", {
      name,
      goal
    })
  }

  console.log(name)
  console.log(goal)

  return (
    <div className=''>
      <Head>
        <title>Book OK</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mb-auto h-max'>
        <div className=' min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
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
            <div className='bg-gray-200 '>
              <h2 className='capitalise '>Account</h2>
              <hr />
              <LoginButton />
            </div>
            <div className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
              {profile && (
                <div className='flex flex-col justify-center bg-gray-100'>
                  <div>
                    <Image
                      alt={profile.name}
                      src={profile.image}
                      className=' rounded-full'
                      width={100}
                      height={100}
                    />
                  </div>
                  <form onSubmit={handleSubmit}>
                    <h4>Name</h4>
                    <input
                      type='text'
                      name="name"
                      aria-label='Name'
                      placeholder={profile.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <h4>Reading Goal</h4>
                    <input
                      type='text'
                      name="goal"
                      placeholder={profile.readingGoal || "0"}
                      onChange={(e) => setGoal(e.target.value)}
                    />
                    <div>
                      <button
                        className='bg-blue-500 mr-3 px-3 my-3 text-white rounded'
                        type='submit'>
                        <h5>Edit Profile</h5>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {
        session: null
      }
    }
  }

  const profile = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  return {
    props: {
      session,
      profile: JSON.parse(JSON.stringify(profile))
    }
  }
}
