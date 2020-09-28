import React, { createContext, useEffect, useState } from 'react';

import { GetDownloadPlaces, GetFertilizerList, GetLoadingPlaces, GetShippingPrice } from '../../api';
import { Notification } from '../../components';
import { NotificationLength } from '../../lib';
import { FeritilizerProp, OptionProp, PriceCalculatorType } from '../../types';

export type ApiDataContextValues = {
  fertilizerList: FeritilizerProp[] | null;
  loadingPlaces: OptionProp[] | null;
  downloadPlaces: OptionProp[] | null;
  isLoading: boolean;
  price: number | null;
  handlers: {
    calculatePrice: (data: PriceCalculatorType) => void
  }
};

const INITIAL_VALUES: ApiDataContextValues = {
  fertilizerList: [],
  loadingPlaces: [],
  downloadPlaces: [],
  isLoading: false,
  price: null,
  handlers: {
    calculatePrice: () => {}
  }
};

const ApiDataContext = createContext<ApiDataContextValues>(INITIAL_VALUES);

const ApiDataProvider: React.FC = (props) => {
  const [fertilizerList, setFertilizerList] = useState<FeritilizerProp[] | null>([]);
  const [loadingPlaces, setLoadingPlaces] = useState<OptionProp[] | null>([]);
  const [downloadPlaces, setDownloadPlaces] = useState<OptionProp[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchFertilizerList = async () => {
      const { data, isOk } = await GetFertilizerList();

      if (isOk) {
        setFertilizerList(data);
      }
    }

    fetchFertilizerList();
  }, []);

  useEffect(() => {
    const fetchLoadingPlaces = async () => {
      const { data, isOk } = await GetLoadingPlaces();

      if (isOk) {
        setLoadingPlaces(data);
      }
    }

    fetchLoadingPlaces();
  }, []);

  useEffect(() => {
    const fetchDownloadPlaces = async () => {
      const { data, isOk } = await GetDownloadPlaces();

      if (isOk) {
        setDownloadPlaces(data);
      }
    }

    fetchDownloadPlaces();
  }, []);

  const calculatePrice = async (priceData: PriceCalculatorType) => {
    const { downloadPlace, loadingPlace, paymentType, fertilizer } = priceData;
    setIsLoading(true);

    const { data, isOk } = await GetShippingPrice(downloadPlace, loadingPlace);

    if (isOk && data) {
      const fertilizerPrice = fertilizer[paymentType];
      const shippingPrice = data + (19 * data) / 100;
      const priceWithoutTaxes = fertilizerPrice + shippingPrice;
      const priceWithTaxes = priceWithoutTaxes + (9 * priceWithoutTaxes) / 100;

      setPrice(Number(priceWithTaxes.toFixed(2)));
    } else {
      Notification.show('Nu am putut calcula pretul', NotificationLength.SHORT);
    }

    setIsLoading(false);
  }

  const contextValues: ApiDataContextValues = {
    fertilizerList,
    loadingPlaces,
    downloadPlaces,
    isLoading,
    price,
    handlers: {
      calculatePrice
    }
  };

  return (
    <ApiDataContext.Provider value={contextValues}>
      {props.children}
    </ApiDataContext.Provider>
  );
};

export { ApiDataContext, ApiDataProvider };
