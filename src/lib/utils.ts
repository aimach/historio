import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readCSVFileAsString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvString = event.target?.result as string;
      resolve(csvString);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    return reader.readAsText(file as Blob);
  });
};
