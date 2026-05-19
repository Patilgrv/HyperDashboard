import { useState, type FormEvent } from 'react';
import type { Campaign } from '../../types/campaign';
import { LOCATIONS } from '../../data/mockCampaign';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (campaign: Omit<Campaign, 'id'>) => void;
}

const emptyForm: { name: string; location: string; budget: string } = {
  name: '',
  location: LOCATIONS[0],
  budget: '',
};

export function CreateCampaignModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCampaignModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const budget = Number(form.budget);
    if (!form.name.trim()) {
      setError('Campaign name is required.');
      return;
    }
    if (!budget || budget <= 0) {
      setError('Budget must be a positive number.');
      return;
    }

    onCreate({
      name: form.name.trim(),
      location: form.location,
      budget,
      status: 'active',
      impressions: 0,
      clicks: 0,
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <dialog
        className="modal"
        open
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="create-campaign-title"
      >
        <header className="modal__header">
          <h2 id="create-campaign-title">Create Campaign</h2>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </header>

        <form className="modal__form" onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}

          <label className="form-field">
            <span>Campaign Name</span>
            <input
              className="input"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Spring Sale Promo"
            />
          </label>

          <label className="form-field">
            <span>Location</span>
            <select
              className="select"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Budget (USD)</span>
            <input
              className="input"
              type="number"
              min="1"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="5000"
            />
          </label>

          <footer className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Create Campaign
            </button>
          </footer>
        </form>
      </dialog>
    </div>
  );
}
