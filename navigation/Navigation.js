import { Ionicons } from '@expo/vector-icons';  // Usando ícones do Expo
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  // Para navegação por abas
import { NavigationContainer } from '@react-navigation/native';  // Contêiner de navegação

import CreateUserScreen from '../screens/CreateUserScreen';  // Certifique-se de importar a tela corretamente
import ListUsersScreen from '../screens/ListUsersScreen';  // Certifique-se de importar a tela corretamente

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Criar Usuário') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Listar Usuários') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Criar Usuário" component={CreateUserScreen}  />
        <Tab.Screen name="Listar Usuários" component={ListUsersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;  
