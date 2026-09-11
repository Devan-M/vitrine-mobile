import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BackIcon from '@/components/BackIcon';
import api from '@/services/api';
import { formatPrice } from '@/services/price';
import type { Product } from '@/types/product';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  const fullPrice =
    product.discountPercentage > 0
      ? product.price /
      (1 - product.discountPercentage / 100)
      : null;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <BackIcon />
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            {product.title}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {formatPrice(product.price)}
            </Text>

            {fullPrice !== null && (
              <Text style={styles.fullPrice}>
                {formatPrice(fullPrice)}
              </Text>
            )}
          </View>

          <Text style={styles.description}>
            {product.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingTop: 82,
    paddingBottom: 20,
  },

  backButton: {
    position: 'absolute',
    zIndex: 10,
    top: 35,
    left: 11,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backArrow: {
    fontFamily: 'Inter_400Regular',
    fontSize: 38,
    lineHeight: 32,
    color: '#000000',
    includeFontPadding: false,
  },

  imageContainer: {
    width: 393,
    height: 235,
    backgroundColor: '#DADADA33',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 393,
    height: 235,
  },

  infoContainer: {
    width: 359,
    marginTop: 14,
    marginLeft: 20,
    flexDirection: 'column',
    gap: 8,
  },

  title: {
    width: 359,
    minHeight: 58,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#000000',
  },

  priceContainer: {
    width: 359,
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },

  price: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#B20000',
  },

  fullPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#656565',
    textDecorationLine: 'line-through',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  description: {
    width: 359,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#656565',
  },
});