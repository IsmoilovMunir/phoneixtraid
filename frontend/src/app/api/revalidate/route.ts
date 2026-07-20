import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const path = body.path as string | undefined;

  if (path) {
    revalidatePath(path);
  } else {
    revalidatePath("/produktsiya");
    revalidatePath("/strany-briks");
    revalidatePath("/novosti");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
