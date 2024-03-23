export const skillMock = (title: string, top: boolean, level: string) => ({
  id: `skill-${title}`,
  level: level,
  svg: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"/>',
  title: title,
  top: top,
  sectionId: 'section',
});
