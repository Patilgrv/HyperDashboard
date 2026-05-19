import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MetricsGrid } from '../components/metrics/MetricsGrid';
import { CampaignFilters } from '../components/campaign/CampaignFilters';
import { CampaignTable } from '../components/campaign/CampaignTable';
import { CreateCampaignModal } from '../components/campaign/CreateCampaignModal';
import { mockCampaigns, LOCATIONS } from '../data/mockCampaign';
import { useCampaignFilter } from '../hooks/useCampaignFilter';
import type { Campaign, StatusFilter } from '../types/campaign';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('hl-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function DashboardPage() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalKey, setCreateModalKey] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hl-theme', theme);
  }, [theme]);

  const locationFilteredCampaigns = useMemo(() => {
    if (selectedLocation === 'all') return campaigns;
    return campaigns.filter((c) => c.location === selectedLocation);
  }, [campaigns, selectedLocation]);

  const metrics = useMemo(() => {
    return locationFilteredCampaigns.reduce(
      (acc, campaign) => ({
        totalBudget: acc.totalBudget + campaign.budget,
        impressions: acc.impressions + campaign.impressions,
        clicks: acc.clicks + campaign.clicks,
      }),
      { totalBudget: 0, impressions: 0, clicks: 0 },
    );
  }, [locationFilteredCampaigns]);

  const filteredCampaigns = useCampaignFilter(
    campaigns,
    selectedLocation,
    statusFilter,
    searchQuery,
  );

  function handleToggleStatus(id: string) {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
          : c,
      ),
    );
  }

  function handleCreate(campaign: Omit<Campaign, 'id'>) {
    const newCampaign: Campaign = {
      ...campaign,
      id: crypto.randomUUID(),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
  }

  return (
    <>
      <DashboardLayout
        locations={[...LOCATIONS]}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        theme={theme}
        onThemeToggle={() =>
          setTheme((t) => (t === 'light' ? 'dark' : 'light'))
        }
      >
        <MetricsGrid
          totalBudget={metrics.totalBudget}
          impressions={metrics.impressions}
          clicks={metrics.clicks}
        />

        <section className="campaigns-section">
          <div className="campaigns-section__header">
            <div>
              <h3 className="campaigns-section__title">Campaigns</h3>
              <p className="campaigns-section__count">
                {filteredCampaigns.length} of {campaigns.length} campaigns
              </p>
            </div>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                setCreateModalKey((k) => k + 1);
                setIsCreateModalOpen(true);
              }}
            >
              + Create Campaign
            </button>
          </div>

          <CampaignFilters
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchQuery}
          />

          <CampaignTable
            campaigns={filteredCampaigns}
            onToggleStatus={handleToggleStatus}
          />
        </section>
      </DashboardLayout>

      <CreateCampaignModal
        key={createModalKey}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
}
