import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './BookingSuccessStyles';

const BookingSuccess = ({ pendingBooking, onDone }) => {
  const bookingId = pendingBooking?.bookingId || '#PN-88291';
  const slotId = pendingBooking?.slotNum || 'B-12';
  const vehicleLpn = pendingBooking?.lpn || 'ABC-1234';
  const duration = pendingBooking?.time || '2 Hours';
  const location = 'Grand Central Parking';

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Success Icon Header */}
        <View style={styles.headerContainer}>
          <View style={styles.checkCircle}>
            <MaterialCommunityIcons name="check" size={60} color="#16A34A" />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your parking spot has been successfully reserved. Park easily and enjoy your day.
          </Text>
        </View>

        {/* Ticket Details Card */}
        <View style={styles.ticketCard}>
          {/* Booking ID Row */}
          <View style={styles.ticketHeaderRow}>
            <Text style={styles.fieldLabel}>BOOKING ID</Text>
            <Text style={styles.bookingIdText}>{bookingId}</Text>
          </View>
          
          <View style={styles.divider} />

          {/* Slot Number & Status Row */}
          <View style={styles.ticketRow}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>SLOT NUMBER</Text>
              <Text style={styles.slotNumberText}>{slotId}</Text>
            </View>
            <View style={[styles.col, { alignItems: 'flex-end' }]}>
              <Text style={styles.fieldLabel}>STATUS</Text>
              <View style={styles.statusRow}>
                <View style={styles.greenDot} />
                <Text style={styles.statusText}>Reserved</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Vehicle Number & Duration Row (Added below slot number) */}
          <View style={styles.ticketRow}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>VEHICLE NUMBER</Text>
              <Text style={styles.vehicleText}>{vehicleLpn}</Text>
            </View>
            <View style={[styles.col, { alignItems: 'flex-end' }]}>
              <Text style={styles.fieldLabel}>DURATION</Text>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Parking Location Row */}
          <View style={styles.locationContainer}>
            <Text style={styles.fieldLabel}>PARKING LOCATION</Text>
            <View style={styles.locationValueRow}>
              <Feather name="map-pin" size={16} color="#0052cc" style={{ marginRight: 6 }} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.qrCodeBtn} 
            activeOpacity={0.85}
            onPress={() => Alert.alert('Print Receipt', 'Sending ticket print command to terminal...')}
          >
            <Feather name="printer" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.qrCodeBtnText}>Print QR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDone} style={styles.doneBtn} activeOpacity={0.7}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default BookingSuccess;
