import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/apollo-client";
import { GET_POSTS_ARCHIVE } from "@/lib/queries";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success, remaining } = rateLimit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": remaining.toString() },
      },
    );
  }

  try {
    const { after, first = 6 } = await request.json();

    const client = getClient();
    const { data } = await client.query({
      query: GET_POSTS_ARCHIVE,
      variables: { first, after },
    });

    return NextResponse.json(
      {
        posts: data.posts.nodes,
        pageInfo: data.posts.pageInfo,
      },
      {
        headers: { "X-RateLimit-Remaining": remaining.toString() },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
