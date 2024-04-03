"use client";

import type { PageParams } from "@/types/next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { Album } from "@prisma/client";
import useSWR, { Fetcher } from "swr";
import { Manifest } from "@/types/gallica";

export default function NbImagesPage(props: PageParams<{}>) {
  const fetcher: Fetcher<Manifest, string> = (...args) => fetch(...args).then((res) => res.json())

  const { data, error } = useSWR<Manifest, Error>('/api/bnf?ark=ark:/12148/btv1b77023022&type=manifest', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile: File | undefined = event.target.files?.[0];
    let csvToArray: null | Album[] = null;
    const multipleView = /(\d{2,3})\s+\w*phot\w*/g;

    Papa.parse(csvFile as File, {
      header: true,
      // dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        csvToArray = (result.data as Album[]).map((row) => {
          const resultMatch : null | string[] = row.title.match(multipleView);
          if(resultMatch) {
            return {
              ...row, 
              imageNb: resultMatch[0].replace(/\D/g, "")
            }
          } else {
            return row;
          }
        })
        console.log(csvToArray);
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
