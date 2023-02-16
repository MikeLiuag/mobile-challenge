import { useState , useEffect} from "react";
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
import CustomHeader from '../components/CustomHeader'
import { useSelector, useDispatch } from 'react-redux';
import { setSettingValues } from "../redux/actions/settingsAction";
import {
  colors,
  containerStyles,
  fontWeights,
  sizes,
  textStyles
} from '../lib/styles'
import { store } from "../redux/store";

export default function Settings({ navigation }) {

  const insets = useSafeAreaInsets()
  const dispatch = useDispatch();
  const genresList = useSelector((store) => store.genresList.genresList)
  const settingValues = useSelector((store) =>  store.settingValues.settingValues)  

  const [activeSortItem , setActiveSortItem] = useState('popularity')
  const [selctedGenres, setSelectedGenres] = useState([])
  const [year, setYear] = useState('')
  const [startRuntimeVal, setStartRuntimeVal] = useState('')
  const [endRuntimeVal, setEndRuntimeVal] = useState('')
  const [showRuntimeErr, setShowRunTimeErr] = useState(false)
  
  useEffect(() => {
   setActiveSortItem(settingValues?.sortVal)
   setSelectedGenres(settingValues?.selectedGenres)
   setYear(settingValues?.yearTxt)
   setStartRuntimeVal(settingValues?.startRuntimeVal)
   setEndRuntimeVal(settingValues?.endRuntimeVal)
  }, [settingValues])

  const handleLeftBtnClick = () => {
    navigation.goBack()
  }
  const handleGenresItemClick = (genres) => {
    if(selctedGenres.includes(genres)) {
      let arrayList = [...selctedGenres]
      let index = arrayList.indexOf(genres)
      if (index !== -1) {
        arrayList.splice(index, 1);
        setSelectedGenres(arrayList)
      }
    }
    else {
      let arrayList = [...selctedGenres]
      arrayList.push(genres)
      setSelectedGenres(arrayList)
    }
  }

  const renderGenresList = () => {
    return genresList.map((genres, index) => {
      return <Genre name={genres?.name} selected={selctedGenres.includes(genres)} onSelect={() => handleGenresItemClick(genres)} key={index}/>
    })
  }

  const handleSaveSetting = () => {
    if((startRuntimeVal !== '') && (startRuntimeVal > endRuntimeVal)) {
      setShowRunTimeErr(true)
      return
    }
    const settingVals = {
      selectedGenres: selctedGenres,
      sortVal: activeSortItem,
      yearTxt: year,
      startRuntimeVal,
      endRuntimeVal
    }
    dispatch(setSettingValues(settingVals))
    setShowRunTimeErr(false)
    navigation.goBack()
  }
  return (
    <View
      style={[
        containerStyles,
        {
          paddingBottom: insets.bottom
        }
      ]}
    >
      <CustomHeader leftBtnIcon={'chevron-back'} title={'Settings'} onLeftBtnClick={handleLeftBtnClick} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View>
          <Text style={textStyles.h2}>Sort by</Text>
          <View>
            <SortOption name="Popularity" selected={activeSortItem === 'popularity'}  onSelect={()=> setActiveSortItem('popularity')} />
            <SortOption name="Rating" selected={activeSortItem === 'rating'}   onSelect={()=> setActiveSortItem('rating')} />
            <SortOption name="Newest First" selected={activeSortItem === 'newest'}   onSelect={()=> setActiveSortItem('newest')} />
            <SortOption name="Oldest First" selected={activeSortItem === 'oldest'}  onSelect={()=> setActiveSortItem('oldest')} />
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Genres</Text>
          <View style={styles.genreList}>
            {renderGenresList()}
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
              value={startRuntimeVal}
              onChangeText={(txt) => setStartRuntimeVal(txt)}
            />
            <Text style={textStyles.small}>-</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="To"
              placeholderTextColor={colors.neutral}
              maxLength={3}
              value={endRuntimeVal}
              onChangeText={(txt) => setEndRuntimeVal(txt)}
            />
            <Text style={textStyles.small}>minutes</Text>
          </View>
          {showRuntimeErr &&
          <Text style={styles.errTxt}>Runtime value is incorrect</Text>
          }
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          underlayColor={colors.neutral}
          style={styles.button}
          onPress={() => {
            handleSaveSetting()
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
    fontSize: sizes.md,
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
  },
  errTxt: {
    color: colors.red,
    fontSize: sizes.sm,
    marginTop: 10
  }
})
