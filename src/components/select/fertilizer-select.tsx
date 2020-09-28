import React, { useState } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Row } from '../general';
import { FeritilizerProp } from '../../types';

import { styles } from './styles';

export type FertilizerSelectProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  options: FeritilizerProp[] | null;
}

const FertilizerSelect: React.FC<FertilizerSelectProps> = ({ containerStyle, title, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  const renderOptions = ({ name, location }: FeritilizerProp) => {
    return (
      <TouchableOpacity onPress={() => console.log(name)}>
        <View style={[styles.option, styles.box]}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>{name}</Text>
          {location && <Text style={styles.optionText}>{location}</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.centeredView}>
      <TouchableOpacity onPress={() => setShowOptions(true)}>
        <View style={[styles.container, styles.box, containerStyle]}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={showOptions} transparent={true}>
        <View style={styles.modalView}>
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
