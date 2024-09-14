import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function CheckoutScreen({ route }) {
  const { cart, customerName, totalPrice, restaurantName } = route.params;
  const currentDate = new Date();

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.quantity}</Text>
      <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
      <Text style={styles.tableCell}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <Text style={styles.title}>Recibo de Orden</Text>
      <Text style={styles.date}>Fecha de Pedido: {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}</Text>
      <Text style={styles.customerName}>Consumidor: {customerName}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Pedido</Text>
          <Text style={styles.headerCell}>Cantidad</Text>
          <Text style={styles.headerCell}>Precio Unitario</Text>
          <Text style={styles.headerCell}>Total</Text>
        </View>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <View style={styles.tableFooter}>
              <Text style={styles.footerText}>Subtotal: ${subtotal.toFixed(2)}</Text>
              <Text style={styles.footerText}>Total: ${totalPrice.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#888',
  },
  customerName: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  table: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableFooter: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    padding: 8,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
