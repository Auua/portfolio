import styles from '@/app/projects/page.module.css';
import { ProjectSpecs } from '@prisma/client';
import Achievements from './details/Achievements';
import TechnicalApproach from './details/TechnicalApproach';
import UserBenefits from './details/UserBenefits';

const ProjectSpecsSection = (specs: ProjectSpecs) => {
  return (
    <section className={styles.section} id={'specifics'}>
      {specs.Technical_Approach ? (
        <TechnicalApproach
          title={'Technical_Approach'}
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
export default ProjectSpecsSection;
