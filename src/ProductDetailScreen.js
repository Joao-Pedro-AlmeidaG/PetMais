import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { colors, radius, spacing, typography } from '../theme/theme';
import { findProductById } from '../data/mockProducts';
import { formatCurrency, formatDate } from '../utils/formatters';
import { iconForTipo } from '../utils/categoryIcon';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const product = findProductById(productId);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <View style={styles.flex}>
        <ScreenHeader variant="plain" title="Produto" onBack={() => navigation.goBack()} />
        <Text style={styles.notFound}>Este produto não foi encontrado.</Text>
      </View>
    );
  }

  const hasPromo = product.precoPromocional !== null && product.precoPromocional < product.precoAtual;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <View style={styles.flex}>
      <ScreenHeader variant="plain" title="Detalhes do produto" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Ionicons name={iconForTipo(product.tipo)} size={56} color={colors.primaryDark} />
        </View>

        <View style={styles.typeTag}>
          <Text style={styles.typeTagText}>{product.tipo}</Text>
        </View>

        <Text style={styles.name}>{product.nome}</Text>

        <View style={styles.priceRow}>
          {hasPromo && <Text style={styles.oldPrice}>{formatCurrency(product.precoAtual)}</Text>}
          <Text style={[styles.price, hasPromo && styles.pricePromo]}>
            {formatCurrency(hasPromo ? product.precoPromocional : product.precoAtual)}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Descrição</Text>
        <Text style={styles.description}>{product.descricao}</Text>

        <Text style={styles.sectionLabel}>Validade</Text>
        <Text style={styles.description}>{formatDate(product.dataValidade)}</Text>

        <AppButton
          title={added ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
          onPress={handleAdd}
          style={{ marginTop: spacing.xl }}
        />
        <AppButton
          title="Ir para o carrinho"
          variant="outline"
          onPress={() => navigation.navigate('Carrinho')}
          style={{ marginTop: spacing.sm }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.lg,
  },
  hero: {
    height: 160,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  typeTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    marginBottom: spacing.sm,
  },
  typeTagText: {
    ...typography.small,
    color: colors.accent,
    fontWeight: '600',
  },
  name: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  oldPrice: {
    ...typography.body,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.sm,
  },
  price: {
    ...typography.h2,
    color: colors.text,
  },
  pricePromo: {
    color: colors.accent,
  },
  sectionLabel: {
    ...typography.bodyStrong,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  notFound: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
