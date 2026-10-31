import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  FileText,
  Github,
  Linkedin,
} from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import { contact, cta, formOptions, profile } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/** Shared label + field wrapper */
function Field({ label, htmlFor, children, error, required = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-display font-bold uppercase tracking-tracked text-c400 flex items-center gap-1"
      >
        <span>{label}</span>
        {required && <span className="text-c100">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 font-body flex items-center gap-1 mt-0.5"
          >
            <AlertCircle size={11} />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Shared input class string */
const inputCls =
  'w-full bg-c800/80 border border-c600/60 hover:border-c400/50 focus:border-c400 focus:outline-none focus:ring-1 focus:ring-c400/30 rounded-[14px] px-4 py-3 text-sm text-c100 placeholder-c100/30 font-body transition-colors duration-200 min-h-[44px]';

/** Form validation */
function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = 'Full name is required';
  if (!form.email.trim()) errs.email = 'Email address is required';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
  if (!form.interest) errs.interest = 'Please select a service interest';
  if (!form.message.trim() || form.message.trim().length < 20)
    errs.message = 'Please provide at least 20 characters about your project';
  return errs;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * ContactSection (id="contact")
 * Headline: "HAVE A PROJECT OR A BRAND TO GROW? LET'S TALK."
 * Form: Full name*, Email*, Phone/WhatsApp, I'm interested in, Budget range, Project details*,
 * Honeypot, validation, loading/success/error states, Formspree or EmailJS endpoint.
 * Success text: "Thanks! I'll get back to you within 24 hours."
 * Right column: email, phone, WhatsApp, LinkedIn/GitHub [PLACEHOLDER], DOWNLOAD RESUME.
 */
export default function ContactSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const targetEmail = contact.email || 'sensoham2005@gmail.com';
  const endpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    import.meta.env.VITE_FORMSUBMIT_ENDPOINT ||
    `https://formsubmit.co/ajax/${targetEmail}`;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    message: '',
    _gotcha: '', // Honeypot anti-spam
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot check: If bot filled the hidden field, silently stop
    if (form._gotcha) {
      setStatus('success');
      return;
    }

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          interest: form.interest,
          budget: form.budget || 'Flexible',
          message: form.message,
          _subject: `[Portfolio Inquiry] ${form.name} — ${form.interest}`,
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          interest: '',
          budget: '',
          message: '',
          _gotcha: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto border-t border-c600/20"
    >
      {/* Header */}
      <div className="max-w-4xl mb-16 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
        <div className="mb-4">
          <PillTag active>GET IN TOUCH</PillTag>
        </div>
        <h2
          className="font-display font-black text-c100 uppercase tracking-tightest leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)' }}
        >
          HAVE A PROJECT OR A BRAND TO GROW?
          <br />
          <span className="text-c400 text-glow">LET&apos;S TALK.</span>
        </h2>
        <p className="text-base sm:text-lg text-c100/90 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
          Whether you need a scalable MERN stack web app built from scratch or high-converting search and ads campaigns, let&apos;s engineer something impactful.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        variants={prefersReduced ? {} : containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left: Contact Form (7 cols) */}
        <motion.div
          variants={prefersReduced ? {} : itemVariants}
          className="lg:col-span-7"
        >
          <div className="p-8 sm:p-10 rounded-[30px] glass-card border border-c600/40 relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(142,182,155,0.08) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Success State */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-c700 border border-c400/50 flex items-center justify-center shadow-mint-glow-sm">
                    <CheckCircle2 size={32} className="text-c100" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-c100 uppercase tracking-tight">
                    MESSAGE RECEIVED!
                  </h3>
                  <p className="text-sm text-c100/90 font-body max-w-sm leading-relaxed">
                    {cta.formSuccess}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-xs text-c400 font-body uppercase tracking-tracked hover:text-c100 transition-colors underline underline-offset-4"
                  >
                    Send another inquiry →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Honeypot field (hidden from genuine users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="_gotcha">Leave this empty</label>
                    <input
                      type="text"
                      name="_gotcha"
                      id="_gotcha"
                      value={form._gotcha}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Row 1: Full name* & Email* */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" htmlFor="name" error={errors.name} required>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Soham Sen"
                        value={form.name}
                        onChange={handleChange}
                        className={cn(inputCls, errors.name && 'border-red-500/60')}
                        aria-invalid={!!errors.name}
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Email Address" htmlFor="email" error={errors.email} required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={cn(inputCls, errors.email && 'border-red-500/60')}
                        aria-invalid={!!errors.email}
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  {/* Row 2: Phone/WhatsApp (optional) & Interest* */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone / WhatsApp" htmlFor="phone">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210 (optional)"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </Field>

                    <Field label="I'm Interested In" htmlFor="interest" error={errors.interest} required>
                      <select
                        id="interest"
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        className={cn(
                          inputCls,
                          'cursor-pointer appearance-none',
                          errors.interest && 'border-red-500/60',
                          !form.interest && 'text-c100/40'
                        )}
                        aria-invalid={!!errors.interest}
                      >
                        <option value="" disabled>
                          Select project scope…
                        </option>
                        {formOptions.interests.map((opt) => (
                          <option key={opt} value={opt} className="bg-c800 text-c100">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Row 3: Budget Range */}
                  <Field label="Budget Range" htmlFor="budget">
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={cn(
                        inputCls,
                        'cursor-pointer appearance-none',
                        !form.budget && 'text-c100/40'
                      )}
                    >
                      <option value="" className="bg-c800 text-c100/50">
                        Select budget range (optional)
                      </option>
                      {formOptions.budgets.map((opt) => (
                        <option key={opt} value={opt} className="bg-c800 text-c100">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Row 4: Project Details* */}
                  <Field label="Project Details" htmlFor="message" error={errors.message} required>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your product requirements, current growth metrics, or timeline…"
                      value={form.message}
                      onChange={handleChange}
                      className={cn(
                        inputCls,
                        'resize-none min-h-[120px]',
                        errors.message && 'border-red-500/60'
                      )}
                      aria-invalid={!!errors.message}
                    />
                  </Field>

                  {/* Error Notification */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        key="formerr"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-300 font-body flex items-start gap-2 p-3.5 rounded-[14px] bg-red-500/10 border border-red-500/20"
                      >
                        <AlertCircle size={15} className="flex-shrink-0 text-red-400 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-200">Could not submit form automatically.</p>
                          <a
                            href={`mailto:${contact.email}?subject=Project%20Inquiry%20from%20${encodeURIComponent(form.name || 'Client')}&body=${encodeURIComponent(form.message || '')}`}
                            className="underline text-c100 hover:text-white transition-colors block mt-0.5"
                          >
                            Click here to email directly at {contact.email} →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-pill font-display font-bold uppercase tracking-tracked text-sm transition-all duration-300 min-h-[48px]',
                      status === 'loading'
                        ? 'bg-c700 text-c400 border border-c600 cursor-not-allowed'
                        : 'bg-c100 text-c900 hover:brightness-105 hover:shadow-mint-glow cursor-pointer active:scale-[0.98]'
                    )}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>SENDING INQUIRY…</span>
                      </>
                    ) : (
                      <>
                        <span>{cta.formSubmit}</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-c100/40 font-body">
                    {cta.formTrust}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right: Direct Channels Sidebar (5 cols) */}
        <motion.div
          variants={prefersReduced ? {} : itemVariants}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          {/* Quick Direct Channel Cards */}
          <div className="p-8 rounded-[28px] glass-card border border-c600/40 flex flex-col gap-6">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400 block mb-1">
                FAST DIRECT CONTACT
              </span>
              <h3 className="text-xl font-display font-black text-c100 uppercase tracking-tight">
                DIRECT CHANNELS
              </h3>
            </div>

            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-4 p-4 rounded-[20px] bg-c800/80 border border-c600/50 hover:border-c400/60 transition-all min-h-[44px]"
            >
              <div className="w-11 h-11 rounded-full bg-c700 border border-c400/30 flex items-center justify-center flex-shrink-0 group-hover:bg-c100/10 transition-colors">
                <Mail size={18} className="text-c400" />
              </div>
              <div className="flex-grow">
                <p className="text-[10px] font-display font-bold uppercase tracking-tracked text-c400 mb-0.5">
                  EMAIL
                </p>
                <p className="text-sm font-body text-c100 font-medium break-all">{contact.email}</p>
              </div>
              <ArrowRight size={14} className="text-c600 group-hover:text-c400 transition-colors" />
            </a>

            {/* Phone */}
            <a
              href={`tel:${contact.phone}`}
              className="group flex items-center gap-4 p-4 rounded-[20px] bg-c800/80 border border-c600/50 hover:border-c400/60 transition-all min-h-[44px]"
            >
              <div className="w-11 h-11 rounded-full bg-c700 border border-c400/30 flex items-center justify-center flex-shrink-0 group-hover:bg-c100/10 transition-colors">
                <Phone size={18} className="text-c400" />
              </div>
              <div className="flex-grow">
                <p className="text-[10px] font-display font-bold uppercase tracking-tracked text-c400 mb-0.5">
                  PHONE
                </p>
                <p className="text-sm font-body text-c100 font-medium">{contact.phone}</p>
              </div>
              <ArrowRight size={14} className="text-c600 group-hover:text-c400 transition-colors" />
            </a>

            {/* WhatsApp */}
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-[20px] bg-c800/80 border border-c600/50 hover:border-c400/60 transition-all min-h-[44px]"
            >
              <div className="w-11 h-11 rounded-full bg-c700 border border-c400/30 flex items-center justify-center flex-shrink-0 group-hover:bg-c100/10 transition-colors">
                <MessageCircle size={18} className="text-c400" />
              </div>
              <div className="flex-grow">
                <p className="text-[10px] font-display font-bold uppercase tracking-tracked text-c400 mb-0.5">
                  WHATSAPP DIRECT
                </p>
                <p className="text-sm font-body text-c100 font-semibold">{cta.whatsapp}</p>
              </div>
              <ArrowRight size={14} className="text-c600 group-hover:text-c400 transition-colors" />
            </a>

            {/* Social / Professional Profiles */}
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-[10px] font-display font-bold uppercase tracking-tracked text-c400">
                PROFILES
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={contact.github === '[PLACEHOLDER URL]' ? '#contact' : contact.github}
                  target={contact.github === '[PLACEHOLDER URL]' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-[16px] bg-c800/60 border border-c600/40 text-xs font-body text-c400 hover:text-c100 hover:border-c400/60 transition-colors min-h-[44px]"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>

                <a
                  href={contact.linkedin === '[PLACEHOLDER URL]' ? '#contact' : contact.linkedin}
                  target={contact.linkedin === '[PLACEHOLDER URL]' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-[16px] bg-c800/60 border border-c600/40 text-xs font-body text-c400 hover:text-c100 hover:border-c400/60 transition-colors min-h-[44px]"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-4 border-t border-c600/30">
              <a
                href={contact.resumeUrl}
                download
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-pill border border-c400 text-c100 font-body font-bold text-xs uppercase tracking-tracked hover:bg-c600/30 hover:border-c100 transition-all min-h-[44px]"
              >
                <FileText size={15} />
                <span>{cta.resume}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
