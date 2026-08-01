import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/navbar';
import { styles } from './dashboardstyles';
import { parkingService } from '../../../services/parkingService';
import { realtimeService } from '../../../services/realtimeService';

const Dashboard = ({
  recentActivity = [],
  onNavigateToScanner,
  onNavigateToManualBooking,
  onNavigateToScreen
}) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [liveSlots, setLiveSlots] = useState({
    available: 0,
    occupied: 0,
    reserved: 0,
    total: 0,
  });

  useEffect(() => {
    async function loadSlots() {
      try {
        const res = await parkingService.getOccupancySummary();
        if (res.success && res.data && res.data.length > 0) {
          const totals = res.data.reduce(
            (acc, loc) => ({
              available: acc.available + (loc.available_slots || 0),
              occupied: acc.occupied + (loc.occupied_slots || 0),
              reserved: acc.reserved + (loc.reserved_slots || 0),
              total: acc.total + (loc.total_slots || 0),
            }),
            { available: 0, occupied: 0, reserved: 0, total: 0 }
          );
          setLiveSlots(totals);
        }
      } catch (e) {
        console.log('Dashboard slot load error:', e);
      }
    }
    loadSlots();

    // Real-time: Re-fetch occupancy summary whenever any slot changes
    const slotChannel = realtimeService.subscribeToSlots(1, () => {
      loadSlots();
    });

    // Real-time: Re-fetch whenever new booking comes in
    const bookingChannel = realtimeService.subscribeToBookings(() => {
      loadSlots();
    });

    return () => {
      realtimeService.unsubscribe(slotChannel);
      realtimeService.unsubscribe(bookingChannel);
    };
  }, []);

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'No new notifications at this time.');
  };

  const handleScanQRPress = () => {
    if (onNavigateToScanner) {
      onNavigateToScanner();
    }
  };

  const handleManualBookingPress = () => {
    if (onNavigateToManualBooking) {
      onNavigateToManualBooking();
    }
  };

  const handleActiveBookingsPress = () => {
    if (onNavigateToScreen) {
      onNavigateToScreen('Bookings');
    }
  };

  const handleViewLogPress = () => {
    Alert.alert('Activity Log', 'Navigating to full activity log...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfoRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120' }}
            style={styles.avatar}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>Alex Wright</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={11} color="#64748B" style={styles.locationIcon} />
              <Text style={styles.locationText}>Central Plaza P1</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
          <Feather name="bell" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Dashboard</Text>
          <Text style={styles.subtitle}>Facility Oversight • Real-time Operations</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {/* Row 1 */}
          <View style={styles.cardRow}>
            {/* Available Slots */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Feather name="check-circle" size={20} color="#16A34A" />
                <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={[styles.badgeText, { color: '#16A34A' }]}>+4%</Text>
                </View>
              </View>
              <Text style={styles.cardValue}>{liveSlots.available}</Text>
              <Text style={styles.cardLabel}>AVAILABLE SLOTS</Text>
            </View>

            {/* Occupied Slots */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="car-outline" size={22} color="#2563EB" />
                <View style={[styles.badge, { backgroundColor: '#DBEAFE' }]}>
                  <Text style={[styles.badgeText, { color: '#2563EB' }]}>Busy</Text>
                </View>
              </View>
              <Text style={styles.cardValue}>{liveSlots.occupied}</Text>
              <Text style={styles.cardLabel}>OCCUPIED SLOTS</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.cardRow}>
            {/* Reserved Slots */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="parking" size={22} color="#D97706" />
                <View style={[styles.badge, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.badgeText, { color: '#D97706' }]}>12 Expiring</Text>
                </View>
              </View>
              <Text style={styles.cardValue}>{liveSlots.reserved}</Text>
              <Text style={styles.cardLabel}>RESERVED SLOTS</Text>
            </View>

            {/* Today's Total */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Feather name="bar-chart-2" size={22} color="#4B5563" />
              </View>
              <Text style={styles.cardValue}>{liveSlots.total.toLocaleString()}</Text>
              <Text style={styles.cardLabel}>TODAY'S TOTAL</Text>
            </View>
          </View>
        </View>

        {/* Operational Controls Section */}
        <Text style={styles.sectionTitle}>Operational Controls</Text>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.scanButton} onPress={handleScanQRPress} activeOpacity={0.85}>
            <MaterialCommunityIcons name="qrcode-scan" size={26} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualButton} onPress={handleManualBookingPress} activeOpacity={0.85}>
            <Feather name="edit" size={24} color="#1F2937" />
            <Text style={styles.manualButtonText}>Manual Booking</Text>
          </TouchableOpacity>
        </View>

        {/* Active Bookings Button */}
        <TouchableOpacity style={styles.activeBookingsButton} onPress={handleActiveBookingsPress} activeOpacity={0.85}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#1F2937" />
          <Text style={styles.activeBookingsText}>Active Bookings</Text>
        </TouchableOpacity>

        {/* Recent Activity */}
        <View style={styles.recentActivityHeader}>
          <Text style={styles.recentActivityTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={handleViewLogPress}>
            <Text style={styles.viewLogButton}>View Log</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityContainer}>
          {recentActivity.map((activity, index) => (
            <React.Fragment key={activity.id}>
              {index > 0 && <View style={styles.activityItemSpacer} />}
              <View style={styles.activityItem}>
                <View style={[
                  styles.iconContainer, 
                  { backgroundColor: activity.type === 'in' ? '#DCFCE7' : '#FEE2E2' }
                ]}>
                  <Feather 
                    name={activity.type === 'in' ? 'log-in' : 'log-out'} 
                    size={20} 
                    color={activity.type === 'in' ? '#16A34A' : '#EF4444'} 
                  />
                </View>
                <View style={styles.activityTextContainer}>
                  <Text style={styles.activityLPN}>LPN: {activity.lpn}</Text>
                  <Text style={styles.activityDetails}>{activity.details}</Text>
                </View>
                <View style={styles.activityStatusContainer}>
                  <Text style={activity.type === 'in' ? styles.activityStatusSuccess : styles.activityStatusPaid}>
                    {activity.status}
                  </Text>
                </View>
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation Tab Bar */}
      <Navbar
        activeTab={activeTab}
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'Scanner' && onNavigateToScanner) {
            onNavigateToScanner();
          } else if (onNavigateToScreen) {
            onNavigateToScreen(tab);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
