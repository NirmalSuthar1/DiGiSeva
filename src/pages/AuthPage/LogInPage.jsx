import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Navigation/NavigationBar'
import Footer from '../../components/Footer/Footer'
import './AuthPage.css'

const validate = (email, password) => {
    const errors = {}
    if (!email.trim()) {
        errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Enter a valid email address.'
    }
    if (!password) {
        errors.password = 'Password is required.'
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters.'
    }
    return errors
}

const EyeIcon = ({ open }) => open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
    </svg>
) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
    </svg>
)

const AuthPage = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('client')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate(email, password)
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            try {
                let foundUser = null

                if (role === 'provider') {
                    const res = await fetch(`http://localhost:5000/providers?email=${encodeURIComponent(email)}`)
                    const providers = await res.json()
                    const match = providers.find(p => p.password === password)
                    if (match) {
                        if (match.status === 'pending') {
                            setErrors({ email: 'Your provider account is pending approval.' })
                            return
                        }
                        foundUser = match
                    }
                } else {
                    const res = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(email)}`)
                    const users = await res.json()
                    foundUser = users.find(u => u.password === password) || null
                }

                if (!foundUser) {
                    setErrors({ email: 'Invalid email or password.' })
                    return
                }

                if (role !== 'provider' && foundUser.role !== role && foundUser.role !== 'admin') {
                    setErrors({ email: `No ${role} account found with these credentials.` })
                    return
                }

                localStorage.setItem('ds_user', JSON.stringify(foundUser))
                setSubmitted(true)
                setTimeout(() => navigate('/dashboard'), 1000)
            } catch {
                setErrors({ email: 'Failed to connect to the server.' })
            }
        }
    }

    return (
        <>
            <NavBar />
            <div className="auth-page">
                <div className="auth-container">

                    {/* Left Panel */}
                    <div className="auth-panel-left">
                        <div className="auth-brand-tag">DIGISEVA</div>
                        <h1 className="auth-panel-title">Connect with the right talent.</h1>
                        <p className="auth-panel-sub">
                            Whether you're looking to hire skilled professionals or offer your services,
                            DiGiSeva brings clients and providers together seamlessly.
                        </p>
                        <div className="auth-panel-stats">
                            <div className="auth-stat">
                                <div className="auth-stat-number">12K+</div>
                                <div className="auth-stat-label">Providers</div>
                            </div>
                            <div className="auth-stat-divider" />
                            <div className="auth-stat">
                                <div className="auth-stat-number">98%</div>
                                <div className="auth-stat-label">Satisfaction</div>
                            </div>
                            <div className="auth-stat-divider" />
                            <div className="auth-stat">
                                <div className="auth-stat-number">50+</div>
                                <div className="auth-stat-label">Categories</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel — Form */}
                    <div className="auth-panel-right">
                        <div className="auth-card">

                            <div className="auth-card-header">
                                <div className="auth-card-tag">WELCOME BACK</div>
                                <h2 className="auth-card-title">Sign in to your account</h2>
                            </div>

                            {/* Role Toggle */}
                            <div className="auth-role-toggle">
                                <button
                                    type="button"
                                    className={`auth-role-btn ${role === 'client' ? 'active' : ''}`}
                                    onClick={() => { setRole('client'); setErrors({}) }}
                                >
                                    <span className="auth-role-icon">🧑‍💼</span>
                                    Client
                                </button>
                                <button
                                    type="button"
                                    className={`auth-role-btn ${role === 'provider' ? 'active' : ''}`}
                                    onClick={() => { setRole('provider'); setErrors({}) }}
                                >
                                    <span className="auth-role-icon">🛠️</span>
                                    Provider
                                </button>
                            </div>

                            {submitted ? (
                                <div className="auth-success">
                                    <div className="auth-success-icon">✓</div>
                                    <div className="auth-success-text">Signed in successfully as a <strong>{role}</strong>.</div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* Email */}
                                    <div className="auth-field">
                                        <label className="auth-label">Email Address <span className="auth-required">*</span></label>
                                        <input
                                            type="email"
                                            className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })) }}
                                            autoComplete="email"
                                        />
                                        {errors.email && <div className="auth-error">{errors.email}</div>}
                                    </div>

                                    {/* Password */}
                                    <div className="auth-field">
                                        <div className="auth-label-row">
                                            <label className="auth-label">Password <span className="auth-required">*</span></label>
                                            <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
                                        </div>
                                        <div className="auth-input-wrap">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className={`auth-input auth-input-padded ${errors.password ? 'auth-input-error' : ''}`}
                                                placeholder="Min. 6 characters"
                                                value={password}
                                                onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })) }}
                                                autoComplete="current-password"
                                            />
                                            <button
                                                type="button"
                                                className="auth-eye-btn"
                                                onClick={() => setShowPassword(v => !v)}
                                                tabIndex={-1}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                <EyeIcon open={showPassword} />
                                            </button>
                                        </div>
                                        {errors.password && <div className="auth-error">{errors.password}</div>}
                                    </div>

                                    <button type="submit" className="auth-btn-submit">
                                        Sign in as {role === 'client' ? 'Client' : 'Provider'}
                                    </button>

                                </form>
                            )}

                            <p className="auth-footer-text">
                                Don't have an account?{' '}
                                <Link to="/register" className="auth-footer-link">Create one</Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default AuthPage
