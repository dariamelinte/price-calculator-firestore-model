import { StyleSheet } from "react-native";
import Metrics, { normalizeHeight, normalizeWidth } from "../../theme/metrics";

const { input } = Metrics.forms;

export const styles = StyleSheet.create({
  box: {
    minHeight: input.height,
    width: normalizeWidth(240),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalizeWidth(4)
  },
  container: {
    backgroundColor: '#f2f2f2',
    marginVertical: normalizeHeight(10),
  },
  textStyle: {
    margin: 0,
    textAlignVertical: 'center',
    flex: 1,
    padding: 0,
    color: 'black',
  },
  option: {
    backgroundColor: '#f7f7f7',
    marginVertical: normalizeHeight(5),
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
  },
  optionText: {
    width: '100%',
    padding: normalizeHeight(15)
  }
})