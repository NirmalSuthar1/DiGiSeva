import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import ProviderDashboard from './ProviderDashboard'
import UserDashboard from './UserDashboard'
import ProvidersView from './ProvidersView'
import UsersView from './UsersView'
import RequestsView from './RequestsView'
import './Dashboard.css'
import { Link } from 'react-router-dom'

/* ─── Sidebar Icons ─────────────────────────────────────── */
const IconDashboard = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 0h7v7H0zm9 0h7v7H9zm0 9h7v7H9zm-9 0h7v7H0z"/>
    </svg>
)
const IconUsers = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
    </svg>
)
const IconPerson = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
    </svg>
)
const IconClipboard = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5 1.5A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zM6.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm1 4.5a.5.5 0 0 1 0 1h-.5v.5a.5.5 0 0 1-1 0V7H3a.5.5 0 0 1 0-1h.5v-.5a.5.5 0 0 1 1 0V6zm0 3a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1zm2-6h5a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1zm0 3h5a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1zm0 3h5a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1z"/>
    </svg>
)
const IconLogout = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M7.5 1v7h1V1z"/>
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
    </svg>
)
const IconMenu = () => (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>
)

/* ─── Nav Config ─────────────────────────────────────────── */
const NAV_ITEMS = {
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
        { id: 'providers', label: 'Providers', icon: <IconUsers /> },
        { id: 'users', label: 'Users', icon: <IconPerson /> },
    ],
    provider: [
        { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
        { id: 'requests', label: 'Requests', icon: <IconClipboard /> },
    ],
    client: [
        { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
        { id: 'requests', label: 'My Requests', icon: <IconClipboard /> },
    ],
}

/* ─── Page Title Map ─────────────────────────────────────── */
const PAGE_TITLES = {
    dashboard: 'Dashboard',
    providers: 'Providers',
    users: 'Users',
    requests: 'Requests',
}

/* ─── Dashboard Shell ────────────────────────────────────── */
const Dashboard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [view, setView] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('ds_user')
        if (!stored) {
            navigate('/login')
            return
        }
        setUser(JSON.parse(stored))
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('ds_user')
        navigate('/login')
    }

    if (!user) return null

    const role = user.role === 'admin' ? 'admin' : user.role === 'provider' ? 'provider' : 'client'
    const navItems = NAV_ITEMS[role] || NAV_ITEMS.client
    const initials = (user.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

    const renderContent = () => {
        if (view === 'dashboard') {
            if (role === 'admin') return <AdminDashboard user={user} />
            if (role === 'provider') return <ProviderDashboard user={user} />
            return <UserDashboard user={user} />
        }
        if (view === 'providers') return <ProvidersView />
        if (view === 'users') return <UsersView />
        if (view === 'requests') return <RequestsView user={user} />
        return null
    }

    return (
        <div className={`ds-layout ${sidebarOpen ? '' : 'ds-sidebar-collapsed'}`}>

            {/* ── Sidebar ── */}
            <aside className="ds-sidebar">
                <div className="ds-sidebar-inner">
                    {/* Brand */}
                    <Link to="/" className="ds-brand" style={{ textDecoration: 'none' }}>
                        <div className="ds-brand-icon">DS</div>
                        {sidebarOpen && <span className="ds-brand-name">DiGiSeva</span>}
                    </Link>

                    {/* Nav */}
                    <nav className="ds-nav">
                        {sidebarOpen && (
                            <div className="ds-nav-section-label">
                                {role === 'admin' ? 'ADMIN' : role === 'provider' ? 'PROVIDER' : 'CLIENT'} MENU
                            </div>
                        )}
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                className={`ds-nav-item ${view === item.id ? 'active' : ''}`}
                                onClick={() => setView(item.id)}
                            >
                                <span className="ds-nav-icon">{item.icon}</span>
                                {sidebarOpen && <span className="ds-nav-label">{item.label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* User footer */}
                    <div className="ds-sidebar-footer">
                        <div className="ds-user-info">
                            <div className="ds-avatar">{initials}</div>
                            {sidebarOpen && (
                                <div className="ds-user-meta">
                                    <div className="ds-user-name">{user.name}</div>
                                    <div className="ds-user-role">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
                                </div>
                            )}
                        </div>
                        <button className="ds-logout-btn" onClick={handleLogout} title="Logout">
                            <IconLogout />
                        </button>
                    </div>
                </div>
            </aside>

            {/* ── Main ── */}
            <div className="ds-main">
                {/* Header */}
                <header className="ds-header">
                    <div className="ds-header-left">
                        <button className="ds-menu-btn" onClick={() => setSidebarOpen(v => !v)}>
                            <IconMenu />
                        </button>
                        <h1 className="ds-page-title">{PAGE_TITLES[view] || 'Dashboard'}</h1>
                    </div>
                    <div className="ds-header-right">
                        <div className="ds-header-user">
                            <span className="ds-header-name">Hi, {user.name?.split(' ')[0]}</span>
                            <div className="ds-avatar ds-avatar-sm">{initials}</div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="ds-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    )
}

export default Dashboard
