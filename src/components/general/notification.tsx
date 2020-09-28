import React, { Component } from 'react'
import { StyleSheet, View, Animated, Text } from 'react-native'

import { NotificationLength } from '../../lib/enums'
import { Ionicons } from '@expo/vector-icons'
import Metrics, { normalizeHeight, normalizeWidth } from '../../theme/metrics'

export const DURATION = {
  LENGTH_SHORT: 1200,
  FOREVER: 0,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: Metrics.paddingHorizontal,
    width: normalizeWidth(320) - Metrics.paddingHorizontal,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'tomato',
    bottom: normalizeHeight(25),
    shadowColor: '#00000033',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: normalizeHeight(5),
    zIndex: 10,
    borderRadius: normalizeHeight(10)
  },
  message: {
    flex: 1,
    marginHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(10),
    color: 'white'
  },
  icon: {
    height: Metrics.icons.tiny,
    marginHorizontal: normalizeWidth(12),
    color: 'white'
  },
})

let ref: any = null

export class Notification extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      isShown: false,
      text: '',
    }
  }

  static setRef = (toast: any) => {
    if (ref === null) {
      ref = toast
    }
  }

  static show(text: string, duration: number) {
    ref.show(text, duration)
  }

  static close() {
    ref.close()
  }

  componentWillMount() {
    // @ts-ignore
    this.opacityValue = new Animated.Value(0)
  }

  show(text: string, duration = NotificationLength.SHORT) {
    // @ts-ignore
    this.delay && clearTimeout(this.delay)
    this.setState({
      isShown: true,
      text,
    })
    // @ts-ignore
    Animated.timing(this.opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(isFinished => {
      if (isFinished) {
        if (duration !== NotificationLength.FOREVER) {
          // @ts-ignore
          this.delay = setTimeout(() => {
            this.close()
          }, duration)
        }
      }
    })
  }
  close() {
    // @ts-ignore
    Animated.timing(this.opacityValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(isFinished => {
      if (isFinished) {
        this.setState({
          isShown: false,
        })
      }
    })
  }
  onPressCancel = () => {
    // @ts-ignore
    this.delay && clearTimeout(this.delay)
    this.setState({
      isShown: false,
    })
  }
  render() {
    // @ts-ignore
    const { text } = this.state
    // @ts-ignore
    const elevation = this.opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5],
    })
    // @ts-ignore
    return this.state.isShown ? (
      <Animated.View
        style={[
          styles.container,
          // @ts-ignore
          { opacity: this.opacityValue, shadowOpacity: this.opacityValue, elevation },
        ]}
      >
        <Text style={styles.message}>{text}</Text>
        <Ionicons name="md-close" style={styles.icon} size={16} onPress={this.onPressCancel} />
      </Animated.View>
    ) : null
  }
}
