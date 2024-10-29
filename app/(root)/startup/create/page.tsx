import { redirect } from "next/navigation";
import { StartupForm } from "@/components/startup-form";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup Pitch</h1>
      </section>
      <StartupForm />
    </>
  );
}
