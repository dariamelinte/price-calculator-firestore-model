import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Select, Row, FertilizerSelect, Notification } from '../components';
import { useApiDataContex } from '../context';
import { NotificationLength } from '../lib';
import { normalizeHeight } from '../theme/metrics';
import { FeritilizerProp, OptionProp, PriceCalculatorType } from '../types';

const Main: React.FC = () => {
  const [payment, setPayment] = useState<'cash' | 'finance'>('cash');
  const [fertilizer, setFertilizer] = useState<FeritilizerProp | null>(null);
  const [loadingPlace, setLoadingPlace] = useState<OptionProp | null>(null);
  const [downloadPlace, setDownloadPlace] = useState<OptionProp | null>(null);

  const { fertilizerList, loadingPlaces, downloadPlaces, isLoading, price, handlers } = useApiDataContex();

  const onShowPrice = () => {
    if (!fertilizer || !loadingPlace || !downloadPlace) {
      return Notification.show('Completati toate campurile', NotificationLength.SHORT)
    }

    const priceData: PriceCalculatorType = {
      fertilizer,
      paymentType: payment,
      downloadPlace: downloadPlace.value,
      loadingPlace: loadingPlace.value
    }

    handlers.calculatePrice(priceData);
  }

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
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Button onPress={onShowPrice} loading={isLoading}>Calculeaza</Button>
        {price && <Text style={{ padding: normalizeHeight(10) }}>{price}</Text>}
      </Row>

    </ScrollView>
  );
}

export { Main };
