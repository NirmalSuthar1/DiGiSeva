import React from 'react'

const REVENUE_DATA = [
    { month: 'Jan', earning: 80, expense: 20 },
    { month: 'Feb', earning: 120, expense: 30 },
    { month: 'Mar', earning: 95, expense: 40 },
    { month: 'Apr', earning: 140, expense: 25 },
    { month: 'May', earning: 115, expense: 45 },
    { month: 'Jun', earning: 90, expense: 35 },
    { month: 'Jul', earning: 130, expense: 50 },
    { month: 'Aug', earning: 110, expense: 30 },
    { month: 'Sep', earning: 160, expense: 42 },
    { month: 'Oct', earning: 105, expense: 38 },
    { month: 'Nov', earning: 145, expense: 55 },
    { month: 'Dec', earning: 175, expense: 60 },
]

const TRANSACTIONS = [
    { id: 1, icon: '💳', iconBg: '#eef2ff', title: 'Card Payment', desc: 'Web Dev — Ravi Kumar', amount: 14500, type: 'credit', date: '22 Mar 2026' },
    { id: 2, icon: '📱', iconBg: '#f0fdf4', title: 'UPI Transfer', desc: 'Platform Fee', amount: 1450, type: 'debit', date: '21 Mar 2026' },
    { id: 3, icon: '🏦', iconBg: '#eff6ff', title: 'Bank Transfer', desc: 'UI/UX Design — Priya', amount: 8200, type: 'credit', date: '19 Mar 2026' },
    { id: 4, icon: '💵', iconBg: '#fff7ed', title: 'Cash', desc: 'On-site Service', amount: 2500, type: 'credit', date: '16 Mar 2026' },
    { id: 5, icon: '📱', iconBg: '#f0fdf4', title: 'UPI Transfer', desc: 'Tax Deduction', amount: 600, type: 'debit', date: '14 Mar 2026' },
]

const RECENT_REQUESTS = [
    { id: 'REQ#042', client: 'Ravi Kumar', service: 'Web Development', date: '22 Mar 2026', amount: 14500, status: 'accepted' },
    { id: 'REQ#041', client: 'Priya Mehta', service: 'UI/UX Design', date: '19 Mar 2026', amount: 8200, status: 'completed' },
    { id: 'REQ#040', client: 'Suresh Nair', service: 'Mobile App', date: '15 Mar 2026', amount: 22000, status: 'pending' },
    { id: 'REQ#039', client: 'Ananya Roy', service: 'Web Development', date: '10 Mar 2026', amount: 9500, status: 'completed' },
]

const BarChart = ({ data }) => {
    const maxVal = Math.max(...data.flatMap(d => [d.earning, d.expense]), 1)
    const H = 150
    const bW = 9
    const gap = 12
    const lPad = 36
    const items = data.map((d, i) => ({
        ...d,
        x: lPad + i * (bW * 2 + 4 + gap),
        earningH: (d.earning / maxVal) * H,
        expenseH: (d.expense / maxVal) * H,
    }))
    const W = lPad + data.length * (bW * 2 + 4 + gap) + 10
    const gridVals = [0, Math.round(maxVal * 0.5), maxVal]
    return (
        <div className="ds-chart-wrap">
            <svg width={W} height={H + 26} viewBox={`0 0 ${W} ${H + 26}`}>
                {gridVals.map(v => {
                    const y = H - (v / maxVal) * H
                    return (
                        <g key={v}>
                            <line x1={lPad - 4} y1={y} x2={W - 4} y2={y} stroke="#f0f0f8" strokeWidth={1} />
                            <text x={lPad - 6} y={y + 4} fontSize={8} fill="#b0b0c8" textAnchor="end">{v}</text>
                        </g>
                    )
                })}
                {items.map(d => (
                    <g key={d.month}>
                        <rect x={d.x} y={H - d.earningH} width={bW} height={Math.max(d.earningH, 2)} fill="#7367f0" rx={3} />
                        <rect x={d.x + bW + 3} y={H - d.expenseH} width={bW} height={Math.max(d.expenseH, 2)} fill="#ff9f43" rx={3} />
                        <text x={d.x + bW + 1.5} y={H + 17} fontSize={8} fill="#b0b0c8" textAnchor="middle">{d.month}</text>
                    </g>
                ))}
            </svg>
        </div>
    )
}

const STATUS_LABELS = { pending: 'Pending', accepted: 'Active', completed: 'Completed', rejected: 'Rejected' }

const ProviderDashboard = ({ user }) => {
    const totalEarnings = TRANSACTIONS.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0)

    return (
        <div>
            {/* Welcome */}
            <div className="ds-welcome-banner">
                <div className="ds-welcome-tag">PROVIDER DASHBOARD</div>
                <div className="ds-welcome-title">Welcome back, {user.name?.split(' ')[0]}! 👋</div>
                <div className="ds-welcome-sub">Here's your performance overview for this month.</div>
            </div>

            {/* Stats */}
            <div className="ds-stats-grid">
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(40,199,111,0.12)' }}>💰</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">₹{totalEarnings.toLocaleString('en-IN')}</div>
                        <div className="ds-stat-label">Total Earnings</div>
                        <div className="ds-stat-trend up">↑ +18.2% vs last month</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(0,207,232,0.12)' }}>📋</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{RECENT_REQUESTS.filter(r => r.status === 'accepted').length}</div>
                        <div className="ds-stat-label">Active Requests</div>
                        <div className="ds-stat-trend up">↑ In progress</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(115,103,240,0.12)' }}>✅</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{RECENT_REQUESTS.filter(r => r.status === 'completed').length}</div>
                        <div className="ds-stat-label">Completed Jobs</div>
                        <div className="ds-stat-trend up">↑ This month</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(255,159,67,0.12)' }}>⭐</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">4.8</div>
                        <div className="ds-stat-label">Avg. Rating</div>
                        <div className="ds-stat-trend up">↑ From 24 reviews</div>
                    </div>
                </div>
            </div>

            {/* Revenue Chart + Transactions */}
            <div className="ds-grid-2">
                <div className="ds-card">
                    <div className="ds-card-header">
                        <div>
                            <div className="ds-card-title">Revenue Report</div>
                            <div className="ds-card-subtitle">Monthly earnings vs platform fees — 2026</div>
                        </div>
                        <div className="ds-chart-legend">
                            <div className="ds-legend-item">
                                <div className="ds-legend-dot" style={{ background: '#7367f0' }} /> Earning
                            </div>
                            <div className="ds-legend-item">
                                <div className="ds-legend-dot" style={{ background: '#ff9f43' }} /> Expense
                            </div>
                        </div>
                    </div>
                    <div className="ds-card-body">
                        <BarChart data={REVENUE_DATA} />
                    </div>
                </div>

                <div className="ds-card">
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
                </div>
            </div>

            {/* Recent Requests */}
            <div className="ds-card ds-grid-full">
                <div className="ds-card-header">
                    <div className="ds-card-title">Recent Requests</div>
                </div>
                <div className="ds-table-wrap">
                    <table className="ds-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Client</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_REQUESTS.map(req => (
                                <tr key={req.id}>
                                    <td style={{ color: '#7367f0', fontWeight: 600 }}>{req.id}</td>
                                    <td>{req.client}</td>
                                    <td>{req.service}</td>
                                    <td style={{ color: '#7a7a9a' }}>{req.date}</td>
                                    <td style={{ fontWeight: 700 }}>₹{req.amount.toLocaleString('en-IN')}</td>
                                    <td>
                                        <span className={`ds-badge ds-badge-${req.status}`}>
                                            {STATUS_LABELS[req.status]}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProviderDashboard
