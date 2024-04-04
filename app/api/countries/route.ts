import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });
  return new Response(JSON.stringify(countries), { status: 200 });
}
