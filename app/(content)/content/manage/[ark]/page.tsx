"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image as ImageType } from "@prisma/client";
import { getImages, getImagesNbPerAlbum } from "@/lib/fetchData";
import Image from "next/image";
import { Check, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PaginationComponent from "@/features/pagination/Pagination";

export type DisplayTableImagesProps = {};

const DisplayTableImages = (props: DisplayTableImagesProps) => {
  const [page, setPage] = useState<number>(1);
  const [itemNb, setItemNb] = useState<number>(10);
  const [imagesPerAlbum, setImagesPerAlbum] = useState<number>(0);
  const params = useParams<{ ark: string }>();
  const ark: string = decodeURIComponent(params?.ark as string);

  const [content, setContent] = useState<ImageType[] | null>(null);

  useEffect(() => {
    const getDatas = async () => {
      setContent(await getImages(page, itemNb, ark));
    };
    const getImagesNb = async () => {
      setImagesPerAlbum(await getImagesNbPerAlbum(ark));
    };
    getDatas();
    getImagesNb();
  }, [page, itemNb, ark]);

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
    "Sélectionné",
  ];

  return (
    <div>
      <div className="flex justify-between">
        <p>{imagesPerAlbum} images</p>
        <Select onValueChange={(value) => setItemNb(parseInt(value, 10))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10 résultats par page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 résultats par page</SelectItem>
            <SelectItem value="30">30 résultats par page</SelectItem>
            <SelectItem value="50">50 résultats par page</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
      <PaginationComponent page={page} setPage={setPage} />
    </div>
  );
};

export default DisplayTableImages;
