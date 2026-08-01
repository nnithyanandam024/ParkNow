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

  /* ───── Summary Card ───── */
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EBF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  summaryTextCol: {
    flex: 1,
    marginRight: 12,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1D20',
    marginBottom: 4,
  },
  slotDetails: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  totalCol: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  timeText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginBottom: 14,
  },
  spotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#1A5FB4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  pBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  spotLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  confirmedBadge: {
    backgroundColor: '#E8F8EE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  confirmedText: {
    color: '#0F7336',
    fontSize: 12,
    fontWeight: '700',
  },

  /* ───── Payment Section Title ───── */
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 12,
    paddingLeft: 4,
  },

  /* ───── Payment Options ───── */
  paymentMethodsList: {
    gap: 12,
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#EBF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  paymentOptionSelected: {
    borderColor: '#1A5FB4',
    shadowColor: '#1A5FB4',
    shadowOpacity: 0.05,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1D20',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1A5FB4',
  },

  /* ───── Security Container ───── */
  securityContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  securityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  securityTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F7336',
  },
  securitySubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 15,
  },

  /* ───── Footer Bar ───── */
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  payableCol: {
    flex: 1,
  },
  payableLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  payableValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1D20',
  },
  payButton: {
    backgroundColor: '#1A5FB4',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
