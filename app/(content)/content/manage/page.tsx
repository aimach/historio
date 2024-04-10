"use client";

import PaginationComponent from "@/features/pagination/Pagination";
import type { PageParams } from "@/types/next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DisplayTableAlbums from "./albums/page";
import DisplayTableImages from "./images/page";

const ManagePage = (props: PageParams<{}>) => {
  const [page, setPage] = useState<number>(1);
  const [itemNb, setItemNb] = useState<number>(10);
  const [type, setType] = useState<string>("album");

  return (
    <div className="grid w-full items-center">
      <h2 className="text-4xl font-extrabold mb-10">Gérer le contenu</h2>
      <div>
        <Button onClick={() => setType("album")}>Albums</Button>
        <Button onClick={() => setType("image")}>Images</Button>
      </div>
      <div>
        {type === "album" ? (
          <DisplayTableAlbums
            page={page}
            itemNb={itemNb}
            setItemNb={setItemNb}
          />
        ) : (
          <DisplayTableImages
            page={page}
            itemNb={itemNb}
            setItemNb={setItemNb}
          />
        )}
        <PaginationComponent page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ManagePage;
