import React from 'react'
import { Image, StyleSheet } from 'react-native'

const ImageViewer = ({ PlaceHolderImage, selectedImage }) => {
    const ImageSource = selectedImage ? { uri: selectedImage } : PlaceHolderImage
  return (
    <Image source={ImageSource} style={styles.image} />
  )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 24,
    }
})
export default ImageViewer