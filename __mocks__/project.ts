import { Picture } from '.prisma/client';
import { ProjectSpecs, ProjectUrl } from '@prisma/client';

export const projectSpecsMock = {
  Achievements: ['Achievement 1', 'Achievement 2'],
  Technical_Approach: {
    key1: 'value1',
    key2: 'value2',
  },
  User_Benefits: {
    benefit1: 'Benefit description 1',
    benefit2: 'Benefit description 2',
  },
};

export const projectUrlMock = {
  demo: 'https://example.com/demo',
  github: 'https://github.com/user/repo',
};

export const pictureMock = (title: string) => ({
  src: `image${title}.jpg`,
  alt: `Alt for image${title}`,
});

export const projectMock = (title: string) => ({
  id: `project-${title}`,
  createdAt: new Date('2023-03-20T09:45:00Z'),
  desc: `This is a description of ${title}.`,
  excerpt: `A short summary of ${title}.`,
  title: title,
  updatedAt: '2023-04-20T14:45:00Z',
  pageId: '1',
  specs: projectSpecsMock as ProjectSpecs,
  tags: ['Tag 1', 'Tag 2'],
  url: projectUrlMock as ProjectUrl,
  pics: [pictureMock(title) as Picture],
});
