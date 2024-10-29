import { StartupCard, StartupCardType } from "@/components/startup-card";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";

export async function UserStartups({ id }: { id: string }) {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => <StartupCard key={startup._id} post={startup} />)
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
}