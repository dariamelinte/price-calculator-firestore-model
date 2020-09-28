
import { OptionProp } from "../types";
import { db } from "./firebase-config";

export const GetDownloadPlaces = async () => {
  try {
    const data: OptionProp[] = [];

    const querySnapshot = await db.collection('download').get();

    querySnapshot.forEach((doc) => {
      data.push(doc.data() as OptionProp)
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
