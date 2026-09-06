import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatCurrency } from '../utils/formatters';
import { iconForTipo } from '../utils/categoryIcon';

export default function CartItemRow({ item, onRemove }) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Ionicons name={iconForTipo(item.tipo)} size={24} color={colors.primaryDark} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.nome}
        </Text>
        <Text style={styles.price}>{formatCurrency(item.preco)}</Text>
      </View>

      <Pressable onPress={() => onRemove(item.cartItemId)} hitSlop={10} style={styles.removeButton}>
        <Ionicons name="close" size={18} color={colors.textInverse} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  price: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
