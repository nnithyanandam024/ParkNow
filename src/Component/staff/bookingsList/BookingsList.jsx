import React, { useState } from 'react';
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

const BookingsList = ({ bookings, setBookings, onNavigateToScreen, onCheckoutPress, onViewDetailsPress }) => {
  const [searchText, setSearchText] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const handleActionPress = (booking) => {
    if (booking.status === 'Expected') {
      // Check in
      setBookings(prev => 
        prev.map(b => b.id === booking.id ? { ...b, status: 'Parked', time: 'Just Now - 2 Hours' } : b)
      );
      Alert.alert('Checked In', `${booking.name} has been checked in successfully!`);
    } else {
      // Check out via QR Scanner
      if (onCheckoutPress) {
        onCheckoutPress(booking);
      }
    }
  };

  const handleViewDetails = (booking) => {
    if (onViewDetailsPress) {
      onViewDetailsPress(booking);
    }
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
          <TouchableOpacity style={styles.menuBtn}>
            <Feather name="menu" size={24} color="#1E293B" />
          </TouchableOpacity>
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
