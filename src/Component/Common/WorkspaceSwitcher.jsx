import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const WorkspaceSwitcher = ({ currentRole, activeWorkspace, onSwitchWorkspace }) => {
  if (currentRole !== 'admin' && currentRole !== 'super_admin') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.roleBadge}>
        <FeatherIcon name="shield" size={12} color="#0052cc" />
        <Text style={styles.roleText}>ADMIN ACCESS</Text>
      </View>
      <View style={styles.switcherRow}>
        <TouchableOpacity
          style={[styles.pill, activeWorkspace === 'User' && styles.pillActive]}
          onPress={() => onSwitchWorkspace('User')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillText, activeWorkspace === 'User' && styles.pillTextActive]}>Client View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, activeWorkspace === 'Staff' && styles.pillActive]}
          onPress={() => onSwitchWorkspace('Staff')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillText, activeWorkspace === 'Staff' && styles.pillTextActive]}>Staff View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, activeWorkspace === 'Admin' && styles.pillActive]}
          onPress={() => onSwitchWorkspace('Admin')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillText, activeWorkspace === 'Admin' && styles.pillTextActive]}>Admin View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0052cc',
    marginLeft: 4,
  },
  switcherRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillActive: {
    backgroundColor: '#0052cc',
    borderColor: '#0052cc',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
});

export default WorkspaceSwitcher;
