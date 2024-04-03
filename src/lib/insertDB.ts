import { Manifest } from "@/types/gallica";
import { Album, Image } from "@prisma/client";

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
  if (response.ok) {
    console.log("Image inserted");
  } else {
    console.error("Error inserting image");
  }
};
