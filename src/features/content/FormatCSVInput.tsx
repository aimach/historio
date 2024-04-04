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
import { Country } from "@prisma/client";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";

import { formatCSV } from "@/lib/insertDB";

export type FormatCSVInputProps = {};

const FormatCSVInput = (props: FormatCSVInputProps) => {
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

  return (
    <div className="grid items-center gap-5 w-1/2">
      <h3 className="text-xl font-bold">Formater l&apos;export de Gallica</h3>
      <div>
        <Label htmlFor="csvFile">Ajouter un fichier CSV</Label>
        <Input
          id="csvFile"
          type="file"
          onChange={handleFileChange}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
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
      {selectCountry && (
        <div>
          <Button
            onClick={() => handleFormatButton(file as File, selectCountry)}
          >
            Formater
          </Button>
        </div>
      )}
      {fileURL && (
        <div>
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
          <Button>Importer dans la base de données</Button>
        </div>
      )}
    </div>
  );
};

export default FormatCSVInput;
