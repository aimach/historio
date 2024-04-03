import prisma from "../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const image = await prisma.image.findFirst({ where: { id } });
    if (image === null) {
      return new Response("Aucun image n'a été trouvé", { status: 404 });
    } else {
      return new Response(JSON.stringify(image), { status: 200 });
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const image = await prisma.image.findFirst({ where: { id } });
    if (image === null) {
      return new Response("Aucun image n'a été trouvé", { status: 404 });
    } else {
      await prisma.image.update({ data: body, where: { id } });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.image.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error(error as string);
  }
}
