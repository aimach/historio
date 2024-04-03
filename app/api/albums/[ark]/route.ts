import prisma from "../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { ark: string } }
) {
  try {
    const ark = params.ark;
    const album = await prisma.album.findFirst({ where: { ark } });
    if (album === null) {
      return new Response("Aucun album n'a été trouvé", { status: 404 });
    } else {
      return new Response(JSON.stringify(album), { status: 200 });
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { ark: string } }
) {
  try {
    const ark = params.ark;
    const body = await request.json();

    const album = await prisma.album.findFirst({ where: { ark } });
    if (album === null) {
      return new Response("Aucun album n'a été trouvé", { status: 404 });
    } else {
      await prisma.album.update({ data: body, where: { ark } });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { ark: string } }
) {
  try {
    const ark = params.ark;

    await prisma.album.delete({ where: { ark } });
    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error(error as string);
  }
}
