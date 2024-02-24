import styles from '@/app/_styles/skill.module.css';
import { Level, levels } from '@/app/_types/data';

const LevelExplanation = (
  levelTranslation: Record<Level, { title: string; description: string[] }>,
) => {
  return (
    <table id={'levels-table'} className={styles.table}>
      <thead>
        <tr>
          {levels.map((level) => (
            <th key={`header-${level}`}>{levelTranslation[level].title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {levels.map((level) => (
            <td key={`body-${level}`}>
              <ul>
                {levelTranslation[level].description.map((item, index) => (
                  <li key={`desc-${level}-${index}`}>{item}</li>
                ))}
              </ul>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default LevelExplanation;
