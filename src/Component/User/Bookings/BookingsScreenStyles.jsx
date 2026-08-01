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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : (Platform.OS === 'ios' ? 44 : 16),
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  /* ───── Filter Tabs ───── */
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBF0F5',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#1A5FB4',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#1A5FB4',
    fontWeight: '700',
  },

  /* ───── Scroll Content ───── */
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 0.5,
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 16,
  },

  /* ───── Booking Cards ───── */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EBF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D20',
    flex: 1,
    marginRight: 8,
  },

  /* Badges */
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeConfirmed: {
    backgroundColor: '#E8F8EE',
  },
  badgeFinished: {
    backgroundColor: '#F3F4F6',
  },
  badgeCancelled: {
    backgroundColor: '#FEE2E2',
  },
  badgeTextConfirmed: {
    color: '#0F7336',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextFinished: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextCancelled: {
    color: '#B91C1C',
    fontSize: 11,
    fontWeight: '700',
  },

  /* Date & Time */
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 6,
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 14,
  },

  /* Card Bottom Section */
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  priceFinished: {
    color: '#1A1D20',
  },
  priceCancelled: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  /* Details Buttons */
  viewDetailsBtn: {
    borderWidth: 1.5,
    borderColor: '#1A5FB4',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A5FB4',
  },
  viewDetailsBtnFinished: {
    borderColor: '#9CA3AF',
  },
  viewDetailsBtnTextFinished: {
    color: '#6B7280',
  },
});
