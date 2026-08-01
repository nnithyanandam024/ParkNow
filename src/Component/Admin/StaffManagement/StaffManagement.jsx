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
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './StaffManagementStyles';

const StaffManagement = () => {
  // Mock Initial Staff
  const [staff, setStaff] = useState([
    { id: '1', name: 'Marcus Chen', role: 'Lot Manager', phone: '+1 555-0192', shift: 'Morning', status: 'Active' },
    { id: '2', name: 'Alice Smith', role: 'Gate Attendant', phone: '+1 555-0143', shift: 'Morning', status: 'Active' },
    { id: '3', name: 'Bob Johnson', role: 'Security Guard', phone: '+1 555-0177', shift: 'Evening', status: 'On Break' },
    { id: '4', name: 'David Lee', role: 'Gate Attendant', phone: '+1 555-0112', shift: 'Night', status: 'Offline' },
    { id: '5', name: 'Sarah Connor', role: 'Lot Manager', phone: '+1 555-0155', shift: 'Evening', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Active', 'On Break', 'Offline'

  // Modals and Form States
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Gate Attendant');
  const [formPhone, setFormPhone] = useState('');
  const [formShift, setFormShift] = useState('Morning');
  const [formStatus, setFormStatus] = useState('Active');

  const handleAddNewStaff = () => {
    setEditingStaff(null);
    setFormName('');
    setFormRole('Gate Attendant');
    setFormPhone('');
    setFormShift('Morning');
    setFormStatus('Active');
    setModalVisible(true);
  };

  const handleEditStaff = (member) => {
    setEditingStaff(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormPhone(member.phone);
    setFormShift(member.shift);
    setFormStatus(member.status);
    setModalVisible(true);
  };

  const handleSaveStaff = () => {
    if (!formName.trim()) {
      Alert.alert('Validation Error', 'Please enter staff name.');
      return;
    }
    if (!formPhone.trim()) {
      Alert.alert('Validation Error', 'Please enter a contact number.');
      return;
    }

    if (editingStaff) {
      setStaff(prev => prev.map(s => s.id === editingStaff.id ? {
        ...s,
        name: formName,
        role: formRole,
        phone: formPhone,
        shift: formShift,
        status: formStatus,
      } : s));
    } else {
      const newMember = {
        id: Date.now().toString(),
        name: formName,
        role: formRole,
        phone: formPhone,
        shift: formShift,
        status: formStatus,
      };
      setStaff(prev => [newMember, ...prev]);
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
          onPress: () => setStaff(prev => prev.filter(s => s.id !== id)) 
        }
      ]
    );
  };

  const handleToggleStatus = (member) => {
    const statusCycle = {
      'Active': 'On Break',
      'On Break': 'Offline',
      'Offline': 'Active'
    };
    const nextStatus = statusCycle[member.status] || 'Active';
    setStaff(prev => prev.map(s => s.id === member.id ? { ...s, status: nextStatus } : s));
  };

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.role.toLowerCase().includes(search.toLowerCase()) ||
                          s.phone.includes(search);
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Staff Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddNewStaff}
        >
          <FeatherIcon name="user-plus" size={18} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Staff</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filterSection}>
        <View style={styles.searchBar}>
          <FeatherIcon name="search" size={16} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, role, or contact..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChips}
        >
          {['All', 'Active', 'On Break', 'Offline'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                filter === item && styles.chipActive,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text style={[
                styles.chipText,
                filter === item && styles.chipTextActive,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Staff List */}
      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FeatherIcon name="users" size={32} color="#9CA3AF" />
            <Text style={styles.emptyText}>No staff members found.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.staffCard}>
            <View style={styles.cardInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.staffName}>{item.name}</Text>
                <View style={[
                  styles.statusIndicator,
                  item.status === 'Active' && { backgroundColor: '#D1FAE5' },
                  item.status === 'On Break' && { backgroundColor: '#FEF3C7' },
                  item.status === 'Offline' && { backgroundColor: '#F3F4F6' },
                ]}>
                  <Text style={[
                    styles.statusText,
                    item.status === 'Active' && { color: '#065F46' },
                    item.status === 'On Break' && { color: '#92400E' },
                    item.status === 'Offline' && { color: '#4B5563' },
                  ]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.roleText}>{item.role} • {item.shift} Shift</Text>
              <View style={styles.phoneRow}>
                <FeatherIcon name="phone" size={12} color="#6B7280" />
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#F3F4F6' }]} 
                onPress={() => handleToggleStatus(item)}
                title="Toggle Status"
              >
                <FeatherIcon name="refresh-cw" size={15} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#EFF6FF' }]} 
                onPress={() => handleEditStaff(item)}
              >
                <FeatherIcon name="edit-2" size={15} color="#1D64C6" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#FEE2E2' }]} 
                onPress={() => handleDeleteStaff(item.id)}
              >
                <FeatherIcon name="trash-2" size={15} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScrollContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{editingStaff ? 'Edit Staff Details' : 'Register Staff Member'}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <FeatherIcon name="x" size={22} color="#374151" />
                </TouchableOpacity>
              </View>

              {/* Form fields */}
              <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#9CA3AF"
                  value={formName}
                  onChangeText={setFormName}
                />

                <Text style={styles.label}>Role</Text>
                <View style={styles.dropdownSelector}>
                  {['Gate Attendant', 'Lot Manager', 'Security Guard'].map(r => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.dropdownItem, formRole === r && styles.dropdownItemActive]}
                      onPress={() => setFormRole(r)}
                    >
                      <Text style={[styles.dropdownText, formRole === r && styles.dropdownTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Contact Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. +1 555-0100"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={formPhone}
                  onChangeText={setFormPhone}
                />

                <Text style={styles.label}>Shift</Text>
                <View style={styles.dropdownSelector}>
                  {['Morning', 'Evening', 'Night'].map(sh => (
                    <TouchableOpacity
                      key={sh}
                      style={[styles.dropdownItem, formShift === sh && styles.dropdownItemActive]}
                      onPress={() => setFormShift(sh)}
                    >
                      <Text style={[styles.dropdownText, formShift === sh && styles.dropdownTextActive]}>{sh}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Initial Status</Text>
                <View style={styles.dropdownSelector}>
                  {['Active', 'On Break', 'Offline'].map(st => (
                    <TouchableOpacity
                      key={st}
                      style={[styles.dropdownItem, formStatus === st && styles.dropdownItemActive]}
                      onPress={() => setFormStatus(st)}
                    >
                      <Text style={[styles.dropdownText, formStatus === st && styles.dropdownTextActive]}>{st}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveStaff}
                >
                  <Text style={styles.saveButtonText}>Save Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default StaffManagement;
