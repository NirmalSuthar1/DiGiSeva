import React, { useState, useEffect } from 'react'

const STATUS_CONFIG = {
    pending:  { label: 'Pending',  cls: 'ds-badge-pending' },
    approved: { label: 'Approved', cls: 'ds-badge-completed' },
    active:   { label: 'Active',   cls: 'ds-badge-accepted' },
}

const ProvidersView = () => {
    const [providers, setProviders] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/providers')
            .then(r => r.json())
            .then(data => { setProviders(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const filtered = providers.filter(p =>
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.profile?.title || p.role || '').toLowerCase().includes(search.toLowerCase())
    )

    const initials = (name = '') => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

    return (
        <div>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#22222b' }}>All Service Providers</h2>
                    <p style={{ fontSize: '0.78rem', color: '#7a7a9a', marginTop: 2 }}>{providers.length} registered providers</p>
                </div>
                <input
                    type="text"
                    placeholder="Search providers..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        background: '#fff', border: '1.5px solid #ebebf5', borderRadius: 10,
                        padding: '9px 14px', fontSize: '0.84rem', outline: 'none',
                        fontFamily: 'inherit', color: '#22222b', width: 240,
                    }}
                />
            </div>

            <div className="ds-card">
                {loading ? (
                    <div className="ds-empty"><div className="ds-empty-icon">⏳</div><div className="ds-empty-text">Loading providers…</div></div>
                ) : filtered.length === 0 ? (
                    <div className="ds-empty"><div className="ds-empty-icon">🔍</div><div className="ds-empty-text">No providers found.</div></div>
                ) : (
                    <div className="ds-table-wrap">
                        <table className="ds-table">
                            <thead>
                                <tr>
                                    <th>Provider</th>
                                    <th>Email</th>
                                    <th>Title / Role</th>
                                    <th>City</th>
                                    <th>Experience</th>
                                    <th>Education</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(p => {
                                    const status = p.status || 'pending'
                                    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
                                    return (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="ds-table-name">
                                                    <div className="ds-table-avatar">{initials(p.name)}</div>
                                                    <div className="ds-table-meta">
                                                        <div className="ds-table-meta-name">{p.name}</div>
                                                        <div className="ds-table-meta-sub">ID: {p.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ color: '#7a7a9a' }}>{p.email}</td>
                                            <td>{p.profile?.title || p.role || '—'}</td>
                                            <td style={{ color: '#7a7a9a' }}>
                                                {p.profile?.city ? `${p.profile.city}, ${p.profile.state}` : '—'}
                                            </td>
                                            <td style={{ color: '#7a7a9a' }}>
                                                {p.profile?.experience != null ? `${p.profile.experience} yr${p.profile.experience !== 1 ? 's' : ''}` : '—'}
                                            </td>
                                            <td style={{ color: '#7a7a9a' }}>
                                                {p.qualifications?.education || '—'}
                                            </td>
                                            <td>
                                                <span className={`ds-badge ${cfg.cls}`}>{cfg.label}</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProvidersView
