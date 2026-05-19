export type CampaignStatus = 'active' | 'paused';

export interface Campaign {
  id: string;
  name: string;
  location: string;
  budget: number;
  status: CampaignStatus;
  impressions: number;
  clicks: number;
}

export type StatusFilter = 'all' | CampaignStatus;
