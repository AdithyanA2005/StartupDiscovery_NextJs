import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOutIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { auth, signIn, signOut } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={150} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <PlusIcon className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="align-bottom">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOutIcon className="size-6 text-red-500 sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 font-work-sans text-lg">
                      {getInitials(session?.user?.name)}
                    </div>
                  </AvatarFallback>
                </Avatar>
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
