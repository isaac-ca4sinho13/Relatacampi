import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [busca, setBusca] = useState('');
  const [usuario, setUsuario] = useState(null);

  const dados = [
    { id: 1, titulo: 'Escola', subtitulo: 'Paranormal' },
    { id: 2, titulo: 'Escola', subtitulo: 'Tecnológica' },
    { id: 3, titulo: 'Escola', subtitulo: 'Ambiental' },
  ];


  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const userString = await AsyncStorage.getItem('usuarioLogado');
        if (userString) {
          const userObj = JSON.parse(userString);
          setUsuario(userObj);
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      }
    };

    carregarUsuario();
  }, []);

  const filtrados = dados.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.subtitulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
          <View>
            <Text style={styles.title}>RelataCampi</Text>
            {usuario && <Text style={styles.userInfo}>Olá, {usuario.nome}</Text>}
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#002933" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor="#444"
            style={styles.searchInput}
            value={busca}
            onChangeText={setBusca}
          />
          <Ionicons name="grid-outline" size={20} color="#002933" style={styles.gridIcon} />
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {filtrados.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Image source={require('../assets/exemplo-de-noticia.png')} style={styles.cardImage} />
                <Text style={styles.cardSubtitle}>{item.subtitulo}</Text>
                <Text style={styles.seta}>≫</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="home" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chatbubble-ellipses-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="settings" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EADDC8',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#EADDC8',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000',
  },
  userInfo: {
    fontSize: 14,
    color: '#444',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3B86B',
    marginHorizontal: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  gridIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 60,
    height: 300,
  },
  scrollContent: {
    paddingHorizontal: 15,
    height: 300,
  },
  card: {
    backgroundColor: '#CFCFC4',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    color: '#002933',
    fontWeight: 'bold',
  },
  cardImage: {
    width: 150,
    height: 100,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  cardSubtitle: {
    fontSize: 18,
    color: '#002933',
  },
  seta: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002933',
    marginTop: 5,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#002933',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    padding: 10,
  },
});
