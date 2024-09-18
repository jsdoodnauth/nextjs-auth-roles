import LoginButton from "./login-button"
import { auth } from "@/app/server/auth";

export default async function UserState() {
  const session = await auth();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        Name: {session.user?.name}<br />
        Role: {session.user?.role}<br />
        Test: {session.user?.test}
        <LoginButton></LoginButton>
      </>
    )
  } else {
    return (
      <>
        <LoginButton></LoginButton>
      </>
    )
  }

}