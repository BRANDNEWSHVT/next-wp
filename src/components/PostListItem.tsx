import Link from "next/link";
import Image from "next/image";
import { Post } from "../__generated__/graphql";
import { createSanitizedMarkup } from "@/lib/sanitize";

interface PostListItemProps {
  post: Partial<Post>;
}

export default function PostListItem({ post }: PostListItemProps) {
  const { title, excerpt, uri, date } = post;

  return (
    <article className="hard-shadow-hover group border border-foreground bg-background transition-all">
      {post.featuredImage?.node?.sourceUrl && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-foreground">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="newsprint-image object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-4">
          <time
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-500"
            dateTime={post.date || ""}
          >
            {new Date(date || "").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.author?.node && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              By {post.author.node.name}
            </span>
          )}
        </div>

        <h2
          className="mt-3 text-xl font-bold leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <Link
            href={uri || "/"}
            className="transition-colors hover:text-accent"
          >
            {title}
          </Link>
        </h2>

        <div
          className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600"
          style={{ fontFamily: "'Lora', serif" }}
          dangerouslySetInnerHTML={createSanitizedMarkup(excerpt || "")}
        />

        <Link
          href={uri || "/"}
          className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
        >
          Continue Reading →
        </Link>
      </div>
    </article>
  );
}
