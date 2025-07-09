import React, { useState } from 'react';
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

export default function HomeADMscreen() {
  const [busca, setBusca] = useState('');

  const usuarios = [
    { id: 1, nome: 'Usuário 1' },
    { id: 2, nome: 'Usuário 2' },
    { id: 3, nome: 'Usuário 3' },
    { id: 4, nome: 'Usuário 4' },
    { id: 5, nome: 'Usuário 5' },
    { id: 6, nome: 'Usuário 6' },
    { id: 7, nome: 'Usuário 7' },
  ];

  const filtrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
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


      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filtrados.map((usuario) => (
          <TouchableOpacity key={usuario.id} style={styles.userItem}>
            <Ionicons name="person-circle-outline" size={40} color="#000" />
            <Text style={styles.userText}>{usuario.nome}</Text>
            <Ionicons name="arrow-forward-circle" size={30} color="#FFD700" />
          </TouchableOpacity>
        ))}
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
