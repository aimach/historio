/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Album` table. All the data in the column will be lost.
  - The primary key for the `Area` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Area` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Country` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("ark");

-- AlterTable
ALTER TABLE "Area" DROP CONSTRAINT "Area_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("ark") ON DELETE RESTRICT ON UPDATE CASCADE;
