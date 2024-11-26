import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createUser } from '../services/api';
import { faker } from '@faker-js/faker';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateUserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(faker.person.firstName());
    setEmail(faker.internet.email());
    setPassword(faker.internet.password());
    setPhoto(faker.image.avatar());

    const requestPermissions = async () => {
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

      if (mediaStatus !== 'granted' || cameraStatus !== 'granted') {
        Alert.alert(
          'Permissões necessárias',
          'Precisamos das permissões de câmera e galeria para continuar.'
        );
      }
    };
    requestPermissions();
  }, []);

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !photo) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePicture', {
      uri: photo,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });

    setLoading(true);
    try {
      await createUser(formData);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Listar Usuários', { refresh: true });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setName(faker.person.firstName());
    setEmail(faker.internet.email());
    setPassword(faker.internet.password());
    setPhoto(faker.image.avatar());
    Alert.alert('Dados atualizados!', 'Os dados foram recarregados com sucesso.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o e-mail"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite a senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Icon name="camera-alt" size={20} color="#fff" />
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>

      {photo && (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.image} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => setPhoto(null)}
          >
            <Icon name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Cadastrar</Text>
          </>
        )}
      </TouchableOpacity>

      <FAB style={styles.fab} small icon="refresh" onPress={handleRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#a7c7e7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007bff',
  },
});

export default CreateUserScreen;
