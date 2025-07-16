import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeADMscreen({navigation}) {
  const [busca, setBusca] = useState('');
  const [items, setItems] = useState([]);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
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

    carregarNoticias();
  }, []);

  const filtradas = noticias.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.texto.toLowerCase().includes(busca.toLowerCase())
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
                  filtradas.map((item, index) => (
                    <View key={index} style={styles.card}>
                      <Text style={styles.cardTitle}>{item.titulo}</Text>
      
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
            <Ionicons name="newspaper" size={26} color="#fff"  onPress={() => navigation.navigate('RegistroNoticiascreen')} />
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
    height: 300,
  },
  userItem: {
    backgroundColor: '#CFCFC4',
    borderRadius: 15,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#002933',
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
