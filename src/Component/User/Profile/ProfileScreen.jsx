import React from 'react';
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
import { styles } from './ProfileScreenStyles';

const ProfileScreen = ({ onLogout, onNavigateToBookings }) => {
  const menuItems = [
    {
      id: 'bookings',
      label: 'My Bookings',
      icon: 'file-text',
      onPress: onNavigateToBookings,
    },
    {
      id: 'payments',
      label: 'Payment Methods',
      icon: 'credit-card',
      onPress: () => {},
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      onPress: () => {},
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'shield',
      onPress: () => {},
    },
    {
      id: 'support',
      label: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {},
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      onPress: () => {},
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'log-out',
      onPress: onLogout,
      isDanger: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent />

      {/* Top Status Bar Background Spacer */}
      <View style={styles.statusBarBg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>P</Text>
          </View>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <FeatherIcon name="edit-2" size={16} color="#0052cc" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }}
              style={styles.avatarImage}
            />
            <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
              <FeatherIcon name="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userMeta}>🚗 Tesla Model 3 • ABC-1234</Text>
        </View>

        {/* Account Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ACCOUNT INFORMATION</Text>

          <View style={[styles.infoRow, { marginBottom: 16 }]}>
            <View style={styles.infoIconBg}>
              <FeatherIcon name="mail" size={18} color="#0052cc" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>alex.johnson@example.com</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBg}>
              <FeatherIcon name="phone" size={18} color="#0052cc" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+1 (555) 000-1234</Text>
            </View>
          </View>
        </View>

        {/* Menu list Card */}
        <View style={[styles.card, { paddingVertical: 6 }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconBg, item.isDanger && { backgroundColor: '#FEE2E2' }]}>
                  <FeatherIcon
                    name={item.icon}
                    size={16}
                    color={item.isDanger ? '#EF4444' : '#0052cc'}
                  />
                </View>
                <Text style={[styles.menuLabel, item.isDanger && { color: '#EF4444' }]}>
                  {item.label}
                </Text>
              </View>
              <FeatherIcon
                name="chevron-right"
                size={16}
                color={item.isDanger ? '#EF4444' : '#94A3B8'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
