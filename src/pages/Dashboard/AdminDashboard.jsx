import React, { useState, useEffect } from 'react'

/* ─── Mock Data ─────────────────────────────────────────── */
const REVENUE_DATA = [
    { month: 'Jan', earning: 160, expense: 45 },
    { month: 'Feb', earning: 220, expense: 60 },
    { month: 'Mar', earning: 185, expense: 80 },
    { month: 'Apr', earning: 270, expense: 55 },
    { month: 'May', earning: 240, expense: 90 },
    { month: 'Jun', earning: 195, expense: 70 },
    { month: 'Jul', earning: 260, expense: 100 },
    { month: 'Aug', earning: 230, expense: 65 },
    { month: 'Sep', earning: 290, expense: 85 },
    { month: 'Oct', earning: 210, expense: 75 },
    { month: 'Nov', earning: 250, expense: 95 },
    { month: 'Dec', earning: 300, expense: 110 },
]

const TRANSACTIONS = [
    { id: 1, icon: '💳', iconBg: '#eef2ff', title: 'Card Payment', desc: 'Web Development Service', amount: 14500, type: 'credit', date: '22 Mar 2026' },
    { id: 2, icon: '📱', iconBg: '#f0fdf4', title: 'UPI Transfer', desc: 'Platform Commission', amount: 1450, type: 'debit', date: '21 Mar 2026' },
    { id: 3, icon: '🏦', iconBg: '#eff6ff', title: 'Bank Transfer', desc: 'Client Payment', amount: 8200, type: 'credit', date: '20 Mar 2026' },
    { id: 4, icon: '💵', iconBg: '#fff7ed', title: 'Cash', desc: 'Home Cleaning Service', amount: 2500, type: 'credit', date: '19 Mar 2026' },
    { id: 5, icon: '👛', iconBg: '#fdf4ff', title: 'Wallet', desc: 'Refund Issued', amount: 800, type: 'debit', date: '18 Mar 2026' },
    { id: 6, icon: '💳', iconBg: '#eef2ff', title: 'Card Payment', desc: 'Digital Marketing', amount: 6000, type: 'credit', date: '17 Mar 2026' },
]

/* ─── Sub-Components ────────────────────────────────────── */

const BarChart = ({ data = REVENUE_DATA }) => {
    const maxVal = Math.max(...data.flatMap(d => [d.earning, d.expense]), 1)
    const H = 160
    const bW = 10
    const gap = 14
    const lPad = 40

    const items = data.map((d, i) => ({
        ...d,
        x: lPad + i * (bW * 2 + 4 + gap),
        earningH: (d.earning / maxVal) * H,
        expenseH: (d.expense / maxVal) * H,
    }))

    const W = lPad + data.length * (bW * 2 + 4 + gap) + 10
    const gridVals = [0, Math.round(maxVal * 0.33), Math.round(maxVal * 0.66), maxVal]

    return (
        <div className="ds-chart-wrap">
            <svg width={W} height={H + 28} viewBox={`0 0 ${W} ${H + 28}`}>
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
                        <text x={d.x + bW + 1.5} y={H + 18} fontSize={8.5} fill="#b0b0c8" textAnchor="middle">{d.month}</text>
                    </g>
                ))}
            </svg>
        </div>
    )
}

/* ─── Admin Dashboard ───────────────────────────────────── */
const AdminDashboard = ({ user }) => {
    const [providerCount, setProviderCount] = useState('—')
    const [userCount, setUserCount] = useState('—')

    useEffect(() => {
        fetch('http://localhost:5000/providers')
            .then(r => r.json())
            .then(data => setProviderCount(data.length))
            .catch(() => setProviderCount(0))

        fetch('http://localhost:5000/users')
            .then(r => r.json())
            .then(data => setUserCount(data.filter(u => u.role !== 'admin').length))
            .catch(() => setUserCount(0))
    }, [])

    const totalEarning = REVENUE_DATA.reduce((s, d) => s + d.earning, 0)
    const totalExpense = REVENUE_DATA.reduce((s, d) => s + d.expense, 0)

    return (
        <div>
            {/* Welcome Banner */}
            <div className="ds-welcome-banner">
                <div className="ds-welcome-tag">ADMIN PANEL</div>
                <div className="ds-welcome-title">Welcome back, {user.name?.split(' ')[0]}! 👋</div>
                <div className="ds-welcome-sub">Here's what's happening on DiGiSeva today.</div>
            </div>

            {/* Stats */}
            <div className="ds-stats-grid">
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(115,103,240,0.12)' }}>🛠️</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{providerCount}</div>
                        <div className="ds-stat-label">Total Providers</div>
                        <div className="ds-stat-trend up">↑ Registered on platform</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(0,207,232,0.12)' }}>🧑‍💼</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">{userCount}</div>
                        <div className="ds-stat-label">Total Clients</div>
                        <div className="ds-stat-trend up">↑ Registered users</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(255,159,67,0.12)' }}>📦</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">1.2k</div>
                        <div className="ds-stat-label">Total Sales</div>
                        <div className="ds-stat-trend up">↑ +8.4% this month</div>
                    </div>
                </div>
                <div className="ds-stat-card">
                    <div className="ds-stat-icon-box" style={{ background: 'rgba(40,199,111,0.12)' }}>💰</div>
                    <div className="ds-stat-body">
                        <div className="ds-stat-value">₹{(totalEarning * 1000).toLocaleString('en-IN')}</div>
                        <div className="ds-stat-label">Revenue (YTD)</div>
                        <div className="ds-stat-trend up">↑ +12.6% vs last year</div>
                    </div>
                </div>
            </div>

            {/* Revenue Chart + Transactions */}
            <div className="ds-grid-2">
                <div className="ds-card">
                    <div className="ds-card-header">
                        <div>
                            <div className="ds-card-title">Revenue Report</div>
                            <div className="ds-card-subtitle">Earnings vs Expenses (₹ thousands) — 2026</div>
                        </div>
                        <div className="ds-chart-legend">
                            <div className="ds-legend-item">
                                <div className="ds-legend-dot" style={{ background: '#7367f0' }} />
                                Earning
                            </div>
                            <div className="ds-legend-item">
                                <div className="ds-legend-dot" style={{ background: '#ff9f43' }} />
                                Expense
                            </div>
                        </div>
                    </div>
                    <div className="ds-card-body">
                        <BarChart />
                        <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#22222b' }}>
                                    ₹{(totalEarning * 1000).toLocaleString('en-IN')}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#7a7a9a', fontWeight: 600 }}>Total Earnings</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff9f43' }}>
                                    ₹{(totalExpense * 1000).toLocaleString('en-IN')}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#7a7a9a', fontWeight: 600 }}>Total Expenses</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="ds-card">
                    <div className="ds-card-header">
                        <div>
                            <div className="ds-card-title">Transactions</div>
                            <div className="ds-card-subtitle">Total {TRANSACTIONS.length} this month</div>
                        </div>
                    </div>
                    <div className="ds-transaction-list">
                        {TRANSACTIONS.map(txn => (
                            <div key={txn.id} className="ds-transaction-item">
                                <div className="ds-txn-icon" style={{ background: txn.iconBg }}>
                                    {txn.icon}
                                </div>
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
        </div>
    )
}

export default AdminDashboard
