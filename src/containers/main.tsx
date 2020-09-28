import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { GetDownloadPlaces, GetFertilizerList, GetLoadingPlaces } from '../api';

import { Select, Row, FertilizerSelect } from '../components';
import { normalizeHeight } from '../theme/metrics';
import { FeritilizerProp, OptionProp } from '../types';

const Main: React.FC = () => {
  const [fertilizerList, setFertilizerList] = useState<FeritilizerProp[] | null>([]);
  const [loadingPlaces, setLoadingPlaces] = useState<OptionProp[] | null>([]);
  const [downloadPlaces, setDownloadPlaces] = useState<OptionProp[] | null>([]);
  const [payment, setPayment] = useState<'cash' | 'finance'>('cash');

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

  return (
    <ScrollView>

      <FertilizerSelect title={'Tip ingrasamant'} options={fertilizerList} />
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
      <Select title={'Loc incarcare'} options={loadingPlaces} />
      <Select title={'Loc descarcare'} options={downloadPlaces} />
      <Row>
        <Text>Submit</Text>
        <Text>Pret total</Text>
      </Row>

    </ScrollView>
  );
}

export { Main };
