import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import { colors, radius, spacing, typography } from '../theme/theme';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function ProductListScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const { cartItems, addToCart } = useCart();
  const { logout } = useAuth();

  const filteredProducts = useMemo(() => {
    const q = normalize(query);
    if (!q) return mockProducts;
    return mockProducts.filter(
      (p) => normalize(p.nome).includes(q) || normalize(p.tipo).includes(q)
    );
  }, [query]);

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.flex}>
      <ScreenHeader
        variant="plain"
        title="Produtos"
        subtitle="Encontre o melhor para o seu pet"
        rightIcon="log-out-outline"
        onRightPress={handleLogout}
      />

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color={colors.textSecondary} style={{ marginRight: spacing.xs }} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar..."
          placeholderTextColor={colors.placeholder}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAdd={addToCart}
            onPress={(product) => navigation.navigate('ProdutoDetalhe', { productId: product.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto encontrado para "{query}".</Text>
        }
      />

      <Pressable style={styles.cartFab} onPress={() => navigation.navigate('Carrinho')}>
        <Ionicons name="cart-outline" size={24} color={colors.textInverse} />
        {cartItems.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  cartFab: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: colors.textInverse,
    fontSize: 11,
    fontWeight: '700',
  },
});
