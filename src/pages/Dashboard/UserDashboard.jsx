import React from 'react'

const MY_REQUESTS = [
    {
        id: 'REQ#091',
        provider: 'Amit Patel',
        providerRole: 'Web Developer',
        service: 'Web Development',
        description: 'Need a responsive landing page built with React.',
        duration: '7 Days',
        amount: 15000,
        paymentMethod: 'UPI',
        date: '21 Mar 2026',
        status: 'pending',
    },
    {
        id: 'REQ#090',
        provider: 'Priya Sharma',
        providerRole: 'UI/UX Designer',
        service: 'UI/UX Design',
        description: 'Design a mobile app interface for my e-commerce app.',
        duration: '14 Days',
        amount: 8000,
        paymentMethod: 'Bank Transfer',
        date: '18 Mar 2026',
        status: 'accepted',
    },
    {
        id: 'REQ#089',
        provider: 'Rahul Kumar',
        providerRole: 'Digital Marketer',
        service: 'Digital Marketing',
        description: 'SEO and social media marketing for 1 month.',
        duration: '1 Month',
        amount: 5000,
        paymentMethod: 'Card',
        date: '10 Mar 2026',
        status: 'completed',
    },
    {
        id: 'REQ#088',
        provider: 'Neha Singh',
        providerRole: 'Content Writer',
        service: 'Content Writing',
        description: '10 blog articles on technology topics.',
        duration: '5 Days',
        amount: 2000,
        paymentMethod: 'UPI',
        date: '05 Mar 2026',
        status: 'rejected',
    },
]

const TRANSACTIONS = [
    { id: 1, icon: '📱', iconBg: '#eef2ff', title: 'UPI Payment', desc: 'UI/UX Design Service', amount: 8000, type: 'debit', date: '18 Mar 2026' },
    { id: 2, icon: '💳', iconBg: '#f0fdf4', title: 'Card Payment', desc: 'Digital Marketing', amount: 5000, type: 'debit', date: '10 Mar 2026' },
    { id: 3, icon: '🏦', iconBg: '#fff7ed', title: 'Refund', desc: 'Request #088 cancelled', amount: 2000, type: 'credit', date: '07 Mar 2026' },
]

const STATUS_CONFIG = {
    pending:   { label: 'Pending',   cls: 'ds-badge-pending',   icon: '🕐' },
    accepted:  { label: 'Active',    cls: 'ds-badge-accepted',  icon: '⚡' },
    completed: { label: 'Completed', cls: 'ds-badge-completed', icon: '✅' },
    rejected:  { label: 'Rejected',  cls: 'ds-badge-rejected',  icon: '❌' },
}

const UserDashboard = ({ user }) => {
    const active    = MY_REQUESTS.filter(r => r.status === 'accepted').length
    const completed = MY_REQUESTS.filter(r => r.status === 'completed').length
    const pending   = MY_REQUESTS.filter(r => r.status === 'pending').length
    const totalSpent = MY_REQUESTS.filter(r => r.status !== 'rejected').reduce((s, r) => s + r.amount, 0)

    return (
        <div>
            {/* Welcome */}
            <div className="ds-welcome-banner">
                <div className="ds-welcome-tag">CLIENT DASHBOARD</div>
                <div className="ds-welcome-title">Welcome back, {user.name?.split(' ')[0]}! 👋</div>
                <div className="ds-welcome-sub">Track your service requests and transactions all in one place.</div>
            </div>

            {/* Stats */}
            <div className="ds-stats-grid">
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(0,207,232,0.12)' }}>⚡</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{active}</div>
                        <div className="ds-stat-label">Active Requests</div>
                        <div className="ds-stat-trend up">In progress</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(115,103,240,0.12)' }}>🕐</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{pending}</div>
                        <div className="ds-stat-label">Pending Requests</div>
                        <div className="ds-stat-trend" style={{ color: '#ff9f43' }}>Awaiting response</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(40,199,111,0.12)' }}>✅</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{completed}</div>
                        <div className="ds-stat-label">Completed</div>
                        <div className="ds-stat-trend up">Jobs finished</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(255,159,67,0.12)' }}>💸</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">₹{totalSpent.toLocaleString('en-IN')}</div>
                        <div className="ds-stat-label">Total Spent</div>
                        <div className="ds-stat-trend up">Across all services</div>
                    </div>
                </div>
            </div>

            {/* Requests + Transactions */}
            <div className="ds-grid-2">
                {/* My Requests */}
                <div className="ds-card">
                    <div className="ds-card-header">
                        <div>
                            <div className="ds-card-title">My Service Requests</div>
                            <div className="ds-card-subtitle">{MY_REQUESTS.length} total requests made</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {MY_REQUESTS.map(req => {
                            const cfg = STATUS_CONFIG[req.status]
                            return (
                                <div key={req.id} style={{
                                    padding: '16px 20px',
                                    borderBottom: '1px solid #ebebf5',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 8,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7367f0' }}>{req.id}</span>
                                            <span style={{ fontSize: '0.72rem', color: '#7a7a9a', marginLeft: 8 }}>{req.date}</span>
                                        </div>
                                        <span className={`ds-badge ${cfg.cls}`}>{cfg.icon} {cfg.label}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#22222b' }}>{req.service}</div>
                                            <div style={{ fontSize: '0.78rem', color: '#7a7a9a', marginTop: 2 }}>
                                                {req.provider} · {req.providerRole}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#9090a8', marginTop: 4, fontStyle: 'italic' }}>
                                                "{req.description.length > 55 ? req.description.slice(0, 52) + '…' : req.description}"
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#22222b' }}>
                                                ₹{req.amount.toLocaleString('en-IN')}
                                            </div>
                                            <div style={{ fontSize: '0.68rem', color: '#9090a8', marginTop: 2 }}>{req.duration}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <span style={{
                                            fontSize: '0.68rem', fontWeight: 600, color: '#7a7a9a',
                                            background: '#f4f5f7', borderRadius: 6, padding: '2px 8px',
                                        }}>
                                            💳 {req.paymentMethod}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Transactions */}
                <div className="ds-card" style={{ alignSelf: 'start' }}>
                    <div className="ds-card-header">
                        <div className="ds-card-title">Transactions</div>
                    </div>
                    <div className="ds-transaction-list">
                        {TRANSACTIONS.map(txn => (
                            <div key={txn.id} className="ds-transaction-item">
                                <div className="ds-txn-icon" style={{ background: txn.iconBg }}>{txn.icon}</div>
                                <div className="ds-txn-body">
                                    <div className="ds-txn-title">{txn.title}</div>
                                    <div className="ds-txn-desc">{txn.desc}</div>
                                </div>
                                <div className="ds-txn-right">
                                    <div className={`ds-txn-amount ${txn.type}`}>
                                        {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                                    </div>
                                    <div className="ds-txn-date">{txn.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick summary */}
                    <div style={{ padding: '16px 20px', borderTop: '1px solid #ebebf5', display: 'flex', gap: 20 }}>
                        <div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ea5455' }}>
                                ₹{TRANSACTIONS.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#7a7a9a', fontWeight: 600, textTransform: 'uppercase' }}>Total Paid</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#28c76f' }}>
                                ₹{TRANSACTIONS.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#7a7a9a', fontWeight: 600, textTransform: 'uppercase' }}>Refunds</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
