import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/usuarios?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
      );

      if (!resposta.ok) {
        Alert.alert('Erro', 'Erro ao tentar logar. Verifique o servidor.');
        return;
      }

      const usuarios = await resposta.json();

      if (usuarios.length > 0) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home ');
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

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
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        placeholderTextColor="#777"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
        placeholderTextColor="#777"
      />

      <TouchableOpacity style={styles.button} onPress={realizarLogin}>
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
