import React, { useState, useEffect } from "react";
import { 
  View, Image, FlatList, StyleSheet, TouchableOpacity, Text
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import { useSelector, useDispatch } from 'react-redux';
import { setDiscoverList } from '../redux/actions/discoverAction';
import { setGenresList } from "../redux/actions/genresAction";

import EmptyState from '../components/EmptyState'
import { colors, containerStyles, sizes } from '../lib/styles'
import {scaleX, apiUrl, apiKEY, mediaUrl} from '../lib/constants'
import movieImg from '../assets/movie1.png'
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

export default function Discover({ navigation }) {

  const dispatch = useDispatch();
  const discoverList = useSelector((store) => store.discoverList.discoverList)
  const genresList = useSelector((store) => store.genresList.genresList)
  const settingValues = useSelector((store) =>  store.settingValues.settingValues)  
  const [curPageNum, setCurPageNum] = useState(0)
  const [totalPageNum, setTotalpageNum] = useState(0)

  useEffect(() => {
    genresList?.length < 1 &&
    axios({
      method: 'get',
      url: `${apiUrl}/genre/movie/list`,
      params: {
        api_key: apiKEY,
      }
    }).then((response) => {
      if(response?.data?.genres) {
        dispatch(setGenresList(response?.data?.genres))
      }        
    });    
  }, [])

  useEffect(() => {
    let genresIds = []    
    if(settingValues?.selectedGenres) {
      settingValues.selectedGenres.map((item, index) => {
        genresIds.push(item.id)
      })
    }
    axios({
      method: 'get',
      url: `${apiUrl}/discover/movie`,
      params: {
        "api_key": apiKEY,
        "page": 1,
        "with_genres": genresIds.join(","),
        "sort_by": settingValues?.sortVal + '.desc',
        "year": settingValues?.yearTxt,
        "with_runtime.gte": settingValues?.startRuntimeVal,
        "with_runtime.lte": settingValues?.endRuntimeVal
      }
    }).then((response) => {
      if(response?.data?.results) {
        setCurPageNum(1)
        setTotalpageNum(response?.data?.total_pages)
        dispatch(setDiscoverList(response?.data?.results))
      }        
    });    
  }, [settingValues])
  
 const loadMore = () => {
  if(totalPageNum > curPageNum) {
    let genresIds = []    
    if(settingValues?.selectedGenres) {
      settingValues.selectedGenres.map((item, index) => {
        genresIds.push(item.id)
      })
    }

    axios({
      method: 'get',
      url: `${apiUrl}/discover/movie`,
      params: {
        "api_key": apiKEY,
        "page": curPageNum + 1,
        "with_genres": genresIds.join(","),
        "sort_by": settingValues?.sortVal + '.desc',
        "year": settingValues?.yearTxt,
        "with_runtime.gte": settingValues?.startRuntimeVal,
        "with_runtime.lte": settingValues?.endRuntimeVal
      }
    }).then((response) => {
      if(response?.data?.results) {
        console.log(response?.data?.page,'page')
        setCurPageNum(curPageNum + 1)
        let newList = discoverList.concat(response?.data?.results)
        dispatch(setDiscoverList(newList))
      }        
    });    
  }
 }

 const getGenreNameByIds = (ids) => {
  return ids.map((item, index) => {
    const fullDetailData = genresList.find(el => el.id === item)
    return <Text style={styles.videoCatTxt} key={index}>{ index > 0 && ', ' } {fullDetailData?.name}</Text>
  })
 }

  const renderItem = ({ item, index}) => (    
      <TouchableOpacity 
      key={index}
       style={styles.listItem}
        onPress={()=>{navigation.navigate('Details', {movieItem: item})}}>      
        <Image source={item?.poster_path ? {uri: mediaUrl + item?.poster_path} : movieImg} style={styles.movieImg} />
        <View style={styles.videoTxtContent}>
          <Text style={styles.videoItemTitle}>{item?.title}</Text>
          <View style={styles.starContainer}>
            <AirbnbRating 
              showRating={false}
              defaultRating={item?.vote_average / 2}
              count={5}
              size={20}
              isDisabled={true}
              readonly={true}
              selectedColor	={colors.primary}
              ratingContainerStyle={{
                alignItems: 'flex-start'
              }}
            />
          </View>         
          <View style={styles.genresContainer}>
            {getGenreNameByIds(item?.genre_ids)}   
          </View> 
                 
        </View>
     </TouchableOpacity>
  );

  const handleSettingBtnClick = () => {
    navigation.navigate('Settings')
  }

  return (
    <View style={containerStyles}>
      <CustomHeader title={'Discover'}  rightBtnICon={'options-outline'} onRightBtnClick={handleSettingBtnClick}/>
      {
        discoverList?.length > 0 ?
        <FlatList
          nestedScrollEnabled 
          data={discoverList}
          renderItem={renderItem}
          keyExtractor={item => curPageNum + item.id}
          onEndReached={loadMore}
        />  
        :      
      <EmptyState
        image={require('../assets/empty-discover.jpg')}
        title="No results found"
        message="Try adjusting the settings"
        actionLabel="Go to Settings"
        onAction={() => navigation.navigate('Settings')}
      />
      }
    </View>
  )
}

const styles = StyleSheet.create({  
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: scaleX(20),
    marginBottom: scaleX(20)
  },
  movieImg: {
    width: scaleX(100),
    height: scaleX(150),
    resizeMode: 'contain',
    borderRadius: scaleX(15)
  },
  videoTxtContent: {
    paddingLeft: scaleX(10),
    paddingVertical: scaleX(10)
  },
  videoItemTitle: {
    fontWeight: '400',
    fontSize: sizes.md,
    color: colors.black
  },
  starContainer: {
    marginVertical: scaleX(5)
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoCatTxt: {
    fontSize: sizes.sm
  }
})