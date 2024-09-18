import UserState from "@/components/user-state";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1>Hello World</h1>
      <UserState></UserState>
      <Link href={"/private/"}>links</Link>
    </main>
  );
}
