import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBF0F5',
    height: Platform.OS === 'ios' ? 90 : 78,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    overflow: 'hidden',
  },
  iconWrapperActive: {
    backgroundColor: '#E8EFFF', // Soft blue pill
    borderRadius: 16,
    overflow: 'hidden',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280', // Inactive gray
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: '#1A5FB4', // Active blue
  },
});
