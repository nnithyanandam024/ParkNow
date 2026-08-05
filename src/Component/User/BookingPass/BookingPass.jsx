import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';
import { styles } from './BookingPassStyles';
import { realtimeService } from '../../../services/realtimeService';
import { supabase } from '../../../config/supabase';

const BookingPass = ({ parking, slotId, bookingData = null, onBack, onNavigateToSlot }) => {
  const [dbBooking, setDbBooking] = useState(bookingData);

  const uniquePassIdRef = useRef(
    bookingData?.booking_code ||
      `PKN-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const uniquePassId = uniquePassIdRef.current;

  // 1. Fetch exact booking row from Supabase DB table `public.bookings`
  useEffect(() => {
    let isMounted = true;
    async function fetchBookingFromDB() {
      try {
        const bId = bookingData?.booking_id;
        const bCode = bookingData?.booking_code || uniquePassId;

        let query = supabase.from('bookings').select(`
          *,
          parking_locations (name, address),
          parking_slots (slot_number, floor_level),
          vehicles (vehicle_number, vehicle_type)
        `);

        if (bId) {
          query = query.eq('booking_id', bId);
        } else if (bCode) {
          query = query.eq('booking_code', bCode);
        } else {
          query = query.order('created_at', { ascending: false }).limit(1);
        }

        const { data, error } = await query.single();
        if (data && !error && isMounted) {
          setDbBooking(data);
        }
      } catch (err) {
        console.warn('BookingPass DB Fetch Note:', err);
      }
    }

    fetchBookingFromDB();
    return () => {
      isMounted = false;
    };
  }, [bookingData, uniquePassId]);

  const destinationName =
    parking?.name ||
    dbBooking?.parking_locations?.name ||
    bookingData?.parking_locations?.name ||
    'BIT College Campus Parking';

  const slotDisplay =
    dbBooking?.parking_slots?.slot_number ||
    slotId ||
    bookingData?.parking_slots?.slot_number ||
    bookingData?.slot_number ||
    'A-101';

  const vehiclePlate =
    dbBooking?.vehicles?.vehicle_number ||
    bookingData?.vehicle_number ||
    'TN-38-AB-1234';

  const floorLevel =
    dbBooking?.parking_slots?.floor_level ||
    'Floor 1';

  // 2. Format Stored Database Booking Date & Time from public.bookings
  const storedBookingDateTime = useMemo(() => {
    const rawTime =
      dbBooking?.start_time ||
      dbBooking?.created_at ||
      bookingData?.start_time ||
      bookingData?.created_at;

    if (rawTime) {
      const dt = new Date(rawTime);
      if (!isNaN(dt.getTime())) {
        const dateStr = dt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const timeStr = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${dateStr} • ${timeStr}`;
      }
    }

    // Default to current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} • ${timeStr}`;
  }, [dbBooking, bookingData]);

  // 3. Static Single Unique QR Payload
  const staticQRValue = useMemo(() => {
    return JSON.stringify({
      passId: dbBooking?.booking_code || uniquePassId,
      location: destinationName,
      slot: slotDisplay,
      level: floorLevel,
    });
  }, [uniquePassId, dbBooking, destinationName, slotDisplay, floorLevel]);

  // 4. Live WebSockets Channel Status Listener
  const [passStatus, setPassStatus] = useState(dbBooking?.status || bookingData?.status || 'CONFIRMED');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const channel = realtimeService.subscribeToBookings((payload) => {
      if (
        payload.new &&
        (payload.new.booking_code === uniquePassId ||
          String(payload.new.booking_id) === String(dbBooking?.booking_id || bookingData?.booking_id))
      ) {
        console.log('[Realtime BookingPass] Status updated:', payload.new.status);
        setPassStatus(payload.new.status || 'CONFIRMED');
      }
    });

    return () => {
      realtimeService.unsubscribe(channel);
    };
  }, [uniquePassId, dbBooking, bookingData]);

  // ── Handle Cancel Slot Reservation & Update DB Tables ─────────────────────
  const handleCancelSlot = () => {
    if (passStatus === 'CANCELLED') {
      Alert.alert('Already Cancelled', 'This slot reservation has already been cancelled.');
      return;
    }

    Alert.alert(
      'Cancel Slot Reservation',
      `Are you sure you want to cancel your reservation for Slot ${slotDisplay}? The slot will be released in the database.`,
      [
        { text: 'Keep Slot', style: 'cancel' },
        {
          text: 'Cancel Slot',
          style: 'destructive',
          onPress: async () => {
            setIsCancelling(true);
            try {
              let bId = dbBooking?.booking_id || bookingData?.booking_id || bookingData?.id;
              let bCode = dbBooking?.booking_code || bookingData?.booking_code || bookingData?.code || uniquePassId;
              let slotRawId = dbBooking?.slot_id || bookingData?.slot_id || bookingData?.rawSlotId;

              // Fallback: If slotRawId is missing, query bookings table for slot_id
              if (!slotRawId && (bId || bCode)) {
                let lookupQuery = supabase.from('bookings').select('booking_id, slot_id');
                if (bId) lookupQuery = lookupQuery.eq('booking_id', bId);
                else if (bCode) lookupQuery = lookupQuery.eq('booking_code', bCode);
                const { data: bLook } = await lookupQuery.maybeSingle();

                if (bLook) {
                  if (bLook.booking_id) bId = bLook.booking_id;
                  if (bLook.slot_id) slotRawId = bLook.slot_id;
                }
              }

              // 1. Update public.bookings DB Table -> CANCELLED
              let query = supabase.from('bookings').update({ status: 'CANCELLED' });
              if (bId) query = query.eq('booking_id', bId);
              else if (bCode) query = query.eq('booking_code', bCode);
              const { error: errBooking } = await query;

              if (errBooking) console.warn('Booking cancel warning:', errBooking.message);

              // 2. Update public.parking_slots DB Table -> AVAILABLE
              if (slotRawId) {
                await supabase
                  .from('parking_slots')
                  .update({ status: 'AVAILABLE' })
                  .eq('slot_id', slotRawId);
              }

              // 3. Update public.payments DB Table -> REFUNDED
              if (bId) {
                await supabase
                  .from('payments')
                  .update({ payment_status: 'REFUNDED' })
                  .eq('booking_id', bId);
              }

              // 4. Log in public.verification_logs DB Table
              await supabase.from('verification_logs').insert([
                {
                  booking_id: bId || null,
                  action: 'SLOT_CANCELLED',
                  status: 'SUCCESS',
                  remarks: `Slot ${slotDisplay} reservation cancelled by user`,
                },
              ]);

              setPassStatus('CANCELLED');
              Alert.alert('Slot Cancelled', `Slot ${slotDisplay} reservation cancelled successfully. The slot is now available.`);
            } catch (err) {
              console.error('Cancel Slot Error:', err);
              Alert.alert('Error', 'Failed to cancel slot reservation.');
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#1A1D20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Pass</Text>
        <View style={styles.avatar}>
          <Icon name="user" size={16} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pass Card Container */}
        <View style={styles.passCard}>
          {/* Top section */}
          <View style={styles.cardTop}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationLabel}>PARKING LOCATION</Text>
              <View style={[styles.confirmedBadge, passStatus === 'CHECKED_IN' && { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.confirmedText, passStatus === 'CHECKED_IN' && { color: '#15803D' }]}>
                  {passStatus}
                </Text>
              </View>
            </View>
            <Text style={styles.locationName}>{destinationName}</Text>

            <View style={styles.metaRow}>
              <View>
                <Text style={styles.metaLabel}>Booking ID</Text>
                <Text style={styles.metaValue}>{dbBooking?.booking_code || uniquePassId}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>Booking Date & Time</Text>
                <Text style={styles.metaValue}>{storedBookingDateTime}</Text>
              </View>
            </View>
          </View>

          {/* Ticket Tear line */}
          <View style={styles.tearLineContainer}>
            <View style={styles.leftCircleCutout} />
            <View style={styles.dashedLine} />
            <View style={styles.rightCircleCutout} />
          </View>

          {/* Static Unique QR Code middle section */}
          <View style={styles.cardMiddle}>
            <View style={styles.qrScannerFrame}>
              {/* Corner brackets */}
              <View style={[styles.cornerBracket, styles.topLeftBracket]} />
              <View style={[styles.cornerBracket, styles.topRightBracket]} />
              <View style={[styles.cornerBracket, styles.bottomLeftBracket]} />
              <View style={[styles.cornerBracket, styles.bottomRightBracket]} />

              {/* Real QR Container */}
              <View style={styles.qrWrapper}>
                <QRCode
                  value={staticQRValue}
                  size={120}
                  color="#1A1D20"
                  backgroundColor="#FFFFFF"
                />
              </View>
            </View>
            <Text style={styles.scanNotice}>Scan at the entrance gate scanner</Text>
          </View>

          {/* Ticket Footer details */}
          <View style={styles.cardBottom}>
            <View style={styles.footerCol}>
              <Text style={styles.footerLabel}>SLOT</Text>
              <Text style={styles.footerValue}>{slotDisplay}</Text>
            </View>
            <View style={styles.footerDivider} />
            <View style={styles.footerCol}>
              <Text style={styles.footerLabel}>VEHICLE</Text>
              <Text style={styles.footerValue}>{vehiclePlate}</Text>
            </View>
            <View style={styles.footerDivider} />
            <View style={styles.footerCol}>
              <Text style={styles.footerLabel}>LEVEL</Text>
              <Text style={styles.footerValue}>{floorLevel}</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {passStatus !== 'CANCELLED' ? (
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={onNavigateToSlot}
              activeOpacity={0.85}
            >
              <Icon name="navigation" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.navigateButtonText}>Navigate to Slot</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.navigateButton, { backgroundColor: '#F1F5F9', borderColor: '#CBD5E1', borderWidth: 1 }]}>
              <Icon name="x-circle" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
              <Text style={[styles.navigateButtonText, { color: '#64748B' }]}>Slot Reservation Cancelled</Text>
            </View>
          )}

          {/* Cancel Slot Button */}
          {passStatus !== 'CANCELLED' && (
            <TouchableOpacity
              style={{
                backgroundColor: '#FEE2E2',
                borderRadius: 20,
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: '#FCA5A5',
              }}
              onPress={handleCancelSlot}
              disabled={isCancelling}
              activeOpacity={0.85}
            >
              {isCancelling ? (
                <ActivityIndicator size="small" color="#EF4444" style={{ marginRight: 8 }} />
              ) : (
                <Icon name="x-circle" size={18} color="#EF4444" style={{ marginRight: 8 }} />
              )}
              <Text style={{ color: '#EF4444', fontSize: 14, fontWeight: '800' }}>
                {isCancelling ? 'Cancelling Slot...' : 'Cancel Slot Reservation'}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.secondaryButtonRow}>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Icon name="download" size={16} color="#4B5563" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryButtonText}>Download QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Icon name="share-2" size={16} color="#4B5563" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryButtonText}>Share QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingPass;
