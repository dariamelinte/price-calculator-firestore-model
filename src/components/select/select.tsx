import React, { useState } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Row } from '../general';
import { OptionProp } from '../../types';

import { styles } from './styles';

export type SelectProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  options: OptionProp[] | null;
}

const Select: React.FC<SelectProps> = ({ containerStyle, title, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  const renderOptions = ({ value, label }: OptionProp) => {
    return (
      <TouchableOpacity onPress={() => console.log(value)}>
        <Row style={[styles.option, styles.box]}>
          <Text style={styles.optionText}>{label}</Text>
        </Row>
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
            keyExtractor={({ value }) => value}
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

export { Select };
