import {
  aboutPageMock,
  pageMock,
  projectsPageMock,
  skillsPageMock,
} from '@/__mocks__/page';
import { projectMock } from '@/__mocks__/project';

// Mock the entire module

const getFullPage = jest.fn((name: string) => {
  return new Promise((resolve) => {
    let page;
    switch (name.toLowerCase()) {
      case 'skills':
        page = skillsPageMock;
        break;
      case 'about':
        page = aboutPageMock;
        break;
      case 'projects':
        page = projectsPageMock;
        break;
      default:
        page = pageMock('Home', [], []);
    }
    resolve(page);
  });
});

const getPage = jest.fn().mockImplementation(async (name: string) => {
  switch (name.toLowerCase()) {
    case 'skills':
      return skillsPageMock(false);
    case 'about':
      return aboutPageMock;
    case 'projects':
      return projectsPageMock;
    default:
      return pageMock('Home', [], []);
  }
});
const getLatestProjects = jest
  .fn()
  .mockImplementation(async () => projectsPageMock);
const getTopSkills = jest
  .fn()
  .mockImplementation(async () => skillsPageMock(true));

const getProjectTags = jest
  .fn()
  .mockImplementation(async () => ['Tag 1', 'Tag 2']);
const getProject = jest
  .fn()
  .mockImplementation(async () => projectMock('project1'));
const getFilteredProjects = jest
  .fn()
  .mockImplementation(async () => projectsPageMock);

module.exports = {
  getFullPage,
  getPage,
  getLatestProjects,
  getTopSkills,
  getProjectTags,
  getProject,
  getFilteredProjects,
};
