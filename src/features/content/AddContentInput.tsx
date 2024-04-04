"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { addFormatedCSVTODB } from "@/lib/insertDB";

export type AddContentInputProps = {};

const AddContentInput = (props: AddContentInputProps) => {
  const [file, setFile] = useState<File | undefined>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const handleOnClick = () => {
    addFormatedCSVTODB(file as File);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importer un CSV déjà formaté</CardTitle>
        <CardDescription>
          Importer des albums et images dans la base de données déjà formatés.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-5 mb-5 flex flex-col gap-5">
          <Label htmlFor="csvFile">Ajouter un fichier</Label>
          <Input
            id="csvFile"
            type="file"
            onChange={handleFileChange}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          {file && (
            <div className="flex flex-col gap-5 w-4/6 m-auto">
              <Button onClick={handleOnClick}>
                Importer dans la base de données
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddContentInput;
