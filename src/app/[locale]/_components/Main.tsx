import styles from '../page.module.css';

type ListItem = {
  marker: string;
  title: string;
  description: string;
};

export default function Main({
  header,
  list,
}: {
  header: string;
  list: ListItem[];
}) {
  return (
    <section className={`${styles.first} ${styles.about}`}>
      <h1 id={'main'}>{header}</h1>
      <div className={styles.description}>
        <ul className={styles.aboutList}>
          {list.map(
            ({ marker, title, description }: ListItem, index: number) => (
              <li key={`content-${index}`}>
                <span className={styles.marker} aria-hidden={true}>
                  {marker}
                </span>
                <span>
                  <b>{title}</b>: {description}
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
