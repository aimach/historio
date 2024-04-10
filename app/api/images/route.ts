import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page: string | null = searchParams.get("page");
  const number: string | null = searchParams.get("number");
  const ark: string | null = searchParams.get("ark");
  const skip = (Number(page) - 1) * Number(number);
  const images = await prisma.image.findMany({
    skip,
    take: Number(number),
    where: { Album: { ark: ark as string } },
  });
  return new Response(JSON.stringify(images), { status: 200 });
}

export async function POST(request: Request) {
  const { folio, height, width, valid, view, thumbnail, albumId } =
    await request.json();

  const image = await prisma.image.create({
    data: {
      folio: folio,
      height: height,
      width: width,
      valid: valid,
      view: view,
      thumbnail: thumbnail,
      Album: { connect: { ark: albumId } },
    },
  });
  return new Response(JSON.stringify(image), { status: 201 });
}
