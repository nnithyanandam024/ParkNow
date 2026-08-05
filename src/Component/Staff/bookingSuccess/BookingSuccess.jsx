import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import { styles } from './BookingSuccessStyles';

const BookingSuccess = ({ pendingBooking, onDone }) => {
  const [showQRModal, setShowQRModal] = useState(false);

  const bookingCode = pendingBooking?.bookingCode || pendingBooking?.code || 'PN-ST-88291';
  const bookingId   = pendingBooking?.bookingId || pendingBooking?.id || '#45';
  const slotId      = pendingBooking?.slotNum || 'B-12';
  const vehicleLpn  = pendingBooking?.lpn || 'ABC-1234';
  const duration    = pendingBooking?.time || '2 Hours';
  const location    = pendingBooking?.lot || 'BIT College Campus Parking';

  const qrPayload = JSON.stringify({
    passId: bookingCode,
    slotNum: slotId,
    lpn: vehicleLpn,
  });

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
            <Text style={styles.bookingIdText}>{bookingCode}</Text>
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

          {/* Vehicle Number & Duration Row */}
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
            style={[styles.qrCodeBtn, { backgroundColor: '#0052cc', marginBottom: 12 }]} 
            activeOpacity={0.85}
            onPress={() => setShowQRModal(true)}
          >
            <MaterialCommunityIcons name="qrcode-scan" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.qrCodeBtnText}>Show QR Pass</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.qrCodeBtn, { backgroundColor: '#475569' }]} 
            activeOpacity={0.85}
            onPress={() => Alert.alert('Print Ticket', 'Printing physical ticket receipt for driver...')}
          >
            <Feather name="printer" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.qrCodeBtnText}>Print Ticket</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDone} style={styles.doneBtn} activeOpacity={0.7}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ── QR Code Pass Modal ── */}
      <Modal
        visible={showQRModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQRModal(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
          activeOpacity={1}
          onPress={() => setShowQRModal(false)}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: 24,
              alignItems: 'center',
            }}
            onStartShouldSetResponder={() => true}
          >
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F172A' }}>Digital Entry Pass</Text>
              <TouchableOpacity onPress={() => setShowQRModal(false)}>
                <Feather name="x" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* SVG QR Code */}
            <View style={{
              backgroundColor: '#FFFFFF',
              padding: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#EFF6FF',
              marginVertical: 12,
              alignItems: 'center',
              shadowColor: '#0052cc',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 4,
            }}>
              <QRCode
                value={qrPayload}
                size={180}
                color="#0F172A"
                backgroundColor="#FFFFFF"
              />
            </View>

            <Text style={{ fontSize: 16, fontWeight: '800', color: '#0052cc', marginTop: 10, letterSpacing: 1 }}>
              {bookingCode}
            </Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4, fontWeight: '600' }}>
              Slot: {slotId} • Vehicle: {vehicleLpn}
            </Text>

            <TouchableOpacity
              style={{
                width: '100%',
                height: 48,
                backgroundColor: '#0052cc',
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={() => setShowQRModal(false)}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800' }}>Close Pass</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default BookingSuccess;
