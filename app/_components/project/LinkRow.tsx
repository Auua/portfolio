import '@/app/_styles/project.css';

import { ProjectUrl } from '@prisma/client';
import React from 'react';
import Link from 'next/link';
import Icon from '@/app/_components/common/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Icons: Record<string, IconProp> = {
  github: ['fab', 'github'],
  other: ['fas', 'circle-question'],
  demo: ['fas', 'globe'],
};

const LinkRow = ({ url }: { url: ProjectUrl }) => (
  <div className={'row'}>
    {Object.entries(url).map(([key, value], index) => (
      <div key={index}>
        <Link
          key={index}
          href={value as string}
          className={'flex inline-flex text-sm items-center px-4 '}
        >
          <Icon icon={Icons[key]} className={'h-6 text-highlight pr-4'} />{' '}
          {key.toUpperCase()}
        </Link>
      </div>
    ))}
  </div>
);

export default LinkRow;
