import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { StartupCard } from "@/components/startup-card";
import { UserStartups } from "@/components/user-startups";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const experimental_ppr = true;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black line-clamp-1 text-center uppercase">{user.name}</h3>
          </div>

          <Image src={user.image} alt={user.name} width={220} height={220} className="profile_image" />

          <p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>

          <p className="text-14-normal mt-1 text-center">{user?.bio}</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">{session?.id === id ? "Your" : "All"} Startups</p>

          <ul className="card_grid-sm">
            <Suspense
              fallback={[0, 1, 2, 3, 4].map((i) => (
                <li key={cn("skeleton", i)}>
                  <StartupCard.Skeleton />
                </li>
              ))}
            >
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
}
