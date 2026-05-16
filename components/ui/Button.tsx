/** @format */

import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Theme } from "@/constants/theme";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={Theme.colors.textInverse} size="small" />
      ) : (
        <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Theme.spacing.buttonHeight,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Theme.spacing.lg,
  },
  buttonDisabled: {
    backgroundColor: Theme.colors.textDisabled,
  },
  label: {
    color: Theme.colors.textInverse,
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semibold,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  labelDisabled: {
    color: Theme.colors.white,
  },
});
