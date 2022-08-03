import React from 'react'

export const bookListItem = () => {
  return (
    <ul className="flex flex-col-reverse">
            {books.map((book) => (
              <li key={book.id} className="border-b border-gray-600 p-2">
                <div className="flex justify-between">
                  <div className="flex">
                    <a
                      href={`https://openlibrary.org${book.OLkey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {book.cover ? (
                        <img
                          alt={book.title || "book cover"}
                          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                          className="w-[180px] h-[274px] object-cover border-gray-500 border-solid border-2"
                        />
                      ) : (
                        <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400">
                          <h4>{book.title}</h4>
                          <h5>{book.author}</h5>
                        </div>
                      )}
                    </a>
                    <div className="flex-col p-3">
                      <h5>{book.publishedYear}</h5>
                      <h2 className="font-bold">{book.title}</h2>
                      <h3 className="font-bold">{book.author}</h3>
                      <h4>{book.ISBN}</h4>
                      {book.pages && <h5>{book.pages} pp.</h5>}
                      <button
                        onClick={() => {
                          setForm({
                            id: book.id,
                            query: book.ISBN,
                          });
                        }}
                        className="bg-blue-500 mr-3 px-3 text-white rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="bg-red-500 px-3 text-white rounded"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
}
