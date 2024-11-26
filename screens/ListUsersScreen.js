import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { getAllUsers } from '../services/api';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fabOpen, setFabOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToWhatsApp = () => {
    if (users.length === 0) {
      alert('Não há usuários para exportar!');
      return;
    }

    const userData = users.map((user) => `${user.name} - ${user.email}`).join('\n');
    const message = `Lista de Usuários:\n\n${userData}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      alert('Erro ao abrir o WhatsApp. Certifique-se de que está instalado.');
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleUserPress(item)}>
      <Image source={{ uri: item.profilePicture }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {selectedUser && (
        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Image source={{ uri: selectedUser.profilePicture }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedUser.name}</Text>
                <Text style={styles.modalText}>
                  <Icon name="email" size={16} /> {selectedUser.email}
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Icon name="close" size={20} color="#fff" />
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? 'close' : 'tools'}
        actions={[
          {
            icon: 'refresh',
            label: 'Atualizar',
            onPress: fetchUsers,
          },
          {
            icon: 'whatsapp',
            label: 'Exportar para WhatsApp',
            onPress: exportToWhatsApp,
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        fabStyle={styles.fab}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    elevation: 6,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  fab: {
    backgroundColor: '#007bff',
  },
});

export default ListUsersScreen;
