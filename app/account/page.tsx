import { auth } from "../server/auth";
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect('/')
  }

  if (session) {
    return (
      <>
        <h1>Account</h1>
        Signed in as {session.user?.email} <br />
        Name: {session.user?.name}<br />
        Role: {session.user?.role}<br />
      </>
    )
  } else {
    return (
      <>
      <h1>You are not logged in, why are you here???</h1>
      </>
    )
  }
}