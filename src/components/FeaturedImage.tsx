import Link from "next/link";
import Image from "next/image";
import { Post } from "../__generated__/graphql";

interface FeaturedImageProps {
  post: Partial<Post>;
  classNames?: string;
  uri?: string | null;
  title?: string;
}

export function FeaturedImage({
  post,
  classNames = "relative aspect-video w-full overflow-hidden",
  uri = null,
  title = "",
}: FeaturedImageProps) {
  if (!post.featuredImage?.node?.sourceUrl) {
    return null;
  }

  const imageElement = (
    <Image
      src={post.featuredImage.node.sourceUrl}
      alt={post.featuredImage.node.altText || post.title || ""}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="newsprint-image object-cover transition-transform duration-300 hover:scale-105"
    />
  );

  return (
    <div className={classNames}>
      {typeof uri === "string" && uri.trim() !== "" ? (
        <Link href={uri} title={title} className="block h-full w-full">
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}
    </div>
  );
}
