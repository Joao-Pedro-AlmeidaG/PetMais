import React, { useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatCurrency } from '../utils/formatters';
import { iconForTipo } from '../utils/categoryIcon';
import { effectivePrice } from '../context/CartContext';

export default function ProductCard({ product, onPress, onAdd }) {
  const [justAdded, setJustAdded] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const hasPromo = product.precoPromocional !== null && product.precoPromocional < product.precoAtual;
  const priceToShow = effectivePrice(product);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <Pressable onPress={() => onPress(product)} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.iconWrap}>
        <Ionicons name={iconForTipo(product.tipo)} size={28} color={colors.primaryDark} />
        {hasPromo && (
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>promo</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.nome}
        </Text>
        <Text style={styles.type}>{product.tipo}</Text>
        <View style={styles.priceRow}>
          {hasPromo && <Text style={styles.oldPrice}>{formatCurrency(product.precoAtual)}</Text>}
          <Text style={[styles.price, hasPromo && styles.pricePromo]}>{formatCurrency(priceToShow)}</Text>
        </View>
      </View>

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable onPress={handleAdd} hitSlop={10} style={styles.addButton}>
          <Ionicons name={justAdded ? 'checkmark' : 'add'} size={22} color={colors.textInverse} />
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  cardPressed: {
    backgroundColor: colors.primaryLight,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  promoBadge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  promoBadgeText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  type: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  oldPrice: {
    ...typography.small,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.sm,
  },
  price: {
    ...typography.price,
    fontSize: 16,
    color: colors.text,
  },
  pricePromo: {
    color: colors.accent,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
