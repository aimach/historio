"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Album, Image as ImageType } from "@prisma/client";
import { getAlbums, getImages } from "@/lib/fetchData";
import Image from "next/image";
import { Check, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";

export type DisplayTableProps = {
  title: string;
  headers: string[];
  type: string;
  page: number;
  itemNb: number;
};

const DisplayTable = (props: DisplayTableProps) => {
  const { title, headers, type, page, itemNb } = props;
  const [content, setContent] = useState<Album[] | ImageType[] | []>([]);

  useEffect(() => {
    const getDatas = async () => {
      if (type === "album") {
        setContent(await getAlbums(page, itemNb));
      }
      if (type === "image") {
        setContent(await getImages(page, itemNb));
      }
    };
    getDatas();
  }, [type, page, itemNb]);

  if (content.length === 0) {
    return <Loader className="h-4 w-4 animate-spin" />;
  }

  return (
    <div>
      <h2>{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {type === "album" &&
            (content as Album[]).map((item: Album) => (
              <TableRow key={item.ark}>
                <TableCell>{item.ark}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.countryId}</TableCell>
                <TableCell>
                  {item.completed ? <Check color="green" /> : <X color="red" />}
                </TableCell>
              </TableRow>
            ))}
          {type === "image" &&
            (content as ImageType[]).map((item: ImageType) => (
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

export default DisplayTable;
