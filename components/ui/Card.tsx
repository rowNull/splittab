/** @format */

import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Theme } from "@/constants/theme";

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...rest }: CardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.cardPadding,
    ...Theme.shadow.sm,
  },
});
