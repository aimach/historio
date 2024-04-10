export const getCountries = async () => {
  const response = await fetch(`/api/countries`);
  if (response.ok) {
    const countries = await response.json();
    return countries;
  } else {
    console.error("Error fetching manifest");
  }
};

export const getAlbums = async (
  page: number,
  number: number,
  verified?: string,
  country?: string
) => {
  let url = `/api/albums?page=${page}&number=${number}`;
  if (verified !== "") url += `&completed=${verified}`;
  if (country !== "") url += `&country=${country}`;
  const response = await fetch(url);
  if (response.ok) {
    const albums = await response.json();
    return albums;
  } else {
    console.error("Error fetching manifest");
  }
};

export const getImages = async (page: number, number: number, ark: string) => {
  const response = await fetch(
    `/api/images?page=${page}&number=${number}&ark=${ark}`
  );
  if (response.ok) {
    const images = await response.json();
    return images;
  } else {
    console.error("Error fetching manifest");
  }
};

export const getImagesNbPerAlbum = async (ark: string) => {
  const response = await fetch(`/api/images/count?ark=${ark}`);
  if (response.ok) {
    const images = await response.json();
    return images;
  } else {
    console.error("Error fetching manifest");
  }
};
