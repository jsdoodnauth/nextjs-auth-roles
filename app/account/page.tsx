import { auth } from "../server/auth";

export default async function DashboardPage() {
  const session = await auth();

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