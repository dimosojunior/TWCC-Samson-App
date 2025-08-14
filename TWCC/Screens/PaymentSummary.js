import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";


/** =======================
 *   PAYMENT SUMMARY
 *  ======================= */
function PaymentSummary({ route, navigation }) {
  const {
    network,
    country,
    countryCode,
    phone,
    amount,
    reference,
    email,
    transactionId,
    date,
  } = route.params || {};

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Payment Summary</Text>

      <View style={styles.summaryBox}>
        <Row label="Transaction ID" value={transactionId} />
        <Row label="Tarehe" value={new Date(date).toLocaleString()} />
        <Row label="Mtandao" value={network} />
        <Row label="Nchi" value={country} />
        <Row label="Namba ya Simu" value={`${countryCode} ${phone}`} />
        <Row label="Kiasi" value={`${amount?.toLocaleString?.() || amount} TZS`} />
        <Row label="Kumbukumbu" value={reference} />
        <Row label="Barua pepe" value={email} />
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Payment")}
        activeOpacity={0.9}
      >
        <Ionicons name="home" size={18} color="#fff" />
        <Text style={styles.homeButtonText}>Rudi Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}


/** =======================
 *   STYLES
 *  ======================= */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9fafb",
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
    color: "#111827",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 8,
    color: "#374151",
  },
  networkContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  networkCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    width: "47%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
    position: "relative",
  },
  networkCardSelected: {
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  networkLogo: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
  networkName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  badgeSelected: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#16a34a",
    borderRadius: 999,
    padding: 4,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  countryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    marginTop: 6,
  },
  countryCodeBox: {
    backgroundColor: "#eef2ff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  countryCode: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e3a8a",
  },
  phoneInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: Platform.select({ ios: 14, android: 12 }),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
  },
  payButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.45)", // gray-900/45
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loaderCard: {
    backgroundColor: "#ffffff",
    paddingVertical: 24,
    paddingHorizontal: 22,
    borderRadius: 18,
    alignItems: "center",
    width: "85%",
    maxWidth: 380,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  ring: {
    width: 64,
    height: 64,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#bfdbfe",
    borderTopColor: "#3b82f6",
    marginBottom: 12,
  },
  loaderText: {
    marginTop: 4,
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  loaderSub: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 4,
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    color: "#111827",
  },
  summaryBox: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 20,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rowLabel: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "700",
  },
  rowValue: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  homeButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.55)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    paddingBottom: 24,
    paddingTop: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  countryItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc",
  },
  countryItemSelected: {
    backgroundColor: "#f8fafc",
  },
  countryItemText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
});
