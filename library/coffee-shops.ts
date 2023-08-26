import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ?? '',
});

const getURLForCoffeeShops = (latLong: string = '35.4727983,-82.4993295', query: string = 'coffee', limit: string = '10') => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}&ll=${latLong}`
};

const getListOfCoffeeShopPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  })
  const unsplashResults = photos.response?.results;
  return unsplashResults?.map((result) => result.urls['small']);
};
export const fetchCoffeeShops = async (latLong = '35.4727983,-82.4993295', limit = '10'): Promise<CoffeeShopProps[]> => {
  const photos = await getListOfCoffeeShopPhotos();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ?? '',
    },
  };
  const response = await fetch(getURLForCoffeeShops(latLong, 'coffee', limit), options);
  const data: { results: CoffeeShopResponseProps[] } = await response.json();
  const results = data.results.map((result, index) => {
    const imgUrl = Array.isArray(photos) ? photos[index] : '';
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      locality: result.location.locality,
      imgUrl,
    };
  });
  return results;
};
