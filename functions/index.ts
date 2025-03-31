import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const startRaffle = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Требуется авторизация');
  }

  const db = admin.firestore();
  const rafflesRef = db.collection('raffles');
  const predictionsRef = db.collection('predictions');

  // Создаем новый розыгрыш
  const raffle = await rafflesRef.add({
    startDate: admin.firestore.FieldValue.serverTimestamp(),
    status: 'active',
    createdBy: context.auth.uid
  });

  return { raffleId: raffle.id };
});

export const endRaffle = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Требуется авторизация');
  }

  const { raffleId } = data;
  const db = admin.firestore();
  const raffleRef = db.collection('raffles').doc(raffleId);
  const raffle = await raffleRef.get();

  if (!raffle.exists) {
    throw new functions.https.HttpsError('not-found', 'Розыгрыш не найден');
  }

  if (raffle.data()?.status !== 'active') {
    throw new functions.https.HttpsError('failed-precondition', 'Розыгрыш уже завершен');
  }

  // Получаем всех участников
  const participants = await db.collection('raffle_participants')
    .where('raffleId', '==', raffleId)
    .get();

  if (participants.empty) {
    await raffleRef.update({
      status: 'completed',
      winner: null,
      endDate: admin.firestore.FieldValue.serverTimestamp()
    });
    return { message: 'Нет участников' };
  }

  // Выбираем случайного победителя
  const participantsArray = participants.docs.map(doc => doc.data());
  const winner = participantsArray[Math.floor(Math.random() * participantsArray.length)];

  // Обновляем статус розыгрыша
  await raffleRef.update({
    status: 'completed',
    winner: winner.userId,
    endDate: admin.firestore.FieldValue.serverTimestamp()
  });

  return { winner: winner.userId };
}); 