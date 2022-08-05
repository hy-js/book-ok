import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { prisma } from "../lib/primsa";

import Header from "../components/Header";
import Footer from "../components/Footer";

export interface Profile {
  id: number;
  username: string;
  readingGoal: number;
}

export interface Books {
  id: number;
  ISBN: string;
  OLkey: string;
  status: string;
  title: string;
  author: string;
  cover: number | null;
  pages: number | null;
  publishedYear: number;
  owned: boolean;
  want: boolean;
  favourite: boolean;
  createdAt: string;
  updatedAt: string;
}

const Home = ({
  recentBooks,
  readThisYear,
  profile,
  totalPages,
  favs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className="mb-auto h-1">
      <div className="min-w-[80%] w-auto  max-w-min mx-auto space-y-6 ">
        <Header />
        <div className="flex flex-col items-stretch h-full">
          <>
            <h2 className="capitalise">Activity: {profile.username}</h2>
            <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
              {recentBooks.map((book) => (
                <Link href={`/details/${book.id}`}>
                  <li key={book.id} className="p-2">
                    {book.cover ? (
                      <>
                        <h5>{book.updatedAt.slice(5, 10)}</h5>
                        <h5 className={book.status}>{book.status}</h5>
                        <Image
                          placeholder="empty"
                          alt={book.title || "book cover"}
                          width={180}
                          height={274}
                          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                          className="border-gray-500 border-solid border-2"
                        />
                      </>
                    ) : (
                      <>
                        <h5>{book.updatedAt.slice(5, 10)}</h5>
                        <h5 className={book.status}>{book.status}</h5>
                        <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400">
                          <h4>{book.title}</h4>
                          <h5>{book.author}</h5>
                        </div>
                      </>
                    )}
                  </li>
                </Link>
              ))}
            </ul>
            <h2 className="capitalise ">Yearly Stats</h2>
            <ul className="flex flex-wrap border-b border-gray-600 p-2 ">
              <li className="p-2">
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-red-400 flex flex-col text-center justify-center">
                  <h4>Book Challenge</h4>
                  <h5>
                    {readThisYear.length}/{profile.readingGoal}
                  </h5>
                </div>
              </li>
              <li className="p-2">
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-orange-400 flex flex-col text-center justify-center">
                  <h4>Pages Read</h4>
                  <h5>{totalPages}</h5>
                </div>
              </li>
              <li className="p-2">
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-yellow-400 flex flex-col text-center justify-center">
                  <h4>Favourite Author</h4>
                  <h5>TODO</h5>
                </div>
              </li>
              <li className="p-2">
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-green-400 flex flex-col text-center justify-center">
                  <h4>Favourite Decade</h4>
                  <h5>TODO</h5>
                </div>
              </li>
              <li className="p-2">
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-blue-400 flex flex-col text-center justify-center">
                  <h4>Favourite Genre</h4>
                  <h5>TODO</h5>
                </div>
              </li>
              <li className="p-2">
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-violet-400 flex flex-col text-center justify-center">
                  <h4>Favourite Continent</h4>
                  <h5>TODO</h5>
                </div>
              </li>
            </ul>
            <h2 className="capitalise">Favourites</h2>
            <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
              {favs.map((book) => (
                <Link href={`/details/${book.id}`}>
                  <li key={book.id} className="p-2">
                    {book.cover ? (
                      <>
                        <Image
                          placeholder="empty"
                          alt={book.title || "book cover"}
                          width={180}
                          height={274}
                          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                          className="border-gray-500 border-solid border-2"
                        />
                      </>
                    ) : (
                      <>
                        <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400">
                          <h4>{book.title}</h4>
                          <h5>{book.author}</h5>
                        </div>
                      </>
                    )}
                  </li>
                </Link>
              ))}
            </ul>
            <h2 className="capitalise ">Lists</h2>
            <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
              <li>
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400"></div>
              </li>
            </ul>
          </>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;

export const getStaticProps = async () => {
  const books: Books[] = await (
    await fetch("http://localhost:3000/api/books")
  ).json();
  const profile: Profile = await (
    await fetch("http://localhost:3000/api/profile")
  ).json();

  // RECENT
  const recentBooks = books.slice(0, 6);

  // STATS
  const readThisYear = books.filter((book) => book.status === "READ");
  const authors = books.filter((book) => book.author);
  console.log(authors);
  // Pages
  var totalPages = readThisYear.reduce(
    (accum, item) => (item.pages !== null ? accum + item.pages : accum + 0),
    0
  );

  // FAVS
  const favs = books.filter((book) => book.favourite === true);

  return {
    props: {
      recentBooks,
      readThisYear,
      profile,
      totalPages,
      favs,
    },
  };
};
