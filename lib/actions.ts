"use server";

import slugify from "slugify";
import { parseServerActionResponse } from "@/lib/utils";
import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";

export async function createPitch(state: any, form: FormData, pitch: string) {
  const session = await auth();

  if (!session) return parseServerActionResponse({ status: "ERROR", error: "Not signed in" });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      pitch,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({ ...result, status: "SUCCESS", error: "" });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({ status: "ERROR", error: JSON.stringify(error) });
  }
}
