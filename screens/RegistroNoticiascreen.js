import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroNoticiaScreen({navigation}) {

   const [usuario, setUsuario] = useState(null);
  
    useEffect(() => {
      const verificarUsuario = async () => {
        const userString = await AsyncStorage.getItem('usuarioLogado');
        if (!userString) {
          Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
          navigation.replace('Registro');
        } else {
          setUsuario(JSON.parse(userString));
        }
      };
      verificarUsuario();
    }, []);

  const [titulo, setTitulo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [texto, setTexto] = useState('');

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true, 
    });

    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImagem(base64Img);
    }
  };

  const publicar = async () => {
    if (!titulo || !imagem || !texto) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    const novaNoticia = {
      titulo,
      imagem,
      texto,
    };

    try {
      const storedNoticias = await AsyncStorage.getItem('noticias');
      const noticias = storedNoticias ? JSON.parse(storedNoticias) : [];

      noticias.push(novaNoticia);

      await AsyncStorage.setItem('noticias', JSON.stringify(noticias));

      await fetch('http://localhost:3001/noticias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaNoticia),
      });

      Alert.alert('Sucesso', `Notícia publicada! Título: ${titulo}`);
      setTitulo('');
      setImagem(null);
      setTexto('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao publicar notícia.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nova Notícia</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título da notícia"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Imagem</Text>
        <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
          <Text style={styles.imageButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>

        {imagem && (
          <Image source={{ uri: imagem }} style={styles.preview} />
        )}

        <Text style={styles.label}>Texto</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite o texto da notícia"
          value={texto}
          onChangeText={setTexto}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={publicar}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeADM')}>
            <Ionicons name="home" size={26} color="#fff" onPress={() => navigation.navigate('HomeADM')}/>
          </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EADDC8',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002933',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002933',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#CFCFC4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 120,
  },
  button: {
    backgroundColor: '#002933',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#CFCFC4',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#002933',
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
});
