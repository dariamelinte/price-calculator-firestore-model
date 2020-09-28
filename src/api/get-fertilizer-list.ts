import { FeritilizerProp } from "../types";
import { db } from "./firebase-config";


export const GetFertilizerList = async () => {
  try {
    const data: FeritilizerProp[] = [];

    const querySnapshot = await db.collection('fertilizer').orderBy('name', 'asc').get();

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data()} as FeritilizerProp)
    });

    return {
      isOk: true,
      data
    }
  } catch {
    return {
      isOk: false,
      data: null
    }
  }
};
