import React from 'react';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);
library.add(far);

type IconProps = {
  icon: IconProp;
  className?: string;
  style?: React.CSSProperties;
};

const Icon = ({ icon, className, style }: IconProps) => (
  <FontAwesomeIcon icon={icon} className={className} style={style}/>
);
export default Icon;
