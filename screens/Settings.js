import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import {
  colors,
  containerStyles,
  fontWeights,
  sizes,
  textStyles
} from '../lib/styles'

export default function Settings({ navigation }) {
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
          <Text style={textStyles.h2}>Sort by</Text>
          <View>
            <SortOption name="Popularity" selected={true} />
            <SortOption name="Rating" selected={false} />
            <SortOption name="Newest First" selected={false} />
            <SortOption name="Oldest First" selected={false} />
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Genres</Text>
          <View style={styles.genreList}>
            <Genre name="Action" selected={false} />
            <Genre name="Adventure" selected={false} />
            <Genre name="Animation" selected={false} />
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Year</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            maxLength={4}
          />
        </View>
        <View>
          <Text style={textStyles.h2}>Runtime</Text>
          <View style={styles.runtime}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="From"
              placeholderTextColor={colors.neutral}
              maxLength={3}
            />
            <Text style={textStyles.small}>-</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="To"
              placeholderTextColor={colors.neutral}
              maxLength={3}
            />
            <Text style={textStyles.small}>minutes</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          underlayColor={colors.neutral}
          style={styles.button}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Genre({ name, selected, onSelect }) {
  return (
    <TouchableOpacity
      style={[styles.genre, selected ? styles.selectedGenre : undefined]}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={[selected ? styles.selectedGenreText : undefined]}>
        {name}
      </Text>
      {selected && (
        <Icon name="close-outline" size={sizes.lg} color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

function SortOption({ name, selected, onSelect }) {
  return (
    <TouchableOpacity
      style={styles.sortOption}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text>{name}</Text>
      <Icon
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={sizes.xxl}
        color={selected ? colors.primary : colors.black}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 30
  },
  input: {
    backgroundColor: colors.light,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    width: 80
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  genre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  selectedGenre: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  selectedGenreText: {
    color: colors.white
  },
  runtime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: colors.light,
    borderBottomWidth: 1
  },
  buttonContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.light,
    paddingVertical: 16,
    paddingHorizontal: 30
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: sizes.md
  }
})
