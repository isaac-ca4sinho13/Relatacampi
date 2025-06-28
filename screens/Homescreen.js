import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
        <Text style={styles.title}>RelataCampi</Text>
      </View>

      <View style={styles.header}>
        <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
        <Text>"Usuario"</Text>
      </View>


      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#002933" style={{ marginRight: 8 }} />
        <TextInput placeholder="Pesquisar" placeholderTextColor="#444" style={styles.searchInput} />
        <Ionicons name="grid-outline" size={20} color="#002933" style={{ marginLeft: 8 }} />
      </View>

 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Escola</Text>
            <Image source={require('../assets/exemplo-de-noticia.png')} style={styles.cardImage} />
            <Text style={styles.cardSubtitle}>Paranormal</Text>
            <Text style={styles.seta}>&gt;&gt;</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.navBar}>
        <Ionicons name="home" size={26} color="#002933" />
        <Ionicons name="chatbubble-outline" size={26} color="#002933" />
        <Ionicons name="settings-outline" size={26} color="#002933" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EADDC8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EADDC8',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000',
  },
  searchBar: {
    backgroundColor: '#E3B86B',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
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
    height: 60,
    width: '100%',
    backgroundColor: '#EADDC8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#aaa',
  },
});
