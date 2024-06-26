import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const Button = ({ label, variant, onPress }) => {
    if (variant === 'primary') {
        return (
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, {backgroundColor: 'dodgerblue'}]} onPress={onPress}>
                    <FontAwesome 
                        name='picture-o'
                        size={18}
                        color="#25292e"
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>
            </View>
        )
    }
  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
})

export default Button