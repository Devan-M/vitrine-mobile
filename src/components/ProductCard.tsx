import { router } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  formatPrice,
  getOriginalPrice,
} from '@/services/price';
import type { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage
  );
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/product/[id]',
          params: {
            id: product.id.toString(),
          },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.productTitle}>
          {product.title}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {product.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {formatPrice(product.price)}
          </Text>

          {originalPrice !== null && (
            <Text style={styles.oldPrice}>
              {formatPrice(originalPrice)}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 167.5,
    height: 205,
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
    paddingTop: 4,
    gap: 5,
  },

  productTitle: {
    width: 151.5,
    height: 19,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    color: '#000000',
  },

  description: {
    width: 151.5,
    height: 48,
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    fontStyle: 'normal',
    lineHeight: 10,
    letterSpacing: 0,
    color: '#656565',
  },

  priceContainer: {
    width: 151.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  oldPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: 0,
    color: '#656565',
    textDecorationLine: 'line-through',
  },

  price: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: '#000000',
  },
});