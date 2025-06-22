import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function RegisterScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
      
      

   

      <Text style={styles.label}>PARABÈNS DESENVOLVEDOR *emoji de carinha festejante*</Text>
      

    

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta?{"\n"}<Text style={styles.linkBold}>Logar</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8d8c5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#002333',
  },
  input: {
    width: '100%',
    backgroundColor: '#d4d4ca',
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#000',
  }
});
