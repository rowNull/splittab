/** @format */

import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Theme } from "@/constants/theme";

interface ErrorMessageProps extends TextProps {
  message: string;
}

export function ErrorMessage({ message, style, ...rest }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Text style={[styles.text, style]} {...rest}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.error,
    fontWeight: Theme.typography.fontWeight.regular,
  },
});
