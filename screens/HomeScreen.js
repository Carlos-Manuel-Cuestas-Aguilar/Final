// HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const API_URL =
  "https://66e4eef15cc7f9b6273bde21.mockapi.io/mexicomida/comidas";

export default function HomeScreen({ route, navigation }) {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedType, setSelectedType] = useState("comida");
  const userName = route.params.userName;

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const goToCart = () => {
    if (Object.keys(cart).length === 0) {
      Alert.alert(
        "la lista esta vacia",
        "agrege almenos un producto."
      );
    } else {
      navigation.navigate("Cart", { cart: Object.values(cart), userName });
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[item.id]) {
        updatedCart[item.id].quantity += 1;
      } else {
        updatedCart[item.id] = { ...item, quantity: 1 };
      }
      return updatedCart;
    });
  };

  const filteredItems = foodItems.filter((item) => item.type === selectedType);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido, {userName}!</Text>

        <TouchableOpacity onPress={goToCart} style={styles.cartButton}>
          <Text style={styles.cartText}>
            Revisar Pedido (
            {Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)})
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setSelectedType("comida")}
          style={styles.typeButton}
        >
          <Text style={styles.typeButtonText}>Comidas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("bebida")}
          style={styles.typeButton}
        >
          <Text style={styles.typeButtonText}>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("extra")}
          style={styles.typeButton}
        >
          <Text style={styles.typeButtonText}>Entradas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Image source={{ uri: item.photo }} style={styles.foodImage} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodPrice}>${item.price}</Text>
            <Text style={styles.foodDescription}>{item.description}</Text>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  typeButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
  },
  typeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  foodItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
  },
  foodImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
