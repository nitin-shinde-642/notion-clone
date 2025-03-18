"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggler";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-4 sticky">
      <SignedOut>Notion Clone</SignedOut>
      <SignedIn>
        <h1>
          <Link href={"/"}>{user?.firstName}&apos;s Space</Link>
        </h1>
      </SignedIn>
      <Breadcrumbs />
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode={"modal"} />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle />
      </div>
    </div>
  );
}
export default Header;
