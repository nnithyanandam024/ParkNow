import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './AdminBottomTabBarStyles';

const AdminBottomTabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'Dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'SlotMgmt', label: 'Slot Mgmt', icon: 'layers' },
    { id: 'StaffMgmt', label: 'Staff Mgmt', icon: 'users' },
    { id: 'Profile', label: 'Profile', icon: 'user' },
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => setActiveTab(tab.id)}
          >
            <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
              <FeatherIcon
                name={tab.icon}
                size={20}
                color={isActive ? '#1A5FB4' : '#6B7280'}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AdminBottomTabBar;
