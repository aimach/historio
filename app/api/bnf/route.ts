export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ark: string | null = searchParams.get("ark");
  const type: string | null = searchParams.get("type");
  let url: string = "";

  if (type === "image") {
    const folio: string | null = searchParams.get("folio");
    url = `https://gallica.bnf.fr/iiif/${ark}/${folio}/full/full/0/native.jpg`;
  } else {
    url = `https://gallica.bnf.fr/iiif/${ark}/f1/${type}.json`;
  }
  const res = await fetch(url);
  const contentType = res.headers.get("Content-Type");
  if (contentType && contentType.startsWith("image")) {
    return res;
  }
  const data = await res.json();
  return Response.json({ data });
}
