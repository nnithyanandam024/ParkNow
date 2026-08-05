import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './BookingsScreenStyles';
import { supabase } from '../../../config/supabase';
import { realtimeService } from '../../../services/realtimeService';

// Map Supabase statuses to display tabs
const STATUS_TO_TAB = {
  CONFIRMED: 'Upcoming',
  PENDING:   'Upcoming',
  CHECKED_IN: 'Upcoming',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const STATUS_LABEL = {
  CONFIRMED:  'Confirmed',
  PENDING:    'Pending',
  CHECKED_IN: 'Active',
  COMPLETED:  'Finished',
  CANCELLED:  'Cancelled',
};

// Hardcoded user_id for demo — replace with auth session user_id when auth is wired up
const CURRENT_USER_ID = 4;

const BookingsScreen = ({ onViewDetails }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['Upcoming', 'Completed', 'Cancelled'];

  // ─── Fetch bookings from Supabase ─────────────────────────────────────────
  async function loadBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          booking_id,
          booking_code,
          status,
          start_time,
          end_time,
          total_amount,
          parking_locations (name, address),
          parking_slots (slot_number, floor_level),
          vehicles (vehicle_number, vehicle_type, model_name)
        `)
        .eq('user_id', CURRENT_USER_ID)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const mapped = (data || []).map((b) => {
        const startTime = b.start_time ? new Date(b.start_time) : now;
        const endTime = b.end_time ? new Date(b.end_time) : new Date(startTime.getTime() + 2 * 3600000);
        const isPast = endTime < now || startTime.getTime() + 3600000 < now.getTime();

        let tabName = 'Upcoming';
        if (b.status === 'CANCELLED') {
          tabName = 'Cancelled';
        } else if (b.status === 'COMPLETED' || isPast) {
          tabName = 'Completed';
        }

        let statusLabel = STATUS_LABEL[b.status] || b.status;
        if (isPast && b.status !== 'CANCELLED') {
          statusLabel = 'Finished';
        }

        return {
          id:           String(b.booking_id),
          code:         b.booking_code,
          name:         b.parking_locations?.name || 'BIT College Campus Parking',
          slotNum:      b.parking_slots?.slot_number || 'A-101',
          status:       statusLabel,
          tab:          tabName,
          rawStartTime: b.start_time,
          date:         startTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          time:         startTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          price:        `₹${Number(b.total_amount || 40).toFixed(2)}`,
          vehicle:      b.vehicles?.vehicle_number || 'TN-38-AB-1234',
          model:        b.vehicles?.model_name || '',
        };
      });

      setBookings(mapped);
    } catch (e) {
      console.log('BookingsScreen load error:', e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();

    // Real-time: reload whenever any booking for this user is inserted/updated
    const channel = realtimeService.subscribeToBookings((payload) => {
      if (
        payload.eventType === 'INSERT' ||
        payload.eventType === 'UPDATE'
      ) {
        loadBookings();
      }
    });

    return () => realtimeService.unsubscribe(channel);
  }, []);

  // ─── Render helpers ────────────────────────────────────────────────────────
  const getFilteredBookings = () => bookings.filter((b) => b.tab === activeTab);

  const getPastBookings = () => bookings.filter((b) => b.tab !== 'Upcoming');

  const renderCard = (booking) => {
    let badgeStyle     = styles.badgeConfirmed;
    let badgeTextStyle = styles.badgeTextConfirmed;
    let priceStyle     = styles.price;
    let buttonStyle    = styles.viewDetailsBtn;
    let buttonTextStyle = styles.viewDetailsBtnText;

    if (booking.status === 'Finished') {
      badgeStyle     = styles.badgeFinished;
      badgeTextStyle = styles.badgeTextFinished;
      priceStyle     = styles.priceFinished;
      buttonStyle    = [styles.viewDetailsBtn, styles.viewDetailsBtnFinished];
      buttonTextStyle = [styles.viewDetailsBtnText, styles.viewDetailsBtnTextFinished];
    } else if (booking.status === 'Cancelled') {
      badgeStyle     = styles.badgeCancelled;
      badgeTextStyle = styles.badgeTextCancelled;
      priceStyle     = styles.priceCancelled;
      buttonStyle    = [styles.viewDetailsBtn, styles.viewDetailsBtnFinished];
      buttonTextStyle = [styles.viewDetailsBtnText, styles.viewDetailsBtnTextFinished];
    } else if (booking.status === 'Active') {
      badgeStyle     = styles.badgeConfirmed;
      badgeTextStyle = styles.badgeTextConfirmed;
    }

    return (
      <View key={booking.id} style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {booking.name}
          </Text>
          <View style={[styles.badge, badgeStyle]}>
            <Text style={badgeTextStyle}>{booking.status}</Text>
          </View>
        </View>

        {/* Booking Code Row */}
        <View style={styles.dateTimeRow}>
          <FeatherIcon name="tag" size={12} color="#6B7280" />
          <Text style={[styles.dateTimeText, { marginLeft: 4, fontSize: 11, color: '#9CA3AF' }]}>
            {booking.code}  •  Slot {booking.slotNum}
          </Text>
        </View>

        <View style={styles.dateTimeRow}>
          <FeatherIcon name="clock" size={14} color="#6B7280" />
          <Text style={styles.dateTimeText}>
            {booking.date} | {booking.time}
          </Text>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.cardBottom}>
          <Text style={priceStyle}>{booking.price}</Text>
          <TouchableOpacity
            style={buttonStyle}
            activeOpacity={0.7}
            onPress={() => onViewDetails?.(booking.name, booking.slotNum, booking)}
          >
            <Text style={buttonTextStyle}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FeatherIcon name="file-text" size={24} color="#1A5FB4" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>My Bookings</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1A5FB4" />
          <Text style={{ marginTop: 12, color: '#64748B', fontSize: 14 }}>Loading your bookings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FeatherIcon name="file-text" size={24} color="#1A5FB4" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      {/* Selection Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const count = bookings.filter((b) => b.tab === tab).length;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}{count > 0 ? ` (${count})` : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Scrollable Bookings List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <FeatherIcon name="calendar" size={48} color="#CBD5E1" />
            <Text style={{ marginTop: 16, color: '#94A3B8', fontSize: 15, fontWeight: '600' }}>
              No {activeTab} Bookings
            </Text>
            <Text style={{ marginTop: 6, color: '#CBD5E1', fontSize: 13 }}>
              Your {activeTab.toLowerCase()} bookings will appear here
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => renderCard(booking))
        )}

        {/* Past Bookings section shown below Upcoming */}
        {activeTab === 'Upcoming' && getPastBookings().length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#4B5563' }}>
                Past Bookings
              </Text>
            </View>
            {getPastBookings().map((booking) => renderCard(booking))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingsScreen;
