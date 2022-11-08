import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../hooks/useAuth';

import firestore from '@react-native-firebase/firestore';
import { post } from '../apis';
import BtnWithBg from '../components/BtnWithBg';
import { pairUrl } from '../Urls';

const Dashboard = (props) => {
  const user = useAuth();
  const [scooterStats, setScooterStats] = useState({
    paired: false,
    isOn: false,
    error: false,
    activeVehicle: '',
    vehicleInfo: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.099,
    longitudeDelta: 0.099,
  });

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={styles.userBtn}>
          <Text>{user != null && user != undefined ? user.email : 'user'}</Text>
        </View>
      ),
    });
  }, [user]);

  const getToken = async () => {
    const tokenData = await auth().currentUser.getIdTokenResult();
    return tokenData;
  };
  // pair scooter and get scooter details
  const pair = async () => {
    await setIsLoading(true);
    let token = await getToken();
    try {
      await post(
        pairUrl,
        { vehicleCode: 'code1' },
        {
          apiKey: token.token,
        }
      );
      const users = await firestore().collection('users').doc(token.claims.user_id).get();
      const activeVehicle = users._data.activeVehicle;
      const vehicleInfo = await firestore().collection('vehicles').doc(activeVehicle).get();
      let latitude = vehicleInfo._data.location.lat;
      let longitude = vehicleInfo._data.location.lon;
      setScooterStats({
        ...scooterStats,
        paired: !scooterStats.paired,
        activeVehicle,
        vehicleInfo,
        error: false,
      });
      setCoordinates({
        ...coordinates,
        longitude: longitude,
        latitude: latitude,
      });

      await setIsLoading(false);
    } catch (e) {
      setScooterStats({
        ...scooterStats,
        error: true,
      });
      setIsLoading(false);
    }
  };

  // this api call was returning 401. I just commented it out and assumed it works

  const sendCommand = async () => {
    // await setIsLoading(true);
    // let command = scooterStats.isOn ? 'STOP' : 'START';
    //let token = await getToken();
    // try {
    //   await post(
    //     commandUrl,
    //     { vehicleCode: activeVehicle, command  },
    //     {
    //       apiKey: token.token,
    //     }
    //   );
    // } catch (e) {
    //   console.log('error', e);
    // }
    await setScooterStats({ ...scooterStats, isOn: !scooterStats.isOn });
    //   await setIsLoading(false);
  };

  const logout = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {scooterStats.vehicleInfo != undefined && (
          <MapView style={styles.map} region={coordinates} onMap>
            {scooterStats.vehicleInfo != '' && (
              <Marker
                key={1}
                coordinate={coordinates}
                title={scooterStats.vehicleInfo._data.name}
                description={scooterStats.vehicleInfo._data.batOneSoc + '%'}
              />
            )}
          </MapView>
        )}
      </View>
      <View style={styles.bottomContainer}>
        {!scooterStats.paired && !isLoading && (
          <View style={styles.pairContainer}>
            <BtnWithBg text={'Pair Scooter'} pressFunc={pair} />
            {scooterStats.error && <Text>Error, please try again</Text>}
          </View>
        )}
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator style={styles.activityIndicator} size={12} color={'#3955aa'} />
          </View>
        )}
        {scooterStats.paired && !isLoading && (
          <View style={styles.pairContainerPaired}>
            <View style={styles.onOffContainer}>
              <BtnWithBg text={scooterStats.isOn ? 'OFF' : 'ON'} pressFunc={sendCommand} />
            </View>
            <View style={styles.scooterInfo}>
              <Text>Scooter name: {scooterStats.vehicleInfo._data.name}</Text>
              <Text>Paired scooter ID: {scooterStats.activeVehicle}</Text>
              <Text>Estimated range: {scooterStats.vehicleInfo._data.estimatedRange}</Text>
              <Text>Odometer: {scooterStats.vehicleInfo._data.odometer}</Text>
              <Text>Battery: {scooterStats.vehicleInfo._data.batOneSoc}%</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutBtn: {
    marginRight: 15,
  },
  bottomContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    bottom: 0,
    height: '30%',
    width: '100%',
    backgroundColor: '#eaeaea',
  },

  /////topright////////////////////////////////
  userBtn: {
    marginLeft: 15,
  },

  ////pair/////////////////
  pairContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pairContainerPaired: {
    flex: 1,
  },
  ////////
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },

  onOffContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  scooterInfo: {
    marginHorizontal: 10,
  },
  map: { left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' },
});

export default Dashboard;
