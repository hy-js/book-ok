import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Roadmap = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <main className='mb-auto h-10'>
        <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
          <div className='flex flex-col items-stretch h-full justify-center'>
            <h2 className='READING capitalize'>Roadmap</h2>
            <h3>Issues</h3>
            <ol>
              <li>Shelves page search / error handing</li>
              <li>Update book button</li>
              <li>Style and API consistency</li>
            </ol>
            <h3>Up next</h3>
            <ol>
              <li className='line-through'>Add to collection from search</li>
              <li className='line-through'>Goodreads, OL, Storygraph links</li>
              <li>Trove library lookup API connection</li>
              <li>Author pages</li>
              <li>Create book lists</li>
              <li>Import from CSV</li>
            </ol>
            <h3>Planned</h3>
            <ol>
              <li>Import from CSV</li>
              <li>User accounts</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  )
};

export default Roadmap;
