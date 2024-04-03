import { Area, Country, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import areas from "../data/area/area.json";
import africanCountries from "../data/countries/africa.json";
import antarcticCountries from "../data/countries/antarctic.json";
import asianCountries from "../data/countries/asia.json";
import europeanCountries from "../data/countries/europe.json";
import northAmericanCountries from "../data/countries/northAmerica.json";
import southAmericanCountries from "../data/countries/southAmerica.json";
import oceanianCountries from "../data/countries/oceania.json";

async function createCountries(name: string, countries: string[]) {
  try {
    const area: Area | null = await prisma.area.findFirst({
      where: { name },
    });

    await Promise.all(
      countries.map(async (country) => {
        if (area != null) {
          await prisma.country.create({
            data: {
              name: country,
              Area: {
                connect: {
                  name: area.name,
                },
              },
            },
          });
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  // AREA
  try {
    await Promise.all(
      areas.map(async (area) => {
        await prisma.area.create({
          data: {
            name: area.name,
          },
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  // COUNTRIES
  createCountries("Afrique", africanCountries);
  createCountries("Europe", europeanCountries);
  createCountries("Antarctique", antarcticCountries);
  createCountries("Océanie", oceanianCountries);
  createCountries("Asie", asianCountries);
  createCountries("Amérique du Nord et centrale", northAmericanCountries);
  createCountries("Amérique du Sud", southAmericanCountries);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
