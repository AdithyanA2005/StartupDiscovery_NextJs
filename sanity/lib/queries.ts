import { defineQuery } from "groq";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
  _id, _createdAt, title, views, description, category, image,
  author -> { _id, name, image, bio },
}`);