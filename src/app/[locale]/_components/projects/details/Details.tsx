import styles from '@/app/_styles/projects.module.css';

import { ProjectSpecs } from '@prisma/client';
import Achievements from './Achievements';
import TechnicalApproach from './TechnicalApproach';
import UserBenefits from './UserBenefits';

const Details = (specs: ProjectSpecs) => {
  return (
    <section className={styles.section} id={'specifics'}>
      {specs.Technical_Approach ? (
        <TechnicalApproach
          title={'Technical Approach'}
          data={specs.Technical_Approach}
        />
      ) : null}
      {specs.User_Benefits ? (
        <UserBenefits title={'User Benefits'} data={specs.User_Benefits} />
      ) : null}
      {specs.Achievements && specs.Achievements.length > 0 ? (
        <Achievements title={'Achievements'} data={specs.Achievements} />
      ) : null}
    </section>
  );
};
export default Details;
