import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatCurrency } from '../utils/formatters';

export default function OrderFinishedScreen({ route, navigation }) {
  const { itens = [], total = 0 } = route.params || {};

  const handleBackToProducts = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Produtos' }] });
  };

  return (
    <View style={styles.flex}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={72} color={colors.success} />
        <Text style={styles.title}>Pedido finalizado!</Text>
        <Text style={styles.subtitle}>Seu pedido foi registrado com sucesso.</Text>

        <View style={styles.card}>
          <FlatList
            data={itens}
            keyExtractor={(item, index) => `${item.nomeProduto}-${index}`}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.nomeProduto}
                </Text>
                <Text style={styles.itemPrice}>{formatCurrency(item.preco)}</Text>
              </View>
            )}
          />
          <View style={styles.divider} />
          <View style={styles.itemRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        <View style={styles.noticeBox}>
          <Ionicons name="storefront-outline" size={18} color={colors.primaryDark} />
          <Text style={styles.noticeText}>
            O pagamento é feito no caixa da loja, no momento da retirada do pedido.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton title="Voltar para produtos" onPress={handleBackToProducts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    marginTop: spacing.xl,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  itemName: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  itemPrice: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    ...typography.bodyStrong,
    color: colors.textSecondary,
  },
  totalValue: {
    ...typography.h3,
    color: colors.text,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  noticeText: {
    ...typography.small,
    color: colors.primaryDark,
    flex: 1,
  },
  footer: {
    padding: spacing.lg,
  },
});
