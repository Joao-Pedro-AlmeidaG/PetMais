import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function ScreenHeader({
  title,
  subtitle,
  variant = 'plain', // 'brand' (dark green), 'accent' (orange) or 'plain'
  onBack,
  rightIcon,
  onRightPress,
  showLogo = false,
}) {
  const insets = useSafeAreaInsets();
  const isColored = variant === 'brand' || variant === 'accent';
  const backgroundColor =
    variant === 'brand' ? colors.primaryDark : variant === 'accent' ? colors.accent : colors.background;
  const textColor = isColored ? colors.textInverse : colors.text;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.md, backgroundColor },
        isColored ? styles.coloredContainer : null,
      ]}
    >
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={22} color={textColor} />
          </Pressable>
        ) : (
          <View style={styles.iconButton} />
        )}

        {showLogo && (
          <View style={styles.logoCircle}>
            <Ionicons name="paw" size={28} color={colors.primaryDark} />
          </View>
        )}

        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          {subtitle ? <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text> : null}
        </View>

        {rightIcon ? (
          <Pressable onPress={onRightPress} hitSlop={12} style={styles.iconButton}>
            <Ionicons name={rightIcon} size={22} color={textColor} />
          </Pressable>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  coloredContainer: {
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    ...typography.h2,
  },
  subtitle: {
    ...typography.small,
    marginTop: 2,
    opacity: 0.85,
  },
});
