// PaymentInfo.js
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Modal,
  Animated,
  Easing,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {useFonts} from 'expo-font';

const CURRENCY = "TZS";
const primaryGradient = ["#134e5e", "#0EA5E9"]; // kijani → blue
const secondaryGradient = ["#16A34A", "#71b280"]; // kijani laini
const accentGradient = ["#0EA5E9", "#2563EB"]; // blue tones

const formatTZS = (n) =>
  `${CURRENCY} ${Number(n).toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
const FEATURES = [
  { key: "feature_1", label: "Access to all core content" },
  { key: "feature_2", label: "Notifications & reminders support" },
  { key: "feature_3", label: "Data sync across devices" },
  { key: "feature_4", label: "Usage reports/analytics" },
  { key: "feature_5", label: "Priority support" },
];

const PAYMENT_OPTIONS = [
  { key: "mpesa", label: "M-Pesa", icon: "cellphone-nfc" },
  { key: "tigopesa", label: "Tigo Pesa", icon: "cellphone-nfc" },
  { key: "airtel", label: "Airtel Money", icon: "cellphone-nfc" },
  { key: "card", label: "Card (Visa/Mastercard)", icon: "credit-card-outline" },
];

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    subtitle: "2-Week Trial",
    price: 0,
    cycle: "2 Weeks",
    bestFor: "Trying out the service",
    gradient: secondaryGradient,
    features: ["Core features", "No charges within 2 weeks"],
    trialDays: 14,
    badge: "Free 14 Days",
  },
  {
    id: "monthly",
    name: "Standard",
    subtitle: "Monthly Plan",
    price: 10000,
    cycle: "Per Month",
    bestFor: "Regular usage",
    gradient: primaryGradient,
    features: ["All core features", "Basic notifications & reports"],
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "quarter",
    name: "Pro",
    subtitle: "3-Month Plan",
    price: 27000, // example: discount vs 3 x 10,000
    cycle: "Every 3 Months",
    bestFor: "Power users",
    gradient: accentGradient,
    features: ["All features", "Priority Support", "Enhanced Analytics"],
    badge: "Save 10%",
  },
  {
    id: "annual",
    name: "Business",
    subtitle: "Annual Plan",
    price: 96000, // example: bigger discount
    cycle: "Per Year",
    bestFor: "Small teams/businesses",
    gradient: ["#10B981", "#22D3EE"],
    features: ["All features + Team", "Priority Support", "Detailed Reports"],
    badge: "Best Value",
  },
];

export default function PaymentInfo({navigation}) {

    let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]); // default: Standard
  const [loading, setLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_OPTIONS[0].key);
  const [fakeTrialLeft, setFakeTrialLeft] = useState(14); // demo counter

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    let timer;
    // Demo: punguza siku za trial ili kuonyesha UI ikibadilika
    if (fakeTrialLeft > 0) {
      timer = setInterval(() => {
        setFakeTrialLeft((d) => (d > 0 ? d - 1 : 0));
      }, 2500); // kila sekunde chache kwa DEMO
    }
    return () => clearInterval(timer);
  }, [fakeTrialLeft]);

  const onSelectPlan = (plan) => {
    setSelectedPlan(plan);
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true, speed: 30, bounciness: 6 }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }),
    ]).start();
  };

  // Hii ndio "demo API" ya kufanya subscribe / kuendelea kwenye payment
 const handleProceed = async () => {
  try {
    setLoading(true);

    // --- HERE IS WHERE YOU CONNECT TO YOUR API ---
    // 1) Send planId, method, and user token to the backend.
    // 2) Return paymentIntent / Checkout URL / STK Push request, etc.
    await new Promise((res) => setTimeout(res, 1400)); // DEMO delay

    setLoading(false);
    // For now, we just show a success message and “simulated navigation”
    Alert.alert(
      "Proceeding...",
      selectedPlan.id === "free"
        ? "You have started the 2-week Free Plan. You can continue using the service!"
        : `You selected the plan: ${selectedPlan.name} (${formatTZS(selectedPlan.price)} • ${selectedPlan.cycle}).`,
      [
        { text: "Close" },
        {
          text: "Go to Payment",
          onPress: () => {
           navigation.navigate("Payment Screen", { plan: selectedPlan, method: selectedPayment })
            // For now, DEMO only:
            //Alert.alert("PaymentScreen (Demo)", `Method: ${selectedPayment}`);
          },
        },
      ]
    );
  } catch (e) {
    setLoading(false);
    Alert.alert("Error", "Failed to proceed. Please try again.");
  }
};

  const header = useMemo(
    () => (

       <>{!fontsLoaded ? (<View/>):(


   <LinearGradient colors={primaryGradient} start={{ x: 0, y: 0 }} 
   end={{ x: 1, y: 1 }} style={styles.header}>
     



    <View style={styles.headerRow}>
  <Animated.View style={{ transform: [{ rotate: spin }] }}>
    <MaterialCommunityIcons name="crown-outline" size={28} color="#fff" />
  </Animated.View>
  <Text style={styles.headerTitle}>Get Full Access</Text>
</View>
<Text style={styles.headerSubtitle}>
  Choose the plan that works for you. You can change or cancel anytime.
</Text>
<View style={styles.headerBadges}>
  <View style={styles.badge}>
    <Ionicons name="shield-checkmark" size={16} color="#022C22" />
    <Text style={styles.badgeText}>Secure Payment</Text>
  </View>
  <View style={styles.badge}>
    <Ionicons name="refresh" size={16} color="#022C22" />
    <Text style={styles.badgeText}>Cancel Anytime</Text>
  </View>
  <View style={styles.badge}>
    <Ionicons name="time-outline" size={16} color="#022C22" />
    <Text style={styles.badgeText}>Trial: 2 Weeks</Text>
  </View>
</View>

      </LinearGradient>

      )}</>
    ),
    [spin]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <ScrollView 
        style={{
          backgroundColor:'#C0C0C0',
        }}
        contentContainerStyle={{ paddingBottom: 120 }}
         showsVerticalScrollIndicator={false}>
          {header}

          {/* Maelekezo mafupi */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Payment Instructions</Text>
  <Text style={styles.sectionText}>
    To continue using the app, choose a payment plan. If you choose the <Text style={styles.bold}>Free Plan</Text>,
    you will get basic access for <Text style={styles.bold}>14 days</Text>. For paid plans, payments
    will be made <Text style={styles.bold}>according to the plan schedule</Text>.
  </Text>

  <Pressable style={styles.scheduleBtn} onPress={() => setShowSchedule(true)}>
    <MaterialCommunityIcons name="calendar-text" size={18} color="#064E3B" />
    <Text style={styles.scheduleBtnText}>View Payment Schedules</Text>
  </Pressable>
</View>


          {/* Chaguo za Malipo (methods) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <View style={styles.payRow}>
              {PAYMENT_OPTIONS.map((p) => {
                const active = selectedPayment === p.key;
                return (
                  <Pressable
                    key={p.key}
                    onPress={() => setSelectedPayment(p.key)}
                    style={[styles.payChip, active && styles.payChipActive]}
                  >
                    <MaterialCommunityIcons
                      name={p.icon}
                      size={18}
                      color={active ? "#022C22" : "#064E3B"}
                    />
                    <Text style={[styles.payChipText, active && styles.payChipTextActive]}>{p.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

     {/* Plan Cards */}
<View style={[styles.section, { paddingTop: 8 }]}>
  <Text style={styles.sectionTitle}>Choose a Plan</Text>
  <View style={styles.cardGrid}>
    {PLANS.map((plan) => {
      const isActive = selectedPlan.id === plan.id;
      return (
        <Animated.View key={plan.id} style={{ transform: [{ scale: isActive ? scaleAnim : 1 }] }}>
          <Pressable onPress={() => onSelectPlan(plan)} style={styles.cardWrapper}>
            <LinearGradient
              colors={plan.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.planCard, isActive && styles.planCardActive]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.leftHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planSub}>{plan.subtitle}</Text>
                </View>
                {plan.badge && (
                  <View style={styles.ribbon}>
                    <Text style={styles.ribbonText}>{plan.badge}</Text>
                  </View>
                )}
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceText}>
                  {plan.price === 0 ? "Free" : formatTZS(plan.price)}
                </Text>
                <Text style={styles.cycleText}>
                  {plan.price === 0 ? "" : `• ${plan.cycle}`}
                </Text>
              </View>

              <View style={styles.featureList}>
                {plan.features.map((f, idx) => (
                  <View style={styles.featureItem} key={`${plan.id}_${idx}`}>
                    <Ionicons name="checkmark-circle" size={18} color="#ECFDF5" />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>

              {plan.id === "free" && (
                <View style={styles.trialRow}>
                  <MaterialCommunityIcons name="timer-sand" size={16} color="#022C22" />
                  <Text style={styles.trialText}>
                    {Math.max(fakeTrialLeft, 0)} days trial (demo)
                  </Text>
                </View>
              )}

              {plan.popular && (
                <View style={styles.popularTag}>
                  <MaterialCommunityIcons name="star-face" size={14} color="#022C22" />
                  <Text style={styles.popularText}>Popular Choice</Text>
                </View>
              )}
            </LinearGradient>

            {isActive && (
              <View style={styles.selectedGlow} />
            )}
          </Pressable>
        </Animated.View>
      );
    })}
  </View>
</View>

          {/* Vipengele vya Jumla */}
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>Features You Get</Text>
  {FEATURES.map((it) => (
    <View style={styles.rowItem} key={it.key}>
      <Ionicons name="checkmark-done-circle" size={20} color="#065F46" />
      <Text style={styles.rowText}>{it.label}</Text>
    </View>
  ))}

  <Pressable style={styles.faqBtn} onPress={() => setShowFAQ(true)}>
    <Ionicons name="help-circle-outline" size={18} color="#075985" />
    <Text style={styles.faqBtnText}>Frequently Asked Questions (FAQ)</Text>
  </Pressable>
</View>
</ScrollView>

{/* CTA Bottom Bar */}
<View style={styles.bottomBar}>
  <View style={{ flex: 1 }}>
    <Text style={styles.bottomTitle}>{selectedPlan.name}</Text>
    <Text style={styles.bottomSub}>
      {selectedPlan.price === 0
        ? "Free • 2 Weeks"
        : `${formatTZS(selectedPlan.price)} • ${selectedPlan.cycle}`}
    </Text>
  </View>
  <TouchableOpacity
    style={styles.cta}
    onPress={() =>
      selectedPlan.id === "free" ? handleProceed() : setShowPaymentModal(true)
    }
    activeOpacity={0.9}
  >
    <LinearGradient colors={primaryGradient} style={styles.ctaGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Ionicons name="lock-open" size={18} color="#ECFDF5" />
      <Text style={styles.ctaText}>
        {selectedPlan.id === "free" ? "Start Free Plan" : "Continue to Payment"}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
</View>

{/* Loader Overlay */}
{loading && (
  <View style={styles.loaderOverlay}>
    <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.loaderText}>Preparing payment...</Text>
  </View>
)}


        {/* Modal: Ratiba za Malipo */}
      <Modal visible={showSchedule} transparent animationType="fade" onRequestClose={() => setShowSchedule(false)}>
  <View style={styles.modalWrap}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Payment Schedules</Text>
      <View style={styles.table}>
        <View style={[styles.tRow, styles.tHead]}>
          <Text style={[styles.tCell, styles.tHeadText, { flex: 1.4 }]}>Plan</Text>
          <Text style={[styles.tCell, styles.tHeadText]}>Cost</Text>
          <Text style={[styles.tCell, styles.tHeadText]}>Cycle</Text>
        </View>
        {PLANS.filter(p => p.id !== "free").map((p) => (
          <View key={p.id} style={styles.tRow}>
            <Text style={[styles.tCell, { flex: 1.4 }]}>{p.name}</Text>
            <Text style={styles.tCell}>{formatTZS(p.price)}</Text>
            <Text style={styles.tCell}>{p.cycle}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.modalNote}>
        Payments are made at the beginning or end of the cycle depending on the chosen method.
        You can cancel anytime before the next payment date.
      </Text>

      <TouchableOpacity style={styles.modalClose} onPress={() => setShowSchedule(false)}>
        <Text style={styles.modalCloseText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Modal: Choose Payment Method and Confirm */}
<Modal
  visible={showPaymentModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowPaymentModal(false)}
>
  <View style={styles.modalWrap}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Confirm Payment</Text>
      <Text style={styles.modalSub}>
        {selectedPlan.name} • {selectedPlan.price === 0 ? "Free" : `${formatTZS(selectedPlan.price)} / ${selectedPlan.cycle}`}
      </Text>

      <View style={{ height: 12 }} />

      <Text style={styles.sectionTitleMini}>Payment Method</Text>
      <View style={styles.payRowModal}>
        {PAYMENT_OPTIONS.map((p) => {
          const active = selectedPayment === p.key;
          return (
            <Pressable
              key={`modal_${p.key}`}
              onPress={() => setSelectedPayment(p.key)}
              style={[styles.payChip, active && styles.payChipActive]}
            >
              <MaterialCommunityIcons
                name={p.icon}
                size={18}
                color={active ? "#022C22" : "#064E3B"}
              />
              <Text style={[styles.payChipText, active && styles.payChipTextActive]}>{p.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.cta, { alignSelf: "stretch", marginTop: 12 }]}
        onPress={() => {
          setShowPaymentModal(false);
          handleProceed();
        }}
        activeOpacity={0.92}
      >
        <LinearGradient colors={accentGradient} style={styles.ctaGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Ionicons name="card-outline" size={18} color="#ECFDF5" />
          <Text style={styles.ctaText}>Pay Now</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modalClose} onPress={() => setShowPaymentModal(false)}>
        <Text style={styles.modalCloseText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Modal: FAQ */}
<Modal visible={showFAQ} transparent animationType="fade" onRequestClose={() => setShowFAQ(false)}>
  <View style={styles.modalWrap}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Frequently Asked Questions (FAQ)</Text>
      <FAQItem
        title="When does the Free Plan end?"
        content="After the 14-day trial, you will be asked to choose a paid plan to continue full access."
      />
      <FAQItem
        title="Can I change my plan?"
        content="Yes, you can change your plan anytime. The price difference will be automatically calculated in the next cycle."
      />
      <FAQItem
        title="Are payments secure?"
        content="Yes. We use secure payment providers. Your information is not stored on your device."
      />
      <FAQItem
        title="What happens if I cancel?"
        content="Access will continue until the end of the paid cycle. You will not be charged again after cancellation."
      />

      <TouchableOpacity style={styles.modalClose} onPress={() => setShowFAQ(false)}>
        <Text style={styles.modalCloseText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      </SafeAreaView>
    </View>
  );
}

function FAQItem({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.faqItem}>
      <Pressable style={styles.faqHeader} onPress={() => setOpen((o) => !o)}>
        <Text style={styles.faqTitle}>{title}</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#075985" />
      </Pressable>
      {open && <Text style={styles.faqContent}>{content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.select({ ios: 8, android: 16 }),
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerTitle: { color: "#ECFDF5", fontSize: 22, fontWeight: "800" },
  headerSubtitle: { color: "#D1FAE5", marginTop: 8, fontSize: 14, lineHeight: 20 },
  headerBadges: { flexDirection: "row", gap: 8, marginTop: 14, flexWrap: "wrap" },
  badge: {
    backgroundColor: "rgba(236,253,245,0.95)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  badgeText: { color: "#022C22", fontSize: 12, fontWeight: "700" },
  section: { paddingHorizontal: 20, paddingTop: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#064E3B" },
  sectionText: { marginTop: 8, color: "#0B3B2E", lineHeight: 20 },
  bold: { fontWeight: "800" },
  scheduleBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scheduleBtnText: { color: "#064E3B", fontWeight: "700" },
  payRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 12 },
  payRowModal: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 6 },
  payChip: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  payChipActive: {
    backgroundColor: "#BBF7D0",
    borderColor: "#86EFAC",
  },
  payChipText: { color: "#064E3B", fontWeight: "700", fontSize: 12 },
  payChipTextActive: { color: "#022C22" },
  cardGrid: { flexDirection: "column", gap: 14, marginTop: 10 },
  cardWrapper: { position: "relative" },
  planCard: {
    borderRadius: 18,
    padding: 16,
    overflow: "hidden",
  },
  planCardActive: {
    shadowColor: "#10B981",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  leftHeader: { gap: 2 },
  planName: { color: "#ECFDF5", fontSize: 18, fontWeight: "800" },
  planSub: { color: "#D1FAE5", fontSize: 12 },
  ribbon: {
    backgroundColor: "rgba(236,253,245,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ribbonText: { color: "#022C22", fontWeight: "800", fontSize: 12 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 8, marginTop: 10 },
  priceText: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  cycleText: { color: "#E0F2FE", fontSize: 12 },
  featureList: { marginTop: 10, gap: 8 },
  featureItem: { flexDirection: "row", gap: 8, alignItems: "center" },
  featureText: { color: "#ECFDF5", fontSize: 13 },
  trialRow: {
    marginTop: 10,
    backgroundColor: "rgba(236,253,245,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  trialText: { color: "#022C22", fontWeight: "800", fontSize: 12 },
  popularTag: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "rgba(236,253,245,0.92)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  popularText: { color: "#022C22", fontSize: 12, fontWeight: "800" },
  selectedGlow: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: -6,
    height: 10,
    borderRadius: 10,
    backgroundColor: "rgba(16,185,129,0.6)",
    blurRadius: 8,
  },
  rowItem: {
    marginTop: 10,
    backgroundColor: "#F0FDFA",
    borderColor: "#A7F3D0",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  rowText: { color: "#022C22", fontSize: 14, flex: 1 },
  faqBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  faqBtnText: { color: "#075985", fontWeight: "800" },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.select({ ios: 24, android: 18 }),
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomTitle: { fontSize: 16, fontWeight: "900", color: "#022C22" },
  bottomSub: { fontSize: 12, color: "#065F46", marginTop: 2 },
  cta: {
    borderRadius: 12,
    overflow: "hidden",
  },
  ctaGrad: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
  },
  ctaText: { color: "#ECFDF5", fontWeight: "900" },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,12,10,0.5)",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  loaderText: { color: "#ECFDF5", fontWeight: "800" },
  modalWrap: {
    flex: 1,
    backgroundColor: "rgba(2,12,10,0.5)",
    padding: 20,
    justifyContent: "center",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#022C22" },
  modalSub: { color: "#065F46", marginTop: 6, marginBottom: 6 },
  sectionTitleMini: { fontSize: 14, fontWeight: "900", color: "#064E3B" },
  modalNote: { color: "#022C22", marginTop: 10, lineHeight: 18 },
  modalClose: {
    alignSelf: "center",
    marginTop: 14,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  modalCloseText: { color: "#064E3B", fontWeight: "900" },
  table: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  tRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tHead: { backgroundColor: "#F1F5F9" },
  tCell: { flex: 1, color: "#022C22", fontSize: 13 },
  tHeadText: { fontWeight: "900", color: "#0F172A" },
  faqItem: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  faqHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  faqTitle: { fontSize: 14, fontWeight: "900", color: "#0F172A" },
  faqContent: { marginTop: 8, color: "#334155", lineHeight: 20 },
});
