import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeADMscreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarNoticias();
    });

    carregarNoticias();

    return unsubscribe;
  }, [navigation]);

  const carregarNoticias = async () => {
    try {
      const stored = await AsyncStorage.getItem('noticias');
      if (stored) {
        setNoticias(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Erro ao carregar notícias:', error);
    }
  };

  const deleteNoticia = async (idParaDeletar) => {
  const confirmar = window.confirm('Tem certeza que deseja deletar esta notícia?');
  if (!confirmar) return;

  try {
    console.log('ID para deletar:', idParaDeletar);
    console.log('Antes:', noticias);

    const novasNoticias = noticias.filter(n => String(n.id) !== String(idParaDeletar));

    console.log('Depois:', novasNoticias);

    await AsyncStorage.setItem('noticias', JSON.stringify(novasNoticias));
    setNoticias(novasNoticias);
  } catch (error) {
    console.log('Erro ao deletar notícia:', error);
  }
};




  const filtradas = noticias.filter(
    item =>
      item.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
      item.texto?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
        <Text style={styles.title}>RelataCampi</Text>
        <Feather name="settings" size={26} color="#002933" />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#002933" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor="#444"
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
        <Ionicons name="grid-outline" size={20} color="#002933" style={{ marginLeft: 8 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filtradas.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#333', marginTop: 20 }}>
            Nenhuma notícia encontrada.
          </Text>
        ) : (
          filtradas.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <TouchableOpacity onPress={() => deleteNoticia(item.id)}>
                  <Feather name="trash-2" size={20} color="#a00" />
                </TouchableOpacity>
              </View>

              {item.imagem && (
                <Image source={{ uri: item.imagem }} style={styles.cardImage} />
              )}

              <Text style={styles.cardSubtitle}>{item.texto}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('RegistroNoticiascreen')}>
          <Ionicons name="newspaper" size={26} color="#fff" />
        </TouchableOpacity>
        <Ionicons name="chatbubble-ellipses-outline" size={26} color="#fff" />
        <Ionicons name="settings" size={26} color="#fff" />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 0,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000',
  },
  searchBar: {
    backgroundColor: '#E3B86B',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002933',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#444',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#002933',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#aaa',
  },
});
