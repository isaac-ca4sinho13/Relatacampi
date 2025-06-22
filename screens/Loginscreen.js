import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/RelataCampi.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Image
        source={require('../assets/foto-perfil-padrao.png')}
        style={styles.avatar}
        resizeMode="contain"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" placeholderTextColor="#777" />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        placeholderTextColor="#777"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Não tem uma conta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.link}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EADDC8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#002933',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#CFCFC4',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 13,
  },
  link: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
  },
});
