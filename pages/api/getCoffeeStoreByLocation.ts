import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCoffeeShops } from '../../library/coffee-shops';

const getCoffeeStoresByLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeShops(latLong as string, limit as string);
    res.status(200);
    res.json(response);
  } catch (err) {
    console.error("There is an error", err);
    res.status(500);
    res.json({ message: "Oh no! Something went wrong", err });
  }

  //return
};

export default getCoffeeStoresByLocation;
