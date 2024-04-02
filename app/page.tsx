"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";

export default function Home() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile: File | undefined = event.target.files?.[0];

    Papa.parse(csvFile as File, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
      complete: (result) => {
        console.log(result.data);
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
