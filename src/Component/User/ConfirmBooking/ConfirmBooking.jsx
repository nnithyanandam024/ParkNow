import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './ConfirmBookingStyles';

const ConfirmBooking = ({ parking, slotId, onBack, onConfirm }) => {
  // Use details of the selected parking or fallback to mockup values
  const destinationName = parking?.name || 'Westside Premium Parking';
  const address = parking?.address || parking?.street 
    ? `${parking.street}, ${parking.city || 'New York'}` 
    : '123 Urban Plaza, Downtown District';
  const rate = parking?.rate || 80;
  
  // Calculate price in rupees
  const durationHours = 2;
  const baseRateTotal = rate * durationHours;
  const promoDiscount = Math.round(baseRateTotal * 0.1); // 10% discount
  const serviceFee = 10;
  const totalPrice = baseRateTotal - promoDiscount + serviceFee;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={{ width: 24 }} /> {/* spacer to align title */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Destination Card */}
        <View style={styles.card}>
          <View style={styles.destHeaderRow}>
            <View>
              <Text style={styles.cardLabel}>DESTINATION</Text>
              <Text style={styles.destTitle}>{destinationName}</Text>
            </View>
            <View style={styles.pBadge}>
              <Text style={styles.pBadgeText}>P</Text>
            </View>
          </View>
          <Text style={styles.destAddress}>
            <Icon name="map-pin" size={12} color="#64748B" /> {address}
          </Text>
          
          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Assigned Slot</Text>
              <Text style={styles.metaValue}>{slotId || 'A-12'}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{durationHours} Hours</Text>
            </View>
          </View>

          {/* Date & Time Container */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeRow}>
              <View style={styles.iconBackground}>
                <Icon name="calendar" size={16} color="#0052cc" />
              </View>
              <View>
                <Text style={styles.dateTimeLabel}>Date</Text>
                <Text style={styles.dateTimeValue}>Oct 24, 2023</Text>
              </View>
            </View>
            <View style={[styles.dateTimeRow, { marginTop: 12 }]}>
              <View style={styles.iconBackground}>
                <Icon name="clock" size={16} color="#0052cc" />
              </View>
              <View>
                <Text style={styles.dateTimeLabel}>Time Window</Text>
                <Text style={styles.dateTimeValue}>09:00 AM - 11:00 AM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vehicle Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Icon name="truck" size={18} color="#0F172A" style={{ marginRight: 8 }} />
              <Text style={styles.cardHeaderTitle}>Vehicle Info</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleDetailsRow}>
            <View style={styles.carIconContainer}>
              <Icon name="tag" size={20} color="#0052cc" />
            </View>
            <View>
              <Text style={styles.licensePlate}>ABC-1234</Text>
              <Text style={styles.vehicleModel}>Tesla Model 3 • Midnight Silver</Text>
            </View>
          </View>
        </View>

        {/* Price Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderLeft}>
            <Icon name="credit-card" size={18} color="#0F172A" style={{ marginRight: 8, marginBottom: 14 }} />
            <Text style={[styles.cardHeaderTitle, { marginBottom: 14 }]}>Price Details</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Rate (₹{rate}/hr x {durationHours} hrs)</Text>
            <Text style={styles.priceValue}>₹{baseRateTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.promoLabel}>🏷️ Promo Code (SAVE10)</Text>
            <Text style={styles.promoValue}>-₹{promoDiscount.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>₹{serviceFee.toFixed(2)}</Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={[styles.priceRow, { marginTop: 10 }]}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalValue}>₹{totalPrice.toFixed(2)}</Text>
          </View>

          {/* Payment Method Option */}
          <TouchableOpacity style={styles.paymentMethodRow} activeOpacity={0.8}>
            <View style={styles.paymentLeft}>
              <View style={styles.visaBadge}>
                <Text style={styles.visaText}>VISA</Text>
              </View>
              <Text style={styles.cardDigits}>•••• 4242</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Cancellation Notice */}
        <View style={styles.noticeRow}>
          <Icon name="info" size={16} color="#64748B" style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.noticeText}>
            Free cancellation up to 30 minutes before your start time. After that, a ₹50.00 cancellation fee applies.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Floating Confirm Button */}
      <View style={styles.footerButtonContainer} pointerEvents="box-none">
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.85}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          <Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmBooking;
