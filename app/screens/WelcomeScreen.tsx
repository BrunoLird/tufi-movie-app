import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { ROUTES } from "app/utils/constants"

const welcomeWallpaper = require("../../assets/images/wallpaperHome2.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({ navigation }) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeWallpaper} source={welcomeWallpaper} resizeMode="cover" />
      </View>
      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text style={$welcomeHeading} preset="heading">
          El mejor catálogo de peliculas online
        </Text>
        <Text preset="subheading">Exclusivo de TUFI streaming!</Text>
        <Button preset={"filled"} style={{ backgroundColor: colors.palette.secondary }}
                onPress={() => navigation.navigate("Main", { screen: ROUTES.HOME })}>
          <Text style={{ color: colors.palette.neutral100, fontSize: 18 }}>
            Ver Catálogo 🍿
          </Text>
        </Button>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-evenly",
}
const $welcomeWallpaper: ImageStyle = {
  height: "100%",
  width: "100%",
}
const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
