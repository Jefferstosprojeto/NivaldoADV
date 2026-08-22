import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Jurídico",
  description:
    "Artigos sobre Inventários e Sucessões, Direito de Família e Legalização de Imóveis para quem busca entender seus direitos e o passo a passo legal.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-10">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="font-serif text-xl hover:text-brand-gold">
              {post.title}
            </Link>
            <p className="text-brand-navy/80 text-sm mt-1">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
