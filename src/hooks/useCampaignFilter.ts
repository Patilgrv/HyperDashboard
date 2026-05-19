import { useMemo } from 'react';
import type { Campaign, StatusFilter } from '../types/campaign';

export function useCampaignFilter(
  campaigns: Campaign[],
  location: string,
  statusFilter: StatusFilter,
  searchQuery: string,
) {
  return useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return campaigns.filter((campaign) => {
      const locationMatch =
        location === 'all' || campaign.location === location;
      const statusMatch =
        statusFilter === 'all' || campaign.status === statusFilter;
      const searchMatch =
        !q || campaign.name.toLowerCase().includes(q);

      return locationMatch && statusMatch && searchMatch;
    });
  }, [campaigns, location, statusFilter, searchQuery]);
}
