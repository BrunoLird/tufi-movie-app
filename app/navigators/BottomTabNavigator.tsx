import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import { colors } from "app/theme"
import { ROUTES } from "app/utils/constants"

const Tab = createBottomTabNavigator()

const CustomTabBarIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  return (
    <MaterialCommunityIcons
      // @ts-ignore
      name={name}
      size={34}
      color={focused ? colors.palette.secondary : colors.palette.neutral500}
    />
  )
}

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName = ""

          if (route.name === ROUTES.HOME) {
            iconName = "home"
          } else if (route.name === ROUTES.SEARCH) {
            iconName = "magnify"
          }

          return <CustomTabBarIcon name={iconName} focused={focused} />
        },
        tabBarActiveTintColor: colors.palette.secondary,
        tabBarInactiveTintColor: colors.palette.neutral500,
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ tabBarLabel: "Inicio" }}
      />
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
        options={{ tabBarLabel: "Buscar" }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
