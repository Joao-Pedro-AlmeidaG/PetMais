import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '../theme/theme';
import { useAssistant } from '../context/AssistantContext';

export default function FloatingAssistantButton() {
  const insets = useSafeAreaInsets();
  const { open, isOpen } = useAssistant();

  if (isOpen) return null;

  return (
    <Pressable
      onPress={open}
      style={[styles.button, { bottom: insets.bottom + 20 }]}
      accessibilityLabel="Abrir assistente virtual"
    >
      <Text style={styles.label}>IA</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.assistant,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    color: colors.textInverse,
    fontWeight: '700',
    fontSize: 15,
  },
});
