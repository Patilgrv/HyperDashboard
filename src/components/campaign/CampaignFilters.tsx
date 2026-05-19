import type { StatusFilter } from '../../types/campaign';

interface CampaignFiltersProps {
  statusFilter: StatusFilter;
  searchQuery: string;
  onStatusChange: (status: StatusFilter) => void;
  onSearchChange: (query: string) => void;
}

export function CampaignFilters({
  statusFilter,
  searchQuery,
  onStatusChange,
  onSearchChange,
}: CampaignFiltersProps) {
  return (
    <div className="campaign-filters">
      <label className="campaign-filters__field">
        <span className="campaign-filters__label">Status</span>
        <select
          className="select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </label>

      <label className="campaign-filters__field campaign-filters__field--search">
        <span className="campaign-filters__label">Search</span>
        <input
          type="search"
          className="input"
          placeholder="Search campaigns by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>
    </div>
  );
}
