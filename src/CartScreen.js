import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import CartItemRow from '../components/CartItemRow';
import AppButton from '../components/AppButton';
import { colors, spacing, typography } from '../theme/theme';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart, total } = useCart();
  const { registerPurchases } = useOrders();

  const handleFinalize = () => {
    const records = registerPurchases(cartItems);
    const finalizedTotal = total;
    clearCart();
    navigation.replace('PedidoFinalizado', { itens: records, total: finalizedTotal });
  };

  return (
    <View style={styles.flex}>
      <ScreenHeader variant="plain" title="Meu carrinho" onBack={() => navigation.goBack()} />

      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={48} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.emptySubtitle}>Adicione produtos no catálogo para montar seu pedido.</Text>
          <AppButton
            title="Ver produtos"
            onPress={() => navigation.navigate('Produtos')}
            style={{ marginTop: spacing.lg, alignSelf: 'stretch' }}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartItemId}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => <CartItemRow item={item} onRemove={removeFromCart} />}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
            <AppButton title="Finalizar pedido" variant="accent" onPress={handleFinalize} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.surface,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  totalValue: {
    ...typography.h1,
    color: colors.text,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
