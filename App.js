import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import TermScreen from './screens/TermScreen';
import HomeScreen from './screens/HomeScreen';
import PlayScreen from './screens/PlayScreen';
import ProfeciaScreen from './screens/ProfeciaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [previsao, setPrevisao] = useState(null);
  const [dissolvendo, setDissolvendo] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const girar = async () => {
    setPrevisao(null);
    setDissolvendo(false);
    fadeAnim.setValue(0);

    try {
      const res = await fetch('https://oralouco-api.onrender.com/api/previsao');
      const data = await res.json();
      setPrevisao(data);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setDissolvendo(true);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => setPrevisao(null));
      }, 10000); // tempo da profecia!!!!!
    } catch (err) {
      console.error('Erro ao buscar profecia:', err);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="TermScreen" component={TermScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="ProfeciaScreen" component={ProfeciaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
