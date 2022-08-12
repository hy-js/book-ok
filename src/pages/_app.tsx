import "../styles/globals.css";
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router"
import { motion, AnimatePresence } from "framer-motion"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthWrapper from "@/components/AuthWrapper"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 }
  }
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <>

      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
        <QueryClientProvider client={client}>
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
          <Footer />
          </QueryClientProvider>
        </AuthWrapper>
      </SessionProvider>
    </>
  )
}

export default MyApp;