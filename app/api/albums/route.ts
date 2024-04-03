// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const albums = await prisma.album.findMany();
  return new Response(JSON.stringify(albums), { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const album = await prisma.album.create({ data: body });
  return new Response(JSON.stringify(album), { status: 201 });
}
