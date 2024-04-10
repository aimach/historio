"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Image as ImageType } from "@prisma/client";
import { getImages } from "@/lib/fetchData";
import Image from "next/image";
import { Check, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";

export type DisplayTableImagesProps = {
  page: number;
  itemNb: number;
  setItemNb: (value: number) => void;
};

const DisplayTableImages = (props: DisplayTableImagesProps) => {
  const { page, itemNb } = props;
  const [content, setContent] = useState<ImageType[] | null>(null);

  useEffect(() => {
    const getDatas = async () => {
      setContent(await getImages(page, itemNb));
    };
    getDatas();
  }, [page, itemNb]);

  if (!content) {
    return <Loader className="h-4 w-4 animate-spin m-auto" />;
  }

  if (content.length === 0) {
    return <div>Pas de résultat</div>;
  }

  const headers: string[] = [
    "Miniature",
    "Folio",
    "Dimensions",
    "Album",
    "Vérifié",
  ];

  return (
    <div>
      <h2>Images</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(content as ImageType[]).map((item: ImageType) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.thumbnail}
                  alt={`folio n°${item.folio}`}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell>{item.folio}</TableCell>
              <TableCell>
                {item.height} x {item.width}
              </TableCell>
              <TableCell>{item.albumId}</TableCell>
              <TableCell>
                {item.valid ? <Check color="green" /> : <X color="red" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayTableImages;
