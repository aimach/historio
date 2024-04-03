"use client";

import type { PageParams } from "@/types/next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";
import { Album } from "@prisma/client";
import {
  insertAlbumIntoDB,
  insertImageIntoDB,
  getManifest,
} from "@/lib/insertDB";
import { Canva } from "@/types/gallica";

export default function NbImagesPage(props: PageParams<{}>) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile: File | undefined = event.target.files?.[0];

    Papa.parse(csvFile as File, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result: { data: Album[] }) => {
        result.data.map(async (row: Album) => {
          const newAlbum = await insertAlbumIntoDB({
            ...row,
            ark: row.ark.slice(23), // remove "https://gallica.fr"
            date: row.date.toString(),
          });
          const manifest = await getManifest(newAlbum.ark);
          const imageNb = manifest?.data.sequences[0].canvases.length;
          for (let i = 0; i < (imageNb as number); i++) {
            const image: Canva | undefined =
              manifest?.data.sequences[0].canvases[i];
            if (image) {
              await insertImageIntoDB({
                folio: `f${i + 1}`,
                height: image.height,
                width: image.width,
                valid: false,
                view: image.images[0].resource["@id"],
                thumbnail: image.thumbnail["@id"],
                albumId: newAlbum.ark,
              });
            }
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="csvFile">Fichier CSV</Label>
      <Input
        id="csvFile"
        type="file"
        onChange={handleFileChange}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
}
