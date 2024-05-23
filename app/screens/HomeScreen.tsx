import React, { useState } from "react"
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  ImageStyle,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  FlatList,
} from "react-native"
import { useQuery } from "@tanstack/react-query"
import { Text } from "app/components"
import {
  fetchTrendingMovie,
  fetchPopularMovie,
  fetchUpComingMovie,
  fetchTopRatedMovie,
} from "../services/api/moviesapi"
import Swiper from "react-native-swiper"
import { colors, spacing } from "app/theme"
import { MoviesResponse } from "app/services/api"
import MoviesCard from "app/components/MoviesCard"
import { SafeAreaView } from "react-native-safe-area-context"

const { width: screenWidth } = Dimensions.get("window")

export const HomeScreen: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("now")

  const { data: trending } = useQuery<MoviesResponse>({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovie,
  })

  const { data: popular } = useQuery<MoviesResponse>({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovie,
  })

  const { data: upComing } = useQuery<MoviesResponse>({
    queryKey: ["upcomingMovies"],
    queryFn: fetchUpComingMovie,
  })

  const { data: topRated } = useQuery<MoviesResponse>({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovie,
  })

  const handleButtonPress = (button: string) => {
    setActiveButton(button)
  }

  if (!trending || !popular || !upComing || !topRated) {
    return <ActivityIndicator size="large" color="white" />
  }


  const buttonData = [
    { id: "now", title: "Popular" },
    { id: "upcoming", title: "A Estrenar" },
    { id: "topRated", title: "Mejor Valorado" },
    { id: "trending", title: "En Tendencia" },
  ]

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={activeButton === item.id ? [$button, $buttonActive] : $button}
      onPress={() => handleButtonPress(item.id)}
    >
      <Text weight={"bold"} style={activeButton === item.id ? $buttonTextActive : $buttonText}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <View style={$container}>
        <ScrollView>
          <View style={$titleContainer}>
            <Text preset="heading" style={{ textAlign: "center" }}>Ultimos Estrenos</Text>
          </View>
          <Swiper
            showsPagination={true}
            containerStyle={$swiperContainer}
            autoplay={true}
            autoplayTimeout={4}
            loop={true}
          >
            {trending && trending.results && trending.results.slice(0, 10).map((item, index) => (
              <View style={$slide} key={index}>
                <Image
                  style={$image}
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                />
              </View>
            ))}
          </Swiper>
          <View style={$header}>
            <FlatList
              horizontal={true}
              data={buttonData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: spacing.md }}
            />
          </View>
          <MoviesCard
            data={activeButton === "now" ? popular : activeButton === "upcoming" ? upComing : activeButton === "topRated" ? topRated : trending} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: spacing.lg,
  gap: 16,
}

const $slide: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $image: ImageStyle = {
  width: screenWidth * 0.7,
  height: screenWidth * 0.7,
  borderRadius: 8,
  resizeMode: "stretch",
}

const $swiperContainer: ViewStyle = {
  height: screenWidth * 0.85,
}

const $titleContainer: ViewStyle = {
  padding: 16,
}

const $button: ViewStyle = {
  paddingVertical: 13,
  paddingHorizontal: 23,
  borderRadius: 30,
  backgroundColor: colors.palette.neutral300,
}

const $buttonActive: ViewStyle = {
  backgroundColor: colors.palette.secondary,
}

const $buttonText: TextStyle = {
  color: colors.text,
}

const $buttonTextActive: TextStyle = {
  color: colors.palette.neutral100,
}
