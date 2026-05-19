import { MetricCard } from './MetricCard';

interface MetricsGridProps {
  totalBudget: number;
  impressions: number;
  clicks: number;
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-US');

export function MetricsGrid({
  totalBudget,
  impressions,
  clicks,
}: MetricsGridProps) {
  return (
    <section className="metrics-grid" aria-label="Campaign metrics">
      <MetricCard label="Total Budget" value={currency.format(totalBudget)} />
      <MetricCard
        label="Impressions"
        value={number.format(impressions)}
      />
      <MetricCard label="Clicks" value={number.format(clicks)} />
    </section>
  );
}
