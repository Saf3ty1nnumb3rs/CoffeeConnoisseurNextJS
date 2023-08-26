import styles from '@/styles/Home.module.css'
import Banner from '@/components/Banner/Banner';
import Card from '@/components/Card/Card';
import Head from 'next/head'
import Image from 'next/image';
import { fetchCoffeeShops } from '@/library/coffee-shops';
import useTrackLocation from '@/hooks/useTrackLocation';
import { ACTION_TYPES, ShopContext } from '@/shop/shopContext';
import { useCallback, useContext, useEffect, useState } from 'react';

interface HomeStaticProps {
  props: {
    coffeeShops: CoffeeShopProps[]
  }
}
// Server Side Code
export async function getStaticProps(): Promise<HomeStaticProps> {
  const coffeeShops = await fetchCoffeeShops();
  return {
    props: {
      coffeeShops,
    }, // will be passed to the page component as props
  };
}

// Client Side Code
export default function Home(props: HomeStaticProps['props']) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  const [coffeeStoresError, setCoffeeStoresError] = useState('');

  const { dispatch, state } = useContext(ShopContext);

  const { coffeeShops, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getCoffeeStoreByLocation?latLong=${latLong}&limit=30`
          );

          const coffeeShops = await response.json();

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_SHOPS,
            payload: {
              latLong,
              coffeeShops,
            },
          });
          setCoffeeStoresError('');
        } catch (error) {
          const e = error as { message?: string };
          console.error({ error });
          setCoffeeStoresError(e.message || 'Something has gone wrong.');
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [dispatch, latLong]);

  const handleOnBannerBtnClick = useCallback(() => {
    handleTrackLocation();
  }, [handleTrackLocation]);
  return (
    <div className={styles.container}>
      <Head key="home">
        <title>Coffee Connoisseur</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            alt="background image of girl drinking coffee"
            src="/static/hero-image.png"
            width="700"
            height="400"
          />
        </div>
        {!!coffeeShops.length && (
          <>
            <h2 className={styles.heading2}>Asheville Shops</h2>
            <div className={styles.cardLayout}>
              {coffeeShops.map((shop) => {
                return (
                  <Card
                    key={shop.id}
                    shopName={shop.name}
                    imgUrl={shop.imgUrl}
                    route={`/coffee-shop/${shop.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
