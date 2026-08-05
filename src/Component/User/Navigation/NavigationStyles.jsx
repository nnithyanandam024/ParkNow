import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* ───── Header Bar ───── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 44,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  /* ───── Map Area ───── */
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },

  /* ───── Floating Turn Banner ───── */
  routeBanner: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 35,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  turnCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0052cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  routeBannerTextCol: {
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  /* ───── Floating Map Action Controls ───── */
  mapFloatingActions: {
    position: 'absolute',
    left: 16,
    bottom: 265,
    zIndex: 35,
    gap: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  /* ───── Bottom Sheet Drawer ───── */
  bottomDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },

  /* Destination Row */
  destinationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  destLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  redPinCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destTextCol: {
    flex: 1,
  },
  destName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  destAddress: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  /* Assigned Slot Badge */
  slotBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  slotBadgeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  slotBadgeValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Metrics Cards Row */
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },

  /* Arrival Action Button */
  arriveBtn: {
    height: 50,
    backgroundColor: '#0052cc',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  arriveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
