import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default () => {
  return (
    <View style={styles.Container}>
      <Image source={require('../assets/img/logo.png')} />
      <Text style={styles.LoGo}>SHARE</Text>
      <View>
        <Text style={styles.TextLabel}>Email</Text>
        <TextInput style={styles.InputText} />
      </View>
      <View>
        <Text style={styles.TextLabel}>Password</Text>
        <TextInput style={styles.InputText} />
      </View>
      <TouchableOpacity style={styles.LoginBtn}>
        <Text style={styles.LoginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.CreateAccount}>Create New Account</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.Continue}>Or Continue With</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SubLogo}>
        <TouchableOpacity>
          <Image
            style={styles.CssFacebook}
            source={require('../assets/img/facebook.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/img/google.png')} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  SubLogo: {
    flexDirection: 'row',
    marginTop: 20,
  },
  CssFacebook: {
    marginRight: 15,
  },
  TextLabel: {
    fontSize: 18,
  },
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoGo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3844EE',
    marginBottom: 60,
  },
  InputText: {
    borderRadius: 25,
    fontSize: 16,
    height: 50,
    width: 250,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginBottom: '5%',
  },
  LoginBtn: {
    width: '30%',
    backgroundColor: '#6370FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  LoginText: {
    color: 'white',
    fontSize: 22,
  },
  CreateAccount: {
    color: '#5A62D4',
    fontSize: 16,
  },
  Continue: {
    color: '#B5B5B5',
  },
});
