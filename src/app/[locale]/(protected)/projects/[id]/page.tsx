import Details from '@/app/[locale]/_components/projects/details/Details';
import Links from '@/app/[locale]/_components/projects/tags/Links';
import styles from '@/app/_styles/projects.module.css';
import { getProject } from '@/lib/projects';
import { Link } from '@/i18n';

const fetchData = (id: string) => getProject(id);

export default async function Project({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await fetchData(id);

  return (
    <main className={styles.main}>
      <article className={styles.article} id={'project'}>
        <h1>{data.title}</h1>
        <Links url={data.url} tags={data.tags} />
        {data.desc ? (
          <section className={styles.desc} id={'description'}>
            {data.desc}
          </section>
        ) : null}
        {data.specs ? <Details {...data.specs} /> : null}
        <Link className={'btn'} href={'/projects'}>
          Back to projects
        </Link>
      </article>
    </main>
  );
}
