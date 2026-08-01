import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './PaymentStyles';

const Payment = ({ parking, slotId, onBack, onPaySuccess }) => {
  const destinationName = parking?.name || 'Grand Central Parking';
  const rate = parking?.rate || 80;
  
  // Calculate price dynamically in Rupees
  const durationHours = 2;
  const baseRateTotal = rate * durationHours;
  const promoDiscount = Math.round(baseRateTotal * 0.1);
  const serviceFee = 10;
  const totalPrice = baseRateTotal - promoDiscount + serviceFee;

  // Selected payment method state
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Pay via any UPI App',
      icon: 'smartphone',
    },
    {
      id: 'card',
      title: 'Credit / Debit Card',
      subtitle: 'Visa, Mastercard, Amex',
      icon: 'credit-card',
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      subtitle: 'Secure login to your bank',
      icon: 'home',
    },
    {
      id: 'wallet',
      title: 'ParkNow Wallet',
      subtitle: 'Balance: ₹2,450.00',
      icon: 'pocket',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} /> {/* spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Booking Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <View style={styles.summaryTextCol}>
              <Text style={styles.parkingName} numberOfLines={1}>{destinationName}</Text>
              <Text style={styles.slotDetails}>Slot {slotId || 'B-12'} • Level 2</Text>
            </View>
            <View style={styles.totalCol}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>₹{totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <Icon name="clock" size={14} color="#0052cc" style={{ marginRight: 6 }} />
            <Text style={styles.timeText}>{durationHours} Hours • Today, 14:00 - 16:00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.spotRow}>
            <View style={styles.spotLeft}>
              <View style={styles.pBadge}>
                <Text style={styles.pBadgeText}>P</Text>
              </View>
              <Text style={styles.spotLabel}>Standard Spot</Text>
            </View>
            <View style={styles.confirmedBadge}>
              <Text style={styles.confirmedText}>Confirmed</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>SELECT PAYMENT METHOD</Text>
        <View style={styles.paymentMethodsList}>
          {paymentMethods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  isSelected && styles.paymentOptionSelected,
                ]}
                onPress={() => setSelectedMethod(method.id)}
                activeOpacity={0.8}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.iconCircle}>
                    <Icon name={method.icon} size={18} color="#0052cc" />
                  </View>
                  <View>
                    <Text style={styles.optionTitle}>{method.title}</Text>
                    <Text style={styles.optionSubtitle}>{method.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.radioOutline}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Security Notice */}
        <View style={styles.securityContainer}>
          <View style={styles.securityTitleRow}>
            <Icon name="shield" size={16} color="#16A34A" style={{ marginRight: 6 }} />
            <Text style={styles.securityTitle}>Secure 256-bit SSL Encrypted</Text>
          </View>
          <Text style={styles.securitySubtitle}>
            Your transaction is protected by advanced security protocols for global safety standards.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Footer Bar */}
      <View style={styles.footerBar}>
        <View style={styles.payableCol}>
          <Text style={styles.payableLabel}>Payable Amount</Text>
          <Text style={styles.payableValue}>₹{totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={onPaySuccess} activeOpacity={0.85}>
          <Text style={styles.payButtonText}>Pay Now</Text>
          <Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;
