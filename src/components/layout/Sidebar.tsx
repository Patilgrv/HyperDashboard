export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">
          HL
        </span>
        <div>
          <h1 className="sidebar__title">Hyperlocology</h1>
          <p className="sidebar__subtitle">Ad Manager</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        <button type="button" className="sidebar__link sidebar__link--active">
          Dashboard
        </button>
        <button type="button" className="sidebar__link" disabled>
          Analytics
        </button>
        <button type="button" className="sidebar__link" disabled>
          Settings
        </button>
      </nav>
    </aside>
  );
}
