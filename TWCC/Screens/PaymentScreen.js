
import React, { useState,useCallback,useRef,useMemo, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Easing,
  Animated,
  Modal,
  Alert,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import DirectHeader from '../Header/DirectHeader';
import MinorHeader from '../Header/MinorHeader';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox'; // Make sure to install this package


/** =======================
 *   PAYMENT SCREEN
 *  ======================= */

  export default function PaymentScreen({ navigation }) {

      let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [country, setCountry] = useState({ name: "Tanzania", code: "+255", flag: "🇹🇿" });
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState(""); // optional reference
  const [email, setEmail] = useState(""); // optional email

  const [loading, setLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current; // for fancy spinner ring

  const networks = useMemo(
    () => [
      { id: 1, name: "Vodacom", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Vodacom_logo.svg" },
      { id: 2, name: "Tigo/Yas", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Tigo_logo.svg" },
      { id: 3, name: "Airtel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Airtel_logo.svg" },
      { id: 4, name: "Halopesa", logo: "https://halotel.co.tz/assets/img/logo.png" },
    ],
    []
  );

  // Quick country list (unaweza kuongeza baadaye)
  const countries = [
    { name: "Tanzania", code: "+255", flag: "🇹🇿" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
    { name: "Uganda", code: "+256", flag: "🇺🇬" },
    { name: "Rwanda", code: "+250", flag: "🇷🇼" },
    { name: "Burundi", code: "+257", flag: "🇧🇮" },
  ];

  const startSpinner = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopSpinner = () => {
    spinValue.stopAnimation();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

const validate = () => {
  //if (!selectedNetwork) return "Please select a payment network.";
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return "Enter a valid amount.";
  if (!phoneNumber) return "Enter a phone number.";
  // Simple example: Tanzania numbers 9 digits (you can improve for other countries)
  if (country.name === "Tanzania" && phoneNumber.replace(/\D/g, "").length !== 9) {
    return "Tanzanian phone number should be 9 digits (without +255).";
  }
  return null;
  // You can add email validation if needed (optional)
};

  const handlePayment = async () => {
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);
    startSpinner();

    // Hapa ndio ungeweka API call yako halisi (STK push / checkout / token, nk.)
    // Kwa sasa tuna-simulate delay ya malipo
    setTimeout(() => {
      stopSpinner();
      setLoading(false);

      // Navigate to summary with details
      navigation.navigate("Get All Products", {
        network: selectedNetwork?.name,
        country: country.name,
        countryCode: country.code,
        phone: phoneNumber,
        amount: Number(amount),
        reference: reference || "N/A",
        email: email || "N/A",
        transactionId: "TX-" + Math.floor(100000 + Math.random() * 900000), // demo
        date: new Date().toISOString(),
      });
    }, 2000);
  };

  return (

 <>{!fontsLoaded ? (<View/>):(

<LinearGradient
  colors={['#134e5e', '#71b280']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={globalStyles.container}
>
     
<ScrollView contentContainerStyle={styles.container}>
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
  <MaterialCommunityIcons name="credit-card-outline" size={28} 
  color="wheat" style={{ marginRight: 8 }} />
  <Text style={[styles.title, { fontSize: 24, 
    fontWeight: "bold", 
    color: "white" 
  }]}>
    Make a Payment
  </Text>
</View>


  {/* Country Selection */}
  <Text style={styles.label}>Country</Text>
  <TouchableOpacity
    style={styles.countryRow}
    onPress={() => setShowCountryPicker(true)}
    activeOpacity={0.9}
  >
    <Text style={styles.countryText}>
      {country.flag} {country.name}
    </Text>
    <Ionicons name="chevron-down" size={20} color="#444" />
  </TouchableOpacity>

  {/* Phone Number */}
  <Text style={styles.label}>Phone Number</Text>
  <View style={styles.phoneRow}>
    <View style={styles.countryCodeBox}>
      <Text style={styles.countryCode}>
        {country.flag} {country.code}
      </Text>
    </View>
    <TextInput
      style={styles.phoneInput}
      placeholder={`phone number ${country.code}`}
      keyboardType="number-pad"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      maxLength={12}
      placeholderTextColor="white"
    />
  </View>

  {/* Amount */}
  <Text style={styles.label}>Amount (TZS)</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter amount"
    keyboardType="numeric"
    placeholderTextColor="white"
    value={amount}
    onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ""))}
  />

  {/* Optional reference & email */}
  {/* <Text style={styles.label}>Reference (optional)</Text>
  <TextInput
    style={styles.input}
    placeholder="Eg: Order #A123"
    value={reference}
    onChangeText={setReference}
    placeholderTextColor="white"
  /> */}
  <Text style={styles.label}>Email (optional, for receipt)</Text>
  <TextInput
    style={styles.input}
    placeholder="eg: user@example.com"
    keyboardType="email-address"
    value={email}
    placeholderTextColor="white"
    onChangeText={setEmail}
    autoCapitalize="none"
  />

  {/* Pay Button */}
  <TouchableOpacity style={styles.payButton} onPress={handlePayment} activeOpacity={0.9}>
    <Text style={styles.payButtonText}>Pay Now</Text>
    <Ionicons name="lock-closed" size={18} color="#fff" style={{ marginLeft: 6 }} />
  </TouchableOpacity>

  {/* Loader Overlay (fancy) */}
  {loading && (
    <Modal transparent={true} animationType="fade">
      <View style={styles.loaderContainer}>
        <View style={styles.loaderCard}>
          <Animated.View
            style={[
              styles.ring,
              { transform: [{ rotate: spin }] },
            ]}
          />
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loaderText}>Processing payment...</Text>
          <Text style={styles.loaderSub}>Please wait</Text>
        </View>
      </View>
    </Modal>
  )}

  {/* Country Picker Modal */}
  <Modal visible={showCountryPicker} transparent animationType="slide">
    <View style={styles.modalBackdrop}>
      <View style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Country</Text>
          <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
            <Ionicons name="close" size={22} color="#111" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {countries.map((c) => {
            const selected = c.name === country.name;
            return (
              <TouchableOpacity
                key={c.code}
                style={[styles.countryItem, selected && styles.countryItemSelected]}
                onPress={() => {
                  setCountry(c);
                  setShowCountryPicker(false);
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.countryItemText}>
                  {c.flag} {c.name} ({c.code})
                </Text>
                {selected && <Ionicons name="checkmark-circle" size={18} color="#16a34a" />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  </Modal>
</ScrollView>


     </LinearGradient> 

     )}</>

  );
}



/** =======================
 *   STYLES
 *  ======================= */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    //backgroundColor: "#f9fafb",
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontFamily:'Bold',
    //fontWeight: "800",
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
    marginTop:40,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 8,
    color: "wheat",
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
    //backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
    color:'white',
  },
  input: {
    //backgroundColor: "#fff",
    padding: Platform.select({ ios: 14, android: 12 }),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
    color:'white',
    //backgroundColor: '#333',
  },
  payButton: {
    backgroundColor: "#015d68",
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
