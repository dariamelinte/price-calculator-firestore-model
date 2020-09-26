import React, { useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Row } from '../general';
import Metrics, { normalizeHeight, normalizeWidth } from '../../theme/metrics';

export type OptionProp = {
  value: any;
  label: string;
}

export type SelectProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  options: OptionProp[] | null;
}

const { input } = Metrics.forms

const styles = StyleSheet.create({
  container: {
    height: input.height,
    width: normalizeWidth(240),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    marginVertical: normalizeHeight(10),
    borderRadius: normalizeWidth(4)
  },
  textStyle: {
    margin: 0,
    textAlignVertical: 'center',
    flex: 1,
    padding: 0,
    color: 'black',
  },
  option: {
    height: input.height,
    width: normalizeWidth(240),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: normalizeWidth(4),
    marginVertical: normalizeHeight(5)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    flex: 1
  },
  closeBtn: {
    marginTop: Metrics.marginVertical
  }
})

const Select: React.FC<SelectProps> = ({ containerStyle, title, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  const renderOptions = ({ value, label }: OptionProp) => {
    return (
      <TouchableOpacity onPress={() => console.log(value)}>
        <Row style={styles.option}>
          <Text>{label}</Text>
        </Row>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.centeredView}>
      <TouchableOpacity onPress={() => setShowOptions(true)}>
        <Row style={[styles.container, containerStyle]}>
          <Text>{title}</Text>
        </Row>
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
