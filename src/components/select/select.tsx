import React, { useState } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

import { Row } from '../general';
import { OptionProp } from '../../types';

import { styles } from './styles';

export type SelectProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  options: OptionProp[] | null;
  onPressOption: (option: OptionProp) => void;
  modalTitle: string;
}

const Select: React.FC<SelectProps> = ({
  containerStyle,
  title,
  options,
  onPressOption,
  modalTitle
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const onSelect = (option: OptionProp) => {
    onPressOption(option);
    setShowOptions(false);
  }

  const renderOptions = (option: OptionProp) => (
      <TouchableOpacity onPress={() => onSelect(option)}>
        <Row style={[styles.option, styles.box]}>
          <Text style={styles.optionText}>{option.label}</Text>
        </Row>
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
