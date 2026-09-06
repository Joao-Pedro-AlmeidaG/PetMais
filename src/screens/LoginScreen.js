import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import InputField from '../components/InputField';
import AppButton from '../components/AppButton';
import { colors, spacing, typography } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [loginValue, setLoginValue] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const canSubmit = loginValue.trim().length > 0 && senha.length > 0;

  const handleSubmit = () => {
    const result = login(loginValue, senha);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setError(null);
    navigation.reset({ index: 0, routes: [{ name: 'Produtos' }] });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader variant="brand" title="PetMais" subtitle="Seu pet shop de confiança" showLogo />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <InputField
          label="Login"
          placeholder="seu-email@exemplo.com"
          value={loginValue}
          onChangeText={setLoginValue}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputField
          label="Senha"
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title="Entrar" onPress={handleSubmit} disabled={!canSubmit} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Não tem conta?</Text>
        </View>
        <AppButton
          title="Criar cadastro"
          variant="accent"
          onPress={() => navigation.navigate('Cadastro')}
          style={{ marginTop: spacing.sm }}
        />

        <Text style={styles.hint}>
          Dica para teste: ana.souza@petmais.com / 123456
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  error: {
    ...typography.small,
    color: colors.danger,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  footerRow: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  hint: {
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
