import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { usePermissions, saveToLibraryAsync } from 'expo-media-library'
import domToImage from 'dom-to-image'
import { captureRef } from 'react-native-view-shot'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const imageRef = useRef()

  const [status, requestPermission] = usePermissions()

  if (status === null) {
    requestPermission()
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('You did not select any image!')
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  const onAsyncSaveImage = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, { height: 400, quality: 1})
        await saveToLibraryAsync(localUri)
        if (localUri) {
          alert('Image saved successfully.')
        }
      } catch (error) {
        alert("Sorry, we could not save this image, please try again.")
      }
    } else {
      try {
        const dataUrl = await domToImage.toJpeg(imageRef.current, {
          height: 440,
          width: 320,
          quality: 0.95,
        })
  
        const link = document.createElement('a')
        link.download = Math.random() + '-sticker-mash-img.jpg'
        link.href = dataUrl
        link.click()
      } catch (error) {
        alert('An error occured!')
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer PlaceHolderImage={PlaceHolderImage} selectedImage={selectedImage} />
          { pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> }
        </View>
      </View>
      {
        showAppOptions ? (
          <View style={styles.showAppOptionsContainer}>
            <View style={styles.showAppOptions}>
              <IconButton icon={'refresh'} label={'Refresh'} onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon={'save-alt'} label={'Save'} onPress={onAsyncSaveImage} />
            </View>
          </View>
        ) : (
          <View style={styles.foodContainer}>
            <Button label={'Choose Photo'} variant={'primary'} onPress={pickImageAsync} />
            <Button label={'Use this photo'} onPress={() => setShowAppOptions(true)}/>
          </View>
        )
      }
      <EmojiPicker isVisible={isModalOpen} onClose={onCloseModal}>
        <EmojiList onCloseModal={onCloseModal} onSelect={setPickedEmoji} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  foodContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },

  showAppOptionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  showAppOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
