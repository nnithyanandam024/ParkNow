import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    borderBottomColor: '#E2E8F0',
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
    color: '#0052cc',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#0052cc',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0052cc',
    fontWeight: '800',
  },

  /* ───── Scroll Content ───── */
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 1,
    backgroundColor: '#F1F5F9',
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
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },

  /* Badges */
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeConfirmed: {
    backgroundColor: '#DCFCE7',
    borderColor: '#A7F3D0',
  },
  badgeFinished: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  badgeCancelled: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  badgeTextConfirmed: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextFinished: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextCancelled: {
    color: '#EF4444',
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
    color: '#64748B',
    fontWeight: '600',
    marginLeft: 6,
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
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
    color: '#0052cc',
  },
  priceFinished: {
    color: '#0F172A',
  },
  priceCancelled: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },

  /* Details Buttons */
  viewDetailsBtn: {
    borderWidth: 1.5,
    borderColor: '#0052cc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0052cc',
  },
  viewDetailsBtnFinished: {
    borderColor: '#CBD5E1',
  },
  viewDetailsBtnTextFinished: {
    color: '#64748B',
  },
});
