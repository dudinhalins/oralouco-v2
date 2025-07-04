import * as React from "react";
import { useEffect } from 'react';
import {Text, StyleSheet, View, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TermScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.viewBg}>
      <View style={[styles.view, styles.viewBg]}>
        <View style={[styles.statusBarIphone, styles.borderPosition]}>
          <View style={styles.frame}>
            <View style={[styles.time, styles.timeFlexBox]}>
              <Text style={styles.time1}>9:41</Text>
            </View>
            <View style={[styles.dynamicIslandSpacer, styles.timeFlexBox]} />
            <View style={[styles.levels, styles.timeFlexBox]}>
              <Image
                source={require('../assets/cellular-connection.png')}
                style={styles.cellularConnectionIcon}
              />
              <Image
                source={require('../assets/wifi.png')}
                style={styles.wifiIcon}
              />
              <Image
                source={require('../assets/battery.png')}
                style={styles.batteryIcon}
              />
              <View style={styles.battery}>
                <View style={[styles.border, styles.borderPosition]} />
                <Image
                  source={require('../assets/battery-cap.png')}
                  style={[styles.capIcon, styles.capIconLayout]}
                />
                <View style={[styles.capacity, styles.borderPosition]} />
              </View>
            </View>
          </View>
        </View>

        <Image
          style={[styles.olhoGifIcon, styles.borderPosition]}
          resizeMode="cover"
          source={require('../assets/olho-gif.png')}
        />
        
        <View style={[styles.sparkleBlack1Parent, styles.capIconLayout]}>
          <Image
            style={[styles.sparkleBlack1, styles.sparkleLayout]}
            resizeMode="cover"
            source={require('../assets/sparkle black 1.png')}
          />
          <Image
            style={[styles.sparkleBlack2, styles.sparkleLayout]}
            resizeMode="cover"
            source={require('../assets/sparkle black 2.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
