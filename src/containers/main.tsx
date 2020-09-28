import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Select, Row, FertilizerSelect } from '../components';
import { useApiDataContex } from '../context';
import { normalizeHeight } from '../theme/metrics';
import { FeritilizerProp, OptionProp } from '../types';

const Main: React.FC = () => {
  const [payment, setPayment] = useState<'cash' | 'finance'>('cash');
  const [fertilizer, setFertilizer] = useState<FeritilizerProp | null>(null);
  const [loadingPlace, setLoadingPlace] = useState<OptionProp | null>(null);
  const [downloadPlace, setDownloadPlace] = useState<OptionProp | null>(null);

  const { fertilizerList, loadingPlaces, downloadPlaces } = useApiDataContex();

  console.log(fertilizer, loadingPlace, downloadPlace);

  return (
    <ScrollView>

      <FertilizerSelect
        title={fertilizer ? fertilizer.name : 'Tip ingrasamant'}
        options={fertilizerList}
        onPressFertilizer={fertilizer => setFertilizer(fertilizer)}
        modalTitle={'Tip ingrasamant'}
      />
      <Row style={{ justifyContent: 'space-between', marginTop: normalizeHeight(20) }}>
        <Button
          mode={payment === 'cash' ? 'contained' : 'outlined'}
          onPress={() => setPayment('cash')}
        >
          Cash
        </Button>
        <Button
          mode={payment === 'finance' ? 'contained' : 'outlined'}
          onPress={() => setPayment('finance')}
        >
          Finantare
        </Button>
      </Row>
      <Select
        title={loadingPlace ? loadingPlace.label : 'Loc incarcare'}
        options={loadingPlaces}
        onPressOption={(option) => setLoadingPlace(option)}
        modalTitle={'Loc incarcare'}
      />
      <Select
        title={downloadPlace ? downloadPlace.label : 'Loc descarcare'}
        options={downloadPlaces}
        onPressOption={(option) => setDownloadPlace(option)}
        modalTitle={'Loc descarcare'}
      />
      <Row>
        <Text>Submit</Text>
        <Text>Pret total</Text>
      </Row>

    </ScrollView>
  );
}

export { Main };
