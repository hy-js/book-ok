import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/primsa";
import Image from "next/image";

interface Books {
  books: {
    OLkey: string;
    id: string;
    title: string;
    content: string;
    author: string;
    ISBN: string;
    publishedYear: string;
    publisher: string;
    pages: string;
  }[];
}

interface FormData {
  ISBN: string;
  id: string;
  author: string;
  title: string;
}

const Home = ({ books }: Books) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [form, setForm] = useState<FormData>({
    ISBN: "",
    id: "",
    author: "",
    title: "",
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
          setForm({ ISBN: "", id: "", author: "", title: "" });
          refreshData();
        } else {
          setForm({ ISBN: "", id: "", author: "", title: "" });
          setShowUpdate(false);
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
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Books</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[75%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="ISBN"
          value={form.ISBN}
          onChange={(e) => setForm({ ...form, ISBN: e.target.value.trim() })}
          className="border-2 rounded border-gray-600 p-1"
        />
        {/* <>
          <input
            type="text"
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
          />
          <input
            type="text"
            placeholder="author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
          />
        </> */}
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>

      <div className="w-auto min-w-[75%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {books
            .slice(0)
            .reverse()
            .map((book) => (
              <li key={book.id} className="border-b border-gray-600 p-2">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <a
                      href={`https://openlibrary.org${book.OLkey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <img
                      alt={book.title || "book cover"}
                      src={`https://covers.openlibrary.org/b/id/${
                        book.OLkey.split("/")[2]
                      }-M.jpg`}
                      width={180}
                      height={274}
                    /> */}

                      <h2 className="font-bold">{book.title}</h2>
                      <h3 className="font-bold">{book.ISBN}</h3>
                      <h4>
                        {book.publisher} - {book.publishedYear}
                      </h4>
                      {book.pages && <p>{book.pages} pp.</p>}
                    </a>
                  </div>

                  {/* <button
                  className="bg-green-500 mr-3 px-3 text-white rounded"
                  onClick={() => checkBook(book.id)}
                >
                  OL Lookup
                </button> */}
                  <button
                    onClick={() => {
                      setShowUpdate(true);
                      setForm({
                        ISBN: book.ISBN,
                        id: book.id,
                        author: book.author,
                        title: book.title,
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
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await prisma.book.findMany({
    select: {
      ISBN: true,
      OLkey: true,
      id: true,
      title: true,
      pages: true,
      publishedYear: true,
      publisher: true,
    },
  });

  return {
    props: {
      books,
    },
  };
};
