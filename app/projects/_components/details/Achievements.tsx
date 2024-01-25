import Icon from '@/app/_components/common/icons/Icon';
import { ProjectArrayProps } from '@/app/_types/project';
import { mapValues } from '@/app/_utils/uiUtils';

const Achievements = ({ title, data }: ProjectArrayProps) => (
  <section className={'section--half'} id={'achievements'}>
    <h2 className={'title'}>
      <Icon icon={['fas', 'award']} /> {title}
    </h2>
    <div className={'content'}>{mapValues(title, data)}</div>
  </section>
);

export default Achievements;
