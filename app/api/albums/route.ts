import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const albums = await prisma.album.findMany();
  return new Response(JSON.stringify(albums), { status: 200 });
}

export async function POST(request: Request) {
  const { ark, title, author, date, origin, completed, countryId } =
    await request.json();
  const album = await prisma.album.create({
    data: {
      ark: ark,
      title: title,
      author: author,
      date: date,
      origin: origin,
      completed: completed,
      Country: { connect: { name: countryId } },
    },
  });
  return new Response(JSON.stringify(album), { status: 201 });
}
