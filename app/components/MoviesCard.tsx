import React from "react"
import { View, Image, Dimensions, ImageStyle, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { colors } from "app/theme"
import { Movie, MoviesResponse } from "app/services/api"
import { Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"

interface PopularCardsProps {
  data: MoviesResponse;
}

type NavigationProps = NativeStackNavigationProp<AppStackParamList, "Movie">

const { width: screenWidth, height } = Dimensions.get("window")
const CARD_WIDTH = (screenWidth - 62) / 2 - 16

const MoviesCard: React.FC<PopularCardsProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProps>()

  function handleOpenMovie(movie: Movie) {
    navigation.navigate("Movie", { movie })
  }

  return (
    <View style={$container}>
      {data && data.results && data.results.map((item, index) => (
        <TouchableOpacity style={$card} key={index} onPress={() => handleOpenMovie(item)}>
          <Image
            style={$image}
            source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          />
          <View style={$voteContainer}>
            <Text style={$voteText}>{item.vote_average.toFixed(1)}</Text>
          </View>
          <View style={{ padding: 8 }}>
            <Text weight={"bold"} style={$title} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
            {item.overview ? (
              <Text style={$overview} numberOfLines={1}>{item.overview}</Text>
            ) : (
              <Text style={$overview}>Ninguna descripción disponible</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MoviesCard

const $container: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  // padding: 8,
}

const $card: ViewStyle = {
  width: CARD_WIDTH,
  marginBottom: 16,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral100,
  overflow: "hidden",
}

const $image: ImageStyle = {
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  width: "100%",
  height: height * 0.25,
}

const $title: TextStyle = {
  color: colors.text,
  fontSize: 18,
  textAlign: "left",
  marginTop: 4,
  lineHeight: 20,
}

const $overview: TextStyle = {
  color: colors.palette.neutral500,
  fontSize: 14,
  textAlign: "left",
  marginTop: 4,
  lineHeight: 20,
}

const $voteContainer: ViewStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.palette.secondary,
  justifyContent: "center",
  alignItems: "center",
}

const $voteText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 16,
}
