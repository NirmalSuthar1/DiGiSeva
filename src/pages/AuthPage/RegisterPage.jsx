import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Navigation/NavigationBar'
import Footer from '../../components/Footer/Footer'
import './AuthPage.css'

const EyeIcon = ({ open }) => open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
    </svg>
) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
    </svg>
)

const validate = (form) => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Full name is required.'
    if (!form.email.trim()) {
        errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Enter a valid email address.'
    }
    if (!form.password) {
        errors.password = 'Password is required.'
    } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.'
    }
    if (!form.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.'
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.'
    }
    return errors
}

const RegisterPage = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('client')
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const set = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate(form)
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            try {
                const [usersRes, providersRes] = await Promise.all([
                    fetch(`http://localhost:5000/users?email=${encodeURIComponent(form.email)}`),
                    fetch(`http://localhost:5000/providers?email=${encodeURIComponent(form.email)}`)
                ])
                const [existingUsers, existingProviders] = await Promise.all([
                    usersRes.json(),
                    providersRes.json()
                ])

                if (existingUsers.length > 0 || existingProviders.length > 0) {
                    setErrors({ email: 'This email is already registered.' })
                    return
                }
                
                const newUser = {
                    id: String(Date.now()),
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    role: role
                }
                
                const response = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                })
                
                if (response.ok) {
                    setSubmitted(true)
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setErrors({ submit: 'Failed to create account.' })
                }
            } catch (error) {
                setErrors({ submit: 'Failed to connect to server.' })
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
                        <h1 className="auth-panel-title">Your next opportunity starts here.</h1>
                        <p className="auth-panel-sub">
                            Join thousands of clients and service providers on DiGiSeva.
                            Sign up today and connect with the right people.
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

                    {/* Right Panel */}
                    <div className="auth-panel-right">
                        <div className="auth-card">

                            <div className="auth-card-header">
                                <div className="auth-card-tag">GET STARTED</div>
                                <h2 className="auth-card-title">Create your account</h2>
                            </div>

                            {/* Role Toggle */}
                            <div className="auth-role-toggle">
                                <button
                                    type="button"
                                    className={`auth-role-btn ${role === 'client' ? 'active' : ''}`}
                                    onClick={() => { setRole('client'); setErrors({}); setSubmitted(false) }}
                                >
                                    <span className="auth-role-icon">🧑‍💼</span>
                                    Client
                                </button>
                                <button
                                    type="button"
                                    className={`auth-role-btn ${role === 'provider' ? 'active' : ''}`}
                                    onClick={() => { setRole('provider'); setErrors({}); setSubmitted(false) }}
                                >
                                    <span className="auth-role-icon">🛠️</span>
                                    Provider
                                </button>
                            </div>

                            {role === 'provider' ? (
                                <div className="auth-provider-cta">
                                    <div className="auth-provider-cta-icon">🛠️</div>
                                    <div className="auth-provider-cta-title">Become a Service Provider</div>
                                    <p className="auth-provider-cta-desc">
                                        Join our network of trusted professionals. You'll complete a detailed
                                        profile so clients can find and hire you with confidence.
                                    </p>
                                    <ul className="auth-provider-cta-list">
                                        <li>✓ Set up your professional profile</li>
                                        <li>✓ Showcase your skills &amp; experience</li>
                                        <li>✓ Upload certifications &amp; resume</li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="auth-btn-submit"
                                        style={{ marginTop: '8px' }}
                                        onClick={() => navigate('/become-provider')}
                                    >
                                        Continue as Provider →
                                    </button>
                                </div>
                            ) : submitted ? (
                                <div className="auth-success">
                                    <div className="auth-success-icon">✓</div>
                                    <div className="auth-success-text">Account created! Welcome to <strong>DiGiSeva</strong>.</div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* Name */}
                                    <div className="auth-field">
                                        <label className="auth-label">Full Name <span className="auth-required">*</span></label>
                                        <input
                                            type="text"
                                            className={`auth-input ${errors.name ? 'auth-input-error' : ''}`}
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={e => set('name', e.target.value)}
                                            autoComplete="name"
                                        />
                                        {errors.name && <div className="auth-error">{errors.name}</div>}
                                    </div>

                                    {/* Email */}
                                    <div className="auth-field">
                                        <label className="auth-label">Email Address <span className="auth-required">*</span></label>
                                        <input
                                            type="email"
                                            className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={e => set('email', e.target.value)}
                                            autoComplete="email"
                                        />
                                        {errors.email && <div className="auth-error">{errors.email}</div>}
                                    </div>

                                    {/* Password */}
                                    <div className="auth-field">
                                        <label className="auth-label">Password <span className="auth-required">*</span></label>
                                        <div className="auth-input-wrap">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className={`auth-input auth-input-padded ${errors.password ? 'auth-input-error' : ''}`}
                                                placeholder="Min. 6 characters"
                                                value={form.password}
                                                onChange={e => set('password', e.target.value)}
                                                autoComplete="new-password"
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

                                    {/* Confirm Password */}
                                    <div className="auth-field">
                                        <label className="auth-label">Confirm Password <span className="auth-required">*</span></label>
                                        <div className="auth-input-wrap">
                                            <input
                                                type={showConfirm ? 'text' : 'password'}
                                                className={`auth-input auth-input-padded ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                                                placeholder="Repeat your password"
                                                value={form.confirmPassword}
                                                onChange={e => set('confirmPassword', e.target.value)}
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                className="auth-eye-btn"
                                                onClick={() => setShowConfirm(v => !v)}
                                                tabIndex={-1}
                                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                            >
                                                <EyeIcon open={showConfirm} />
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <div className="auth-error">{errors.confirmPassword}</div>}
                                    </div>

                                    {errors.submit && <div className="auth-error" style={{marginBottom: '1rem', textAlign: 'center'}}>{errors.submit}</div>}
                                    <button type="submit" className="auth-btn-submit">
                                        Create Account
                                    </button>

                                </form>
                            )}

                            <p className="auth-footer-text">
                                Already have an account?{' '}
                                <Link to="/login" className="auth-footer-link">Sign in</Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default RegisterPage
