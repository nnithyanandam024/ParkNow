import { supabase } from '../config/supabase';

/**
 * ParkNow Realtime Service
 * Manages all Supabase Realtime channel subscriptions
 */
export const realtimeService = {
  /**
   * Subscribe to live parking slot status changes for a location
   * Callback receives: { slot_id, slot_number, status, slot_type }
   */
  subscribeToSlots(locationId, callback) {
    const channel = supabase
      .channel(`slots-location-${locationId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'parking_slots',
          filter: `location_id=eq.${locationId}`,
        },
        (payload) => {
          console.log('[Realtime] Slot changed:', payload);
          callback(payload);
        }
      )
      .subscribe((status) => {
        console.log(`[Realtime] Slots channel (location ${locationId}):`, status);
      });

    return channel;
  },

  /**
   * Subscribe to live booking changes (new bookings, status updates)
   * Callback receives: { booking_id, booking_code, status, ... }
   */
  subscribeToBookings(callback) {
    const channel = supabase
      .channel('bookings-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          console.log('[Realtime] Booking changed:', payload);
          callback(payload);
        }
      )
      .subscribe((status) => {
        console.log('[Realtime] Bookings channel:', status);
      });

    return channel;
  },

  /**
   * Subscribe to verification log events (gate scan entries)
   * Useful for Staff Dashboard live activity feed
   */
  subscribeToVerificationLogs(callback) {
    const channel = supabase
      .channel('verif-logs-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'verification_logs',
        },
        (payload) => {
          console.log('[Realtime] Verification log:', payload);
          callback(payload);
        }
      )
      .subscribe((status) => {
        console.log('[Realtime] Verification logs channel:', status);
      });

    return channel;
  },

  /**
   * Unsubscribe and clean up a channel
   */
  unsubscribe(channel) {
    if (channel) {
      supabase.removeChannel(channel);
    }
  },
};
