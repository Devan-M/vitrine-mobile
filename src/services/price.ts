import { USD_TO_BRL } from '@/constants/currency';

export function convertUsdToBrl(price: number): number {
  return price * USD_TO_BRL;
}

export function formatPrice(price: number): string {
  const convertedPrice = convertUsdToBrl(price);

  // Arredonda para a casa dos 50 centavos mais próxima
  const priceInBrl = Math.round(convertedPrice * 2) / 2;

  return priceInBrl.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}