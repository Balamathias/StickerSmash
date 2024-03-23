import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'

const CircleButton = ({ onPress }) => {
  return (
    <View style={styles.circleButtonContainer}>
        <Pressable style={styles.circleButton} onPress={onPress}>
            <MaterialIcon 
              name='add'
              size={38}
              color={'dodgerblue'}
            />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 14,
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 42,
    borderColor: 'dodgerblue',
  }
})

export default CircleButton