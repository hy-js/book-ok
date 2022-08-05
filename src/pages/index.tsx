import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/primsa";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="mb-auto h-1">
      <div className="min-w-[80%] w-auto  max-w-min mx-auto space-y-6 ">
        <Header />
        <div className="flex flex-col items-stretch h-full">
          <>
            <h2 className="capitalise READING">Activity</h2>
            <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
              <li>
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400"></div>
              </li>
            </ul>
            <h2 className="capitalise TBR">Stats</h2>
            <ul className="flex flex-wrap border-b border-gray-600 p-2 ">
              <li>
                <h3 className="">Yearly Challenge: 10/20 books</h3>
              </li>
            </ul>
            <h2 className="capitalise READ">Favourites</h2>
            <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
              <li>
                <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400"></div>
              </li>
            </ul>
            <h2 className="capitalise DNF">Lists</h2>
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
