import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* ───── Header ───── */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : (Platform.OS === 'ios' ? 44 : 14),
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0052cc',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  /* ───── Scroll Area ───── */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 110 : 90,
  },

  /* ───── Global Occupancy Card ───── */
  occupancyCard: {
    width: '100%',
    backgroundColor: '#0052cc',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  occupancySubtitle: {
    color: '#D1E8F2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  occupancyTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  /* ───── Status Legend ───── */
  legendTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  legendContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginRight: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
  },

  /* ───── Section Header ───── */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  filterBtnText: {
    color: '#0052cc',
    fontSize: 13,
    fontWeight: '700',
  },

  /* ───── High-Density Spatial Grid Map ───── */
  gridMapContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  topSlotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  gridBodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  verticalLane: {
    width: '14.28%',
    alignItems: 'center',
  },
  aislesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  aisleColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aisleSubCol: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dividerDots: {
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  dotsText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#CBD5E1',
    letterSpacing: 2,
  },

  /* ───── Slot Cell States ───── */
  slotCell: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  cellAvailable: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  cellOccupied: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  cellMaintenance: {
    borderColor: '#94A3B8',
    backgroundColor: '#F8FAFC',
  },
  cellSelected: {
    borderColor: '#0052cc',
    backgroundColor: '#0052cc',
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  slotCellText: {
    fontSize: 10,
    fontWeight: '800',
  },
  bottomDecalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    paddingHorizontal: 12,
  },

  /* ───── Fixed Bottom Details Panel ───── */
  fixedBottomPanel: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 88 : 68,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    zIndex: 90,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  detailsContent: {
    justifyContent: 'space-between',
  },
  detailsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  detailsSlotId: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  detailsMetadata: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  badgeAvailable: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeTextAvailable: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '700',
  },
  confirmBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#0052cc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  detailsPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  placeholderText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
});
