import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div>
          <h5>Signed in as {session.user.email}</h5>
          <button
            className='bg-blue-500 mr-3 px-3 text-white rounded'
            onClick={() => signOut()}>
            <h5>Sign out</h5>
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <div>
        <h5>Not signed in</h5>
        <button
          className='bg-blue-500 mr-3 px-3 text-white rounded'
          onClick={() => signIn()}>
          <h5>Sign in</h5>
        </button>
      </div>
    </>
  )
}

export default LoginButton
