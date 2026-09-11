import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AddIcon from '@/components/AddIcon';
import GearIcon from '@/components/GearIcon';
import HomeIcon from '@/components/HomeIcon';
import ProductCard from '@/components/ProductCard';

import {
  MEN_CATEGORIES,
  WOMEN_CATEGORIES,
} from '@/constants/categories';

import api from '@/services/api';

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
            <ProductCard product={item} />
          )}
        />
      </View>

      <Pressable style={styles.floatingButton}>
        <AddIcon color="#FFFFFF" />
      </Pressable>

      <View style={styles.navigationContainer}>
        <View style={styles.bottomNavigation}>
          <Pressable style={styles.navigationTab}>
            <HomeIcon color="#2567E8" />

            <Text style={styles.navigationTextSelected}>
              Início
            </Text>
          </Pressable>

          <Pressable style={styles.navigationTab}>
            <GearIcon color="#262627" />

            <Text style={styles.navigationText}>
              Configurações
            </Text>
          </Pressable>
        </View>

        <View style={styles.gestureNavigation}>
          <View style={styles.gestureIndicator} />
        </View>
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
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
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

  bottomNavigation: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3.75,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.5,

    elevation: 8,
  },

  navigationTab: {
    width: '50%',
    height: 56,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  navigationTextSelected: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#2567E8',
  },

  navigationText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#262627',
  },

  navigationContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
  },

  gestureNavigation: {
    width: 393,
    height: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gestureIndicator: {
    width: 64,
    height: 2,
    backgroundColor: '#949494',
    borderRadius: 32,
  },

  floatingButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 695,
    left: 331,
    borderRadius: 25,
    backgroundColor: '#2567E8',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#262626',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 6,
  },
});