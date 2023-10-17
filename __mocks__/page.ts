import { Project, Section } from '@prisma/client';
import { sectionMock } from '@/__mocks__/section';
import { skillMock } from '@/__mocks__/skill';
import { projectMock } from '@/__mocks__/project';
import {
  timelineEducationMock,
  timelineMock,
  timelineWorkMock,
} from '@/__mocks__/timeline';

export const pageHeroMock = {
  content: 'Lorem ipsum content',
  title: 'Page Title',
};

export const pageMetaDataMock = {
  keywords: 'keyword1, keyword2, keyword3',
  pageItems: [
    {
      auth: true,
      icon: ['far', 'icon1'],
      order: 1,
      slug: 'page-item-1',
      title: 'Page Item 1',
    },
    {
      auth: false,
      icon: ['far', 'icon2'],
      order: 2,
      slug: 'page-item-2',
      title: 'Page Item 2',
    },
    {
      auth: true,
      icon: ['far', 'icon3'],
      order: 3,
      slug: 'page-item-3',
      title: 'Page Item 3',
    },
    {
      auth: false,
      icon: ['far', 'icon4'],
      order: 4,
      slug: 'page-item-4',
      title: 'Page Item 4',
    },
  ],
};

export const pageMock = (
  title: string,
  projects: Project[],
  sections: Section[],
) => ({
  id: `title-${title}`,
  createdAt: new Date('2023-01-15T10:30:00Z'),
  desc: `This is a description of the page of ${title}.`,
  excerpt: `A short summary of the page: ${title}.`,
  label: title,
  metadata: pageMetaDataMock,
  title: title,
  updatedAt: '2023-04-20T14:45:00Z',
  projects: projects,
  sections: sections,
});

export const skillsPageMock = (top: boolean) =>
  pageMock(
    'Skills',
    [],
    [
      sectionMock(
        'skills',
        1,
        [
          skillMock('skill1', true, 'Proficient'),
          skillMock('skill2', true, 'Expert'),
        ],
        [],
        [],
      ),
      sectionMock(
        'tools',
        2,
        [
          skillMock('tool2', true, 'Proficient'),
          ...(top
            ? []
            : [
                skillMock('tool1', false, 'Novice'),
                skillMock('tool3', false, 'Competent'),
              ]),
        ],
        [],
        [],
      ),
    ],
  );

export const projectsPageMock = pageMock(
  'Projects',
  [projectMock('project1'), projectMock('project2')],
  [],
);

export const aboutPageMock = pageMock(
  'About',
  [],
  [
    sectionMock('about', 1, [], [], []),
    sectionMock(
      'work',
      2,
      [],
      [
        timelineMock(
          'location1',
          null,
          'work1',
          new Date('2023-01-15T10:30:00Z'),
          'worksub1',
          timelineWorkMock,
        ),
        timelineMock(
          'location2',
          new Date('2022-01-15T10:30:00Z'),
          'work2',
          new Date('2020-01-15T10:30:00Z'),
          'worksub2',
          timelineWorkMock,
        ),
      ],
      [],
    ),
    sectionMock(
      'education',
      3,
      [],
      [
        timelineMock(
          'location1',
          null,
          'title1',
          new Date('2023-01-15T10:30:00Z'),
          'sub1',
          timelineEducationMock,
        ),
        timelineMock(
          'location2',
          new Date('2022-01-15T10:30:00Z'),
          'title2',
          new Date('2020-01-15T10:30:00Z'),
          'sub2',
          timelineEducationMock,
        ),
      ],
      [],
    ),
    sectionMock(
      'others',
      4,
      [],
      [],
      [
        {
          id: 'other-2',
          type: 'Award',
          title: 'Award',
          desc: 'Award description',
          date: new Date('2022-01-15T10:30:00Z'),
          sectionId: 'section-others',
          excerpt: 'Award excerpt',
          note: null,
          validity: null,
        },
        {
          id: 'other-1',
          type: 'Other',
          title: 'Other',
          desc: 'Other description',
          date: new Date('2020-01-15T10:30:00Z'),
          validity: new Date('2022-01-15T10:30:00Z'),
          sectionId: 'section-others',
          excerpt: 'Other excerpt',
          note: 'Other note',
        },
        {
          id: 'other-3',
          type: 'Other',
          title: 'Other 2',
          desc: 'Other 2 description',
          date: new Date('2021-01-15T10:30:00Z'),
          validity: null,
          sectionId: 'section-others',
          excerpt: null,
          note: null,
        },
      ],
    ),
  ],
);
