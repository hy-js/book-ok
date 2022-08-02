import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/primsa";

interface Books {
  books: {
    id: string;
    ISBN: string;
    OLkey: string;

    title: string;
    author: string;

    cover: string;
    publishedYear: string;
    pages: string;
  }[];
}

interface FormData {
  id: string;
  query: string;
}

const Home = ({ books }: Books) => {
  const [view, setView] = useState(true);
  const [form, setForm] = useState<FormData>({
    id: "",
    query: "",
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const createBook = async (data: FormData) => {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          deleteBook(data.id);
          setForm({ query: "", id: "" });
          refreshData();
        } else {
          setForm({ query: "", id: "" });
          refreshData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      fetch(`http://localhost:3000/api/book/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => refreshData());
    } catch (error) {
      console.log("error");
    }
  };

  const checkBook = async (id: string) => {
    try {
      fetch(`http://localhost:3000/api/check/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
      createBook(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-[60%] w-auto  max-w-min mx-auto space-y-6 ">
      <h1 className="font-bold mt-4">Book OK</h1>
      <div className="grid grid-cols-3">
        <button
          className="bg-slate-800 text-white rounded p-1"
          onClick={() => setView(!view)}
        >
          View =
        </button>
        <button className="bg-red-800 text-white rounded p-1">Edit</button>
        <button className="bg-orange-800 text-white rounded p-1">Change</button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Title and Author or ISBN"
          value={form.query}
          onChange={(e) =>
            setForm({
              ...form,
              query: e.target.value.replaceAll(" ", "+"),
            })
          }
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>

      <div className="flex flex-col items-stretch">
        {view ? (
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
        ) : (
          <ul className="flex flex-wrap ">
            {books.map((book) => (
              <li key={book.id} className="p-2">
                {book.cover ? (
                  <Image
                    placeholder="empty"
                    alt={book.title || "book cover"}
                    width={180}
                    height={274}
                    src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                    className="w-[180px] h-[274px] object-cover border-gray-500 border-solid border-2"
                  />
                ) : (
                  <div className="w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400">
                    <h4>{book.title}</h4>
                    <h5>{book.author}</h5>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      ISBN: true,
      OLkey: true,

      title: true,
      author: true,

      cover: true,
      pages: true,
      publishedYear: true,
    },
  });

  return {
    props: {
      books,
    },
  };
};
