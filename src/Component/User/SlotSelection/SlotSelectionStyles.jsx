import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },

  /* ───── Header ───── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : (Platform.OS === 'ios' ? 44 : 14),
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D20',
  },
  menuButton: {
    padding: 4,
  },

  /* ───── Level Selector Tabs ───── */
  levelSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  levelTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F5F8',
  },
  levelTabActive: {
    backgroundColor: '#1A5FB4',
  },
  levelTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  levelTabTextActive: {
    color: '#FFFFFF',
  },

  /* ───── Legend ───── */
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendAvailable: {
    backgroundColor: '#0F7336',
  },
  legendOccupied: {
    backgroundColor: '#BCC2CD',
  },
  legendSelected: {
    backgroundColor: '#1A5FB4',
  },
  legendText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },

  /* ───── Scroll Area ───── */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Leave room for absolute footer button
  },

  /* ───── Grid Container ───── */
  gridContainer: {
    backgroundColor: '#F3F5F8',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6E9EE',
    marginBottom: 20,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectorTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 0.5,
  },
  slotsLeftText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A5FB4',
  },

  /* ───── Parking Layout ───── */
  parkingLayout: {
    alignItems: 'center',
    gap: 16,
  },
  layoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
  },
  slotBox: {
    width: 90,
    height: 100,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  slotAvailable: {
    backgroundColor: '#0F7336',
  },
  slotOccupied: {
    backgroundColor: '#BCC2CD',
  },
  slotSelected: {
    backgroundColor: '#1A5FB4',
    borderColor: '#D4E2F4', // border highlight
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  slotIdText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  slotIdOccupiedText: {
    color: '#7C8491',
  },

  /* Driveway / Traffic indicators */
  trafficIndicator: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drivewayLabelContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drivewayText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#8E98A8',
    letterSpacing: 1,
    transform: [{ rotate: '-90deg' }],
  },

  /* ───── Selected Summary Card ───── */
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EBF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#D1E3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoLetter: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  summaryTextContent: {},
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1D20',
    marginBottom: 3,
  },
  summarySubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  summaryRate: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A5FB4',
    marginBottom: 3,
  },
  summaryStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F7336',
  },

  /* ───── Footer Button Container ───── */
  footerButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  continueButton: {
    backgroundColor: '#1A5FB4',
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#A0BCE4',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  continueIcon: {
    marginTop: 1,
  },
});
