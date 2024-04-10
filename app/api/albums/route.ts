import prisma from "../../lib/prisma";

type SearchQueryProps = {
  verified?: { equals: string };
  country?: { equals: string };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page: string | null = searchParams.get("page");
  const number: string | null = searchParams.get("number");
  const completed: string | null = searchParams.get("completed");
  const country: string | null = searchParams.get("country");
  const skip = (Number(page) - 1) * Number(number);
  let searchQueries: SearchQueryProps | {} = {};
  if (completed !== null && country !== null) {
    searchQueries = {
      Country: { name: country },
      completed: completed === "true",
    };
  } else if (completed !== null) {
    searchQueries = { completed: completed === "true" };
  } else if (country !== null) {
    searchQueries = { Country: { name: country } };
  }

  const albums = await prisma.album.findMany({
    skip,
    take: Number(number),
    where: searchQueries as SearchQueryProps,
  });
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
