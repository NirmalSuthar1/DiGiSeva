import React, { useState } from 'react'

/* Mock request data — mirrors fields from HireModal */
const CLIENT_REQUESTS = [
    {
        id: 'REQ#091', provider: 'Amit Patel', providerRole: 'Web Developer',
        service: 'Web Development', description: 'Build a responsive landing page with React and Tailwind CSS.',
        roleSpec: 'Frontend Developer', duration: '7 Days', priceType: 'Fixed Price',
        amount: 15000, paymentMethod: 'UPI', date: '21 Mar 2026', status: 'pending',
    },
    {
        id: 'REQ#090', provider: 'Priya Sharma', providerRole: 'UI/UX Designer',
        service: 'UI/UX Design', description: 'Design a mobile app interface for my e-commerce platform.',
        roleSpec: 'UI Designer', duration: '14 Days', priceType: 'Fixed Price',
        amount: 8000, paymentMethod: 'Bank Transfer', date: '18 Mar 2026', status: 'accepted',
    },
    {
        id: 'REQ#089', provider: 'Rahul Kumar', providerRole: 'Digital Marketer',
        service: 'Digital Marketing', description: 'SEO and social media marketing campaign for 1 month.',
        roleSpec: 'Digital Marketer', duration: '1 Month', priceType: 'Hourly Rate',
        amount: 5000, paymentMethod: 'Card', date: '10 Mar 2026', status: 'completed',
    },
    {
        id: 'REQ#088', provider: 'Neha Singh', providerRole: 'Content Writer',
        service: 'Content Writing', description: '10 SEO-optimized blog articles on technology.',
        roleSpec: 'Content Writer', duration: '5 Days', priceType: 'Fixed Price',
        amount: 2000, paymentMethod: 'UPI', date: '05 Mar 2026', status: 'rejected',
    },
]

const PROVIDER_REQUESTS = [
    {
        id: 'REQ#042', client: 'Ravi Kumar', clientEmail: 'ravi@example.com',
        service: 'Web Development', description: 'Build a full-stack e-commerce website.',
        roleSpec: 'Full-Stack Developer', duration: '30 Days', priceType: 'Fixed Price',
        amount: 45000, paymentMethod: 'Bank Transfer', date: '22 Mar 2026', status: 'accepted',
    },
    {
        id: 'REQ#041', client: 'Priya Mehta', clientEmail: 'priya@example.com',
        service: 'UI/UX Design', description: 'Redesign the dashboard for an existing web app.',
        roleSpec: 'UI Designer', duration: '14 Days', priceType: 'Hourly Rate',
        amount: 8200, paymentMethod: 'UPI', date: '19 Mar 2026', status: 'completed',
    },
    {
        id: 'REQ#040', client: 'Suresh Nair', clientEmail: 'suresh@example.com',
        service: 'Mobile App Development', description: 'Build a cross-platform mobile app using React Native.',
        roleSpec: 'Mobile Developer', duration: '45 Days', priceType: 'Fixed Price',
        amount: 70000, paymentMethod: 'Card', date: '15 Mar 2026', status: 'pending',
    },
    {
        id: 'REQ#039', client: 'Ananya Roy', clientEmail: 'ananya@example.com',
        service: 'Web Development', description: 'Create a portfolio website with CMS.',
        roleSpec: 'Frontend Developer', duration: '10 Days', priceType: 'Fixed Price',
        amount: 9500, paymentMethod: 'UPI', date: '10 Mar 2026', status: 'completed',
    },
]

const STATUS_CONFIG = {
    pending:   { label: 'Pending',   cls: 'ds-badge-pending',   color: '#ff9f43' },
    accepted:  { label: 'Active',    cls: 'ds-badge-accepted',  color: '#00cfe8' },
    completed: { label: 'Completed', cls: 'ds-badge-completed', color: '#28c76f' },
    rejected:  { label: 'Rejected',  cls: 'ds-badge-rejected',  color: '#ea5455' },
}

const FILTERS = ['all', 'pending', 'accepted', 'completed', 'rejected']

const RequestsView = ({ user }) => {
    const isProvider = user.role === 'provider'
    const requests = isProvider ? PROVIDER_REQUESTS : CLIENT_REQUESTS
    const [filter, setFilter] = useState('all')
    const [expanded, setExpanded] = useState(null)

    const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#22222b' }}>
                    {isProvider ? 'Incoming Requests' : 'My Service Requests'}
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#7a7a9a', marginTop: 2 }}>
                    {requests.length} total · {requests.filter(r => r.status === 'pending').length} pending
                </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '6px 16px',
                            borderRadius: 20,
                            border: '1.5px solid',
                            borderColor: filter === f ? '#7367f0' : '#ebebf5',
                            background: filter === f ? '#7367f0' : '#fff',
                            color: filter === f ? '#fff' : '#7a7a9a',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.15s',
                            textTransform: 'capitalize',
                        }}
                    >
                        {f === 'all' ? `All (${requests.length})` : `${STATUS_CONFIG[f]?.label} (${requests.filter(r => r.status === f).length})`}
                    </button>
                ))}
            </div>

            {/* Request Cards */}
            {filtered.length === 0 ? (
                <div className="ds-card">
                    <div className="ds-empty">
                        <div className="ds-empty-icon">📋</div>
                        <div className="ds-empty-text">No {filter !== 'all' ? filter : ''} requests found.</div>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {filtered.map(req => {
                        const cfg = STATUS_CONFIG[req.status]
                        const isOpen = expanded === req.id
                        return (
                            <div key={req.id} className="ds-card" style={{ overflow: 'visible' }}>
                                {/* Card Top */}
                                <div
                                    style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start' }}
                                    onClick={() => setExpanded(isOpen ? null : req.id)}
                                >
                                    {/* Left accent bar */}
                                    <div style={{
                                        width: 4, borderRadius: 4, flexShrink: 0, alignSelf: 'stretch',
                                        background: cfg.color, minHeight: 48,
                                    }} />

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                                            <div style={{ display: 'flex', align: 'center', gap: 10, flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7367f0' }}>{req.id}</span>
                                                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#22222b' }}>{req.service}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <span className={`ds-badge ${cfg.cls}`}>{cfg.label}</span>
                                                <span style={{ fontSize: '0.68rem', color: '#b0b0c8' }}>{req.date}</span>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                                            <div style={{ fontSize: '0.8rem', color: '#7a7a9a' }}>
                                                {isProvider
                                                    ? <>Client: <strong style={{ color: '#22222b' }}>{req.client}</strong></>
                                                    : <>Provider: <strong style={{ color: '#22222b' }}>{req.provider}</strong> · {req.providerRole}</>
                                                }
                                            </div>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#22222b' }}>
                                                ₹{req.amount.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expand chevron */}
                                    <svg
                                        width="14" height="14" viewBox="0 0 16 16" fill="#b0b0c8"
                                        style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0, marginTop: 2 }}
                                    >
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </div>

                                {/* Expanded Details */}
                                {isOpen && (
                                    <div style={{
                                        borderTop: '1px solid #ebebf5',
                                        padding: '16px 20px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '12px 24px',
                                        background: '#fafbff',
                                    }}>
                                        <Detail label="Description" value={req.description} full />
                                        <Detail label="Role Specification" value={req.roleSpec} />
                                        <Detail label="Duration" value={req.duration} />
                                        <Detail label="Payment Type" value={req.priceType} />
                                        <Detail label="Amount" value={`₹${req.amount.toLocaleString('en-IN')}`} />
                                        <Detail label="Payment Method" value={req.paymentMethod} />
                                        {isProvider && <Detail label="Client Email" value={req.clientEmail} />}
                                        {!isProvider && req.providerRole && <Detail label="Provider Title" value={req.providerRole} />}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const Detail = ({ label, value, full }) => (
    <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#b0b0c8', marginBottom: 3 }}>
            {label}
        </div>
        <div style={{ fontSize: '0.84rem', color: '#22222b', fontWeight: 500, lineHeight: 1.5 }}>
            {value || '—'}
        </div>
    </div>
)

export default RequestsView
