import prisma from "../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const album = await prisma.album.findFirst({
      where: { id },
      include: { images: true },
    });
    if (album === null) {
      return new Response("Aucun album n'a été trouvé", { status: 404 });
    } else {
      return new Response(JSON.stringify(album), { status: 200 });
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
