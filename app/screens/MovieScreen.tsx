import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { Text } from "app/components"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { RouteProp, useRoute } from "@react-navigation/native"
import { fetchMovieDetails, fetchSimilarMovies } from "../services/api/moviesapi"
import { Movie } from "app/services/api"

const { width, height } = Dimensions.get("window")

interface WelcomeScreenProps extends AppStackScreenProps<"Movie"> {
}

type MovieScreenRouteProp = RouteProp<AppStackParamList, "Movie">

export const MovieScreen: FC<WelcomeScreenProps> = observer(function MovieScreen({ navigation }) {
  const { params } = useRoute<MovieScreenRouteProp>()
  const item = params?.movie
  const [loading, setLoading] = useState(true) // Initial loading state set to true
  const [movie, setMovie] = useState<Movie | null>(null)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])

  useEffect(() => {
    getMovieDetails(item.id)
    getSimilarMovies(item.id)
  }, [item])

  // Fetch Movie Details
  const getMovieDetails = async (id: any) => {
    setLoading(true)
    const data = await fetchMovieDetails(id)
    if (data) {
      setMovie(data)
    }
    setLoading(false)
  }

  const getSimilarMovies = async (id: any) => {
    const data = await fetchSimilarMovies(id)
    if (data && data.results) {
      setSimilarMovies(data.results)
    }
  }

  const handlePress = (item: any) => {
    navigation.push("Movie", { movie: item })
  }

  const renderSimilarMovieItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Image
        style={$similarMovieImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )

  return (
    <ScrollView>
      <View style={$container}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <Image
              style={$movieImage}
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }}
              resizeMode="cover"
            />
            {movie?.vote_average && (
              <View style={$voteContainer}>
                <Text style={$voteText}>{movie?.vote_average.toFixed(1)}</Text>
              </View>
            )}
            <TouchableOpacity style={$backButton} onPress={() => navigation.goBack()}>
              <Text style={$backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <View style={$descriptionContainer}>
              <Text preset="heading">{movie?.title}</Text>
              {movie?.release_date && (
                <Text style={$infoText}>Fecha de Estreno: {movie.release_date}</Text>
              )}
              {movie?.runtime && (
                <Text style={$infoText}>Duración: {movie?.runtime} min</Text>
              )}
              {movie?.original_language && (
                <Text style={$infoText}>Lenguajes: {movie?.original_language.toUpperCase()}</Text>
              )}
              <Text style={$overview}>{movie?.overview}</Text>
              <View style={$genresContainer}>
                {movie?.genres && movie?.genres.map((genre) => (
                  <View style={$genreBadge} key={genre.id}>
                    <Text style={$genreText}>{genre.name}</Text>
                  </View>
                ))}
              </View>
              <Text style={$title}>Películas Similares</Text>
              <FlatList
                horizontal={true}
                data={similarMovies}
                renderItem={renderSimilarMovieItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={$flatListContainer}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  justifyContent: "center", // Center the loading indicator
  alignItems: "center",     // Center the loading indicator
}

const $movieImage: ImageStyle = {
  width,
  height: height / 2,
}

const $voteContainer: ViewStyle = {
  position: "absolute",
  top: 80,
  right: 30,
  width: 70,
  height: 70,
  borderRadius: 40,
  backgroundColor: colors.palette.secondary,
  justifyContent: "center",
  alignItems: "center",
}

const $voteText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 20,
}

const $backButton: ViewStyle = {
  position: "absolute",
  top: 80,
  left: 30,
  backgroundColor: colors.palette.neutral100,
  padding: spacing.sm,
  borderRadius: 5,
}

const $backButtonText: TextStyle = {
  color: colors.palette.neutral900,
  fontSize: 16,
}

const $descriptionContainer: ViewStyle = {
  width,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
  marginTop: spacing.xs,
}

const $title: TextStyle = {
  marginTop: spacing.md,
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: spacing.md,
}

const $overview: TextStyle = {
  fontSize: 16,
  marginTop: spacing.md,
}

const $infoText: TextStyle = {
  fontSize: 16,
  marginTop: spacing.sm,
  color: colors.palette.neutral700,
}

const $genresContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: spacing.md,
}

const $genreBadge: ViewStyle = {
  backgroundColor: colors.palette.neutral300,
  borderRadius: 26,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  marginRight: spacing.sm,
  marginBottom: spacing.sm,
}

const $genreText: TextStyle = {
  color: colors.text,
  fontSize: 14,
}

const $flatListContainer: ViewStyle = {
  marginTop: spacing.lg,
}

const $similarMovieImage: ImageStyle = {
  width: 100,
  height: 150,
  borderRadius: 8,
  marginRight: spacing.sm,
}
