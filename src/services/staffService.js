import { supabase } from '../config/supabase';

export const staffService = {
  /**
   * Verify Scanned Booking QR Code (Used in Staff QRScanner)
   */
  async verifyBookingQRCode(bookingCode, staffId = 1) {
    try {
      // 1. Fetch booking by code
      const { data: booking, error } = await supabase
        .from('bookings')
        .select(`
          *,
          users (full_name, phone),
          parking_locations (name),
          parking_slots (slot_number),
          vehicles (vehicle_number, vehicle_type)
        `)
        .eq('booking_code', bookingCode)
        .single();

      if (error || !booking) {
        return {
          success: false,
          error: 'Invalid or Unrecognized Parking Pass Code',
        };
      }

      // 2. Perform actions depending on current status
      let newStatus = booking.status;
      let logAction = 'ENTRY_SCAN';

      if (booking.status === 'CONFIRMED' || booking.status === 'PENDING') {
        newStatus = 'CHECKED_IN';
        logAction = 'ENTRY_SCAN';

        // Update booking actual_check_in & status
        await supabase
          .from('bookings')
          .update({ status: 'CHECKED_IN', actual_check_in: new Date().toISOString() })
          .eq('booking_id', booking.booking_id);

        // Update slot status to OCCUPIED
        await supabase
          .from('parking_slots')
          .update({ status: 'OCCUPIED' })
          .eq('slot_id', booking.slot_id);
      } else if (booking.status === 'CHECKED_IN') {
        newStatus = 'COMPLETED';
        logAction = 'EXIT_SCAN';

        // Update booking actual_check_out & status
        await supabase
          .from('bookings')
          .update({ status: 'COMPLETED', actual_check_out: new Date().toISOString() })
          .eq('booking_id', booking.booking_id);

        // Release slot back to AVAILABLE
        await supabase
          .from('parking_slots')
          .update({ status: 'AVAILABLE' })
          .eq('slot_id', booking.slot_id);
      }

      // 3. Log to verification_logs table
      await supabase.from('verification_logs').insert([
        {
          booking_id: booking.booking_id,
          verified_by_staff_id: staffId,
          action: logAction,
          status: 'SUCCESS',
          remarks: `Pass verified. Action: ${logAction}`,
        },
      ]);

      return {
        success: true,
        booking: {
          ...booking,
          status: newStatus,
        },
        action: logAction,
      };
    } catch (error) {
      console.error('verifyBookingQRCode Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Create Manual Spot Booking by Gate Attendant
   */
  async createManualBooking({
    vehicleNumber,
    vehicleType,
    locationId,
    slotId,
    staffId,
    collectedAmount,
  }) {
    try {
      // 1. Create a dummy or lookup guest user
      const guestEmail = `guest_${Date.now()}@parknow.local`;
      const { data: user } = await supabase
        .from('users')
        .insert([{ full_name: 'Walk-in Customer', email: guestEmail, phone: `${Date.now()}`, password_hash: 'manual', role_id: 4 }])
        .select()
        .single();

      const userId = user ? user.user_id : 4;

      // 2. Create vehicle record
      const { data: vehicle } = await supabase
        .from('vehicles')
        .insert([{ user_id: userId, vehicle_number: vehicleNumber, vehicle_type: vehicleType }])
        .select()
        .single();

      const vehicleId = vehicle ? vehicle.vehicle_id : 1;

      // 3. Create spot booking
      const bookingCode = `SPOT-${Math.floor(10000 + Math.random() * 90000)}`;
      const { data: booking, error: bookingErr } = await supabase
        .from('bookings')
        .insert([
          {
            booking_code: bookingCode,
            user_id: userId,
            slot_id: slotId,
            location_id: locationId,
            vehicle_id: vehicleId,
            start_time: new Date().toISOString(),
            end_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            actual_check_in: new Date().toISOString(),
            total_amount: collectedAmount,
            booking_type: 'MANUAL_SPOT',
            status: 'CHECKED_IN',
          },
        ])
        .select()
        .single();

      if (bookingErr) throw bookingErr;

      // 4. Update slot to OCCUPIED
      await supabase.from('parking_slots').update({ status: 'OCCUPIED' }).eq('slot_id', slotId);

      // 5. Record Cash Payment
      await supabase.from('payments').insert([
        {
          booking_id: booking.booking_id,
          amount: collectedAmount,
          payment_method: 'CASH',
          payment_status: 'SUCCESS',
          collected_by_staff_id: staffId,
        },
      ]);

      return { success: true, booking };
    } catch (error) {
      console.error('createManualBooking Error:', error);
      return { success: false, error: error.message };
    }
  },
};
