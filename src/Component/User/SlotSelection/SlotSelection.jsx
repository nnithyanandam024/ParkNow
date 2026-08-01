import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './SlotSelectionStyles';

const SlotSelection = ({ parking, onBack, onContinue }) => {
  const rate = parking?.rate || 80;

  // Levels selection state
  const levels = ['Level 1', 'Level 2', 'Level 3'];
  const [selectedLevel, setSelectedLevel] = useState('Level 2');

  // Hardcode or generate slot lists for all levels so they persist
  // We'll define a state that holds slot allocations for all levels.
  const [levelSlots, setLevelSlots] = useState({
    'Level 1': [
      { id: 'A-01', status: 'available' },
      { id: 'A-02', status: 'occupied' },
      { id: 'A-03', status: 'occupied' },
      { id: 'A-04', status: 'available' },
      { id: 'A-05', status: 'available' },
      { id: 'A-06', status: 'occupied' },
      { id: 'A-07', status: 'occupied' },
      { id: 'A-08', status: 'available' },
      { id: 'A-09', status: 'available' },
      { id: 'A-10', status: 'available' },
      { id: 'A-11', status: 'occupied' },
      { id: 'A-12', status: 'available' },
      { id: 'A-13', status: 'available' },
      { id: 'A-14', status: 'occupied' },
    ],
    'Level 2': [
      { id: 'B-01', status: 'available' },
      { id: 'B-02', status: 'occupied' },
      { id: 'B-03', status: 'occupied' },
      { id: 'B-04', status: 'available' },
      { id: 'B-05', status: 'available' },
      { id: 'B-06', status: 'occupied' },
      { id: 'B-07', status: 'available' },
      { id: 'B-08', status: 'available' },
      { id: 'B-09', status: 'occupied' },
      { id: 'B-10', status: 'available' },
      { id: 'B-11', status: 'occupied' },
      { id: 'B-12', status: 'selected' }, // B-12 selected by default
      { id: 'B-13', status: 'available' },
      { id: 'B-14', status: 'available' },
      { id: 'B-15', status: 'occupied' },
      { id: 'B-16', status: 'available' },
    ],
    'Level 3': [
      { id: 'C-01', status: 'occupied' },
      { id: 'C-02', status: 'available' },
      { id: 'C-03', status: 'available' },
      { id: 'C-04', status: 'occupied' },
      { id: 'C-05', status: 'available' },
      { id: 'C-06', status: 'available' },
      { id: 'C-07', status: 'occupied' },
      { id: 'C-08', status: 'occupied' },
      { id: 'C-09', status: 'available' },
      { id: 'C-10', status: 'available' },
      { id: 'C-11', status: 'available' },
      { id: 'C-12', status: 'occupied' },
    ],
  });

  // Handler to toggle selection of a slot
  const handleSlotPress = (level, slotId) => {
    setLevelSlots((prev) => {
      const updated = { ...prev };
      
      // First, clear any other 'selected' slot across ALL levels to make it single selection
      Object.keys(updated).forEach((lvl) => {
        updated[lvl] = updated[lvl].map((slot) => {
          if (slot.status === 'selected') {
            return { ...slot, status: 'available' };
          }
          return slot;
        });
      });

      // Now toggle/set the current slot
      updated[level] = updated[level].map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            status: slot.status === 'selected' ? 'available' : 'selected',
          };
        }
        return slot;
      });

      return updated;
    });
  };

  // Find currently selected slot and its level
  const selectionInfo = useMemo(() => {
    for (const level of Object.keys(levelSlots)) {
      const selected = levelSlots[level].find((s) => s.status === 'selected');
      if (selected) {
        return { level, slot: selected };
      }
    }
    return null;
  }, [levelSlots]);

  const activeLevelSlots = levelSlots[selectedLevel] || [];

  // Group slots into rows of 2 (left and right columns)
  const slotRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < activeLevelSlots.length; i += 2) {
      rows.push({
        left: activeLevelSlots[i],
        right: activeLevelSlots[i + 1] || null,
        rowIndex: i / 2,
      });
    }
    return rows;
  }, [activeLevelSlots]);

  const renderSlotIcon = (status) => {
    if (status === 'available') {
      return <Icon name="truck" size={18} color="#FFFFFF" />;
    }
    if (status === 'occupied') {
      return <Icon name="slash" size={18} color="#9CA3AF" />;
    }
    if (status === 'selected') {
      return <Icon name="check-circle" size={18} color="#FFFFFF" />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#1A1D20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Parking Slot</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vertical" size={24} color="#1A1D20" />
        </TouchableOpacity>
      </View>

      {/* Level Selector Tabs */}
      <View style={styles.levelSelectorContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.levelTab,
              selectedLevel === level && styles.levelTabActive,
            ]}
            onPress={() => setSelectedLevel(level)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.levelTabText,
                selectedLevel === level && styles.levelTabTextActive,
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendAvailable]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendOccupied]} />
          <Text style={styles.legendText}>Occupied</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendSelected]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
      </View>

      {/* Scrollable Slot selection area */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          <View style={styles.gridHeader}>
            <Text style={styles.sectorTitle}>
              {selectedLevel.toUpperCase()} - SECTOR B
            </Text>
            <Text style={styles.slotsLeftText}>
              {activeLevelSlots.filter((s) => s.status === 'available').length} Available
            </Text>
          </View>

          {/* Parking Layout rows */}
          <View style={styles.parkingLayout}>
            {slotRows.map((row, index) => {
              // Alternate direction arrow or driveway labels per row
              let middleComponent = (
                <View style={styles.trafficIndicator}>
                  <Icon name="arrow-down" size={16} color="#BCC2CD" />
                </View>
              );
              if (row.rowIndex % 3 === 1) {
                middleComponent = (
                  <View style={styles.drivewayLabelContainer}>
                    <Text style={styles.drivewayText}>DRIVEWAY</Text>
                  </View>
                );
              } else if (row.rowIndex % 3 === 2) {
                middleComponent = (
                  <View style={styles.trafficIndicator}>
                    <Icon name="arrow-up" size={16} color="#BCC2CD" />
                  </View>
                );
              }

              return (
                <View key={index} style={styles.layoutRow}>
                  {/* Left Slot Box */}
                  {row.left && (
                    <TouchableOpacity
                      style={[
                        styles.slotBox,
                        row.left.status === 'available' && styles.slotAvailable,
                        row.left.status === 'occupied' && styles.slotOccupied,
                        row.left.status === 'selected' && styles.slotSelected,
                      ]}
                      onPress={() => handleSlotPress(selectedLevel, row.left.id)}
                      disabled={row.left.status === 'occupied'}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.slotIdText,
                          row.left.status === 'occupied' && styles.slotIdOccupiedText,
                        ]}
                      >
                        {row.left.id}
                      </Text>
                      {renderSlotIcon(row.left.status)}
                    </TouchableOpacity>
                  )}

                  {/* Middle Driveway details */}
                  {middleComponent}

                  {/* Right Slot Box */}
                  {row.right ? (
                    <TouchableOpacity
                      style={[
                        styles.slotBox,
                        row.right.status === 'available' && styles.slotAvailable,
                        row.right.status === 'occupied' && styles.slotOccupied,
                        row.right.status === 'selected' && styles.slotSelected,
                      ]}
                      onPress={() => handleSlotPress(selectedLevel, row.right.id)}
                      disabled={row.right.status === 'occupied'}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.slotIdText,
                          row.right.status === 'occupied' && styles.slotIdOccupiedText,
                        ]}
                      >
                        {row.right.id}
                      </Text>
                      {renderSlotIcon(row.right.status)}
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.slotBox, { opacity: 0 }]} /> // spacer
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Selected Slot Summary Details Card */}
        {selectionInfo ? (
          <View style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoLetter}>P</Text>
              </View>
              <View style={styles.summaryTextContent}>
                <Text style={styles.summaryTitle}>
                  Selected Slot: {selectionInfo.slot.id}
                </Text>
                <Text style={styles.summarySubtitle}>
                  Floor: {selectionInfo.level} • Sector B
                </Text>
              </View>
            </View>
            <View style={styles.summaryRight}>
              <Text style={styles.summaryRate}>₹{rate}/hr</Text>
              <Text style={styles.summaryStatusText}>Available Now</Text>
            </View>
          </View>
        ) : (
          <View style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoLetter}>P</Text>
              </View>
              <View style={styles.summaryTextContent}>
                <Text style={styles.summaryTitle}>Select a Slot</Text>
                <Text style={styles.summarySubtitle}>
                  Please choose a level and available slot
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectionInfo && styles.continueButtonDisabled,
          ]}
          onPress={() => onContinue?.(selectionInfo?.slot?.id)}
          disabled={!selectionInfo}
        >
          <Text style={styles.continueButtonText}>Continue to Payment</Text>
          <Icon
            name="arrow-right"
            size={20}
            color="#FFFFFF"
            style={styles.continueIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SlotSelection;
