import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Navbar from '../components/navbar';
import { styles } from './BookingsListStyles';
import { supabase } from '../../../config/supabase';
import { realtimeService } from '../../../services/realtimeService';

const BookingsList = ({ onNavigateToScreen }) => {
  const [searchText, setSearchText] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const FALLBACK_BOOKINGS = [
    { id: '1', name: 'Marcus Holloway', initials: 'MH', avatarBg: '#EFF6FF', avatarColor: '#1D64C6', lpn: 'ABC-1234', model: 'Tesla Model 3', status: 'Parked', slot: 'Slot A-12', time: '14:00 - 16:00' },
    { id: '2', name: 'Sarah Rogers', initials: 'SR', avatarBg: '#FEF3C7', avatarColor: '#D97706', lpn: 'XYZ-9876', model: 'Audi E-Tron', status: 'Expected', slot: 'Slot B-04', time: '16:30 - 18:30' },
    { id: '3', name: 'David Kim', initials: 'DK', avatarBg: '#FEE2E2', avatarColor: '#EF4444', lpn: 'EVO-4421', model: 'BMW i4', status: 'Overdue', slot: 'Slot C-22', time: '15:00 (Alert)', isOverdue: true },
  ];
  const [bookings, setBookings] = useState(FALLBACK_BOOKINGS);

  useEffect(() => {
    async function loadLiveBookings() {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            booking_id, booking_code, status, start_time, end_time,
            users (full_name),
            parking_slots (slot_number),
            vehicles (vehicle_number, model_name)
          `)
          .in('status', ['CONFIRMED', 'CHECKED_IN', 'PENDING'])
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map((b) => {
            const name = b.users?.full_name || 'Customer';
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            const statusMap = { CONFIRMED: 'Expected', CHECKED_IN: 'Parked', PENDING: 'Expected' };
            return {
              id: String(b.booking_id),
              name,
              initials,
              avatarBg: '#EFF6FF',
              avatarColor: '#1D64C6',
              lpn: b.vehicles?.vehicle_number || 'N/A',
              model: b.vehicles?.model_name || 'Vehicle',
              status: statusMap[b.status] || b.status,
              slot: b.parking_slots?.slot_number || 'Auto-Assign',
              time: `${new Date(b.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(b.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
            };
          });
          setBookings(mapped);
        }
      } catch (e) {
        console.log('BookingsList Supabase load error:', e);
      }
    }
    loadLiveBookings();

    // Real-time: reload full list whenever a booking is added or updated
    const channel = realtimeService.subscribeToBookings((payload) => {
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        loadLiveBookings();
      }
      if (payload.eventType === 'UPDATE' && payload.new?.status === 'COMPLETED') {
        setBookings((prev) => prev.filter((b) => b.id !== String(payload.new.booking_id)));
      }
    });

    return () => realtimeService.unsubscribe(channel);
  }, []);

  const handleActionPress = (booking) => {
    if (booking.status === 'Expected') {
      setBookings(prev =>
        prev.map(b => b.id === booking.id ? { ...b, status: 'Parked', time: 'Just Now - 2 Hours' } : b)
      );
      Alert.alert('Checked In', `${booking.name} has been checked in successfully!`);
    } else {
      setBookings(prev => prev.filter(b => b.id !== booking.id));
      Alert.alert('Checked Out', `${booking.name} has been checked out successfully!`);
    }
  };

  const handleViewDetails = (booking) => {
    Alert.alert(
      'Booking Details',
      `Customer: ${booking.name}\nVehicle: ${booking.lpn} (${booking.model})\nAssigned Slot: ${booking.slot}\nTime Window: ${booking.time}\nStatus: ${booking.status}`
    );
  };

  const getFilteredBookings = () => {
    return bookings.filter(b => {
      // Search matching
      const matchesSearch = 
        b.name.toLowerCase().includes(searchText.toLowerCase()) ||
        b.lpn.toLowerCase().includes(searchText.toLowerCase()) ||
        b.model.toLowerCase().includes(searchText.toLowerCase());

      if (!matchesSearch) return false;

      // Chip matching
      if (activeChip === 'All') return true;
      if (activeChip === 'Arriving') return b.status === 'Expected';
      if (activeChip === 'Parked') return b.status === 'Parked';
      if (activeChip === 'Overdue') return b.status === 'Overdue';

      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>ParkNow Staff</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120' }}
          style={styles.avatar}
        />
      </View>

      {/* Search and Filters panel */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search by name or plate..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
          />
          <TouchableOpacity>
            <Feather name="sliders" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Chips row */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.chipsScroll}
        >
          {['All', 'Arriving', 'Parked', 'Overdue'].map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[
                styles.chip,
                activeChip === chip ? styles.chipActive : styles.chipInactive
              ]}
              onPress={() => setActiveChip(chip)}
              activeOpacity={0.8}
            >
              <Text style={activeChip === chip ? styles.chipTextActive : styles.chipTextInactive}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List of bookings */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <View key={b.id} style={styles.bookingCard}>
              <View style={styles.cardHeaderRow}>
                {/* Left Profile Initial */}
                <View style={[styles.initialCircle, { backgroundColor: b.avatarBg }]}>
                  <Text style={[styles.initialText, { color: b.avatarColor }]}>{b.initials}</Text>
                </View>
                {/* Middle details */}
                <View style={styles.cardHeaderDetails}>
                  <Text style={styles.cardCustomerName}>{b.name}</Text>
                  <Text style={styles.cardVehicleMeta}>{b.lpn} • {b.model}</Text>
                </View>
                {/* Status indicator badge */}
                <View style={[
                  styles.statusBadge,
                  b.status === 'Parked' && styles.badgeParked,
                  b.status === 'Expected' && styles.badgeExpected,
                  b.status === 'Overdue' && styles.badgeOverdue,
                ]}>
                  <Text style={[
                    styles.statusBadgeText,
                    b.status === 'Parked' && styles.badgeTextParked,
                    b.status === 'Expected' && styles.badgeTextExpected,
                    b.status === 'Overdue' && styles.badgeTextOverdue,
                  ]}>
                    {b.status === 'Overdue' ? 'Overdue (+15m)' : b.status}
                  </Text>
                </View>
              </View>

              {/* Inner Details Container */}
              <View style={styles.innerPanel}>
                <View style={styles.innerMetaCol}>
                  <View style={styles.innerMetaRow}>
                    <Feather name="map-pin" size={14} color="#0052cc" style={{ marginRight: 6 }} />
                    <Text style={styles.innerMetaLabel}>SLOT</Text>
                  </View>
                  <Text style={styles.innerMetaValue}>{b.slot}</Text>
                </View>

                <View style={styles.innerMetaCol}>
                  <View style={styles.innerMetaRow}>
                    <Feather name="clock" size={14} color={b.isOverdue ? '#EF4444' : '#0052cc'} style={{ marginRight: 6 }} />
                    <Text style={[styles.innerMetaLabel, b.isOverdue && { color: '#EF4444' }]}>
                      {b.isOverdue ? 'SCHEDULED END' : 'TIME'}
                    </Text>
                  </View>
                  <Text style={[styles.innerMetaValue, b.isOverdue && { color: '#EF4444' }]}>{b.time}</Text>
                </View>
              </View>

              {/* Action row buttons */}
              <View style={styles.cardActionsRow}>
                <TouchableOpacity 
                  style={styles.outlineBtn}
                  onPress={() => handleViewDetails(b)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.outlineBtnText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.primaryActionBtn}
                  onPress={() => handleActionPress(b)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryActionBtnText}>
                    {b.status === 'Expected' ? 'Check In' : 'Check Out'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="clipboard-text-search-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyText}>No matching bookings found.</Text>
          </View>
        )}
      </ScrollView>

      {/* Global navbar active on Bookings tab */}
      <Navbar 
        activeTab="Bookings"
        onTabPress={(tab) => {
          if (tab === 'Dashboard') {
            onNavigateToScreen('Dashboard');
          } else if (tab === 'Scanner') {
            onNavigateToScreen('QRScanner');
          }
        }}
      />
    </View>
  );
};

export default BookingsList;
