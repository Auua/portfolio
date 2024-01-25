import Icon from '@/app/_components/common/icons/Icon';
import { ProjectJsonProps } from '@/app/_types/project';
import { removeUnderscore } from '@/app/_utils/stringUtils';

const UserBenefits = ({ title, data }: ProjectJsonProps) => (
  <section className={'section--half'} id={title}>
    <h2 className={'title'}>
      <Icon icon={['fas', 'users-viewfinder']} /> {removeUnderscore(title)}
    </h2>
    {Object.entries(data as Record<string, string>).map(([key, value]) => (
      <div key={key} className={'benefit'}>
        <h3 className={'title'}>{key}</h3>
        <div>{value}</div>
      </div>
    ))}
  </section>
);

export default UserBenefits;
