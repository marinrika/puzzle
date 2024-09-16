import { WordCollectionLevel } from '../../interfaces/interfaces.ts';
import wordCollectionLevel1 from './wordCollectionLevel1.ts';
import wordCollectionLevel2 from './wordCollectionLevel2.ts';
import wordCollectionLevel3 from './wordCollectionLevel3.ts';
import wordCollectionLevel4 from './wordCollectionLevel4.ts';
import wordCollectionLevel5 from './wordCollectionLevel5.ts';
import wordCollectionLevel6 from './wordCollectionLevel6.ts';

export default function levelSelection(level: number): WordCollectionLevel {
  switch (level) {
    case 1:
      return wordCollectionLevel1;
    case 2:
      return wordCollectionLevel2;
    case 3:
      return wordCollectionLevel3;
    case 4:
      return wordCollectionLevel4;
    case 5:
      return wordCollectionLevel5;
    default:
      return wordCollectionLevel6;
  }
}
