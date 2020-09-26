import { OptionProp } from "../components";
import { db } from "./firebase-config";

export const GetLoadingPlaces = async () => {
  try {
    const data: OptionProp[] = [];

    const querySnapshot = await db.collection('loading').get();

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
