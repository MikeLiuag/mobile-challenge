import { useState, useEffect } from "react";
import { Dimensions, StyleSheet, ScrollView, Text, View, Image, FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';
import { apiUrl, POSTER_ASPECT_RATIO, scaleX , apiKEY, mediaUrl} from '../lib/constants'
import { textStyles, containerStyles, colors } from '../lib/styles'
import castImg  from '../assets/cast.png'
import CustomHeader from '../components/CustomHeader';
import movieImg from '../assets/movie1.png'
import axios from 'axios';
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenDimensions = Dimensions.get('screen')
const horizontalPadding = 30

const imageHorizontalMargin = 20
const imageWidth =
  screenDimensions.width - horizontalPadding * 2 - imageHorizontalMargin * 2

export default function Details({navigation}) {
  const route = useRoute();
  const { movieItem } = route.params;
  const [detailData, setDetailData] = useState({})
  const [castList, setCastList] = useState({})

  useEffect(() => {
    movieItem?.id &&
    axios({
      method: 'get',
      url: `${apiUrl}/movie/${movieItem?.id}`,
      params: {
        api_key: apiKEY,
      }
    }).then((response) => {
      if(response?.data) {
        setDetailData(response?.data)
        checkIsFav(response?.data)
      }        
    });    
  }, [])

  useEffect(() => {
    movieItem?.id &&
    axios({
      method: 'get',
      url: `${apiUrl}/movie/${movieItem?.id}/credits`,
      params: {
        api_key: apiKEY,
        movie_id: movieItem?.id
      }
    }).then((response) => {
      if(response?.data?.cast) {
        setCastList(response?.data?.cast)
      }        
    });    
  }, [])

  const insets = useSafeAreaInsets()
  const [isFav, setIsFav] = useState(false)

  const checkIsFav =async(details) => {
    let favList = await AsyncStorage.getItem('favList');
    favList = JSON.parse(favList)
    if(favList?.filter(el => el.id === details.id).length > 0) {
      setIsFav(true)
    }
    else {
      setIsFav(false)
    }
  }
  const renderItem = ({ item, index}) => (    
    <View>      
      <Image source={item?.profile_path ? {uri: mediaUrl + item?.profile_path} : castImg} style={styles.movieImg} />
      {/* <Image source={castImg} style={styles.movieImg} /> */}
      <Text style={styles.fullNameTxt} numberOfLines={1}> {item.name} </Text>
    </View>
  );

  const handleLeftBtnClick = () => {
    navigation.goBack()
  }

  const handleRightBtnClick = async () => {
    try {
      let asyncFavList = await AsyncStorage.getItem('favList');
      let favList = asyncFavList ? JSON.parse(asyncFavList) : []
      if(favList?.filter(el => el.id === detailData.id).length > 0) {
        favList = favList.filter((function(e) {return e.id !== detailData.id}))
        setIsFav(false)
      }
      else {
        let newData = {
          id: detailData?.id,
          backdrop_path: detailData?.backdrop_path,
          title: detailData?.title
        }
        favList.push(newData)
        setIsFav(true)
      }      
      
      await AsyncStorage.setItem('favList', JSON.stringify(favList))
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  const renderGenresNames = () => {
    let genresNames = []    
    if(detailData?.genres) {
      detailData?.genres.map((item, index) => {
        genresNames.push(item.name)
      })
    }
    return genresNames.join(",")
  }

  const renderDuration = () => {
    let hours = Math.floor(moment.duration(detailData?.runtime*1000, 'milliseconds').asHours())
    let minutes = Math.floor(moment.duration(detailData?.runtime*1000, 'milliseconds').asMinutes())
    minutes = minutes - hours * 60
    if(hours > 0) 
      return hours+'h'+minutes+'m'
    else 
      return minutes+'m'
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
      <CustomHeader
        leftBtnIcon={'chevron-back'}
        title={detailData?.title}
        rightBtnICon={isFav ? 'heart' : 'heart-outline'}
        onLeftBtnClick={handleLeftBtnClick}
        onRightBtnClick={handleRightBtnClick}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View>
          <Image source={detailData?.backdrop_path ? {uri: mediaUrl + detailData?.backdrop_path} : movieImg} style={styles.image} />
          <View style={styles.starContainer}>
            <AirbnbRating 
              showRating={false}
              defaultRating={detailData?.vote_average / 2}
              count={5}
              size={20}
              isDisabled={true}
              readonly={true}
              selectedColor	={colors.primary}
            />
          </View>         
          <Text style={[textStyles.small, styles.info]}>
            {moment(detailData?.release_date).format('YYYY')} • {renderGenresNames()} • {renderDuration()}
          </Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Overview</Text>
          <Text style={textStyles.paragraph}>
           {detailData?.overview}
          </Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Cast</Text>
          <View>
            <FlatList
              data={castList}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />  
          </View>
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
    backgroundColor: colors.lightgray,
    borderRadius: 35,
    marginHorizontal: imageHorizontalMargin,
    marginBottom: 20
  },
  info: {
    textAlign: 'center'
  },
  starContainer: {
    marginVertical: scaleX(5)
  },
  movieImg: {
    width: scaleX(90),
    height: scaleX(90),
    borderRadius: scaleX(45),
    resizeMode: 'contain',
  },
  fullNameTxt: {
    maxWidth: scaleX(90)
  }
})
