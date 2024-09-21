import { gameResult } from '../../../shared/model/gameResult';
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

export const gameResultConverter = {
  toFirestore: (gameResultToSave: gameResult) => {
    return {
      categoryID: gameResultToSave.categoryID,
      gameID: gameResultToSave.gameID,
      date: gameResultToSave.date,
      pointsNumber: gameResultToSave.pointsNumber,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);

    const gameResult_ = new gameResult(
      snapshot.id,
      data['categoryID'],
      data['gameID'],
      data['date'].toDate(),
      data['pointsNumber']
    );

    return gameResult_;
  },
};
