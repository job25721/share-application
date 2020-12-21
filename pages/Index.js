import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        />
        <Text style={styles.logo}>SHARE</Text>
        <View style={styles.inputView}>
          <Text style={styles.TextLabel}>Email</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.TextLabel}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.CreateAccount}>Create New Account</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.Continue}>Or Continue With</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  TextLabel: {
    marginBottom: '10%',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3844EE',
    marginBottom: 60,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#6370FF',
    borderColor: 'black',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    padding: 20,
    marginBottom: '10%',
  },
  inputText: {
    height: 50,
    color: 'white',
    fontSize: 22,
  },
  loginBtn: {
    width: '30%',
    backgroundColor: '#6370FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginText: {
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
