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

import api from '@/services/api';

import {
  MEN_CATEGORIES,
  WOMEN_CATEGORIES
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
  const [selectedGender, setSelectedGender] = useState<'masculino' | 'feminino'>(
    'masculino'
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get(
          `/products/category/${selectedCategory}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
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

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.logoutButton}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
      <Text style={styles.title}>Produtos Masculinos</Text>
      <View style={styles.genderTabs}>
        <Pressable
          style={[
            styles.genderTab,
            selectedGender === 'masculino' && styles.genderTabActive,
          ]}
          onPress={() => {
            setSelectedGender('masculino');
            setSelectedCategory(MEN_CATEGORIES[0]);
          }}
        >
          <Text
            style={[
              styles.genderTabText,
              selectedGender === 'masculino' && styles.genderTabTextActive,
            ]}
          >
            Masculino
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.genderTab,
            selectedGender === 'feminino' && styles.genderTabActive,
          ]}
          onPress={() => {
            setSelectedGender('feminino');
            setSelectedCategory(WOMEN_CATEGORIES[0]);
          }}
        >
          <Text
            style={[
              styles.genderTabText,
              selectedGender === 'feminino' && styles.genderTabTextActive,
            ]}
          >
            Feminino
          </Text>
        </Pressable>
      </View>
      <View style={styles.categories}>
        {(selectedGender === 'masculino'
          ? MEN_CATEGORIES
          : WOMEN_CATEGORIES
        ).map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
                params: { id: item.id.toString() },
              })
            }
          >
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
          </Pressable>
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

  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  genderTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },

  genderTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },

  genderTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },

  genderTabText: {
    fontSize: 16,
  },

  genderTabTextActive: {
    fontWeight: 'bold',
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },

  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
  },

  categoryButtonActive: {
    backgroundColor: '#000000',
  },

  categoryText: {
    fontSize: 14,
  },

  categoryTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
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