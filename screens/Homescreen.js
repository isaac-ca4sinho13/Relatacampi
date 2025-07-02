import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');

  const SalvarCadastro = async () => {
  if (!email || !senha || !nome || !turma) {
    Alert.alert('Atenção', 'Preencha todos os campos!');
    return;
  }

  const NovoUsuario = {
    email,
    senha,
    nome,
    turma,
  };

  try {
    const UsuariosSalvos = await AsyncStorage.getItem('Usuarios');
    const Usuarios = UsuariosSalvos ? JSON.parse(UsuariosSalvos) : [];

    Usuarios.push(NovoUsuario);

    await AsyncStorage.setItem('Usuarios', JSON.stringify(Usuarios));

    const Resposta = await fetch('http://localhost:3001/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NovoUsuario),
    });

    if (!Resposta.ok) {
      throw new Error('Erro ao salvar no servidor');
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    setEmail('');
    setSenha('');
    setNome('');
    setTurma('');
  } catch (error) {
    console.log(error);
    Alert.alert('Erro', 'Não foi possível salvar o cadastro.');
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
      
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        placeholderTextColor="#777"
        secureTextEntry
      />

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Turma:</Text>
      <TextInput
        style={styles.input}
        value={turma}
        onChangeText={setTurma}
        placeholder="Digite sua turma"
        placeholderTextColor="#777"
      />

      <TouchableOpacity style={styles.button} onPress={SalvarCadastro}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>

     <Text style={styles.footerText}>Já possui uma conta?</Text>
           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
             <Text style={styles.link}>Logar</Text>
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
  footerText: {
    marginTop: 2,
    fontSize: 13,
  },
  link: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#000',
  }
});
