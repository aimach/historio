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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Album, Country } from "@prisma/client";
import { getAlbums, getCountries } from "@/lib/fetchData";
import { Check, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import PaginationComponent from "@/features/pagination/Pagination";

export type DisplayTableProps = {};

const DisplayTableAlbums = (props: DisplayTableProps) => {
  const [page, setPage] = useState<number>(1);
  const [itemNb, setItemNb] = useState<number>(10);
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [selectedVerified, setSelectedVerified] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const headers: string[] = [
    "Ark",
    "Titre",
    "Auteur(s)",
    "Date(s)",
    "Pays",
    "Vérifié",
    "Voir",
  ];

  useEffect(() => {
    const getDatas = async () => {
      setAlbums(
        await getAlbums(page, itemNb, selectedVerified, selectedCountry)
      );
    };
    const getCountriesData = async () => {
      setCountries(await getCountries());
    };
    getDatas();
    getCountriesData();
  }, [page, itemNb, selectedVerified, selectedCountry]);

  const resetFilters = () => {
    setSelectedVerified("");
    setSelectedCountry("");
  };

  if (!albums) {
    return <Loader className="h-4 w-4 animate-spin m-auto" />;
  }

  return (
    <div>
      <div className="flex gap-5">
        <div>
          <Label htmlFor="csvFile">Nombre de résultats</Label>
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
        <div>
          <Label htmlFor="csvFile">Filtrer par pays</Label>
          <Select onValueChange={(value) => setSelectedCountry(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choisir le pays" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem value={country.name} key={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="csvFile">Filtrer par état</Label>
          <Select onValueChange={(value) => setSelectedVerified(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choisir l'état" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Vérfifié</SelectItem>
              <SelectItem value="false">Non vérifié</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
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
          {(albums as Album[]).map((item: Album) => (
            <TableRow key={item.ark}>
              <TableCell>{item.ark}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.countryId}</TableCell>
              <TableCell>
                {item.completed ? <Check color="green" /> : <X color="red" />}
              </TableCell>
              <TableCell>
                <Link href={`/content/manage/${encodeURIComponent(item.ark)}`}>
                  Voir les images
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent page={page} setPage={setPage} />
    </div>
  );
};

export default DisplayTableAlbums;
