import { unstable_after as after } from "next/server";
import { Ping } from "@/components/ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export async function View({ id }: { id: string }) {
  const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );

  return (
    <div className="view-container">
      <div className="absolute -right-2 -top-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">{`${totalViews + 1} view${totalViews + 1 > 1 ? "s" : ""}`}</span>
      </p>
    </div>
  );
}