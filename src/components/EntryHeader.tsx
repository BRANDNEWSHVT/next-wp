"use client";

type EntryHeaderProps = {
  title: string;
  date?: Date | string;
  author?: string;
};

export default function EntryHeader({ title, date, author }: EntryHeaderProps) {
  return (
    <div className="mb-8 border-b-4 border-foreground pb-6">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
        {date
          ? new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Latest"}
      </p>

      {title && (
        <h1
          className="text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>
      )}

      {author && (
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-600">
          By <span className="font-bold text-foreground">{author}</span>
        </p>
      )}
    </div>
  );
}
