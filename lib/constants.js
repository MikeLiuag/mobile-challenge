import { Dimensions } from "react-native";

let deviceWidth = Dimensions.get("window").width

export const POSTER_ASPECT_RATIO = 0.6659919028

export const scaleX = (size) => {
    return (size * deviceWidth / 414)
}

// export const apiUrl = 'http://10.10.18.228/movieApi'
export const apiUrl = 'https://api.themoviedb.org/3'
export const apiKEY = 'a17cbc72c3a5497a8c8320c8314d1d1c'
export const mediaUrl = 'https://image.tmdb.org/t/p/w500'