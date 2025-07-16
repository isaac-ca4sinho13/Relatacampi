import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ConfiguracoesScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [campo, setCampo] = useState('');
  const [novoValor, setNovoValor] = useState('');

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

  const abrirModal = (campoParaEditar) => {
    setCampo(campoParaEditar);
    setNovoValor(usuario[campoParaEditar] || '');
    setModalVisible(true);
  };

  const salvarAlteracao = async () => {
    if (!novoValor.trim()) return Alert.alert('Erro', 'Campo não pode ser vazio.');

    try {
      const { data } = await axios.patch(http://localhost:3001/usuarios/${usuario.id}, {
        [campo]: novoValor,
      });

      const atualizado = { ...usuario, [campo]: novoValor };
      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(atualizado));
      setUsuario(atualizado);
      setModalVisible(false);
      Alert.alert('Sucesso', ${campo} atualizado com sucesso.);
    } catch (error) {
      Alert.alert('Erro ao atualizar', error.message);
    }
  };

  if (!usuario) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/RelataCampi.png')} style={styles.logo} />
        <Text style={styles.title}>RelataCampi</Text>
      </View>


      <View style={styles.infoContainer}>
        <Linha label="TURMA" valor={usuario.turma} aoPressionar={() => abrirModal('turma')} />
        <Linha label="E-mail" valor={usuario.email} aoPressionar={() => abrirModal('email')} />
        <Linha label="Nome" valor={usuario.nome} aoPressionar={() => abrirModal('nome')} />
        <Linha label="Senha" valor={'•'.repeat(usuario.senha.length)} aoPressionar={() => abrirModal('senha')} />
      </View>


      {/* essa parte é o pop up */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Alterar {campo}</Text>
            <TextInput
              style={styles.modalInput}
              value={novoValor}
              onChangeText={setNovoValor}
              secureTextEntry={campo === 'senha'}
              placeholder={Novo ${campo}}
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.modalButton} onPress={salvarAlteracao}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, color: 'red' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <Ionicons name="chatbubble-ellipses-outline" size={26} color="#fff" />
        <Ionicons name="settings" size={26} color="#fff" />
      </View>
    </View>
  );
}

function Linha({ label, valor, aoPressionar }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{valor}</Text>
      <TouchableOpacity style={styles.button} onPress={aoPressionar}>
        <Text style={styles.buttonText}>alterar {label.toLowerCase()}</Text>
      </TouchableOpacity>
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
  modalBackground: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalBox: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#002933',
},
modalInput: {
  width: '100%',
  padding: 10,
  backgroundColor: '#eee',
  borderRadius: 8,
  marginBottom: 15,
  color: '#000',
},
modalButton: {
  backgroundColor: '#2D5C5C',
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 20,
},
modalButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
})
