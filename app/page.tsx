'use client';
import { FormEvent, useState } from 'react';
import { ArrowRight, Check, Clock3, FileCheck2, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const steps = [
  ['01','Receive','Forward client documents to your firm’s FirmVault number—just like forwarding to a colleague.'],
  ['02','File','Choose the client and document type in a few taps. Busy? Leave it safely pending.'],
  ['03','Find','Ask for the document in WhatsApp and get it back while the client is still on the call.'],
];

export default function Home() {
  const [joined,setJoined]=useState(false); const [email,setEmail]=useState('');
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(email.trim())setJoined(true)}
  return <main>
    <header className="site-header"><a href="#top" className="brand" aria-label="FirmVault home"><img src="/firmvault-logo.svg" alt="FirmVault"/></a><nav aria-label="Primary navigation"><a href="#how">How it works</a><a href="#trust">Why FirmVault</a><Button asChild className="nav-cta"><a href="#waitlist">Join waitlist</a></Button></nav></header>
    <section id="top" className="hero">
      <div className="hero-copy"><p className="eyebrow"><span/>Built for CA, tax and legal practices</p><h1>The document your firm received—<em>but can’t find.</em></h1><p className="hero-lead">FirmVault turns documents received through WhatsApp into an organised, searchable vault for your whole firm.</p>
        <form id="waitlist" className="waitlist-form" onSubmit={submit}>{joined?<div className="success" role="status"><span><Check/></span><div><strong>You’re on the early-access list.</strong><small>We’ll reach out when private beta seats open.</small></div></div>:<><label htmlFor="email" className="sr-only">Work email</label><Input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your work email" className="email-input"/><Button type="submit" className="hero-button">Join the waitlist <ArrowRight/></Button></>}</form><p className="form-note">Private beta · No spam · Early access for small professional firms</p>
      </div>
      <div className="product-scene" aria-label="FirmVault WhatsApp filing and retrieval example"><div className="phone-card"><div className="phone-head"><span className="mini-mark">F</span><div><strong>FirmVault</strong><small>online</small></div><span className="dots">•••</span></div><div className="chat"><div className="date-chip">MONDAY</div><div className="file-bubble"><FileCheck2/><div><strong>bank-statement.pdf</strong><small>PDF · 1.8 MB</small></div></div><div className="bot-bubble">Document received safely.<br/><strong>File it now?</strong><div className="chat-actions"><span>File now</span><span>Later</span></div></div><div className="date-chip">THREE WEEKS LATER</div><div className="user-bubble">Find Sharma bank statement</div><div className="file-bubble result"><Search/><div><strong>Found it.</strong><small>Sharma · Bank statement · 12 Aug</small></div><span className="open-pill">Open</span></div></div></div><div className="proof-card"><Clock3/><div><strong>Found in seconds</strong><small>Not after the call</small></div></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/></div>
    </section>
    <section className="promise-strip"><p>RECEIVE</p><span>→</span><p>FILE</p><span>→</span><p>FIND</p><strong>Without leaving WhatsApp.</strong></section>
    <section id="how" className="how-section"><div className="section-intro"><p className="eyebrow"><span/>The daily loop</p><h2>From chat chaos to a firm-wide memory.</h2></div><div className="steps-grid">{steps.map(([n,t,c])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section id="trust" className="trust-section"><div className="trust-copy"><p className="eyebrow light"><span/>Built for the way firms work</p><h2>Your client documents should belong to the firm—not someone’s chat history.</h2><p>FirmVault keeps everyday filing simple while giving partners the control and proof a professional practice needs.</p></div><div className="trust-list"><article><Search/><div><h3>Firm-wide retrieval</h3><p>Search across stored documents, not one person’s chats or memory.</p></div></article><article><ShieldCheck/><div><h3>Controlled access</h3><p>People see only the documents their groups are allowed to access.</p></div></article><article><FileCheck2/><div><h3>Recorded activity</h3><p>Important document and permission actions are captured in an audit trail.</p></div></article></div></section>
    <section className="final-cta"><span className="cta-mark">F</span><p className="eyebrow"><span/>Private beta</p><h2>Stop searching old chats.</h2><p>Join the early-access list for FirmVault.</p><a href="#waitlist" className="text-link">Get early access <ArrowRight/></a></section>
    <footer><img src="/firmvault-logo.svg" alt="FirmVault"/><p>A Nexosk product</p><span>© 2026 Nexosk. All rights reserved.</span></footer>
  </main>;
}
