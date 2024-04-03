import type { LayoutParams } from "@/types/next";
import Header from "@/features/layout/Header";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return (
    <div className="h-full">
      <Header />
      {props.children}
    </div>
  );
}
