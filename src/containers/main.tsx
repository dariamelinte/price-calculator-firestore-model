import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { GetLoadingPlaces } from '../api';

import { OptionProp, Select } from '../components';
import { Row } from '../components/general';

const Main: React.FC = () => {
  const [loadingPlaces, setLoadingPlaces] = useState<OptionProp[] | null>(null);

  useEffect(() => {
    const fetchLoadingPlaces = async () => {
      const { data, isOk } = await GetLoadingPlaces();

      if (isOk) {
        setLoadingPlaces(data);
      }
    }

    fetchLoadingPlaces();
  }, []);

  console.log(loadingPlaces);

  return (
    <ScrollView>

      <Select title={'Tip ingrasamant'} options={[{ value: '1', label: 'hello' }]} />
      <Select title={'Cash / Finantare'} options={[]} />
      <Select title={'Loc incarcare'} options={loadingPlaces} />
      <Select title={'Loc descarcare'} options={[]} />
      <Select title={'Tip ingrasamant'} options={[]} />
      <Row>
        <Text>Submit</Text>
        <Text>Pret total</Text>
      </Row>

    </ScrollView>
  );
}

export { Main };
