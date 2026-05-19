interface HeaderProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Header({
  locations,
  selectedLocation,
  onLocationChange,
  theme,
  onThemeToggle,
}: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h2 className="header__title">HyperLocal Ad Manager</h2>
        <p className="header__subtitle">
          Manage campaigns across your local markets
        </p>
      </div>

      <div className="header__controls">
        <label className="header__field">
          <span className="header__label">Location Filter</span>
          <select
            className="select"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="btn btn--secondary"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
}
