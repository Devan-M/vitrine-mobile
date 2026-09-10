import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import api from '@/services/api';

import {
  MEN_CATEGORIES,
  WOMEN_CATEGORIES,
} from '@/constants/categories';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    MEN_CATEGORIES[0]
  );
  const [error, setError] = useState('');
  const [selectedGender, setSelectedGender] = useState<
    'masculino' | 'feminino'
  >('masculino');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError('');

      try {
        const response = await api.get(
          `/products/category/${selectedCategory}`
        );

        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError('Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior de gênero */}
      <View style={styles.genderTabs}>
        <Pressable
          style={styles.genderTab}
          onPress={() => {
            setSelectedGender('masculino');
            setSelectedCategory(MEN_CATEGORIES[0]);
          }}
        >
          <Text style={styles.genderTabText}>
            Produtos Masculinos
          </Text>

          {selectedGender === 'masculino' && (
            <View style={styles.genderIndicator} />
          )}
        </Pressable>

        <Pressable
          style={styles.genderTab}
          onPress={() => {
            setSelectedGender('feminino');
            setSelectedCategory(WOMEN_CATEGORIES[0]);
          }}
        >
          <Text style={styles.genderTabText}>
            Produtos Femininos
          </Text>

          {selectedGender === 'feminino' && (
            <View style={styles.genderIndicator} />
          )}
        </Pressable>
      </View>

      {/* Conteúdo temporário */}
      <View style={styles.content}>
        <Text style={styles.categoryTitle}>
          {selectedCategory}
        </Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.oldCard}
              onPress={() =>
                router.push({
                  pathname: '/product/[id]',
                  params: {
                    id: item.id.toString(),
                  },
                })
              }
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.oldImage}
              />

              <View style={styles.oldInfo}>
                <Text style={styles.oldProductTitle}>
                  {item.title}
                </Text>

                <Text style={styles.oldPrice}>
                  US$ {item.price}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  genderTabs: {
    width: 393,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  genderTab: {
    width: 196.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  genderTabText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#000000',
  },

  genderIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 196.5,
    height: 2.5,
    backgroundColor: '#2567E8',
  },

  content: {
    flex: 1,
    padding: 16,
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  oldCard: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    gap: 12,
  },

  oldImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  oldInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  oldProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  oldPrice: {
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});