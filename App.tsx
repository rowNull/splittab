/** @format */

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Theme } from "@/constants/theme";

export default function App() {
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [scanning, setScanning] = useState(false);

  function handleScanPress() {
    setScanning(true);
    setTimeout(() => setScanning(false), 1500);
  }

  function handleNoteSubmit() {
    if (!note.trim()) {
      setNoteError("Note cannot be empty.");
      return;
    }
    setNoteError("");
    setNote("");
  }

  return (
    <SafeAreaProvider>
      <ScreenContainer scrollable>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>SplitTab</Text>
          <Text style={styles.tagline}>
            Scan receipts. Split expenses. Stay balanced.
          </Text>
        </View>

        {/* Balance summary */}
        <Card style={styles.balanceCard}>
          <Text style={styles.cardLabel}>Household Balance</Text>
          <Text style={styles.balanceAmount}>$0.00</Text>
          <Text style={styles.balanceSubtext}>All settled up</Text>
        </Card>

        {/* Primary action */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready to split?</Text>
          <Button
            title="Scan a Receipt"
            onPress={handleScanPress}
            loading={scanning}
          />
        </View>

        {/* Quick note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Note</Text>
          <Card style={styles.noteCard}>
            <Input
              label="Add a note to your household"
              placeholder="e.g. Remember milk"
              value={note}
              onChangeText={(text) => {
                setNote(text);
                if (noteError) setNoteError("");
              }}
            />
            <ErrorMessage message={noteError} />
            <Button
              title="Save Note"
              onPress={handleNoteSubmit}
              style={styles.noteButton}
            />
          </Card>
        </View>

        {/* Recent activity placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No receipts yet.</Text>
            <Text style={styles.emptySubtext}>
              Tap "Scan a Receipt" to get started.
            </Text>
          </Card>
        </View>
      </ScreenContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    alignItems: "center",
    paddingVertical: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  appName: {
    fontSize: Theme.typography.fontSize.display,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  tagline: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    textAlign: "center",
  },

  // Balance card
  balanceCard: {
    alignItems: "center",
    paddingVertical: Theme.spacing.xl,
    marginBottom: Theme.spacing.sectionGap,
  },
  cardLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: Theme.typography.letterSpacing.wider,
    marginBottom: Theme.spacing.sm,
  },
  balanceAmount: {
    fontSize: Theme.typography.fontSize.xxxl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  balanceSubtext: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.success,
    fontWeight: Theme.typography.fontWeight.medium,
  },

  // Sections
  section: {
    marginBottom: Theme.spacing.sectionGap,
    gap: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.textPrimary,
  },

  // Note card
  noteCard: {
    gap: Theme.spacing.md,
  },
  noteButton: {
    marginTop: Theme.spacing.xs,
  },

  // Empty state
  emptyCard: {
    alignItems: "center",
    paddingVertical: Theme.spacing.xl,
    gap: Theme.spacing.xs,
  },
  emptyText: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.textSecondary,
  },
  emptySubtext: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textDisabled,
    textAlign: "center",
  },
});
