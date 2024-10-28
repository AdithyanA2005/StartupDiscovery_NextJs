import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="font-work-sans bg-white px-5 py-3 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={150} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
