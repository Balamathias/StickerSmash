import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const IconButton = ({ label, icon, onPress }) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
        <MaterialIcons 
            name={icon}
            size={24}
            color={'#fff'}
        />
        <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    label: {
        color: '#fff',
    }
})

export default IconButton