import { Search, X } from 'lucide-react';
import { statusClass } from './pageData';

export function Heading({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action && (
        <button className="primary-button" onClick={action.onClick}>
          {Icon && <Icon size={15} />} {action.label}
        </button>
      )}
    </div>
  );
}
export function Stat({ label, value, detail, icon: Icon, tone = 'green' }) {
  return (
    <article className="workspace-stat">
      <span className={`stat-icon ${tone}`}>
        <Icon size={18} />
      </span>
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
export function Table({ columns, rows, empty = 'Aucun résultat' }) {
  return (
    <div className="workspace-table-wrap">
      <table className="workspace-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty-cell" colSpan={columns.length}>
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export function SearchTools({ value, onChange, placeholder = 'Rechercher…', children }) {
  return (
    <div className="workspace-tools">
      <label className="workspace-search">
        <Search size={16} />
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </label>
      {children}
    </div>
  );
}
export function Overlay({ title, onClose, children, onSubmit, submit = 'Enregistrer' }) {
  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="workspace-modal" onSubmit={onSubmit}>
        <header>
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Fermer">
            <X size={19} />
          </button>
        </header>
        <div className="workspace-form">{children}</div>
        <footer>
          <button type="button" className="secondary-button" onClick={onClose}>
            Annuler
          </button>
          <button className="primary-button" type="submit">
            {submit}
          </button>
        </footer>
      </form>
    </div>
  );
}
export function Field({ label, children }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
export function Status({ children }) {
  return <span className={`status-badge ${statusClass(children)}`}>{children}</span>;
}
