/**
 * IFOPT IDs could have more levels that smap can handle.
 * we only pass on the first 3 parts of the id.
 * @param departureMonitorId 
 * @returns the shortened id
 */
export const parseDepartureMonitorId = (departureMonitorId: string | null) => {
  return departureMonitorId?.split(':').slice(0,3).join(':')
}