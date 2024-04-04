export const getCountries = async () => {
  const response = await fetch(`/api/countries`);
  if (response.ok) {
    const countries = await response.json();
    return countries;
  } else {
    console.error("Error fetching manifest");
  }
};
