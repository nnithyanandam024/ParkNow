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

  /* ───── Scroll Area ───── */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },

  /* ───── Cards ───── */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EBF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  /* Destination Details */
  destHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1A5FB4',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  destTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1D20',
    lineHeight: 24,
  },
  pBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E6EFFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pBadgeText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A5FB4',
  },
  destAddress: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginVertical: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A5FB4',
  },

  /* Date & Time Container */
  dateTimeContainer: {
    backgroundColor: '#F4F6F9',
    borderRadius: 14,
    padding: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E6EFFD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateTimeLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  dateTimeValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },

  /* Vehicle Card */
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1D20',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A5FB4',
  },
  vehicleDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  carIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E6EFFD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  licensePlate: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1D20',
    marginBottom: 2,
  },
  vehicleModel: {
    fontSize: 12,
    color: '#6B7280',
  },

  /* Price Card */
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  priceValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1D20',
  },
  promoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F7336',
  },
  promoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F7336',
  },
  dashedDivider: {
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1D20',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F5F8',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visaBadge: {
    backgroundColor: '#1A1F71',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  visaText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  cardDigits: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  /* Notice Row */
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 6,
    marginBottom: 16,
  },
  noticeText: {
    flex: 1,
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 15,
  },

  /* Footer Button Container */
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
  confirmButton: {
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
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
