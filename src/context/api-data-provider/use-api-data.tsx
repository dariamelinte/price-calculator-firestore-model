import { useContext } from 'react';

import { ApiDataContext } from './api-data-provider';

const useApiDataContex = () => {
  const context = useContext(ApiDataContext);

  if (context === undefined) {
    throw new Error(`useApiDataContex must be used within a ApiDataProvider`);
  }

  return context;
};

export { useApiDataContex };
