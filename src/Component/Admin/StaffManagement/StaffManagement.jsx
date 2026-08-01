import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './StaffManagementStyles';

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([
    { id: '1', name: 'Marcus Chen', role: 'Lot Manager', shift: 'Morning Shift', phone: '+1 555-0192', status: 'Active' },
    { id: '2', name: 'Alice Smith', role: 'Gate Attendant', shift: 'Morning Shift', phone: '+1 555-0143', status: 'Active' },
    { id: '3', name: 'Bob Johnson', role: 'Security Guard', shift: 'Evening Shift', phone: '+1 555-0177', status: 'On Break' },
    { id: '4', name: 'David Lee', role: 'Gate Attendant', shift: 'Night Shift', phone: '+1 555-0112', status: 'Offline' },
    { id: '5', name: 'Sarah Connor', role: 'Lot Manager', shift: 'Evening Shift', phone: '+1 555-0155', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // Modals & Form
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Gate Attendant');
  const [formShift, setFormShift] = useState('Morning');
  const [formPhone, setFormPhone] = useState('');
  const [formStatus, setFormStatus] = useState('Active');

  const handleAddNewStaff = () => {
    setEditingStaff(null);
    setFormName('');
    setFormRole('Gate Attendant');
    setFormShift('Morning');
    setFormPhone('');
    setFormStatus('Active');
    setModalVisible(true);
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setFormName(staff.name);
    setFormRole(staff.role);
    setFormShift(staff.shift.includes('Morning') ? 'Morning' : staff.shift.includes('Evening') ? 'Evening' : 'Night');
    setFormPhone(staff.phone);
    setFormStatus(staff.status);
    setModalVisible(true);
  };

  const handleSaveStaff = () => {
    if (!formName.trim()) {
      Alert.alert('Validation Error', 'Please enter staff member name.');
      return;
    }

    if (editingStaff) {
      setStaffList(prev => prev.map(s => s.id === editingStaff.id ? {
        ...s,
        name: formName,
        role: formRole,
        shift: `${formShift} Shift`,
        phone: formPhone || '+1 555-0100',
        status: formStatus,
      } : s));
    } else {
      const newStaff = {
        id: Date.now().toString(),
        name: formName,
        role: formRole,
        shift: `${formShift} Shift`,
        phone: formPhone || '+1 555-0100',
        status: formStatus,
      };
      setStaffList(prev => [newStaff, ...prev]);
    }
    setModalVisible(false);
  };

  const handleDeleteStaff = (id) => {
    Alert.alert(
      'Remove Staff Member',
      'Are you sure you want to remove this staff member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive', 
          onPress: () => setStaffList(prev => prev.filter(s => s.id !== id)) 
        }
      ]
    );
  };

  const handleToggleStatus = (staff) => {
    const cycle = { 'Active': 'On Break', 'On Break': 'Offline', 'Offline': 'Active' };
    const nextStatus = cycle[staff.status] || 'Active';
    setStaffList(prev => prev.map(s => s.id === staff.id ? { ...s, status: nextStatus } : s));
  };

  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.role.toLowerCase().includes(search.toLowerCase()) ||
                          s.phone.includes(search);
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Staff Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddNewStaff}
          activeOpacity={0.8}
        >
          <FeatherIcon name="user-plus" size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Staff</Text>
        </TouchableOpacity>
      </View>

      {/* Search & Filters */}
      <View style={styles.filterSection}>
        <View style={styles.searchBar}>
          <FeatherIcon name="search" size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, role, or contact..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={16} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.filterChips}>
          {['All', 'Active', 'On Break', 'Offline'].map(chip => (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, filter === chip && styles.chipActive]}
              onPress={() => setFilter(chip)}
            >
              <Text style={[styles.chipText, filter === chip && styles.chipTextActive]}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Staff List */}
      <FlatList
        data={filteredStaff}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FeatherIcon name="users" size={32} color="#94A3B8" />
            <Text style={styles.emptyText}>No matching staff members found.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.staffCard}>
            <View style={styles.cardInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.staffName}>{item.name}</Text>
                <View style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: item.status === 'Active' ? '#DCFCE7' : item.status === 'On Break' ? '#FEF3C7' : '#F1F5F9',
                    borderColor: item.status === 'Active' ? '#A7F3D0' : item.status === 'On Break' ? '#FDE68A' : '#E2E8F0',
                    borderWidth: 1,
                  }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: item.status === 'Active' ? '#16A34A' : item.status === 'On Break' ? '#D97706' : '#64748B' }
                  ]}>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.roleText}>{item.role} • {item.shift}</Text>

              <View style={styles.metaRow}>
                <FeatherIcon name="phone" size={12} color="#64748B" />
                <Text style={styles.metaText}>{item.phone}</Text>
              </View>
            </View>

            {/* Horizontal Action Buttons Row */}
            <View style={styles.actionsRow}>
              <TouchableOpacity 
                style={styles.actionIconBtn} 
                onPress={() => handleToggleStatus(item)}
                activeOpacity={0.8}
              >
                <FeatherIcon name="refresh-cw" size={16} color="#0052cc" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionIconBtn} 
                onPress={() => handleEditStaff(item)}
                activeOpacity={0.8}
              >
                <FeatherIcon name="edit-2" size={16} color="#0052cc" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionIconBtn, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]} 
                onPress={() => handleDeleteStaff(item.id)}
                activeOpacity={0.8}
              >
                <FeatherIcon name="trash-2" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add / Edit Staff Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>{editingStaff ? 'Edit Staff Member' : 'Register Staff Member'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FeatherIcon name="x" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#94A3B8"
                  value={formName}
                  onChangeText={setFormName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Role</Text>
                <View style={styles.optionPillRow}>
                  {['Gate Attendant', 'Lot Manager', 'Security Guard'].map(r => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.optionPill, formRole === r && styles.optionPillActive]}
                      onPress={() => setFormRole(r)}
                    >
                      <Text style={[styles.optionPillText, formRole === r && styles.optionPillTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact Number</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. +1 555-0100"
                  placeholderTextColor="#94A3B8"
                  value={formPhone}
                  onChangeText={setFormPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Shift</Text>
                <View style={styles.optionPillRow}>
                  {['Morning', 'Evening', 'Night'].map(sh => (
                    <TouchableOpacity
                      key={sh}
                      style={[styles.optionPill, formShift === sh && styles.optionPillActive]}
                      onPress={() => setFormShift(sh)}
                    >
                      <Text style={[styles.optionPillText, formShift === sh && styles.optionPillTextActive]}>{sh}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Initial Status</Text>
                <View style={styles.optionPillRow}>
                  {['Active', 'On Break', 'Offline'].map(st => (
                    <TouchableOpacity
                      key={st}
                      style={[styles.optionPill, formStatus === st && styles.optionPillActive]}
                      onPress={() => setFormStatus(st)}
                    >
                      <Text style={[styles.optionPillText, formStatus === st && styles.optionPillTextActive]}>{st}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveStaff}>
                <Text style={styles.saveBtnText}>Save Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default StaffManagement;
