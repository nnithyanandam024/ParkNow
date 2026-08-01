import { supabase } from '../config/supabase';

export const adminService = {
  /**
   * Fetch all staff members with shift & role information
   */
  async getStaffList() {
    try {
      const { data, error } = await supabase
        .from('staff_profiles')
        .select(`
          staff_id,
          job_title,
          shift,
          employment_status,
          users (
            user_id,
            full_name,
            email,
            phone
          )
        `);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('getStaffList Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Add a new Staff Member
   */
  async createStaff({ fullName, email, phone, password, jobTitle, shift }) {
    try {
      // 1. Get STAFF role_id
      const { data: role } = await supabase
        .from('roles')
        .select('role_id')
        .eq('role_name', 'STAFF')
        .single();

      // 2. Create User account
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([
          {
            full_name: fullName,
            email: email,
            phone: phone,
            password_hash: password,
            role_id: role.role_id,
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      // 3. Create Staff Profile
      const { data: staff, error: staffError } = await supabase
        .from('staff_profiles')
        .insert([
          {
            user_id: user.user_id,
            job_title: jobTitle,
            shift: shift,
            employment_status: 'Active',
          },
        ])
        .select()
        .single();

      if (staffError) throw staffError;

      return { success: true, staff };
    } catch (error) {
      console.error('createStaff Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Add a new Parking Slot
   */
  async addParkingSlot({ locationId, slotNumber, floorLevel, slotType }) {
    try {
      const { data, error } = await supabase
        .from('parking_slots')
        .insert([
          {
            location_id: locationId,
            slot_number: slotNumber,
            floor_level: floorLevel,
            slot_type: slotType,
            status: 'AVAILABLE',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('addParkingSlot Error:', error);
      return { success: false, error: error.message };
    }
  },
};
