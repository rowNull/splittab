/** @format */

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Theme } from "@/constants/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function Input({
  label,
  error,
  value,
  onChangeText,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Theme.colors.textDisabled}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.xs,
  },
  label: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.textSecondary,
  },
  input: {
    height: Theme.spacing.inputHeight,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.textPrimary,
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  errorText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.error,
  },
});
