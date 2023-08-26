import cls from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css';

interface CardProps {
  imgUrl: string;
  route: string;
  shopName: string;
}

const Card = ({
  imgUrl,
  route,
  shopName,
}: CardProps) => {
  return (
    <Link href={route} className={cls(styles.card, styles.cardLink)}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{shopName}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            alt="coffee shop image"
            width="260"
            height="160"
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
