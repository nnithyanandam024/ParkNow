import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './BookingsScreenStyles';

const BOOKINGS_DATA = [
  {
    id: '1',
    name: 'Grand Central Parking',
    status: 'Confirmed',
    date: 'Oct 24, 2023',
    time: '09:00 AM',
    price: '$12.00',
    tab: 'Upcoming',
  },
  {
    id: '2',
    name: 'Skyline Plaza Garage',
    status: 'Confirmed',
    date: 'Oct 25, 2023',
    time: '02:30 PM',
    price: '$18.50',
    tab: 'Upcoming',
  },
  {
    id: '3',
    name: 'Waterfront Wharf B',
    status: 'Finished',
    date: 'Oct 20, 2023',
    time: '11:00 AM',
    price: '$25.00',
    tab: 'Completed',
  },
  {
    id: '4',
    name: 'Downtown Hub',
    status: 'Cancelled',
    date: 'Oct 18, 2023',
    time: '08:30 AM',
    price: '$10.00',
    tab: 'Cancelled',
  },
];

const BookingsScreen = ({ onViewDetails }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const tabs = ['Upcoming', 'Completed', 'Cancelled'];

  const renderCard = (booking) => {
    // Determine badge and price style based on status
    let badgeStyle = styles.badgeConfirmed;
    let badgeTextStyle = styles.badgeTextConfirmed;
    let priceStyle = styles.price;
    let buttonStyle = styles.viewDetailsBtn;
    let buttonTextStyle = styles.viewDetailsBtnText;

    if (booking.status === 'Finished') {
      badgeStyle = styles.badgeFinished;
      badgeTextStyle = styles.badgeTextFinished;
      priceStyle = styles.priceFinished;
      buttonStyle = [styles.viewDetailsBtn, styles.viewDetailsBtnFinished];
      buttonTextStyle = [styles.viewDetailsBtnText, styles.viewDetailsBtnTextFinished];
    } else if (booking.status === 'Cancelled') {
      badgeStyle = styles.badgeCancelled;
      badgeTextStyle = styles.badgeTextCancelled;
      priceStyle = styles.priceCancelled;
      buttonStyle = [styles.viewDetailsBtn, styles.viewDetailsBtnFinished];
      buttonTextStyle = [styles.viewDetailsBtnText, styles.viewDetailsBtnTextFinished];
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
            onPress={() => onViewDetails?.(booking.name, 'B-12')}
          >
            <Text style={buttonTextStyle}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getFilteredBookings = () => {
    return BOOKINGS_DATA.filter((b) => b.tab === activeTab);
  };

  const getPastBookings = () => {
    return BOOKINGS_DATA.filter((b) => b.tab !== 'Upcoming');
  };

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
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Scrollable Bookings History List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {getFilteredBookings().map((booking) => renderCard(booking))}

        {/* If Upcoming tab is active, show the Past Bookings list below */}
        {activeTab === 'Upcoming' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#4B5563' }}>Past Bookings</Text>
            </View>
            {getPastBookings().map((booking) => renderCard(booking))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingsScreen;
