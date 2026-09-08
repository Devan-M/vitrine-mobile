import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import api from '@/services/api';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get(
          '/products/category/mens-shirts'
        );

        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Masculinos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.productTitle}>
                {item.title}
              </Text>

              <Text style={styles.price}>
                US$ {item.price}
              </Text>
            </View>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    gap: 12,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
  },

  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
  },
});