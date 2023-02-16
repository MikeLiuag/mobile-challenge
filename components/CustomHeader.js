import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { scaleX } from '../lib/constants'
import { colors, sizes } from '../lib/styles'

export default function CustomHeader({
  leftBtnIcon,
  title,
  rightBtnICon,
  onLeftBtnClick,
  onRightBtnClick
}) {
  return (
    <View style={styles.spaceBetweenContent}>
      {
        leftBtnIcon && 
        <TouchableOpacity onPress={onLeftBtnClick}>
          <Icon name={  leftBtnIcon } size={26} color={colors.black} />
        </TouchableOpacity>
      }
      {
        title && 
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
      }
      {
        rightBtnICon &&
      <TouchableOpacity onPress={()=>onRightBtnClick()}>
        <Icon name={rightBtnICon} size={26} color={colors.black} />
      </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  spaceBetweenContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: scaleX(40),
    borderBottomColor: colors.headerBottomColor,
    borderBottomWidth: 1,
    marginBottom: scaleX(20),
    padding: scaleX(5),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.black,
    fontSize: sizes.xl
  }
})
