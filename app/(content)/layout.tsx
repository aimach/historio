import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return <div className="h-full w-10/12 m-auto">{props.children}</div>;
}
