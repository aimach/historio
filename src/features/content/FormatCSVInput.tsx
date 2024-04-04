"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { Country } from "@prisma/client";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";

import { addFormatedCSVTODB, formatCSV } from "@/lib/insertDB";

export type FormatCSVInputProps = {};

const FormatCSVInput = (props: FormatCSVInputProps) => {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectCountry, setSelectCountry] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [fileURL, setFileURL] = useState<string | undefined>();

  const fetcher: Fetcher<Country[]> = () =>
    fetch("/api/countries").then((res) => res.json());

  const { data, error } = useSWR<Country[], Error>("/api/countries", fetcher);

  useEffect(() => {
    if (data) setCountries(data);
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const handleCountryChange = (value: string) => {
    setSelectCountry(value);
  };

  const handleFormatButton = async (file: File, country: string) => {
    setSelectCountry(undefined);
    const fileToDownload = await formatCSV(file, country);
    setFileURL(fileToDownload);
  };

  const handleDownloadButton = async () => {
    await addFormatedCSVTODB(fileURL as string);
    setSelectCountry(undefined);
    setFile(undefined);
    setFileURL(undefined);
    toast({
      title: "Données importées !",
      description:
        "Les données ont bien été importées dans la base de données.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formater l&apos;export de Gallica</CardTitle>
        <CardDescription>
          Formater le fichier CSV envoyé par Gallica, puis le télécharger ou
          l&apos;importer directement dans la base de données.
        </CardDescription>
        <CardContent className="p-0">
          <div className="mt-5 mb-5 flex flex-col gap-5">
            <Label htmlFor="csvFile">Ajouter un fichier CSV</Label>
            <Input
              id="csvFile"
              type="file"
              onChange={handleFileChange}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </div>
          <div className="mt-5 mb-5 flex flex-col gap-5">
            <Label htmlFor="csvFile">Choisir le pays</Label>
            <Select onValueChange={(value) => handleCountryChange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner un pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem value={country.name} key={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {file && selectCountry && (
            <div className="flex justify-end">
              <Button
                onClick={() => handleFormatButton(file as File, selectCountry)}
              >
                Formater
              </Button>
            </div>
          )}
          {fileURL && (
            <div className="flex flex-col gap-5 w-1/2 m-auto">
              <Button asChild>
                <Link
                  href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                    fileURL
                  )}`}
                  download="data.csv"
                >
                  Télécharger le fichier formaté
                </Link>
              </Button>
              <Button onClick={handleDownloadButton}>
                Importer dans la base de données
              </Button>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default FormatCSVInput;
