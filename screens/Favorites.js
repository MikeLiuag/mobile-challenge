import { useState, useEffect } from "react";
import { View, Text , StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import EmptyState from '../components/EmptyState'
import { colors, containerStyles, sizes } from '../lib/styles'
import movieImg from '../assets/movie1.png'
import { scaleX, mediaUrl} from '../lib/constants'
import CustomHeader from '../components/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused} from '@react-navigation/native';

export default function Favorites({ navigation }) {
  const isFocused = useIsFocused();
  const [favList, setFavList] = useState([])

  useEffect(() => {
    getFavData()
  }, [isFocused])

  const getFavData = async() => {
    let favList = await AsyncStorage.getItem('favList');
    favList = JSON.parse(favList)
    if(favList) {
      console.log(favList)
      setFavList(favList)
    }
  }

  const getFavList = () => {
    return favList.map((item, index) => {
      return <TouchableOpacity style={styles.favItem} key={index} onPress={() => navigation.navigate('Details', {movieItem: item})}>
                <Image source={item?.backdrop_path ? {uri: mediaUrl + item?.backdrop_path} : movieImg} style={styles.faqVideoImg} />
                <Text style={styles.videoTitle}>{item.title}</Text>
            </TouchableOpacity>
    })
  }
  return (
    <View style={containerStyles}>
      <CustomHeader title={'Favorites'} />
      
      {
        favList?.length > 0 ?
        <ScrollView style={styles.paddingContainer}>
          <View style={styles.favListContainer}>
            {getFavList()}
          </View>
        </ScrollView>
        :
        <EmptyState
        image={require('../assets/empty-favorites.jpg')}
        title="You haven't liked any movie yet"
        message="Why not try to find a movie you like?"
        actionLabel="Go to Discover"
        onAction={() => navigation.navigate('Discover')}
      />
      }
     
    </View>
  )
}

const styles = StyleSheet.create({
  paddingContainer: {
    padding: scaleX(10),
  },
  favListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  favItem: {
    width: scaleX(186),
    margin: scaleX(5),
    marginTop: scaleX(20)
  },
  faqVideoImg: {
    width: scaleX(186),
    height: scaleX(280),
    borderRadius: scaleX(10),
    backgroundColor: colors.lightgray
  },
  videoTitle: {
    fontWeight: '600',
    fontSize: sizes.sm,
    color: colors.black,
    marginTop: 10
  }
})