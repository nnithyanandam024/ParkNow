import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    marginRight: 16,
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
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
    paddingVertical: 0,
  },
  chipsScroll: {
    paddingVertical: 4,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: '#0052cc',
  },
  chipInactive: {
    backgroundColor: '#F1F5F9',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextInactive: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 110 : 90,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  initialCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialText: {
    fontSize: 15,
    fontWeight: '800',
  },
  cardHeaderDetails: {
    flex: 1,
  },
  cardCustomerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardVehicleMeta: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeParked: {
    backgroundColor: '#DCFCE7',
    borderColor: '#A7F3D0',
  },
  badgeTextParked: {
    color: '#16A34A',
  },
  badgeExpected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  badgeTextExpected: {
    color: '#0052cc',
  },
  badgeOverdue: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  badgeTextOverdue: {
    color: '#EF4444',
  },
  innerPanel: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  innerMetaCol: {
    flex: 1,
  },
  innerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  innerMetaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  innerMetaValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineBtn: {
    flex: 1,
    height: 40,
    borderWidth: 1.5,
    borderColor: '#0052cc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  outlineBtnText: {
    color: '#0052cc',
    fontSize: 13,
    fontWeight: '700',
  },
  primaryActionBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#0052cc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 12,
  },
});
