import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";

import { GetServerSideProps } from "next"
import { prisma } from "../lib/primsa"
import Header from "../components/Header"
import Searchbar from "@/components/Searchbar"

import { OLBOOK } from "../lib/types"

interface Books {
  books: {
    id: string
    ISBN: string
    OLkey: string
    status: string

    title: string
    author: string

    cover: string
    publishedYear: string
    pages: string
  }[]
}

const Search = ({ myBooks }: Books) => {
  return (
    <main className='mb-auto h-max'>
      <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6'>
      <h2 className='bg-purple-200 capitalize'>
              Search Open Libary
            </h2>
        <div className='flex flex-col items-stretch h-full'>
          <Searchbar myBooks={myBooks} />
        </div>
      </div>
    </main>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async () => {
  const myBooks = await prisma.book.findMany({
    select: {
      id: true,
      ISBN: true
    }
  })

  return {
    props: {
      myBooks
    }
  }
}
