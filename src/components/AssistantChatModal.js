import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { useAssistant } from '../context/AssistantContext';
import { suggestedQuestions } from '../utils/assistantResponses';

export default function AssistantChatModal() {
  const insets = useSafeAreaInsets();
  const { isOpen, close, messages, sendMessage, isTyping } = useAssistant();
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);

  const handleSend = (text) => {
    const value = text !== undefined ? text : draft;
    if (!value.trim()) return;
    sendMessage(value);
    setDraft('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <Modal visible={isOpen} animationType="slide" onRequestClose={close} transparent={false}>
      <KeyboardAvoidingView
        style={[styles.container, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <View style={styles.headerTitleWrap}>
            <View style={styles.avatar}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.textInverse} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Assistente PetMais</Text>
              <Text style={styles.headerSubtitle}>{isTyping ? 'digitando...' : 'online'}</Text>
            </View>
          </View>
          <Pressable onPress={close} hitSlop={12} style={styles.closeButton}>
            <Ionicons name="close" size={22} color={colors.text} />
          </Pressable>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.author === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
              ]}
            >
              <Text style={item.author === 'user' ? styles.bubbleTextUser : styles.bubbleTextAssistant}>
                {item.text}
              </Text>
            </View>
          )}
        />

        {messages.length <= 1 && (
          <View style={styles.chipsRow}>
            {suggestedQuestions.map((question) => (
              <Pressable key={question} onPress={() => handleSend(question)} style={styles.chip}>
                <Text style={styles.chipText}>{question}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={[styles.inputRow, { paddingBottom: insets.bottom + spacing.sm }]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Digite sua dúvida..."
            placeholderTextColor={colors.placeholder}
            style={styles.input}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
          />
          <Pressable onPress={() => handleSend()} style={styles.sendButton} hitSlop={10}>
            <Ionicons name="send" size={18} color={colors.textInverse} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.surface,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.assistant,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
  },
  headerSubtitle: {
    ...typography.small,
    color: colors.textSecondary,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    padding: spacing.md,
    flexGrow: 1,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginBottom: spacing.sm,
  },
  bubbleAssistant: {
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  bubbleTextAssistant: {
    ...typography.body,
    color: colors.text,
  },
  bubbleTextUser: {
    ...typography.body,
    color: colors.textInverse,
  },
  chipsRow: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
    alignSelf: 'flex-start',
  },
  chipText: {
    ...typography.small,
    color: colors.primaryDark,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginRight: spacing.sm,
    color: colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.assistant,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
