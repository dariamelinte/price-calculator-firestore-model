import { ShippingProp } from '../types';
import { db } from './firebase-config';

export const GetShippingPrice =  async (download: string, loading: string) => {
  try {
    const data: ShippingProp[] = [];

    const querySnapshot = await (
      db.collection('shipping-price')
        .where('download', '==', download)
        .where('loading', '==', loading)
        .get()
    );

    querySnapshot.forEach((doc) => {
      data.push(doc.data() as ShippingProp)
    });

    return {
      isOk: true,
      data: data[0].price
    }
  } catch {
    return {
      isOk: false,
      data: null
    }
  }
};
