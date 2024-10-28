import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // @ts-expect-error - Profile will not be undefined as we are using the GitHub provider as the only auth provider
    async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    // @ts-expect-error - Token, account, and profile will not be undefined as we are using the GitHub provider as the only auth provider
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        token.id = user?._id;
      }

      return token;
    },

    // @ts-expect-error - Session and token will not be undefined as we are using the GitHub provider as the only auth provider
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
