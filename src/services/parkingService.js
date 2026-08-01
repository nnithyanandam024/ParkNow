import { supabase } from '../config/supabase';

export const parkingService = {
  /**
   * Fetch all parking locations with real-time available slot counts
   */
  async getParkingLocations() {
    try {
      const { data, error } = await supabase
        .from('parking_locations')
        .select(`
          *,
          parking_slots (
            slot_id,
            status,
            slot_type
          )
        `);

      if (error) throw error;

      // Transform data with calculated slot stats
      const formattedLocations = data.map((loc) => {
        const slots = loc.parking_slots || [];
        const availableCount = slots.filter((s) => s.status === 'AVAILABLE').length;
        const totalCount = slots.length;

        return {
          ...loc,
          availableSlots: availableCount,
          totalSlots: totalCount || loc.total_capacity,
        };
      });

      return { success: true, data: formattedLocations };
    } catch (error) {
      console.error('getParkingLocations Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Fetch available parking slots by location ID and vehicle type
   */
  async getSlotsByLocation(locationId) {
    try {
      const { data, error } = await supabase
        .from('parking_slots')
        .select('*')
        .eq('location_id', locationId)
        .eq('is_active', true)
        .order('slot_number', { ascending: true });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('getSlotsByLocation Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update Parking Slot Status ('AVAILABLE', 'RESERVED', 'OCCUPIED', 'MAINTENANCE')
   */
  async updateSlotStatus(slotId, newStatus) {
    try {
      const { data, error } = await supabase
        .from('parking_slots')
        .update({ status: newStatus })
        .eq('slot_id', slotId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('updateSlotStatus Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Fetch Live Occupancy Summary (Analytical View)
   */
  async getOccupancySummary() {
    try {
      const { data, error } = await supabase
        .from('view_slot_occupancy_summary')
        .select('*');

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('getOccupancySummary Error:', error);
      return { success: false, error: error.message };
    }
  },
};
