interface Location {
  address: string;
  locality: string;
};

interface CoffeeShopResponseProps {
  fsq_id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  location: Location;
}

interface CoffeeShopProps {
  id: number;
  name: string;
  imgUrl: string;
  address: string;
  locality: string;
}

interface ICoffeeShopContextState {
  latLong: string;
  coffeeShops: CoffeeShopProps[];
}
