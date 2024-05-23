import React, { useCallback, useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator, ViewStyle, TextStyle, Image, ImageStyle,
} from "react-native"
// @ts-ignore
import { debounce } from "lodash"
import { searchMovies } from "../services/api/moviesapi"
import { SafeAreaView } from "react-native-safe-area-context"
import MoviesCard from "app/components/MoviesCard"
import { colors } from "app/theme"

const welcomeFace = require("assets/images/welcome-face.png")


export default function SearchScreen() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])


  const handleSearch = (search: string) => {
    if (search && search.length > 2) {
      setLoading(true)
      searchMovies({
        query: search,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        console.log("We got our search results")
        setLoading(false)
        if (data && data.results) {
          setResults(data.results)
        }
      })
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <View style={$container}>

        {/* Search Input */}
        <View style={$searchContainer}>
          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Busca tus películas favoritas"
            placeholderTextColor="gray"
            style={$textInput}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={$scrollViewContent}
            >
              <Text style={$resultsText}>{results.length} Resultados</Text>
              <View style={$resultsContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : results.length > 0 ? (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={$scrollViewContent}
                  >
                    <MoviesCard data={{ results }} />
                  </ScrollView>
                ) : null}
              </View>
            </ScrollView>
          ) :
          <View>
            <Image style={$welcomeFace} source={welcomeFace} />
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  position: "relative",
}

const $searchContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: 8,
  flexDirection: "row",
  marginBottom: 12,
  marginHorizontal: 16,
  marginTop: 48,
  padding: 8,
}

const $textInput: ViewStyle = {
  flex: 1,
  paddingVertical: 4,
  paddingLeft: 24,
}

const $scrollViewContent: ViewStyle = {
  paddingHorizontal: 15,
}

const $resultsText: TextStyle = {
  color: colors.text,
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 18,
  marginLeft: 14,
  marginTop: 8,
}

const $resultsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 230,
  position: "absolute",
  right: -80,
}