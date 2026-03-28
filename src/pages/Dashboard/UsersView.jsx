import React, { useState, useEffect } from 'react'

const UsersView = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(r => r.json())
            .then(data => { setUsers(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const filtered = users.filter(u =>
        (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.role || '').toLowerCase().includes(search.toLowerCase())
    )

    const initials = (name = '') => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

    const ROLE_CONFIG = {
        admin:  { label: 'Admin',  cls: 'ds-badge-rejected' },
        client: { label: 'Client', cls: 'ds-badge-accepted' },
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#22222b' }}>All Users</h2>
                    <p style={{ fontSize: '0.78rem', color: '#7a7a9a', marginTop: 2 }}>{users.length} registered users</p>
                </div>
                <input
                    type="text"
                    placeholder="Search users..."
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
                    <div className="ds-empty"><div className="ds-empty-icon">⏳</div><div className="ds-empty-text">Loading users…</div></div>
                ) : filtered.length === 0 ? (
                    <div className="ds-empty"><div className="ds-empty-icon">🔍</div><div className="ds-empty-text">No users found.</div></div>
                ) : (
                    <div className="ds-table-wrap">
                        <table className="ds-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>User ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(u => {
                                    const roleCfg = ROLE_CONFIG[u.role] || { label: u.role, cls: 'ds-badge-pending' }
                                    return (
                                        <tr key={u.id}>
                                            <td>
                                                <div className="ds-table-name">
                                                    <div className="ds-table-avatar" style={{ background: u.role === 'admin' ? 'rgba(234,84,85,0.12)' : 'rgba(0,207,232,0.12)', color: u.role === 'admin' ? '#ea5455' : '#00cfe8' }}>
                                                        {initials(u.name)}
                                                    </div>
                                                    <div className="ds-table-meta">
                                                        <div className="ds-table-meta-name">{u.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ color: '#7a7a9a' }}>{u.email}</td>
                                            <td><span className={`ds-badge ${roleCfg.cls}`}>{roleCfg.label}</span></td>
                                            <td style={{ color: '#b0b0c8', fontSize: '0.76rem', fontFamily: 'monospace' }}>{u.id}</td>
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

export default UsersView
