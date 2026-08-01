import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Linking,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './BookingDetailsStyles';

const BookingDetails = ({ booking, onBack }) => {
  if (!booking) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No booking details available.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Prepend #PN- to booking id if it doesn't already have it
  const bookingId = booking.id ? (booking.id.startsWith('#') ? booking.id : `#PN-88${booking.id}`) : '#PN-8829';
  
  // Parse slot area
  const locationName = booking.locationName || 'Downtown Plaza • Floor 2';
  const durationText = booking.isOverdue ? 'Duration: Overdue' : 'Duration: 2 Hours';
  const displayAmount = booking.amount ? `$${booking.amount.toFixed(2)}` : '$12.50';
  const paymentMethodText = booking.paymentMethod || 'Paid via UPI';

  const handleCallPress = () => {
    const phoneNumber = booking.phone || '+1 (555) 012-3456';
    Alert.alert(
      'Call Customer',
      `Would you like to call ${booking.name} at ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL(`tel:${phoneNumber}`).catch(() => Alert.alert('Error', 'Unable to initiate call.')) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.75}>
            <Feather name="arrow-left" size={24} color="#0052cc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120' }}
          style={styles.avatar}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Booking ID & Status Badge Row */}
        <View style={styles.bookingIdRow}>
          <View>
            <Text style={styles.bookingIdLabel}>BOOKING ID</Text>
            <Text style={styles.bookingIdText}>{bookingId}</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusBadgeText}>Active</Text>
          </View>
        </View>

        {/* Customer Card */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.userIconBg}>
              <Feather name="user" size={22} color="#1D64C6" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>CUSTOMER</Text>
              <Text style={styles.cardTitle}>{booking.name}</Text>
              <Text style={styles.cardSub}>{booking.phone || '+1 (555) 012-3456'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCallPress} activeOpacity={0.7}>
            <Feather name="phone" size={20} color="#0052cc" />
          </TouchableOpacity>
        </View>

        {/* Vehicle Card */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.vehicleIconBg}>
              <MaterialCommunityIcons name="car" size={22} color="#0052cc" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={[styles.cardLabel, { color: '#0052cc' }]}>VEHICLE</Text>
              <Text style={styles.cardTitle}>{booking.lpn}</Text>
              <Text style={styles.cardSub}>{booking.model}</Text>
            </View>
          </View>
        </View>

        {/* Location Card */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.locationIconBg}>
              <Text style={styles.pIconText}>P</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={[styles.cardLabel, { color: '#0052cc' }]}>LOCATION</Text>
              <Text style={styles.cardTitle}>{booking.slot}</Text>
              <Text style={styles.cardSub}>{locationName}</Text>
            </View>
          </View>
        </View>

        {/* Schedule & Amount Card */}
        <View style={styles.scheduleAmountCard}>
          <View style={styles.scheduleCol}>
            <Text style={styles.cardLabel}>SCHEDULE</Text>
            <View style={styles.scheduleTimeRow}>
              <Text style={styles.scheduleTimeText}>{booking.time}</Text>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={16} 
                color="#16A34A" 
                style={{ marginLeft: 6 }} 
              />
            </View>
            <Text style={styles.cardSub}>{durationText}</Text>
          </View>

          <View style={styles.amountCol}>
            <Text style={styles.cardLabel}>AMOUNT</Text>
            <Text style={styles.amountText}>{displayAmount}</Text>
            <Text style={styles.paymentStatusText}>{paymentMethodText}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDetails;
