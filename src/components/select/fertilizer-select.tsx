import React, { useState } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

import { FeritilizerProp } from '../../types';

import { styles } from './styles';

export type FertilizerSelectProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  options: FeritilizerProp[] | null;
  onPressFertilizer: (fertilizer: FeritilizerProp) => void;
  modalTitle: string;
}

const FertilizerSelect: React.FC<FertilizerSelectProps> = ({
  containerStyle,
  title,
  options,
  onPressFertilizer,
  modalTitle
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const onSelect = (fertilizer: FeritilizerProp) => {
    onPressFertilizer(fertilizer);
    setShowOptions(false);
  };

  const renderOptions = (fertilizer: FeritilizerProp) => (
      <TouchableOpacity onPress={() => onSelect(fertilizer)}>
        <View style={[styles.option, styles.box]}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>
            {fertilizer.name}
          </Text>
          {fertilizer.location && <Text style={styles.optionText}>{fertilizer.location}</Text>}
        </View>
      </TouchableOpacity>
    );

  return (
    <View style={styles.centeredView}>
      <TouchableOpacity onPress={() => setShowOptions(true)}>
        <View style={[styles.container, styles.box, containerStyle]}>
          <Text style={styles.optionText}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={showOptions} transparent={true}>
        <View style={styles.modalView}>
          <Title>{modalTitle}</Title>
          <FlatList
            bounces={false}
            keyExtractor={({ id }) => id}
            data={options || []}
            renderItem={({ item }) => renderOptions(item)}
          />
          <Button
            mode="contained"
            onPress={() => setShowOptions(false)}
            style={styles.closeBtn}
          >
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export { FertilizerSelect };
