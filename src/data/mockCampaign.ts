import type { Campaign } from '../types/campaign';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Downtown Coffee Promo',
    location: 'Austin',
    budget: 2500,
    status: 'active',
    impressions: 45200,
    clicks: 1280,
  },
  {
    id: '2',
    name: 'Summer Fitness Blast',
    location: 'Denver',
    budget: 4200,
    status: 'active',
    impressions: 78500,
    clicks: 2340,
  },
  {
    id: '3',
    name: 'Local Auto Deals',
    location: 'Seattle',
    budget: 3100,
    status: 'paused',
    impressions: 32100,
    clicks: 890,
  },
  {
    id: '4',
    name: 'Tech Startup Launch',
    location: 'Austin',
    budget: 5800,
    status: 'active',
    impressions: 92300,
    clicks: 3100,
  },
  {
    id: '5',
    name: 'Holiday Retail Push',
    location: 'Denver',
    budget: 6500,
    status: 'paused',
    impressions: 112000,
    clicks: 4200,
  },
  {
    id: '6',
    name: 'Restaurant Week Special',
    location: 'Seattle',
    budget: 1800,
    status: 'active',
    impressions: 28400,
    clicks: 760,
  },
  {
    id: '7',
    name: 'Real Estate Showcase',
    location: 'Austin',
    budget: 7200,
    status: 'active',
    impressions: 105600,
    clicks: 2890,
  },
];

export const LOCATIONS = ['Austin', 'Denver', 'Seattle'] as const;
