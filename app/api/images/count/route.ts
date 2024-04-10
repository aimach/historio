import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ark: string | null = searchParams.get("ark");
  const imagesCount = await prisma.image.count({
    where: { Album: { ark: ark as string } },
  });
  return new Response(JSON.stringify(imagesCount), { status: 200 });
}
