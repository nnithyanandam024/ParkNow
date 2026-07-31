import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/navbar';
import { styles } from './ManualBookingStyles';

const ManualBooking = ({ onBack, onBookingSuccess, onNavigateToScanner }) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan / Hatchback');
  const [duration, setDuration] = useState('2 Hours');
  const [availableSlot, setAvailableSlot] = useState('Level 1 - A-102 (Standard)');

  const handleProceedPayment = () => {
    if (!customerName.trim() || !vehicleNumber.trim()) {
      Alert.alert('Missing Information', 'Please fill in Customer Name and Vehicle Number.');
      return;
    }

    // Call success check-in prop
    if (onBookingSuccess) {
      onBookingSuccess({
        name: customerName,
        lpn: vehicleNumber.toUpperCase(),
        slotClass: vehicleType.split(' / ')[0], // Sedan etc.
        lot: 'Central Plaza',
        zone: 'Zone A',
        slotNum: 'A-102',
        time: duration,
        payment: 'PAID',
      });
    }

    Alert.alert(
      'Booking Confirmed',
      'Walk-in entry has been logged and payment processed successfully!',
      [
        {
          text: 'OK',
          onPress: () => onBack(),
        },
      ]
    );
  };

  const handleAssignSlotOnly = () => {
    if (!customerName.trim() || !vehicleNumber.trim()) {
      Alert.alert('Missing Information', 'Please fill in Customer Name and Vehicle Number.');
      return;
    }
    Alert.alert('Slot Assigned', `Slot A-102 has been pre-assigned to vehicle ${vehicleNumber.toUpperCase()}. Proceed to payment to complete booking.`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar translucent={false} backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.75}>
            <Feather name="arrow-left" size={24} color="#0052cc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Booking</Text>
        </View>
        <TouchableOpacity onPress={() => Alert.alert('Menu', 'Options: Clear Form, Help')} activeOpacity={0.75}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Main Form Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Quick Walk-in Entry Banner */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>Quick Walk-in Entry</Text>
            <Text style={styles.bannerSub}>
              Efficiently log new arrivals and assign parking slots in real-time.
            </Text>
          </View>
          <View style={styles.bannerWatermarkContainer}>
            <Text style={styles.bannerWatermark}>P</Text>
          </View>
        </View>

        {/* Customer Details section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeaderRow}>
            <Feather name="user-plus" size={18} color="#0052cc" style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderTitle}>Customer Details</Text>
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Customer Name</Text>
            <View style={styles.inputFieldBox}>
              <Feather name="user" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. John Doe"
                placeholderTextColor="#94A3B8"
                value={customerName}
                onChangeText={setCustomerName}
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputFieldBox}>
              <Feather name="phone" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
        </View>

        {/* Vehicle Information section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="car-outline" size={20} color="#0052cc" style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderTitle}>Vehicle Information</Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Vehicle Number</Text>
            <View style={styles.inputFieldBox}>
              <Feather name="hash" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="ABC-1234"
                placeholderTextColor="#94A3B8"
                autoCapitalize="characters"
                autoCorrect={false}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Vehicle Type</Text>
            <TouchableOpacity 
              style={styles.dropdownBox}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Vehicle Type', 'Options: Sedan / Hatchback, SUV / MUV, Two Wheeler')}
            >
              <View style={styles.dropdownLeft}>
                <MaterialCommunityIcons name="car-select" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{vehicleType}</Text>
              </View>
              <Feather name="chevron-down" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Duration & Slot section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeaderRow}>
            <Feather name="clock" size={18} color="#0052cc" style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderTitle}>Duration & Slot</Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Booking Duration</Text>
            <View style={styles.chipsRow}>
              {['2 Hours', '4 Hours', 'Full Day', 'Custom'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.chip, duration === opt ? styles.chipActive : styles.chipInactive]}
                  onPress={() => setDuration(opt)}
                  activeOpacity={0.8}
                >
                  <Text style={duration === opt ? styles.chipTextActive : styles.chipTextInactive}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Available Slot</Text>
            <TouchableOpacity 
              style={styles.dropdownBox}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Available Slots', 'Level 1 - A-102, Level 1 - A-103, Level 2 - B-201')}
            >
              <View style={styles.dropdownLeft}>
                <MaterialCommunityIcons name="parking" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{availableSlot}</Text>
              </View>
              <Feather name="chevron-down" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Form Actions */}
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity 
              style={styles.assignSlotBtn}
              onPress={handleAssignSlotOnly}
              activeOpacity={0.85}
            >
              <Feather name="clipboard" size={18} color="#0052cc" style={{ marginRight: 8 }} />
              <Text style={styles.assignSlotBtnText}>Assign Slot</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.proceedPaymentBtn}
              onPress={handleProceedPayment}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name="credit-card-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.proceedPaymentBtnText}>Proceed Payment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SMS receipt alert card */}
        <View style={styles.smsAlertCard}>
          <Feather name="info" size={18} color="#16A34A" style={{ marginRight: 10, marginTop: 2 }} />
          <Text style={styles.smsAlertText}>
            Booking summary and digital receipt will be sent via SMS once payment is confirmed.
          </Text>
        </View>
      </ScrollView>

      {/* Global bottom Navbar configured to set Dashboard active */}
      <Navbar
        activeTab="Dashboard"
        onTabPress={(tab) => {
          if (tab === 'Dashboard') {
            onBack();
          } else if (tab === 'Scanner') {
            onNavigateToScanner();
          } else {
            onBack();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ManualBooking;
