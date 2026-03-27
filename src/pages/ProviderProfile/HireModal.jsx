import React, { useState, useRef, useEffect } from 'react'
import './HireModal.css'

const PAYMENT_METHODS = [
    { id: 'cash', label: 'Cash', icon: '💵' },
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'netbank', label: 'Net Banking', icon: '🏦' },
    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
    { id: 'wallet', label: 'Wallet', icon: '👛' },
]

const DURATION_UNITS = ['Hours', 'Days', 'Weeks', 'Months']

const FilePreview = ({ file, onRemove }) => {
    const url = URL.createObjectURL(file)
    const type = file.type

    const renderPreview = () => {
        if (type.startsWith('image/')) {
            return <img src={url} alt={file.name} className="hm-preview-img" />
        }
        if (type.startsWith('video/')) {
            return <video src={url} className="hm-preview-video" controls />
        }
        if (type.startsWith('audio/')) {
            return (
                <div className="hm-preview-audio-wrap">
                    <div className="hm-preview-audio-icon">🎵</div>
                    <audio src={url} controls className="hm-preview-audio" />
                </div>
            )
        }
        if (type === 'application/pdf') {
            return (
                <div className="hm-preview-pdf">
                    <div className="hm-preview-pdf-icon">📄</div>
                    <span className="hm-preview-pdf-name">{file.name}</span>
                </div>
            )
        }
        return (
            <div className="hm-preview-pdf">
                <div className="hm-preview-pdf-icon">📎</div>
                <span className="hm-preview-pdf-name">{file.name}</span>
            </div>
        )
    }

    return (
        <div className="hm-preview-item">
            {renderPreview()}
            <button className="hm-preview-remove" onClick={() => onRemove(file.name)} title="Remove">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </button>
            <div className="hm-preview-filename">{file.name.length > 18 ? file.name.slice(0, 15) + '...' : file.name}</div>
        </div>
    )
}

const HireModal = ({ provider, onClose }) => {
    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = prev }
    }, [])

    const fileInputRef = useRef(null)
    const [form, setForm] = useState({
        description: '',
        roleSpec: '',
        durationValue: '',
        durationUnit: 'Days',
        priceType: 'total',
        priceAmount: '',
        paymentMethods: [],
        files: [],
    })
    const [dragOver, setDragOver] = useState(false)
    const [errors, setErrors] = useState({})

    const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const togglePayment = (id) => {
        setForm(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.includes(id)
                ? prev.paymentMethods.filter(m => m !== id)
                : [...prev.paymentMethods, id]
        }))
    }

    const addFiles = (incoming) => {
        const newFiles = Array.from(incoming).filter(
            f => !form.files.find(existing => existing.name === f.name)
        )
        setForm(prev => ({ ...prev, files: [...prev.files, ...newFiles] }))
    }

    const removeFile = (name) => {
        setForm(prev => ({ ...prev, files: prev.files.filter(f => f.name !== name) }))
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        addFiles(e.dataTransfer.files)
    }

    const validate = () => {
        const e = {}
        if (!form.description.trim()) e.description = 'Please describe the service you need.'
        if (!form.roleSpec.trim()) e.roleSpec = 'Role specification is required.'
        if (!form.durationValue || isNaN(form.durationValue) || Number(form.durationValue) <= 0)
            e.durationValue = 'Enter a valid duration.'
        if (!form.priceAmount || isNaN(form.priceAmount) || Number(form.priceAmount) <= 0)
            e.priceAmount = 'Enter a valid amount.'
        if (form.paymentMethods.length === 0) e.paymentMethods = 'Select at least one payment method.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            // TODO: submit logic
            console.log('Hire form submitted:', form)
            onClose()
        }
    }

    const providerFirstName = provider?.name?.split(' ')[0] || 'Provider'

    return (
        <div className="hm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="hm-modal" role="dialog" aria-modal="true">

                {/* Header */}
                <div className="hm-header">
                    <div className="hm-header-left">
                        <div className="hm-header-tag">NEW REQUEST</div>
                        <h2 className="hm-title">Hire {providerFirstName}</h2>
                        <p className="hm-subtitle">Fill in the details and {providerFirstName} will get back to you shortly.</p>
                    </div>
                    <button className="hm-close" onClick={onClose} aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="hm-body">

                        {/* Service Description */}
                        <div className="hm-field">
                            <label className="hm-label">Service Description <span className="hm-required">*</span></label>
                            <p className="hm-hint">Describe what you need in detail so {providerFirstName} understands your requirements.</p>
                            <textarea
                                className={`hm-textarea ${errors.description ? 'hm-input-error' : ''}`}
                                rows={4}
                                placeholder="e.g. I need a responsive landing page built with React and Tailwind CSS..."
                                value={form.description}
                                onChange={e => set('description', e.target.value)}
                            />
                            {errors.description && <div className="hm-error">{errors.description}</div>}
                        </div>

                        {/* Role Specification */}
                        <div className="hm-field">
                            <label className="hm-label">Role Specification <span className="hm-required">*</span></label>
                            <input
                                type="text"
                                className={`hm-input ${errors.roleSpec ? 'hm-input-error' : ''}`}
                                placeholder="e.g. Frontend Developer, UI Designer, Full-Stack Engineer..."
                                value={form.roleSpec}
                                onChange={e => set('roleSpec', e.target.value)}
                            />
                            {errors.roleSpec && <div className="hm-error">{errors.roleSpec}</div>}
                        </div>

                        {/* Expected Duration */}
                        <div className="hm-field">
                            <label className="hm-label">Expected Duration <span className="hm-required">*</span></label>
                            <div className="hm-duration-row">
                                <input
                                    type="number"
                                    min="1"
                                    className={`hm-input hm-duration-input ${errors.durationValue ? 'hm-input-error' : ''}`}
                                    placeholder="e.g. 5"
                                    value={form.durationValue}
                                    onChange={e => set('durationValue', e.target.value)}
                                />
                                <select
                                    className="hm-select hm-duration-unit"
                                    value={form.durationUnit}
                                    onChange={e => set('durationUnit', e.target.value)}
                                >
                                    {DURATION_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                            {errors.durationValue && <div className="hm-error">{errors.durationValue}</div>}
                        </div>

                        {/* Price Type */}
                        <div className="hm-field">
                            <label className="hm-label">Payment Structure <span className="hm-required">*</span></label>
                            <div className="hm-price-type-row">
                                <label className={`hm-price-type-option ${form.priceType === 'hourly' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="priceType"
                                        value="hourly"
                                        checked={form.priceType === 'hourly'}
                                        onChange={() => set('priceType', 'hourly')}
                                    />
                                    <div className="hm-price-type-icon">⏱</div>
                                    <div>
                                        <div className="hm-price-type-title">Hourly Rate</div>
                                        <div className="hm-price-type-desc">Pay per hour worked</div>
                                    </div>
                                </label>
                                <label className={`hm-price-type-option ${form.priceType === 'total' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="priceType"
                                        value="total"
                                        checked={form.priceType === 'total'}
                                        onChange={() => set('priceType', 'total')}
                                    />
                                    <div className="hm-price-type-icon">💼</div>
                                    <div>
                                        <div className="hm-price-type-title">Fixed Price</div>
                                        <div className="hm-price-type-desc">One total project fee</div>
                                    </div>
                                </label>
                            </div>

                            {/* Price Amount — shown conditionally */}
                            <div className="hm-price-amount-wrap">
                                <div className="hm-input-prefix-wrap">
                                    <span className="hm-input-prefix">₹</span>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`hm-input hm-prefixed-input ${errors.priceAmount ? 'hm-input-error' : ''}`}
                                        placeholder={form.priceType === 'hourly' ? 'Amount per hour' : 'Total project budget'}
                                        value={form.priceAmount}
                                        onChange={e => set('priceAmount', e.target.value)}
                                    />
                                    {form.priceType === 'hourly' && (
                                        <span className="hm-input-suffix">/ hr</span>
                                    )}
                                </div>
                                {errors.priceAmount && <div className="hm-error">{errors.priceAmount}</div>}
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="hm-field">
                            <label className="hm-label">Preferred Payment Methods <span className="hm-required">*</span></label>
                            <p className="hm-hint">Select all that apply.</p>
                            <div className="hm-payment-grid">
                                {PAYMENT_METHODS.map(method => (
                                    <label
                                        key={method.id}
                                        className={`hm-payment-chip ${form.paymentMethods.includes(method.id) ? 'active' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={form.paymentMethods.includes(method.id)}
                                            onChange={() => togglePayment(method.id)}
                                        />
                                        <span className="hm-payment-icon">{method.icon}</span>
                                        <span>{method.label}</span>
                                        {form.paymentMethods.includes(method.id) && (
                                            <svg className="hm-payment-check" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                            </svg>
                                        )}
                                    </label>
                                ))}
                            </div>
                            {errors.paymentMethods && <div className="hm-error">{errors.paymentMethods}</div>}
                        </div>

                        {/* Attachments */}
                        <div className="hm-field">
                            <label className="hm-label">Attachments <span className="hm-optional">(optional)</span></label>
                            <p className="hm-hint">Upload designs, documents, references, or any relevant files.</p>

                            <div
                                className={`hm-dropzone ${dragOver ? 'drag-over' : ''}`}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="hm-dropzone-icon">
                                    <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                    </svg>
                                </div>
                                <div className="hm-dropzone-text">
                                    <span className="hm-dropzone-main">Drag & drop files here</span>
                                    <span className="hm-dropzone-sub">or <span className="hm-dropzone-link">browse files</span></span>
                                </div>
                                <div className="hm-dropzone-types">Images · Videos · Audio · PDFs · Documents</div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                                className="hm-file-input-hidden"
                                onChange={e => addFiles(e.target.files)}
                            />

                            {/* File Previews */}
                            {form.files.length > 0 && (
                                <div className="hm-preview-grid">
                                    {form.files.map(file => (
                                        <FilePreview key={file.name} file={file} onRemove={removeFile} />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="hm-footer">
                        <button type="button" className="hm-btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="hm-btn-submit">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '7px' }}>
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338L1.88 6.88l10.625-4.125-2.374 6.498-.154-.24z" />
                            </svg>
                            Send Request to {providerFirstName}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default HireModal
