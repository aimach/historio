export const getCountries = async () => {
  const response = await fetch(`/api/countries`);
  if (response.ok) {
    const countries = await response.json();
    return countries;
  } else {
    console.error("Error fetching manifest");
  }
};

export const getAlbums = async (page: number, number: number) => {
  const response = await fetch(`/api/albums?page=${page}&number=${number}`);
  if (response.ok) {
    const albums = await response.json();
    return albums;
  } else {
    console.error("Error fetching manifest");
  }
};

export const getImages = async (page: number, number: number) => {
  const response = await fetch(`/api/images?page=${page}&number=${number}`);
  if (response.ok) {
    const images = await response.json();
    return images;
  } else {
    console.error("Error fetching manifest");
  }
};
