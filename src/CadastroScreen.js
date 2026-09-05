import React, { useMemo, useState } from 'react';
import { Text, ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import InputField from '../components/InputField';
import AppButton from '../components/AppButton';
import { colors, spacing, typography } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import {
  validateNomeCompleto,
  validateEmail,
  validateCPF,
  validateSenha,
  validateRepetirSenha,
  formatCPF,
} from '../utils/validators';

const initialTouched = { nome: false, email: false, cpf: false, senha: false, repetirSenha: false };

export default function CadastroScreen({ navigation }) {
  const { register } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [touched, setTouched] = useState(initialTouched);
  const [submitError, setSubmitError] = useState(null);

  const errors = useMemo(
    () => ({
      nome: validateNomeCompleto(nome),
      email: validateEmail(email),
      cpf: validateCPF(cpf),
      senha: validateSenha(senha),
      repetirSenha: validateRepetirSenha(senha, repetirSenha),
    }),
    [nome, email, cpf, senha, repetirSenha]
  );

  const isFormValid = Object.values(errors).every((err) => err === null);

  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleCpfChange = (text) => setCpf(formatCPF(text));

  const handleSubmit = () => {
    setTouched({ nome: true, email: true, cpf: true, senha: true, repetirSenha: true });
    if (!isFormValid) return;

    const result = register({ nomeCompleto: nome, email, cpf, senha });
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    setSubmitError(null);
    Alert.alert('Cadastro realizado', 'Você já pode entrar com seu e-mail e senha.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader variant="accent" title="Criar conta" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <InputField
          label="Nome completo"
          placeholder="Seu nome completo"
          value={nome}
          onChangeText={setNome}
          onBlur={() => markTouched('nome')}
          error={touched.nome ? errors.nome : null}
        />
        <InputField
          label="E-mail"
          placeholder="seu-email@exemplo.com"
          value={email}
          onChangeText={setEmail}
          onBlur={() => markTouched('email')}
          error={touched.email ? errors.email : null}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputField
          label="CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={handleCpfChange}
          onBlur={() => markTouched('cpf')}
          error={touched.cpf ? errors.cpf : null}
          keyboardType="numeric"
          maxLength={14}
        />
        <InputField
          label="Senha"
          placeholder="Crie uma senha"
          value={senha}
          onChangeText={setSenha}
          onBlur={() => markTouched('senha')}
          error={touched.senha ? errors.senha : null}
          secureTextEntry
        />
        <InputField
          label="Repetir senha"
          placeholder="Repita a senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          onBlur={() => markTouched('repetirSenha')}
          error={touched.repetirSenha ? errors.repetirSenha : null}
          secureTextEntry
        />

        {submitError ? <Text style={styles.error}>{submitError}</Text> : null}

        <AppButton title="Cadastrar" onPress={handleSubmit} disabled={!isFormValid} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.lg,
  },
  error: {
    ...typography.small,
    color: colors.danger,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
