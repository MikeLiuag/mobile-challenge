import { Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { POSTER_ASPECT_RATIO } from '../lib/constants'
import { textStyles, containerStyles } from '../lib/styles'

const screenDimensions = Dimensions.get('screen')
const horizontalPadding = 30

const imageHorizontalMargin = 20
const imageWidth =
  screenDimensions.width - horizontalPadding * 2 - imageHorizontalMargin * 2

export default function Details() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        containerStyles,
        {
          paddingBottom: insets.bottom
        }
      ]}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View>
          <View style={styles.image} />
          <Text style={[textStyles.small, styles.info]}>
            2022 • Action, Adventure, Science Fiction • 2h42m
          </Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Overview</Text>
          <Text style={textStyles.paragraph}>
            Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to
            protect their nation from intervening world powers in the wake of
            King T’Challa’s death. As the Wakandans strive to embrace their next
            chapter, the heroes must band together with the help of War Dog
            Nakia and Everett Ross and forge a new path for the kingdom of
            Wakanda.
          </Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Cast</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: horizontalPadding,
    gap: 30
  },
  image: {
    height: imageWidth / POSTER_ASPECT_RATIO,
    width: imageWidth,
    backgroundColor: 'lightgray',
    borderRadius: 350 / 10,
    marginHorizontal: imageHorizontalMargin,
    marginBottom: 20
  },
  info: {
    textAlign: 'center'
  }
})
