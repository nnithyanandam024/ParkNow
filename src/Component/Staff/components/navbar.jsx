import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      {/* Dashboard Tab */}
      <TouchableOpacity
        style={activeTab === 'Dashboard' ? styles.activeTabItem : styles.tabItem}
        onPress={() => onTabPress('Dashboard')}
      >
        <Feather name="grid" size={20} color={activeTab === 'Dashboard' ? '#16A34A' : '#6B7280'} />
        {activeTab === 'Dashboard' ? (
          <Text style={styles.activeTabLabel}>Dashboard</Text>
        ) : (
          <Text style={styles.tabLabel}>Dashboard</Text>
        )}
      </TouchableOpacity>

      {/* Bookings Tab */}
      <TouchableOpacity
        style={activeTab === 'Bookings' ? styles.activeTabItem : styles.tabItem}
        onPress={() => onTabPress('Bookings')}
      >
        <Feather name="clipboard" size={20} color={activeTab === 'Bookings' ? '#16A34A' : '#6B7280'} />
        {activeTab === 'Bookings' ? (
          <Text style={styles.activeTabLabel}>Bookings</Text>
        ) : (
          <Text style={styles.tabLabel}>Bookings</Text>
        )}
      </TouchableOpacity>

      {/* Scanner Tab */}
      <TouchableOpacity
        style={activeTab === 'Scanner' ? styles.activeTabItem : styles.tabItem}
        onPress={() => onTabPress('Scanner')}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={20} color={activeTab === 'Scanner' ? '#16A34A' : '#6B7280'} />
        {activeTab === 'Scanner' ? (
          <Text style={styles.activeTabLabel}>Scanner</Text>
        ) : (
          <Text style={styles.tabLabel}>Scanner</Text>
        )}
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={activeTab === 'Profile' ? styles.activeTabItem : styles.tabItem}
        onPress={() => onTabPress('Profile')}
      >
        <Feather name="user" size={20} color={activeTab === 'Profile' ? '#16A34A' : '#6B7280'} />
        {activeTab === 'Profile' ? (
          <Text style={styles.activeTabLabel}>Profile</Text>
        ) : (
          <Text style={styles.tabLabel}>Profile</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 88 : 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingHorizontal: 12,
    zIndex: 100,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 48,
  },
  activeTabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 42,
    flex: 1.3,
  },
  tabLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '600',
  },
  activeTabLabel: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
    marginLeft: 6,
  },
});

export default Navbar;
