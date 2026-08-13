import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COLORS = {
  green: '#495E57',
  yellow: '#F4CE14',
  dark: '#333333',
  white: '#ffffff',
  error: '#d33',
};

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isNameValid = NAME_REGEX.test(name.trim()) && name.trim().length > 0;
  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const canSubmit = isNameValid && isEmailValid;

  const handleSubmit = () => {
    if (!canSubmit) return;
    completeOnboarding({ firstName: name.trim(), email: email.trim() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.logoRow}>
          <View style={styles.logoDot} />
          <Text style={styles.logoText}>LITTLE LEMON</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <Text style={styles.heroBody}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={[styles.input, name.length > 0 && !isNameValid && styles.inputError]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoCapitalize="words"
          />
          {name.length > 0 && !isNameValid && (
            <Text style={styles.errorText}>Name must contain letters only.</Text>
          )}

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, email.length > 0 && !isEmailValid && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email.length > 0 && !isEmailValid && (
            <Text style={styles.errorText}>Enter a valid email address.</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.yellow,
    marginRight: 8,
  },
  logoText: { fontWeight: '700', letterSpacing: 1, color: COLORS.dark },
  hero: { backgroundColor: COLORS.green, padding: 24 },
  heroTitle: { color: COLORS.yellow, fontSize: 32, fontWeight: '700' },
  heroSubtitle: { color: COLORS.white, fontSize: 20, marginBottom: 8 },
  heroBody: { color: COLORS.white, fontSize: 14, lineHeight: 20 },
  form: { padding: 24, flex: 1 },
  label: { fontSize: 14, color: COLORS.dark, marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: COLORS.yellow,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { fontWeight: '700', color: COLORS.dark, fontSize: 16 },
});
