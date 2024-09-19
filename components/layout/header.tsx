import { Navigation } from "./navigation";

export function Header() {
  return(
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Navigation></Navigation>
    </header>
  )
}