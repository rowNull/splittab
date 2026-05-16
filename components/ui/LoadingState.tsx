/** @format */

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Theme } from "@/constants/theme";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Theme.colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Theme.spacing.md,
    padding: Theme.spacing.lg,
  },
  message: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: "center",
  },
});
