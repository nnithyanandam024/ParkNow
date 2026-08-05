/**
 * OpenStreetMap & OSRM Free Routing Service
 * 100% Free Open-Source API integrations (No Credit Card / API Key required)
 */

export const osmMapService = {
  /**
   * Free Location Search Autocomplete via Photon OpenStreetMap API
   */
  async searchLocations(query) {
    if (!query || query.trim().length < 2) return [];

    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
      );
      const json = await response.json();

      if (!json.features) return [];

      return json.features.map((feature, idx) => ({
        id: String(feature.properties.osm_id || idx),
        name: feature.properties.name || feature.properties.street || 'Parking Location',
        address: `${feature.properties.city || feature.properties.state || ''}, ${feature.properties.country || ''}`,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      }));
    } catch (error) {
      console.warn('Photon Search Error:', error);
      return [];
    }
  },

  /**
   * Free Turn-by-Turn Driving Route Polyline via OSRM API
   */
  async getDrivingRoute(origin, destination) {
    try {
      const originStr = `${origin.longitude},${origin.latitude}`;
      const destStr = `${destination.longitude},${destination.latitude}`;

      const response = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${originStr};${destStr}?overview=full&geometries=geojson`
      );
      const json = await response.json();

      if (json.routes && json.routes.length > 0) {
        const route = json.routes[0];
        const coordinates = route.geometry.coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));

        const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
        const durationMin = Math.round(route.duration / 60);

        return {
          success: true,
          coordinates,
          distanceKm,
          durationMin,
        };
      }

      return { success: false, error: 'No route found' };
    } catch (error) {
      console.warn('OSRM Route Error:', error);
      return { success: false, error: error.message };
    }
  },
};
