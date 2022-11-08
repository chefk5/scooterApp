import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthRoutes } from '../navigation/Types';
import BtnWithBg from '../components/BtnWithBg';
import BtnWithText from '../components/BtnWithText';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
const Signup = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });
  const inputRef1 = useRef();

  const signup = async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(() => {
          console.log('User account created & signed in!');
        });
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  };

  const navigateToSignup = () => {
    setValue({ ...value, error: '' });
    navigation.dispatch(CommonActions.goBack());
  };

  const dismissKeybopard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeybopard}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.errorContainer}>
          {value.error != '' && (
            <Text style={styles.error}>Error, please add email and password {value.error}</Text>
          )}
        </View>
        <TextInput
          placeholder="email"
          keyboardType="email-address"
          style={styles.input}
          blurOnSubmit={false}
          onChangeText={(text) => setValue({ ...value, email: text })}
          returnKeyType="next"
          onSubmitEditing={() => inputRef1.current.focus()}
        />
        <TextInput
          ref={inputRef1}
          placeholder="password"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => setValue({ ...value, password: text })}
        />
        <BtnWithBg text={'Sign up'} pressFunc={signup} />
        <BtnWithText text={'Back to login'} pressFunc={navigateToSignup} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },
  title: {
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 35,

    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  errorContainer: {
    height: '7%',
    // backgroundColor: 'blue',
  },
  error: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
    // alignSelf: 'center',
  },
});
