import { TimelineExtra } from '@prisma/client';

export const timelineWorkMock: TimelineExtra = {
  gpa: null,
  major: null,
  minor: null,
  thesis: null,
  main: ['Main point 1', 'Main point 2'],
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
};

export const timelineEducationMock: TimelineExtra = {
  main: [],
  skills: [],
  gpa: '3.5',
  major: 'Electrical Engineering',
  minor: 'Physics',
  thesis: 'Research Thesis',
};

export const timelineMock = (
  location: string,
  end: Date | null,
  title: string,
  start: Date,
  sub: string,
  extra: TimelineExtra,
) => ({
  id: `timeline-${title}`,
  end: end,
  extra: extra,
  location: location,
  main: title,
  start: start,
  sub: sub,
  sectionId: `section-${title}`,
});
