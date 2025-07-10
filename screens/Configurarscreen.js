import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfiguracoesScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const verificarUsuario = async () => {
      const userString = await AsyncStorage.getItem('usuarioLogado');
      if (!userString) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
        navigation.replace('Login');
      } else {
        setUsuario(JSON.parse(userString));
      }
    };
    verificarUsuario();
  }, []);

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
        <Text style={styles.title}>RelataCampi</Text>
      </View>


      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>TURMA:</Text>
          {usuario && <Text style={styles.value}>{usuario.turma}</Text>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>alterar turma</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>E-mail:</Text>
          {usuario && <Text style={styles.value}>{usuario.email}</Text>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>alterar e-mail</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome :</Text>
          {usuario && <Text style={styles.value}>{usuario.nome}</Text>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>alterar nome</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Senha :</Text>
          {usuario && <Text style={styles.value}>{usuario.senha}</Text>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>alterar senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={26} color="#fff" onPress={() => navigation.navigate('Home')} />
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
    marginBottom: 25,
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
  infoContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  infoRow: {
    backgroundColor: '#EADDC8',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    flex: 1,
  },
  value: {
    color: '#000',
    fontSize: 16,
    flex: 2,
  },
  button: {
    backgroundColor: '#2D5C5C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
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
