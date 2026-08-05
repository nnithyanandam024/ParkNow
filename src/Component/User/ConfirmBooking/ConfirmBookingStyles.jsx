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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : (Platform.OS === 'ios' ? 44 : 14),
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },

  /* ───── Scroll Area ───── */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 160 : 130,
  },

  /* ───── Cards ───── */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
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

  /* Destination Details */
  destHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0052cc',
    letterSpacing: 0.8,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  destTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
  },
  pBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  pBadgeText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0052cc',
  },
  destAddress: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
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
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0052cc',
  },

  /* Date & Time Container */
  dateTimeContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateTimeLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  dateTimeValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
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
    fontWeight: '800',
    color: '#0F172A',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0052cc',
  },
  vehicleDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  carIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  licensePlate: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  vehicleModel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
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
    color: '#64748B',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  promoLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  promoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  dashedDivider: {
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0052cc',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    fontWeight: '700',
    color: '#1E293B',
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
    color: '#64748B',
    lineHeight: 15,
    fontWeight: '500',
  },

  /* Floating Action Button Container (Transparent Background) */
  footerButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 88 : 74,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 90,
  },
  confirmButton: {
    backgroundColor: '#0052cc',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* ───── Duration Selector Chips ───── */
  durationRow: {
    marginTop: 10,
    marginBottom: 4,
  },
  durationScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  durationChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  durationChipActive: {
    backgroundColor: '#0052cc',
    borderColor: '#0052cc',
  },
  durationChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  durationChipTextActive: {
    color: '#FFFFFF',
  },

  /* ───── Modals & Overlays ───── */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  modalSaveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#0052cc',
  },
  modalSaveText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Calendar Modal Styles */
  calendarModalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  calendarMonthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayLabel: {
    width: 36,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 10,
  },
  dayCellEmpty: {
    width: '14.28%',
    height: 40,
  },
  dayCellSelected: {
    backgroundColor: '#0052cc',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* Date / Time Picker Input Box */
  datePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  datePickerValueText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
});
