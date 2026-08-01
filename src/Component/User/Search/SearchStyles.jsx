import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ───── Search Header ───── */
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
    padding: 0,
  },
  filterBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  /* ───── List Content ───── */
  listContent: {
    paddingBottom: 32,
  },

  /* ───── Recent Searches ───── */
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D20',
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentText: {
    fontSize: 14,
    color: '#374151',
  },

  /* ───── Filter Chips ───── */
  filtersRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#1A1D20',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },

  /* ───── Nearby Header ───── */
  nearbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D20',
    flex: 1,
  },
  viewMapText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A5FB4',
  },

  /* ───── Parking Card ───── */
  parkingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  /* Map Thumbnail */
  mapThumbnail: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2F7',
  },
  mapPin: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1A5FB4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Info */
  parkingInfo: {
    flex: 1,
    marginRight: 10,
  },
  parkingName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1D20',
    marginBottom: 3,
    lineHeight: 20,
  },
  parkingAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },

  /* Right side */
  parkingRight: {
    alignItems: 'flex-end',
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  availabilityDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 5,
  },
  almostFullDot: {
    backgroundColor: '#F59E0B',
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
  },
  almostFullBadge: {},
  almostFullText: {
    color: '#F59E0B',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1D20',
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },

  /* ───── Empty State ───── */
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});
