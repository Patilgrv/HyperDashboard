import type { Campaign } from '../../types/campaign';

interface CampaignTableProps {
  campaigns: Campaign[];
  onToggleStatus: (id: string) => void;
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function CampaignTable({
  campaigns,
  onToggleStatus,
}: CampaignTableProps) {
  if (campaigns.length === 0) {
    return (
      <div className="table-empty">
        <p>No campaigns match your filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Budget</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td className="table__name">{campaign.name}</td>
              <td>{campaign.location}</td>
              <td>{currency.format(campaign.budget)}</td>
              <td>
                <span
                  className={`badge badge--${campaign.status}`}
                >
                  {campaign.status === 'active' ? 'Active' : 'Paused'}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => onToggleStatus(campaign.id)}
                >
                  {campaign.status === 'active' ? 'Pause' : 'Resume'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
