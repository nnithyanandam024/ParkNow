import React, { useState } from 'react';
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

const Dashboard = ({
  availableSlots = 142,
  occupiedSlots = 358,
  reservedSlots = 25,
  todaysTotal = 1204,
  recentActivity = [],
  onNavigateToScanner,
  onNavigateToManualBooking,
  onNavigateToScreen
}) => {
  const [activeTab, setActiveTab] = useState('Dashboard');

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
              <Text style={styles.cardValue}>{availableSlots}</Text>
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
              <Text style={styles.cardValue}>{occupiedSlots}</Text>
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
              <Text style={styles.cardValue}>{reservedSlots}</Text>
              <Text style={styles.cardLabel}>RESERVED SLOTS</Text>
            </View>

            {/* Today's Total */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Feather name="bar-chart-2" size={22} color="#4B5563" />
              </View>
              <Text style={styles.cardValue}>{todaysTotal.toLocaleString()}</Text>
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
