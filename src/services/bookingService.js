import { supabase } from '../config/supabase';

export const bookingService = {
  /**
   * Create a New Parking Reservation / Booking
   */
  async createBooking({
    userId,
    locationId,
    slotId,
    vehicleId,
    startTime,
    endTime,
    totalAmount,
    bookingType = 'ONLINE',
  }) {
    try {
      // 1. Generate unique booking code
      const bookingCode = `PN-BK-${Math.floor(10000 + Math.random() * 90000)}`;

      // 2. Insert booking record
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            booking_code: bookingCode,
            user_id: userId,
            location_id: locationId,
            slot_id: slotId,
            vehicle_id: vehicleId,
            start_time: startTime,
            end_time: endTime,
            total_amount: totalAmount,
            booking_type: bookingType,
            status: 'CONFIRMED',
          },
        ])
        .select()
        .single();

      if (bookingError) throw bookingError;

      // 3. Mark the slot as RESERVED
      await supabase
        .from('parking_slots')
        .update({ status: 'RESERVED' })
        .eq('slot_id', slotId);

      return { success: true, booking };
    } catch (error) {
      console.error('createBooking Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Fetch active and past bookings for a specific customer/user
   */
  async getUserBookings(userId) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          parking_locations (name, address),
          parking_slots (slot_number, floor_level),
          vehicles (vehicle_number, vehicle_type, model_name),
          payments (amount, payment_method, payment_status)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('getUserBookings Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Process and record Payment for a booking in public.payments
   */
  async recordPayment({
    bookingId,
    amount,
    paymentMethod,
    paymentStatus = 'SUCCESS',
    transactionId,
    collectedByStaffId = null,
  }) {
    try {
      const txnId =
        transactionId ||
        `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const { data, error } = await supabase
        .from('payments')
        .insert([
          {
            booking_id: bookingId,
            amount: Number(amount),
            payment_method: paymentMethod || 'UPI',
            payment_status: paymentStatus || 'SUCCESS',
            transaction_id: txnId,
            collected_by_staff_id: collectedByStaffId,
            paid_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('recordPayment Error:', error);
      return { success: false, error: error.message };
    }
  },
};
