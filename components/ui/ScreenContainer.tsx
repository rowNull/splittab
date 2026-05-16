/** @format */

import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/constants/theme";

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export function ScreenContainer({
  children,
  scrollable = false,
  style,
  ...rest
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {scrollable ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, style]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            {...rest}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.content, style]} {...rest}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.screenPadding,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Theme.spacing.screenPadding,
  },
});
