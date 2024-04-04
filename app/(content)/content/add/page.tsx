"use client";

import type { PageParams } from "@/types/next";
import FormatCSVInput from "@/features/content/FormatCSVInput";
import AddContentInput from "@/features/content/AddContentInput";

export default function NbImagesPage(props: PageParams<{}>) {
  return (
    <div className="grid w-full items-center">
      <h2 className="text-4xl font-extrabold mb-10">Ajouter du contenu</h2>
      <div className="grid grid-cols-2 gap-20">
        <FormatCSVInput />
        <AddContentInput />
      </div>
    </div>
  );
}
