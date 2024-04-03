import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const images = await prisma.image.findMany();
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
