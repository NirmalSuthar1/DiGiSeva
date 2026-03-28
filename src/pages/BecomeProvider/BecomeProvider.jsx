import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Navigation/NavigationBar'
import Footer from '../../components/Footer/Footer'
import './BecomeProvider.css'

/* ─── Constants ──────────────────────────────────────────── */

const EXPERTISE_SUGGESTIONS = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
    'Content Writing', 'SEO', 'Digital Marketing', 'Photography', 'Videography',
    'Plumbing', 'Electrical Work', 'Carpentry', 'Home Cleaning', 'Tutoring',
    'Accounting', 'Legal Services', 'Healthcare', 'Translation', 'Data Entry',
    'Virtual Assistant', 'Cooking', 'Event Planning', 'Fitness Training',
]

const EDUCATION_LEVELS = [
    'High School / SSC',
    'Intermediate / HSC',
    'Diploma',
    "Bachelor's Degree",
    "Master's Degree",
    'PhD / Doctorate',
    'Professional Certification',
    'Other',
]

const LANGUAGES = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Bengali',
    'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu',
]

const STEPS = ['Account', 'Profile', 'Qualifications']

/* ─── Helpers ────────────────────────────────────────────── */

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

const CloseIcon = () => (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>
)

const UploadIcon = () => (
    <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
    </svg>
)

/* ─── File Dropzone ──────────────────────────────────────── */

const FileDropzone = ({ label, hint, files, onAdd, onRemove, accept, inputRef }) => {
    const [drag, setDrag] = useState(false)

    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(false)
        onAdd(e.dataTransfer.files)
    }

    return (
        <div className="bp-dropzone-wrap">
            <div
                className={`bp-dropzone ${drag ? 'drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDrag(true) }}
                onDragLeave={() => setDrag(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <div className="bp-dropzone-icon"><UploadIcon /></div>
                <div className="bp-dropzone-text">
                    <span className="bp-dropzone-main">{label}</span>
                    <span className="bp-dropzone-sub">or <span className="bp-dropzone-link">browse files</span></span>
                </div>
                {hint && <div className="bp-dropzone-hint">{hint}</div>}
            </div>
            <input
                ref={inputRef}
                type="file"
                multiple
                accept={accept}
                className="bp-file-hidden"
                onChange={e => onAdd(e.target.files)}
            />
            {files.length > 0 && (
                <div className="bp-file-list">
                    {files.map(f => (
                        <div key={f.name} className="bp-file-chip">
                            <span className="bp-file-chip-icon">
                                {f.type === 'application/pdf' ? '📄' : f.type.startsWith('image/') ? '🖼️' : '📎'}
                            </span>
                            <span className="bp-file-chip-name">
                                {f.name.length > 28 ? f.name.slice(0, 25) + '...' : f.name}
                            </span>
                            <button className="bp-file-chip-remove" onClick={() => onRemove(f.name)} type="button">
                                <CloseIcon />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

/* ─── Step Indicator ─────────────────────────────────────── */

const StepIndicator = ({ current }) => (
    <div className="bp-steps">
        {STEPS.map((label, i) => {
            const idx = i + 1
            const done = idx < current
            const active = idx === current
            return (
                <React.Fragment key={label}>
                    <div className={`bp-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                        <div className="bp-step-circle">
                            {done ? (
                                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                </svg>
                            ) : idx}
                        </div>
                        <span className="bp-step-label">{label}</span>
                    </div>
                    {i < STEPS.length - 1 && <div className={`bp-step-line ${done ? 'done' : ''}`} />}
                </React.Fragment>
            )
        })}
    </div>
)

/* ─── Validation ─────────────────────────────────────────── */

const validateStep1 = (a) => {
    const e = {}
    if (!a.name.trim()) e.name = 'Full name is required.'
    if (!a.email.trim()) {
        e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) {
        e.email = 'Enter a valid email address.'
    }
    if (!a.password) {
        e.password = 'Password is required.'
    } else if (a.password.length < 6) {
        e.password = 'Password must be at least 6 characters.'
    }
    if (!a.confirmPassword) {
        e.confirmPassword = 'Please confirm your password.'
    } else if (a.password !== a.confirmPassword) {
        e.confirmPassword = 'Passwords do not match.'
    }
    return e
}

const validateStep2 = (p) => {
    const e = {}
    if (!p.fullName.trim()) e.fullName = 'Full name is required.'
    if (!p.role.trim()) e.role = 'Professional title is required.'
    if (!p.experience || isNaN(p.experience) || Number(p.experience) < 0)
        e.experience = 'Enter valid years of experience.'
    if (p.expertise.length === 0) e.expertise = 'Add at least one area of expertise.'
    if (!p.bio.trim() || p.bio.trim().length < 30) e.bio = 'Bio must be at least 30 characters.'
    if (!p.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(p.phone))
        e.phone = 'Enter a valid phone number.'
    if (!p.city.trim()) e.city = 'City is required.'
    if (!p.state.trim()) e.state = 'State is required.'
    if (p.languages.length === 0) e.languages = 'Select at least one language.'
    return e
}

const validateStep3 = (q) => {
    const e = {}
    if (!q.education) e.education = 'Please select your highest education.'
    return e
}

/* ─── Main Component ─────────────────────────────────────── */

const BecomeProvider = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    /* Step 1 — Account */
    const [account, setAccount] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    /* Step 2 — Profile */
    const [profile, setProfile] = useState({
        fullName: '',
        photo: null,
        photoPreview: null,
        role: '',
        experience: '',
        expertise: [],
        expertiseInput: '',
        bio: '',
        phone: '',
        city: '',
        state: '',
        languages: [],
    })
    const photoRef = useRef(null)

    /* Step 3 — Qualifications */
    const [qual, setQual] = useState({
        education: '',
        certificationName: '',
        resumeFiles: [],
        certificationFiles: [],
        additionalFiles: [],
    })
    const resumeRef = useRef(null)
    const certRef = useRef(null)
    const additionalRef = useRef(null)

    /* ── Setters ── */

    const setAcc = (field, value) => {
        setAccount(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    const setPro = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    const setQ = (field, value) => {
        setQual(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    /* ── Photo ── */

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setProfile(prev => ({
            ...prev,
            photo: file,
            photoPreview: URL.createObjectURL(file),
        }))
    }

    /* ── Expertise Tags ── */

    const addExpertise = (tag) => {
        const trimmed = tag.trim()
        if (!trimmed || profile.expertise.includes(trimmed)) return
        setPro('expertise', [...profile.expertise, trimmed])
        setPro('expertiseInput', '')
    }

    const removeExpertise = (tag) => {
        setPro('expertise', profile.expertise.filter(e => e !== tag))
    }

    const handleExpertiseKey = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addExpertise(profile.expertiseInput)
        }
        if (e.key === 'Backspace' && !profile.expertiseInput && profile.expertise.length) {
            setPro('expertise', profile.expertise.slice(0, -1))
        }
    }

    /* ── Languages ── */

    const toggleLanguage = (lang) => {
        const updated = profile.languages.includes(lang)
            ? profile.languages.filter(l => l !== lang)
            : [...profile.languages, lang]
        setPro('languages', updated)
        setErrors(prev => ({ ...prev, languages: undefined }))
    }

    /* ── File Helpers ── */

    const addFiles = (field, incoming) => {
        const current = qual[field]
        const newFiles = Array.from(incoming).filter(
            f => !current.find(ex => ex.name === f.name)
        )
        setQ(field, [...current, ...newFiles])
    }

    const removeFile = (field, name) => {
        setQ(field, qual[field].filter(f => f.name !== name))
    }

    /* ── Navigation ── */

    const handleNext = async () => {
        if (step === 1) {
            const errs = validateStep1(account)
            setErrors(errs)
            if (Object.keys(errs).length > 0) return

            // Check email uniqueness across both users and providers
            setLoading(true)
            try {
                const [usersRes, providersRes] = await Promise.all([
                    fetch(`http://localhost:5000/users?email=${encodeURIComponent(account.email)}`),
                    fetch(`http://localhost:5000/providers?email=${encodeURIComponent(account.email)}`)
                ])
                const [existingUsers, existingProviders] = await Promise.all([
                    usersRes.json(),
                    providersRes.json()
                ])
                if (existingUsers.length > 0 || existingProviders.length > 0) {
                    setErrors({ email: 'This email is already registered.' })
                    setLoading(false)
                    return
                }
            } catch {
                setErrors({ email: 'Could not verify email. Check your connection.' })
                setLoading(false)
                return
            }
            setLoading(false)
            setProfile(prev => ({ ...prev, fullName: prev.fullName || account.name }))
        }
        if (step === 2) {
            const errs = validateStep2(profile)
            setErrors(errs)
            if (Object.keys(errs).length > 0) return
        }
        setStep(s => s + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleBack = () => {
        setErrors({})
        setStep(s => s - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validateStep3(qual)
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setLoading(true)
        try {
            const newProvider = {
                id: String(Date.now()),
                name: account.name,
                email: account.email,
                password: account.password,
                role: 'provider',
                status: 'pending',
                profile: {
                    fullName: profile.fullName,
                    title: profile.role,
                    experience: Number(profile.experience),
                    expertise: profile.expertise,
                    bio: profile.bio,
                    phone: profile.phone,
                    city: profile.city,
                    state: profile.state,
                    languages: profile.languages,
                    photoName: profile.photo?.name || null,
                },
                qualifications: {
                    education: qual.education,
                    certifications: qual.certificationName,
                    resumeFiles: qual.resumeFiles.map(f => f.name),
                    certificationFiles: qual.certificationFiles.map(f => f.name),
                    additionalFiles: qual.additionalFiles.map(f => f.name),
                },
                createdAt: new Date().toISOString(),
            }

            const response = await fetch('http://localhost:5000/providers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProvider)
            })

            if (response.ok) {
                setStep(4)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                setErrors({ submit: 'Failed to submit application. Please try again.' })
            }
        } catch {
            setErrors({ submit: 'Could not connect to server. Please try again.' })
        }
        setLoading(false)
    }

    /* ── Render ── */

    return (
        <>
            <NavBar />
            <div className="bp-page">

                {/* Hero */}
                <div className="bp-hero">
                    <div className="bp-hero-tag">SERVICE PROVIDER REGISTRATION</div>
                    <h1 className="bp-hero-title">Join DiGiSeva as a Provider</h1>
                    <p className="bp-hero-sub">Complete your profile in 3 simple steps and start connecting with clients.</p>
                    {step < 4 && <StepIndicator current={step} />}
                </div>

                {/* Form Card */}
                <div className="bp-card-wrap">
                    <div className="bp-card">

                        {/* ── Step 1: Account ── */}
                        {step === 1 && (
                            <div className="bp-step-content">
                                <div className="bp-section-header">
                                    <div className="bp-section-tag">STEP 1 OF 3</div>
                                    <h2 className="bp-section-title">Account Details</h2>
                                    <p className="bp-section-sub">Create your login credentials for DiGiSeva.</p>
                                </div>

                                <div className="bp-fields">

                                    <div className="bp-field">
                                        <label className="bp-label">Full Name <span className="bp-required">*</span></label>
                                        <input
                                            type="text"
                                            className={`bp-input ${errors.name ? 'bp-input-error' : ''}`}
                                            placeholder="John Doe"
                                            value={account.name}
                                            onChange={e => setAcc('name', e.target.value)}
                                            autoComplete="name"
                                        />
                                        {errors.name && <div className="bp-error">{errors.name}</div>}
                                    </div>

                                    <div className="bp-field">
                                        <label className="bp-label">Email Address <span className="bp-required">*</span></label>
                                        <input
                                            type="email"
                                            className={`bp-input ${errors.email ? 'bp-input-error' : ''}`}
                                            placeholder="you@example.com"
                                            value={account.email}
                                            onChange={e => setAcc('email', e.target.value)}
                                            autoComplete="email"
                                        />
                                        {errors.email && <div className="bp-error">{errors.email}</div>}
                                    </div>

                                    <div className="bp-field-row">
                                        <div className="bp-field">
                                            <label className="bp-label">Password <span className="bp-required">*</span></label>
                                            <div className="bp-input-wrap">
                                                <input
                                                    type={showPass ? 'text' : 'password'}
                                                    className={`bp-input bp-input-padded ${errors.password ? 'bp-input-error' : ''}`}
                                                    placeholder="Min. 6 characters"
                                                    value={account.password}
                                                    onChange={e => setAcc('password', e.target.value)}
                                                    autoComplete="new-password"
                                                />
                                                <button type="button" className="bp-eye-btn" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                                                    <EyeIcon open={showPass} />
                                                </button>
                                            </div>
                                            {errors.password && <div className="bp-error">{errors.password}</div>}
                                        </div>

                                        <div className="bp-field">
                                            <label className="bp-label">Confirm Password <span className="bp-required">*</span></label>
                                            <div className="bp-input-wrap">
                                                <input
                                                    type={showConfirm ? 'text' : 'password'}
                                                    className={`bp-input bp-input-padded ${errors.confirmPassword ? 'bp-input-error' : ''}`}
                                                    placeholder="Repeat your password"
                                                    value={account.confirmPassword}
                                                    onChange={e => setAcc('confirmPassword', e.target.value)}
                                                    autoComplete="new-password"
                                                />
                                                <button type="button" className="bp-eye-btn" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                                                    <EyeIcon open={showConfirm} />
                                                </button>
                                            </div>
                                            {errors.confirmPassword && <div className="bp-error">{errors.confirmPassword}</div>}
                                        </div>
                                    </div>

                                </div>

                                <div className="bp-actions">
                                    <Link to="/register" className="bp-btn-back">← Back to Register</Link>
                                    <button type="button" className="bp-btn-next" onClick={handleNext} disabled={loading}>
                                        {loading ? 'Checking…' : 'Continue to Profile →'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Step 2: Profile ── */}
                        {step === 2 && (
                            <div className="bp-step-content">
                                <div className="bp-section-header">
                                    <div className="bp-section-tag">STEP 2 OF 3</div>
                                    <h2 className="bp-section-title">Professional Profile</h2>
                                    <p className="bp-section-sub">Tell clients about yourself and what you do.</p>
                                </div>

                                <div className="bp-fields">

                                    {/* Photo + Full Name side by side */}
                                    <div className="bp-photo-row">
                                        <div className="bp-photo-upload" onClick={() => photoRef.current?.click()}>
                                            {profile.photoPreview ? (
                                                <img src={profile.photoPreview} alt="Profile" className="bp-photo-preview" />
                                            ) : (
                                                <div className="bp-photo-placeholder">
                                                    <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                    </svg>
                                                    <span>Add Photo</span>
                                                </div>
                                            )}
                                            <div className="bp-photo-overlay">Change</div>
                                        </div>
                                        <input
                                            ref={photoRef}
                                            type="file"
                                            accept="image/*"
                                            className="bp-file-hidden"
                                            onChange={handlePhoto}
                                        />
                                        <div className="bp-field" style={{ flex: 1 }}>
                                            <label className="bp-label">Full Name <span className="bp-required">*</span></label>
                                            <input
                                                type="text"
                                                className={`bp-input ${errors.fullName ? 'bp-input-error' : ''}`}
                                                placeholder="As it will appear on your profile"
                                                value={profile.fullName}
                                                onChange={e => setPro('fullName', e.target.value)}
                                            />
                                            {errors.fullName && <div className="bp-error">{errors.fullName}</div>}
                                        </div>
                                    </div>

                                    <div className="bp-field-row">
                                        <div className="bp-field">
                                            <label className="bp-label">Professional Title <span className="bp-required">*</span></label>
                                            <input
                                                type="text"
                                                className={`bp-input ${errors.role ? 'bp-input-error' : ''}`}
                                                placeholder="e.g. Web Developer, Electrician"
                                                value={profile.role}
                                                onChange={e => setPro('role', e.target.value)}
                                            />
                                            {errors.role && <div className="bp-error">{errors.role}</div>}
                                        </div>

                                        <div className="bp-field">
                                            <label className="bp-label">Years of Experience <span className="bp-required">*</span></label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="50"
                                                className={`bp-input ${errors.experience ? 'bp-input-error' : ''}`}
                                                placeholder="e.g. 5"
                                                value={profile.experience}
                                                onChange={e => setPro('experience', e.target.value)}
                                            />
                                            {errors.experience && <div className="bp-error">{errors.experience}</div>}
                                        </div>
                                    </div>

                                    {/* Expertise Tags */}
                                    <div className="bp-field">
                                        <label className="bp-label">Areas of Expertise <span className="bp-required">*</span></label>
                                        <p className="bp-hint">Type a skill and press Enter, or click a suggestion below.</p>
                                        <div className={`bp-tag-input-wrap ${errors.expertise ? 'bp-input-error' : ''}`}>
                                            {profile.expertise.map(tag => (
                                                <span key={tag} className="bp-tag">
                                                    {tag}
                                                    <button type="button" className="bp-tag-remove" onClick={() => removeExpertise(tag)}>
                                                        <CloseIcon />
                                                    </button>
                                                </span>
                                            ))}
                                            <input
                                                className="bp-tag-input"
                                                placeholder={profile.expertise.length === 0 ? 'e.g. Web Development…' : 'Add more…'}
                                                value={profile.expertiseInput}
                                                onChange={e => setPro('expertiseInput', e.target.value)}
                                                onKeyDown={handleExpertiseKey}
                                            />
                                        </div>
                                        {errors.expertise && <div className="bp-error">{errors.expertise}</div>}
                                        <div className="bp-suggestions">
                                            {EXPERTISE_SUGGESTIONS.filter(s => !profile.expertise.includes(s)).slice(0, 10).map(s => (
                                                <button key={s} type="button" className="bp-suggestion-chip" onClick={() => addExpertise(s)}>
                                                    + {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="bp-field">
                                        <label className="bp-label">Bio / About Me <span className="bp-required">*</span></label>
                                        <p className="bp-hint">Tell clients about your background, work style, and what makes you great. Min. 30 characters.</p>
                                        <textarea
                                            className={`bp-textarea ${errors.bio ? 'bp-input-error' : ''}`}
                                            rows={4}
                                            placeholder="e.g. I'm a passionate web developer with 5+ years of experience building modern, responsive applications..."
                                            value={profile.bio}
                                            onChange={e => setPro('bio', e.target.value)}
                                        />
                                        <div className="bp-char-count" style={{ color: profile.bio.length < 30 ? '#e05252' : '#888' }}>
                                            {profile.bio.length} characters
                                        </div>
                                        {errors.bio && <div className="bp-error">{errors.bio}</div>}
                                    </div>

                                    <div className="bp-field-row">
                                        <div className="bp-field">
                                            <label className="bp-label">Phone Number <span className="bp-required">*</span></label>
                                            <input
                                                type="tel"
                                                className={`bp-input ${errors.phone ? 'bp-input-error' : ''}`}
                                                placeholder="+91 98765 43210"
                                                value={profile.phone}
                                                onChange={e => setPro('phone', e.target.value)}
                                            />
                                            {errors.phone && <div className="bp-error">{errors.phone}</div>}
                                        </div>
                                    </div>

                                    <div className="bp-field-row">
                                        <div className="bp-field">
                                            <label className="bp-label">City <span className="bp-required">*</span></label>
                                            <input
                                                type="text"
                                                className={`bp-input ${errors.city ? 'bp-input-error' : ''}`}
                                                placeholder="e.g. Mumbai"
                                                value={profile.city}
                                                onChange={e => setPro('city', e.target.value)}
                                            />
                                            {errors.city && <div className="bp-error">{errors.city}</div>}
                                        </div>

                                        <div className="bp-field">
                                            <label className="bp-label">State <span className="bp-required">*</span></label>
                                            <input
                                                type="text"
                                                className={`bp-input ${errors.state ? 'bp-input-error' : ''}`}
                                                placeholder="e.g. Maharashtra"
                                                value={profile.state}
                                                onChange={e => setPro('state', e.target.value)}
                                            />
                                            {errors.state && <div className="bp-error">{errors.state}</div>}
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div className="bp-field">
                                        <label className="bp-label">Languages Spoken <span className="bp-required">*</span></label>
                                        <div className="bp-lang-grid">
                                            {LANGUAGES.map(lang => (
                                                <label key={lang} className={`bp-lang-chip ${profile.languages.includes(lang) ? 'active' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={profile.languages.includes(lang)}
                                                        onChange={() => toggleLanguage(lang)}
                                                    />
                                                    {lang}
                                                    {profile.languages.includes(lang) && (
                                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 4 }}>
                                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                                        </svg>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.languages && <div className="bp-error">{errors.languages}</div>}
                                    </div>

                                </div>

                                <div className="bp-actions">
                                    <button type="button" className="bp-btn-back" onClick={handleBack}>← Back</button>
                                    <button type="button" className="bp-btn-next" onClick={handleNext}>
                                        Continue to Qualifications →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Step 3: Qualifications ── */}
                        {step === 3 && (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="bp-step-content">
                                    <div className="bp-section-header">
                                        <div className="bp-section-tag">STEP 3 OF 3</div>
                                        <h2 className="bp-section-title">Education &amp; Documents</h2>
                                        <p className="bp-section-sub">Help clients trust your credentials. Upload your resume, certifications, and more.</p>
                                    </div>

                                    <div className="bp-fields">

                                        {/* Education */}
                                        <div className="bp-field">
                                            <label className="bp-label">Highest Education <span className="bp-required">*</span></label>
                                            <select
                                                className={`bp-select ${errors.education ? 'bp-input-error' : ''}`}
                                                value={qual.education}
                                                onChange={e => setQ('education', e.target.value)}
                                            >
                                                <option value="">— Select your qualification —</option>
                                                {EDUCATION_LEVELS.map(l => (
                                                    <option key={l} value={l}>{l}</option>
                                                ))}
                                            </select>
                                            {errors.education && <div className="bp-error">{errors.education}</div>}
                                        </div>

                                        {/* Certification Name */}
                                        <div className="bp-field">
                                            <label className="bp-label">Certifications <span className="bp-optional">(optional)</span></label>
                                            <p className="bp-hint">List any relevant certifications (e.g. Google Analytics, AWS, etc.).</p>
                                            <input
                                                type="text"
                                                className="bp-input"
                                                placeholder="e.g. AWS Certified Developer, Google Analytics..."
                                                value={qual.certificationName}
                                                onChange={e => setQ('certificationName', e.target.value)}
                                            />
                                        </div>

                                        {/* Resume Upload */}
                                        <div className="bp-field">
                                            <label className="bp-label">Resume / CV <span className="bp-optional">(optional)</span></label>
                                            <p className="bp-hint">Upload your latest resume. PDF or Word format preferred.</p>
                                            <FileDropzone
                                                label="Drag & drop your resume here"
                                                hint="PDF · DOC · DOCX"
                                                files={qual.resumeFiles}
                                                onAdd={(files) => addFiles('resumeFiles', files)}
                                                onRemove={(name) => removeFile('resumeFiles', name)}
                                                accept=".pdf,.doc,.docx"
                                                inputRef={resumeRef}
                                            />
                                        </div>

                                        {/* Certification Files */}
                                        <div className="bp-field">
                                            <label className="bp-label">Certification Documents <span className="bp-optional">(optional)</span></label>
                                            <p className="bp-hint">Upload scanned copies of your certificates or diplomas.</p>
                                            <FileDropzone
                                                label="Drag & drop certification files here"
                                                hint="PDF · JPG · PNG"
                                                files={qual.certificationFiles}
                                                onAdd={(files) => addFiles('certificationFiles', files)}
                                                onRemove={(name) => removeFile('certificationFiles', name)}
                                                accept=".pdf,image/*"
                                                inputRef={certRef}
                                            />
                                        </div>

                                        {/* Additional Files */}
                                        <div className="bp-field">
                                            <label className="bp-label">Additional Supporting Documents <span className="bp-optional">(optional)</span></label>
                                            <p className="bp-hint">Portfolio samples, work samples, ID proof, or any other documents that strengthen your profile.</p>
                                            <FileDropzone
                                                label="Drag & drop additional files here"
                                                hint="Images · PDFs · Documents"
                                                files={qual.additionalFiles}
                                                onAdd={(files) => addFiles('additionalFiles', files)}
                                                onRemove={(name) => removeFile('additionalFiles', name)}
                                                accept="image/*,.pdf,.doc,.docx"
                                                inputRef={additionalRef}
                                            />
                                        </div>

                                        {/* Terms Notice */}
                                        <div className="bp-terms-notice">
                                            By submitting, you agree to DiGiSeva's{' '}
                                            <Link to="/terms" className="bp-terms-link">Terms of Service</Link>
                                            {' '}and{' '}
                                            <Link to="/privacy" className="bp-terms-link">Privacy Policy</Link>.
                                            Your application will be reviewed before your profile goes live.
                                        </div>

                                    </div>

                                    {errors.submit && (
                                        <div className="bp-error" style={{ textAlign: 'center', marginTop: 8 }}>{errors.submit}</div>
                                    )}
                                    <div className="bp-actions">
                                        <button type="button" className="bp-btn-back" onClick={handleBack}>← Back</button>
                                        <button type="submit" className="bp-btn-submit" disabled={loading}>
                                            {loading ? 'Submitting…' : (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: 7 }}>
                                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338L1.88 6.88l10.625-4.125-2.374 6.498-.154-.24z" />
                                                    </svg>
                                                    Submit Application
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* ── Step 4: Success ── */}
                        {step === 4 && (
                            <div className="bp-success">
                                <div className="bp-success-icon">✓</div>
                                <h2 className="bp-success-title">Application Submitted!</h2>
                                <p className="bp-success-desc">
                                    Thank you for applying to become a provider on DiGiSeva. Our team will review
                                    your profile and documents within <strong>2–3 business days</strong>.
                                    You'll receive a confirmation email at <strong>{account.email}</strong>.
                                </p>
                                <div className="bp-success-actions">
                                    <button type="button" className="bp-btn-next" onClick={() => navigate('/')}>
                                        Go to Home
                                    </button>
                                    <Link to="/login" className="bp-btn-back" style={{ textDecoration: 'none' }}>
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default BecomeProvider
