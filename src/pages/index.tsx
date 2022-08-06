import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { prisma } from "../lib/primsa";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCover from "@/components/BookCover"

import { CollectionBook } from "../lib/types"

export interface Profile {
  id: number
  username: string
  readingGoal: number
}

const Home = ({
  recentBooks,
  readThisYear,
  profile,
  totalPages,
  DNFThisYear,
  favs,
  decades,
  max,
  min
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className='mb-auto h-1'>
      <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
        <Header />
        <h2 className='capitalize bg-red-200 text-center'>
          {profile.username}
        </h2>
        <div className='flex flex-col items-stretch h-full'>
          <>
            <h2 className='bg-gray-200 capitalise '>Stats</h2>
            <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
              <li className='p-2'>
                <h3>Reading Challenge</h3>
                <div className='flex'>
                  {[...Array(readThisYear.length)].map((e, i) => (
                    <h3 className='text-red-800' key={i}>
                      ♦
                    </h3>
                  ))}
                  {[...Array(profile.readingGoal - readThisYear.length)].map(
                    (e, i) => (
                      <h3 key={i}>♦</h3>
                    )
                  )}
                </div>
                <h4>
                  {readThisYear.length}/{profile.readingGoal}
                </h4>
              </li>
              <li className='p-2'>
                <h3>Pages Read</h3>
                <h4>
                  {readThisYear.length} books totalling {totalPages} pp.
                </h4>
                <h4>
                  That's {Math.floor(totalPages / readThisYear.length)} pp.
                  average per book
                </h4>
              </li>
              <li className='p-2'>
                <h3>The Long and Short of It</h3>
                <h4>Longest book is {max} pp.</h4>
                <h4>Shortest book is {min} pp.</h4>
              </li>
              <li className='p-2 '>
                <h3>Decades Read</h3>
                <div className='flex'>
                  {decades.map((decade) => (
                    <>
                      <h4>-</h4>
                      <h4>{decade}</h4>
                      <h4>-</h4>
                    </>
                  ))}
                </div>
              </li>
            </ul>
            <h2 className='bg-gray-200 capitalise'>Activity</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {recentBooks.map((book) => (
                <BookCover book={book} key={book.id} showStats={true} />
              ))}
            </ul>

            <h2 className='bg-gray-200 capitalise'>Favourites</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {favs.map((book) => (
                <Link href={`/details/${book.id}`} key={book.id}>
                  <BookCover book={book} key={book.id} />
                </Link>
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalise '>Lists</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              <li>
                <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'></div>
              </li>
            </ul>
          </>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Home

export const getStaticProps = async () => {
  const books: CollectionBook[] = await (
    await fetch("http://localhost:3000/api/books")
  ).json()
  const profile: Profile = await (
    await fetch("http://localhost:3000/api/profile")
  ).json()

  // RECENT
  const recentBooks = books.slice(0, 7)

  // STATS
  const readThisYear = books.filter((book) => book.status === "READ")
  console.log(readThisYear)
  const DNFThisYear = books.filter((book) => book.status === "DNF")
  let years = books.map((item: CollectionBook) => {
    return item["publishedYear"]
  })
  let allDecades: any[] = []
  years.forEach((year) => {
    allDecades.push(Math.floor(year / 10) * 10)
  })
  allDecades.sort()
  const decades = [...new Set(allDecades)]

  // Pages
  var totalPages = readThisYear.reduce(
    (accum, item) => (item.pages !== null ? accum + item.pages : accum + 0),
    0
  )

  const max = Math.max(...readThisYear.map((o) => o.pages))
  const min = Math.min(...readThisYear.map((o) => o.pages))
  console.log(max, min)

  // FAVS
  const favs = books.filter((book) => book.favourite === true)

  return {
    props: {
      recentBooks: JSON.parse(JSON.stringify(recentBooks)),
      readThisYear,
      DNFThisYear,
      profile,
      totalPages,
      favs,
      decades,
      max,
      min
    }
  }
}
