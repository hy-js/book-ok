import { getSession, signIn, signOut } from "next-auth/react"

import { InferGetStaticPropsType } from "next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { prisma } from "../lib/primsa"
import { motion } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import BookCover from "@/components/BookCover"
import { CollectionBook } from "../lib/types"
import flattenObject from "../lib/flattenObject"

export interface Profile {
  id: number
  username: string
  readingGoal: number
}

const config = {
  type: "spring",
  damping: 20,
  stiffness: 100
}

export default function Home({ profile, interactions }) {
  return (
    <main className='mb-auto h-max'>
      <div className=' min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
        <motion.div
          className=' bg-red-200 text-center '
          transition={config}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}>
          <Image
            alt={profile.name}
            src={profile.image}
            className=' rounded-full'
            width={100}
            height={100}
          />
          <h2 className='capitalize'> {profile.name}</h2>
        </motion.div>
        <div className='flex flex-col items-stretch h-full'>
          <>
            <h2 className='bg-gray-200 capitalise '>Stats</h2>
            <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '></ul>
            <h2 className='bg-gray-200 capitalise'>Your Activity</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {interactions.map((book) => (
                <BookCover
                  interaction={book}
                  book={book.book}
                  key={book.id}
                  showStats={true}
                />
              ))}
            </ul>
          </>
        </div>
      </div>
    </main>
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
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      readingGoal: true,
      image: true
    }
  })

  let interactions = await prisma.interaction.findMany({
    where: { userId: profile.id },
    include: {
      book: true
    }
  })

  return {
    props: {
      session,
      profile: JSON.parse(JSON.stringify(profile)),
      interactions: JSON.parse(JSON.stringify(interactions))
    }
  }
}
