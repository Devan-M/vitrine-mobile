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
  description: string;
  price: number;
  discountPercentage: number;
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
        const categories =
          selectedGender === 'masculino'
            ? MEN_CATEGORIES
            : WOMEN_CATEGORIES;

        const responses = await Promise.all(
          categories.map((category) =>
            api.get(`/products/category/${category}`)
          )
        );

        const allProducts = responses.flatMap(
          (response) => response.data.products
        );

        setProducts(allProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError('Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedGender]);

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
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/product/[id]',
                  params: {
                    id: item.id.toString(),
                  },
                })
              }
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.info}>
                <Text style={styles.productTitle}>
                  {item.title}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>

                <Text style={styles.price}>
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

  productList: {
    width: 351,
    alignSelf: 'center',
  },

  productRow: {
    gap: 16,
    marginBottom: 16,
  },

  card: {
    width: 167.5,
    height: 224,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingBottom: 8,
    overflow: 'hidden',
  },

  imageContainer: {
    width: 167.5,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },

  image: {
    width: 167.5,
    height: 99,
  },

  info: {
    width: 167.5,
    height: 108,
    paddingHorizontal: 8,
    paddingTop: 8,
    gap: 16,
  },

  productTitle: {
    width: 151.5,
    height: 19,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#000000',
  },

  description: {
    width: 151.5,
    height: 48,
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 10,
    color: '#656565',
  },

  price: {
    width: 151.5,
    height: 17,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#000000',
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