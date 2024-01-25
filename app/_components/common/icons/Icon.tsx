import '@/app/_components/common/icons/FontAwesomeConfig';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IconProps = {
  icon: IconProp;
  className?: string;
  style?: React.CSSProperties;
};

const Icon = ({ icon, className, style }: IconProps) => (
  <FontAwesomeIcon fixedWidth icon={icon} className={className} style={style} />
);
export default Icon;
