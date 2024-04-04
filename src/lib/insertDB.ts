import { Manifest } from "@/types/gallica";
import { Album, Image } from "@prisma/client";
import Papa from "papaparse";
import { readCSVFileAsString } from "./utils";
import { Canva } from "@/types/gallica";

export const getManifest = async (ark: string) => {
  const response = await fetch(`/api/bnf?ark=${ark}&type=manifest`);
  if (response.ok) {
    const manifest: Manifest = await response.json();
    return manifest;
  } else {
    console.error("Error fetching manifest");
  }
};

export const insertAlbumIntoDB = async (album: Album) => {
  const response = await fetch("/api/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.error("Error inserting album");
  }
};

export const insertImageIntoDB = async (image: Omit<Image, "id">) => {
  const response = await fetch("/api/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  });
  if (!response.ok) {
    console.error("Error inserting image");
  }
};

export const formatCSV = async (file: File, country: string) => {
  const csvString: string = await readCSVFileAsString(file);
  let modifiedCSV: string = "";
  Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";",

    complete: (result) => {
      const newObject = result.data.map((row: any) => {
        return {
          ark: row["URL"],
          title: row["TITRE"],
          author: row["AUTEURS"],
          date: row["DATES"],
          origin: row["SOURCE"],
          completed: false,
          countryId: country,
        };
      });

      modifiedCSV = Papa.unparse(newObject, {
        delimiter: ";",
        skipEmptyLines: false,
        header: true,
      });
    },
    error: (error: Error) => {
      console.error("Erreur lors de l'analyse du fichier CSV :", error);
    },
  });
  return modifiedCSV;
};

export const addFormatedCSVTODB = async (csvFile: File | string) => {
  Papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (result) => addAlbumsAndImages(result as { data: Album[] }),
    error: (error) => {
      console.error(error);
    },
  });
};

export const addAlbumsAndImages = (result: { data: Album[] }) => {
  result.data.map(async (row: Album) => {
    const newAlbum = await insertAlbumIntoDB({
      ...row,
      ark: row.ark.slice(23), // remove "https://gallica.fr"
      date: row.date.toString(),
    });
    const manifest = await getManifest(newAlbum.ark);
    const imageNb = manifest?.data.sequences[0].canvases.length;
    for (let i = 0; i < (imageNb as number); i++) {
      const image: Canva | undefined = manifest?.data.sequences[0].canvases[i];
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
};
