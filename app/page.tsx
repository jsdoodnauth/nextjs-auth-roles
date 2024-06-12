import Login from "@/components/login-btn";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1>Hello World</h1>
      <Login></Login>
      <Link href={"/private/"}>links</Link>
    </main>
  );
}
