"use client";

import PaginationComponent from "@/features/pagination/Pagination";
import type { PageParams } from "@/types/next";
import DisplayTableAlbums from "./albums/page";

const ManagePage = (props: PageParams<{}>) => {
  return (
    <div className="grid w-full items-center">
      <h2 className="text-4xl font-extrabold mb-10">Gérer le contenu</h2>
      <div>
        <DisplayTableAlbums />
      </div>
    </div>
  );
};

export default ManagePage;
