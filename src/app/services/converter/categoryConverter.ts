import { Language } from '../../../shared/model/language';
import { Category } from './../../../shared/model/category';
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

export const categoryConverter = {
  toFirestore: (categoryToSave: Category) => {
    const wordsArray = [];
    for (let i = 0; i < categoryToSave.words.length; ++i) {
      wordsArray.push({
        origin: categoryToSave.words[i].origin,
        target: categoryToSave.words[i].target,
      });
    }
    return {
      name: categoryToSave.name,
      originLanguage: categoryToSave.origin,
      targetLanguage: categoryToSave.target,
      words: wordsArray,
      lastUpdate: categoryToSave.lastUpdateDate,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);

    let originLang: Language = Language.English;
    let targetLang: Language = Language.English;

    if (Language['Hebrew'] === data['originLanguage']) {
      originLang = Language.Hebrew;
    }
    if (Language['Hebrew'] === data['targetLanguage']) {
      targetLang = Language.Hebrew;
    }

    const category = new Category(
      snapshot.id,
      data['name'],
      originLang,
      targetLang
    );

    category.lastUpdateDate = data['lastUpdate'].toDate();
    category.words = data['words'];
    return category;
  },
};
