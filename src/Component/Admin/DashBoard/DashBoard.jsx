import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './DashBoardStyles';

const DashBoard = ({ setActiveTab }) => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'System Alert', message: 'Backup completed successfully.', time: '5m ago' },
    { id: '2', title: 'New Registration', message: 'Staff member John joined the team.', time: '1h ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showLotsModal, setShowLotsModal] = useState(false);

  // Mock Bookings Data
  const bookingsData = [
    { id: 'BK-9921', user: 'John Doe', slot: 'Lot A-102', time: '09:30 AM', status: 'Confirmed' },
    { id: 'BK-9922', user: 'Jane Smith', slot: 'Lot B-204', time: '10:15 AM', status: 'Pending' },
    { id: 'BK-9923', user: 'Robert Johnson', slot: 'Lot A-105', time: '11:00 AM', status: 'Completed' },
    { id: 'BK-9924', user: 'Emily Davis', slot: 'Lot C-302', time: '11:45 AM', status: 'Confirmed' },
    { id: 'BK-9925', user: 'Michael Brown', slot: 'Lot B-108', time: '12:30 PM', status: 'Cancelled' },
  ];

  // Mock Users Data
  const usersData = [
    { id: 'U-001', name: 'John Doe', email: 'john@example.com', bookings: 12, rating: '4.8' },
    { id: 'U-002', name: 'Jane Smith', email: 'jane@example.com', bookings: 5, rating: '4.9' },
    { id: 'U-003', name: 'Robert Johnson', email: 'robert@example.com', bookings: 21, rating: '4.5' },
    { id: 'U-004', name: 'Emily Davis', email: 'emily@example.com', bookings: 8, rating: '4.7' },
    { id: 'U-005', name: 'Marcus Chen', email: 'marcus@example.com', bookings: 14, rating: '5.0' },
  ];

  // Mock Lots Data
  const lotsData = [
    { id: 'L-A', name: 'Lot A - Plaza Center', totalSlots: 500, occupiedSlots: 412, status: 'Active' },
    { id: 'L-B', name: 'Lot B - Waterfront', totalSlots: 600, occupiedSlots: 510, status: 'Active' },
    { id: 'L-C', name: 'Lot C - Lincoln Hub', totalSlots: 440, occupiedSlots: 400, status: 'Maintenance' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <FeatherIcon name="menu" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ParkNow Admin</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setShowNotifications(true)}
          >
            <FeatherIcon name="bell" size={22} color="#1A1D20" />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Profile')}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Performance Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            {/* Card 1 - Total Lots */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Lots</Text>
              <View style={styles.statRowContent}>
                <Text style={styles.statValue}>12</Text>
                <FeatherIcon name="map" size={18} color="#6B7280" style={styles.statIcon} />
              </View>
            </View>
            {/* Card 2 - Total Slots */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Slots</Text>
              <View style={styles.statRowContent}>
                <Text style={styles.statValue}>1,540</Text>
                <FeatherIcon name="grid" size={18} color="#6B7280" style={styles.statIcon} />
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            {/* Card 3 - Available */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Available</Text>
              <View style={styles.statRowContent}>
                <Text style={[styles.statValue, { color: '#10B981' }]}>218</Text>
                <View style={styles.changeBadge}>
                  <Text style={styles.changeText}>+4%</Text>
                </View>
              </View>
            </View>
            {/* Card 4 - Occupied */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Occupied</Text>
              <View style={styles.statRowContent}>
                <Text style={[styles.statValue, { color: '#1A5FB4' }]}>1,322</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            {/* Card 5 - Today's Bookings */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Today's Bookings</Text>
              <View style={styles.statRowContent}>
                <Text style={styles.statValue}>456</Text>
                <FeatherIcon name="calendar" size={18} color="#6B7280" style={styles.statIcon} />
              </View>
            </View>
            {/* Card 6 - Today's Revenue */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Today's Revenue</Text>
              <View style={styles.statRowContent}>
                <Text style={styles.statValue}>$5,240</Text>
                <FeatherIcon name="credit-card" size={18} color="#6B7280" style={styles.statIcon} />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 16 }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionCard} 
            activeOpacity={0.8}
            onPress={() => setShowLotsModal(true)}
          >
            <View style={[styles.quickActionIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <FeatherIcon name="map-pin" size={18} color="#0052cc" />
            </View>
            <Text style={styles.quickActionTitle}>Manage Lots</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionCard} 
            activeOpacity={0.8}
            onPress={() => setActiveTab('SlotMgmt')}
          >
            <View style={[styles.quickActionIconCircle, { backgroundColor: '#D1FAE5' }]}>
              <FeatherIcon name="layers" size={18} color="#16A34A" />
            </View>
            <Text style={styles.quickActionTitle}>Manage Slots</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionCard} 
            activeOpacity={0.8}
            onPress={() => setActiveTab('StaffMgmt')}
          >
            <View style={[styles.quickActionIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <FeatherIcon name="users" size={18} color="#0052cc" />
            </View>
            <Text style={styles.quickActionTitle}>Staff Mgmt</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionCard} 
            activeOpacity={0.8}
            onPress={() => setShowBookingsModal(true)}
          >
            <View style={[styles.quickActionIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <FeatherIcon name="bookmark" size={18} color="#D97706" />
            </View>
            <Text style={styles.quickActionTitle}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionCard} 
            activeOpacity={0.8}
            onPress={() => setShowUsersModal(true)}
          >
            <View style={[styles.quickActionIconCircle, { backgroundColor: '#FCE7F3' }]}>
              <FeatherIcon name="user" size={18} color="#DB2777" />
            </View>
            <Text style={styles.quickActionTitle}>Users</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionCard} 
            activeOpacity={0.8}
            onPress={() => setShowAnalyticsModal(true)}
          >
            <View style={[styles.quickActionIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <FeatherIcon name="bar-chart-2" size={18} color="#9333EA" />
            </View>
            <Text style={styles.quickActionTitle}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => Alert.alert('History', 'Viewing all older activities.')}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#0052cc' }}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityCard}>
          {/* Activity 1 */}
          <View style={styles.activityRow}>
            <View style={[styles.activityIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <FeatherIcon name="check-circle" size={18} color="#16A34A" />
            </View>
            <View style={styles.activityTextCol}>
              <Text style={styles.activityTitle}>John Doe - Lot A-102</Text>
              <Text style={styles.activitySubtitle}>New booking confirmed</Text>
            </View>
            <Text style={styles.activityTime}>2 mins ago</Text>
          </View>

          {/* Activity 2 */}
          <View style={styles.activityRow}>
            <View style={[styles.activityIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <FeatherIcon name="dollar-sign" size={18} color="#0052cc" />
            </View>
            <View style={styles.activityTextCol}>
              <Text style={styles.activityTitle}>₹150.00 collected - Lot B-05</Text>
              <Text style={styles.activitySubtitle}>Payment successful</Text>
            </View>
            <Text style={styles.activityTime}>10 mins ago</Text>
          </View>

          {/* Activity 3 */}
          <View style={[styles.activityRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.activityIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <FeatherIcon name="tool" size={18} color="#D97706" />
            </View>
            <View style={styles.activityTextCol}>
              <Text style={styles.activityTitle}>Marcus Chen updated Lot C</Text>
              <Text style={styles.activitySubtitle}>Status: Maintenance</Text>
            </View>
            <Text style={styles.activityTime}>30 mins ago</Text>
          </View>
        </View>
      </ScrollView>

      {/* Notifications Modal */}
      <Modal visible={showNotifications} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <FeatherIcon name="x" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notifyItem}>
                  <View style={styles.notifyContent}>
                    <Text style={styles.notifyTitle}>{item.title}</Text>
                    <Text style={styles.notifyMessage}>{item.message}</Text>
                  </View>
                  <Text style={styles.notifyTime}>{item.time}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>

      {/* Bookings Management Modal */}
      <Modal visible={showBookingsModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bookings Management</Text>
              <TouchableOpacity onPress={() => setShowBookingsModal(false)}>
                <FeatherIcon name="x" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={bookingsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notifyItem}>
                  <View style={styles.notifyContent}>
                    <View style={styles.bookingHeader}>
                      <Text style={styles.notifyTitle}>{item.id} - {item.user}</Text>
                      <View style={[styles.statusBadge, 
                        item.status === 'Confirmed' && { backgroundColor: '#D1FAE5' },
                        item.status === 'Pending' && { backgroundColor: '#FEF3C7' },
                        item.status === 'Completed' && { backgroundColor: '#DBEAFE' },
                        item.status === 'Cancelled' && { backgroundColor: '#FEE2E2' },
                      ]}>
                        <Text style={[styles.statusText,
                          item.status === 'Confirmed' && { color: '#065F46' },
                          item.status === 'Pending' && { color: '#92400E' },
                          item.status === 'Completed' && { color: '#1E40AF' },
                          item.status === 'Cancelled' && { color: '#991B1B' },
                        ]}>{item.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.notifyMessage}>Slot: {item.slot} | Scheduled: {item.time}</Text>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>

      {/* Users Management Modal */}
      <Modal visible={showUsersModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Users Directory</Text>
              <TouchableOpacity onPress={() => setShowUsersModal(false)}>
                <FeatherIcon name="x" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={usersData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notifyItem}>
                  <View style={styles.notifyContent}>
                    <Text style={styles.notifyTitle}>{item.name} ({item.id})</Text>
                    <Text style={styles.notifyMessage}>{item.email} | {item.bookings} bookings</Text>
                  </View>
                  <View style={styles.userRating}>
                    <FeatherIcon name="star" size={12} color="#D97706" />
                    <Text style={styles.ratingValue}>{item.rating}</Text>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>

      {/* Lots Management Modal */}
      <Modal visible={showLotsModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Parking Lots Overview</Text>
              <TouchableOpacity onPress={() => setShowLotsModal(false)}>
                <FeatherIcon name="x" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={lotsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notifyItem}>
                  <View style={styles.notifyContent}>
                    <Text style={styles.notifyTitle}>{item.name}</Text>
                    <Text style={styles.notifyMessage}>Occupancy: {item.occupiedSlots} / {item.totalSlots} Slots</Text>
                  </View>
                  <View style={[styles.statusBadge, item.status === 'Active' ? { backgroundColor: '#D1FAE5' } : { backgroundColor: '#FEE2E2' }]}>
                    <Text style={[styles.statusText, item.status === 'Active' ? { color: '#065F46' } : { color: '#991B1B' }]}>{item.status}</Text>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>

      {/* Analytics Modal */}
      <Modal visible={showAnalyticsModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Operational Analytics</Text>
              <TouchableOpacity onPress={() => setShowAnalyticsModal(false)}>
                <FeatherIcon name="x" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 8 }}>
              <View style={styles.analyticsChartContainer}>
                <Text style={styles.analyticsTitle}>Weekly Slot Occupancy Trend</Text>
                <View style={styles.chartBarsRow}>
                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>65%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '65%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Mon</Text>
                  </View>

                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>78%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '78%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Tue</Text>
                  </View>

                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>70%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '70%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Wed</Text>
                  </View>

                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>85%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '85%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Thu</Text>
                  </View>

                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>92%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '92%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Fri</Text>
                  </View>

                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>98%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '98%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Sat</Text>
                  </View>

                  <View style={styles.chartColumn}>
                    <Text style={styles.barValLabel}>80%</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: '80%' }]} />
                    </View>
                    <Text style={styles.barDayLabel}>Sun</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.analyticsSubtitle}>Average Occupancy Rate: 84%</Text>
              <Text style={[styles.analyticsSubtitle, { marginTop: 12 }]}>Revenue Distribution</Text>
              <View style={styles.revenueDist}>
                <View style={styles.revenueDistItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#1A5FB4' }]} />
                  <Text style={styles.revenueDistText}>Hourly Bookings (65%)</Text>
                </View>
                <View style={styles.revenueDistItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.revenueDistText}>Monthly Passes (25%)</Text>
                </View>
                <View style={styles.revenueDistItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#D97706' }]} />
                  <Text style={styles.revenueDistText}>Valet Services (10%)</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default DashBoard;
