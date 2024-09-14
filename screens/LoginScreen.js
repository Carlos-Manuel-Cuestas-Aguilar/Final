import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const API_URL = 'https://66e4eef15cc7f9b6273bde21.mockapi.io/mexicomida/Users';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (name.trim() === '' || password.trim() === '') {
      setMessage('por favor introduzca usuario y contraseña.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?name=${name}&password=${password}`);
      if (!response.ok) {
        throw new Error('error en la conexion');
      }
      const data = await response.json();
      if (data.length > 0) {
        navigation.navigate('Home', { userName: name }); // Pasa el nombre del usuario a la pantalla de inicio
      } else {
        setMessage('usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Image
          source={{ uri: 'https://images.vexels.com/media/users/3/173821/raw/f2a5fa5ef1ef0dbf2461da78740d5ebf-diseno-de-logotipo-de-empresa-de-comida-mexicana.jpg' }} // Reemplaza con tu URL
          style={styles.image}
        />
        <Text style={styles.title}>MexiComida</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },image: {
    width: 100, // Ajusta el ancho de la imagen según sea necesario
    height: 100, // Ajusta la altura de la imagen según sea necesario
    marginBottom: 16,
    borderRadius: 8, // Opcional: redondear las esquinas de la imagen
  },
  box: {
    width: '80%', // Ajusta el ancho del cuadro
    maxWidth: 400, // Limita el ancho máximo del cuadro
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 16,
    fontSize: 16,
  },
});
