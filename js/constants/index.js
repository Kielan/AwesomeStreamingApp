'use strict'
import {
  Dimensions,
} from 'react-native'

export const WINDOW_CONST = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
export const clientId = `705349112654-a1cinahpr540nbp3upcs3b37jm52upc1.apps.googleusercontent.com`
export const API_URL = `https://www.googleapis.com`
export const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/`
export const GOOGLE_KEY = `AIzaSyApA9jYGrEZ2pLzaI8svf59luLHXMCNmZk`

export const COLORS = {
  ORANGE: "#FD6B07",//"#F6A34F",//"#FDF1E1",//"#FFBE28",//"#ffb74d",
  ORANGE_SECOND: "#FE781D",//"#ffa726",//ffa726",
  ORANGE_THIRD: "#FD8D38",
  ORANGE_FOURTH: "#FCA259",
  SALMON: "#f75d4c",
  BLACK: "black",
  GRAY: "#343435",
}
//#FD6B07
//#FE781D
//#FD8D38
//#FCA259
export const MATCH_URL = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
