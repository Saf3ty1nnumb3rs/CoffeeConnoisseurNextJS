import cls from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/coffee-shop.module.css';
import { fetchCoffeeShops } from '@/library/coffee-shops';

interface CoffeeShopStaticContext {
  params: {
    id: string,
  }
}

interface CoffeeShopStaticProps {
  props: {
    coffeeShop?: CoffeeShopProps,
  }
}

export async function getStaticProps(staticContext: CoffeeShopStaticContext): Promise<CoffeeShopStaticProps> {
  const params = staticContext.params;
  const coffeeShops = await fetchCoffeeShops();
  return {
    props: {
      coffeeShop: coffeeShops.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id
      })
    }
  }
};

export async function getStaticPaths() {
  const coffeeShops = await fetchCoffeeShops();
  const paths = coffeeShops.map(coffeeStore => {
    return { params: { id: coffeeStore.id.toString() } };
  });
  return {
    paths,
    fallback: true, 
  };
};

const CoffeeStore = (props: CoffeeShopStaticProps['props']) => {
  const router = useRouter();

  const { coffeeShop } = props;
  if(router.isFallback) return <div>Loading...</div>;
  const handleUpvoteClick = () => {};
  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeShop?.name ?? ''}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">⬅ Back to List</Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{coffeeShop?.name ?? ''}</p>
          </div>
          <Image
            className={styles.storeImg}
            src={coffeeShop?.imgUrl ?? ''}
            alt={coffeeShop?.name ?? ''}
            width={600}
            height={360}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/location.svg" alt="location" width={24} height={24} />
            <p className={styles.text}>{coffeeShop?.address ?? ''}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/pushPin.svg" alt="pin" width={24} height={24} />
            <p className={styles.text}>{coffeeShop?.locality ?? ''}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" alt="stars" width={24} height={24} />
            <p className={styles.text}>11</p>
          </div>
          <button
            className={styles.upvoteButton}
            onClick={handleUpvoteClick}
          >
            Upvote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
