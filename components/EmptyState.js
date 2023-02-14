import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, sizes, fontWeights } from '../lib/styles'

export default function EmptyState({
  image,
  title,
  message,
  actionLabel,
  onAction
}) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => onAction()}
      >
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 200,
    marginBottom: 10
  },
  title: {
    fontSize: sizes.xl,
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: 0
  },
  message: {
    marginTop: 0,
    fontSize: sizes.md,
    color: colors.neutral,
    marginBottom: 14
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 16
  },
  buttonText: {
    color: colors.white,
    fontSize: sizes.md,
    fontWeight: fontWeights.bold
  }
})
