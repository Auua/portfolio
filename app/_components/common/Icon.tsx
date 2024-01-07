import React from 'react';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faAward,
  faBook,
  faCircleInfo,
  faCircleQuestion,
  faCode,
  faGears,
  faGlobe,
  faGraduationCap,
  faHammer,
  faHouse,
  faLaptopCode,
  faLocation,
  faMagnifyingGlass,
  faSuitcase,
  faTriangleExclamation,
  faUser,
  faUserNinja,
  faUsersViewfinder,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faFolderOpen,
  faMoon,
  faSun,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faLaptopCode,
  faCode,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faMoon,
  faSun,
  faUsersViewfinder,
  faAward,
  faTriangleExclamation,
  faMagnifyingGlass,
  faLocation,
  faSuitcase,
  faGraduationCap,
  faGlobe,
  faGithub,
  faCircleQuestion,
  faUserNinja,
  faHouse,
  faUser,
  faBook,
  faFolderOpen,
  faEnvelope,
  faHammer,
  faCircleInfo,
  faGears,
);

type IconProps = {
  icon: IconProp;
  className?: string;
  style?: React.CSSProperties;
};

const Icon = ({ icon, className, style }: IconProps) => (
  <FontAwesomeIcon fixedWidth icon={icon} className={className} style={style} />
);
export default Icon;
