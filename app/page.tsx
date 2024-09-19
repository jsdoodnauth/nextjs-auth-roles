import { CardSample } from "@/components/boilerplate/sample";

export default async function Home() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Home</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        Nextjs Template
        <ul>
          <li>
            Authjs
            <ul>
              <li>+ Roles</li>
            </ul>
          </li>
          <li>
            Drizzle
            <ul>
              <li>+ mySql</li>
            </ul>
          </li>
          <li>
            Tailwind
            <ul>
              <li>+ Shadcn/ui</li>
            </ul>
          </li>
        </ul>
      </div>
    </main>
  );
}
