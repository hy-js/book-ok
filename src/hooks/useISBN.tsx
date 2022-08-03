// // `https://openlibrary.org/isbn/${query}.json`
// import useSWR from "swr";
// import { OLBOOK } from "../lib/types";

// const useISBN = () => {
//   const fetcher = (...args: OLBOOK[]) => fetch(...args).then((res) => res.json());
//   const { data, error } = useSWR(`https://openlibrary.org/isbn/${query}.json`, fetcher);

//   return {
//     user: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export default useISBN;
