// screens/CartScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { cart, userName } = route.params;
  const [updatedCart, setUpdatedCart] = useState(cart);

  const updateQuantity = (id, amount) => {
    setUpdatedCart(prevCart => {
      const updated = prevCart.map(item => 
        item.id === id ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
      );
      return updated.filter(item => item.quantity > 0); // Remove items with zero quantity
    });
  };

  const totalPrice = updatedCart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const goToCheckout = () => {
    const currentDate = new Date().toLocaleDateString();
    navigation.navigate('Checkout', { cart: updatedCart, customerName: userName, totalPrice, date: currentDate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de pedido</Text>
      <FlatList
        data={updatedCart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.photo }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemText}>{item.name}</Text>
              <Text style={styles.cartItemText}>${item.price} x {item.quantity}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.controlButton}>
                  <Text style={styles.controlText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.controlButton}>
                  <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>

      <TouchableOpacity onPress={goToCheckout} style={styles.cartButton}>
          <Text style={styles.cartText}>Recibo de Compra({Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)})</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemText: {
    fontSize: 18,
  },
  quantityControls: {
    flexDirection: 'row',
    marginTop: 8,
  },
  controlButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  controlText: {
    color: '#fff',
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },cartButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,alignItems: 'center',
    justifyContent: 'center',
  },cartText: {
    color: '#fff',
    fontSize: 16,
  },
});
