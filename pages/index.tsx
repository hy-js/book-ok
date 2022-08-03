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
    status: string;

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
  status: string;
}

const Home = ({ books }: Books) => {
  const [form, setForm] = useState<FormData>({
    id: "",
    query: "",
    status: "",
  });
  const router = useRouter();

  const TBR = books.filter((book) => book.status === "TBR");
  const READ = books.filter((book) => book.status === "READ");
  const READING = books.filter((book) => book.status === "READING");
  const DNF = books.filter((book) => book.status === "DNF");

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
          setForm({ query: "", id: "", status: "" });
          refreshData();
        } else {
          setForm({ query: "", id: "", status: "" });
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
    <div className="min-w-[80%] w-auto  max-w-min mx-auto space-y-6 ">
      <h1 className="font-bold mt-4">Book OK</h1>
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
        <select
          name="status"
          id="status"
          className="border-2 rounded border-gray-600 p-1"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
        >
          <option value="TBR">TBR</option>
          <option value="READING">Reading</option>
          <option value="READ">Read</option>
          <option value="DNF">DNF</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>

      <div className="flex flex-col items-stretch">
        <>
          <h2 className="READING">{READING.length} READING</h2>
          <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
            {READING.map((book) => (
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
          <h2 className="TBR">{TBR.length} TBR</h2>
          <ul className="flex  flex-wrap border-b border-gray-600 p-2 ">
            {TBR.map((book) => (
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
          <h2 className="READ">{READ.length} READ</h2>
          <ul className="flex  flex-wrap border-b border-gray-600 p-2">
            {READ.map((book) => (
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
          <h2 className="DNF">{DNF.length} DNF</h2>
          <ul className="flex  flex-wrap border-b border-gray-600 p-2">
            {DNF.map((book) => (
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
        </>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const myBooks = await prisma.book.findMany({
    select: {
      id: true,
      ISBN: true,
      OLkey: true,
      status: true,

      title: true,
      author: true,

      cover: true,
      pages: true,
      publishedYear: true,
    },
  });
  // Limit to 100 books at a time
  const books = myBooks.slice(0, 101);

  return {
    props: {
      books,
    },
  };
};
