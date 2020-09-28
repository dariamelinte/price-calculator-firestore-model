import React, { createContext, useEffect, useState } from 'react';
import { GetDownloadPlaces, GetFertilizerList, GetLoadingPlaces } from '../../api';
import { FeritilizerProp, OptionProp } from '../../types';

export type ApiDataContextValues = {
  fertilizerList: FeritilizerProp[] | null;
  loadingPlaces: OptionProp[] | null;
  downloadPlaces: OptionProp[] | null;
};

const INITIAL_VALUES: ApiDataContextValues = {
  fertilizerList: [],
  loadingPlaces: [],
  downloadPlaces: []
};

const ApiDataContext = createContext<ApiDataContextValues>(INITIAL_VALUES);

const ApiDataProvider: React.FC = (props) => {
  const [fertilizerList, setFertilizerList] = useState<FeritilizerProp[] | null>([]);
  const [loadingPlaces, setLoadingPlaces] = useState<OptionProp[] | null>([]);
  const [downloadPlaces, setDownloadPlaces] = useState<OptionProp[] | null>([]);

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


  const contextValues: ApiDataContextValues = {
    fertilizerList,
    loadingPlaces,
    downloadPlaces
  };

  return (
    <ApiDataContext.Provider value={contextValues}>
      {props.children}
    </ApiDataContext.Provider>
  );
};

export { ApiDataContext, ApiDataProvider };
