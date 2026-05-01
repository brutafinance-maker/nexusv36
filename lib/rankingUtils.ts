
import { doc, updateDoc, collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { UserStats } from "../types";

export const POINT_VALUES = {
  PBL_MODULE: 50,
  CORRECT_QUESTION: 2,
  WATCHED_LESSON: 5
};

export function calculateUserPoints(stats: Partial<UserStats>): number {
  const pblPoints = (stats.completedPblModules?.length || 0) * POINT_VALUES.PBL_MODULE;
  const questionPoints = (stats.totalCorrect || 0) * POINT_VALUES.CORRECT_QUESTION;
  const videoPoints = (stats.watchedLessons?.length || 0) * POINT_VALUES.WATCHED_LESSON;
  
  return pblPoints + questionPoints + videoPoints;
}

export async function syncUserPoints(userId: string, stats: Partial<UserStats>) {
  const newPoints = calculateUserPoints(stats);
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { points: newPoints });
  return newPoints;
}

export async function recalculateAllRankings() {
  const usersCol = collection(db, "users");
  const snapshot = await getDocs(usersCol);
  const batch = writeBatch(db);
  
  snapshot.docs.forEach((userDoc) => {
    const data = userDoc.data() as UserStats;
    const newPoints = calculateUserPoints(data);
    batch.update(userDoc.ref, { points: newPoints });
  });
  
  await batch.commit();
}
