import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import AuthWrapper from "../components/AuthWrapper"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Backend
import { withTRPC } from "@trpc/next"
import { AppType } from "next/dist/shared/lib/utils"
import { AppRouter } from "./api/trpc/[trpc]"

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter()

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 }
  }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
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
        </AuthWrapper>
      </SessionProvider>
    </>
  )
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      url: `${getBaseUrl()}/api/trpc`
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true
})(MyApp)
