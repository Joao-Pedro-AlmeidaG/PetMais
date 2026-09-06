import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

const VARIANT_STYLES = {
  primary: { background: colors.primary, text: colors.textInverse },
  accent: { background: colors.accent, text: colors.textInverse },
  outline: { background: 'transparent', text: colors.primaryDark, border: colors.primaryDark },
};

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) {
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: variantStyle.background,
          borderColor: variantStyle.border || 'transparent',
          borderWidth: variantStyle.border ? 1.5 : 0,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {loading && <ActivityIndicator color={variantStyle.text} style={{ marginRight: spacing.sm }} />}
        <Text style={[styles.text, { color: variantStyle.text }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.bodyStrong,
    fontSize: 16,
  },
});
