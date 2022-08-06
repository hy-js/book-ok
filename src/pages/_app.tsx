import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import Header from "@/components/Header"

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 }
  }

  return (
    <>
      <Header />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}>
        <div className='page-transition-wrapper'>
          <motion.div
            key={router.pathname}
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={variants}
            transition={{ type: "linear" }}
            id='page-transition-container'>
            <Component {...pageProps} />;
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  )
}

export default MyApp;
