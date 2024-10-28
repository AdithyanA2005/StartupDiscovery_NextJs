import Form from "next/form";
import { SearchIcon } from "lucide-react";
import { SearchFormReset } from "@/components/search-form/search-form-reset";

export function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input name="query" defaultValue={query} className="search-input" placeholder="Search Startups" />

      <div className="flex gap-2">
        {query ? <SearchFormReset /> : null}

        <button type="submit" className="search-btn text-white">
          <SearchIcon className="size-5" />
        </button>
      </div>
    </Form>
  );
}
