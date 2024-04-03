import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const images = await prisma.image.findMany();
  return new Response(JSON.stringify(images), { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const image = await prisma.image.create({ data: body });
  return new Response(JSON.stringify(image), { status: 201 });
}
