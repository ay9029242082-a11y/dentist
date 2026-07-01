import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppointmentBooking from './components/AppointmentBooking';
import SymptomTriage from './components/SymptomTriage';
import CostCalculator from './components/CostCalculator';
import PatientPortal from './components/PatientPortal';
import DoctorsList from './components/DoctorsList';
import Reviews from './components/Reviews';
import ContactAndHours from './components/ContactAndHours';
import { Sparkles, Calendar, Heart, ShieldCheck, Mail, Phone, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // High-fidelity flow states
  const [preSelectedDoctorId, setPreSelectedDoctorId] = useState<string | undefined>(undefined);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);

  const handleSelectDoctorAndBook = (docId: string) => {
    setPreSelectedDoctorId(docId);
    setPreSelectedServiceId(undefined); // clear service
    setActiveTab('booking');
  };

  const handleSelectServiceAndBook = (srvId: string) => {
    setPreSelectedServiceId(srvId);
    setPreSelectedDoctorId(undefined); // clear doctor
    setActiveTab('booking');
  };

  const handleAppointmentSuccess = () => {
    // Navigate user to portal so they can view their scheduled visits!
    setTimeout(() => {
      setActiveTab('portal');
      // Reset selections
      setPreSelectedDoctorId(undefined);
      setPreSelectedServiceId(undefined);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased flex flex-col">
      {/* Dynamic Top Bar */}
      <div className="bg-emerald-950 py-2.5 px-4 text-center text-white text-[11px] font-bold tracking-wide flex justify-center items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 uppercase text-emerald-300">
          <Sparkles className="h-3 w-3 animate-pulse" /> Same-day dental emergencies
        </span>
        <span className="hidden sm:inline opacity-60">|</span>
        <a href="tel:5559113368" className="hover:underline flex items-center gap-1 text-emerald-100">
          <Phone className="h-3 w-3" /> Call Emergency Line: (555) 911-DENT
        </a>
      </div>

      {/* Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab !== 'booking') {
          // Reset pre-selections when moving to other tabs
          setPreSelectedDoctorId(undefined);
          setPreSelectedServiceId(undefined);
        }
      }} />

      {/* Primary Page Layout Container */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <Hero onNavigate={setActiveTab} />

            {/* Meet Our Doctors Block */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Elite Specialist Team</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Meet Our Clinical Experts</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-xl"> Handcrafted general, cosmetic, orthodontic, and surgical experts delivering seamless treatments.</p>
              </div>
              <DoctorsList onSelectDoctorAndBook={handleSelectDoctorAndBook} />
            </section>

            {/* Testimonials Block */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-slate-50/40 border-y border-slate-100 py-16">
              <div className="mb-10 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Patient Stories</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">What Our Patients Say</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-xl">Transparent, real, verified feedback published directly from our clinical checkout portal.</p>
              </div>
              <Reviews />
            </section>

            {/* Hours and Clinic Location Map */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Hours & Directions</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Visit Mint Dental Today</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-xl">Located in downtown Seattle healthcare district, with premium validated free parking.</p>
              </div>
              <ContactAndHours />
            </section>
          </div>
        )}

        {activeTab === 'booking' && (
          <motion.div
            key={`${preSelectedDoctorId}-${preSelectedServiceId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-20"
          >
            <AppointmentBooking
              initialDoctorId={preSelectedDoctorId}
              initialServiceId={preSelectedServiceId}
              onSuccess={handleAppointmentSuccess}
            />
          </motion.div>
        )}

        {activeTab === 'triage' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-20"
          >
            <SymptomTriage onSelectServiceAndBook={handleSelectServiceAndBook} />
          </motion.div>
        )}

        {activeTab === 'estimator' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-20"
          >
            <CostCalculator onBookService={handleSelectServiceAndBook} />
          </motion.div>
        )}

        {activeTab === 'portal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-20"
          >
            <PatientPortal onNavigateToBooking={() => setActiveTab('booking')} />
          </motion.div>
        )}
      </main>

      {/* Clinically Structured Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-black">
                M
              </div>
              <span className="text-sm font-extrabold text-white tracking-tight">Mint Dental Clinic</span>
            </div>
            <p className="leading-relaxed opacity-75">
              Modern clinical dental care in Seattle. Combining elite diagnostics with painless treatments for smiles built to last.
            </p>
            <span className="block text-[10px] text-emerald-500 font-bold uppercase">ADA & AACD Accredited</span>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div className="space-y-3">
            <span className="block text-white font-bold text-xs uppercase tracking-wider">Clinic Tabs</span>
            <ul className="space-y-2 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 text-left">Clinic Overview</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('booking')} className="hover:text-emerald-400 text-left">Book Visit</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('triage')} className="hover:text-emerald-400 text-left">Symptom Scanner</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('estimator')} className="hover:text-emerald-400 text-left">Co-Pay Estimator</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portal')} className="hover:text-emerald-400 text-left">My Patient Portal</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Contacts */}
          <div className="space-y-3">
            <span className="block text-white font-bold text-xs uppercase tracking-wider">Clinical Enquiries</span>
            <ul className="space-y-2 font-medium">
              <li>General line: <a href="tel:5556468336" className="text-white hover:underline">(555) 646-MINT</a></li>
              <li>Urgent line: <a href="tel:5559113368" className="text-red-400 hover:underline font-bold">(555) 911-DENT</a></li>
              <li>Address: Suite 102, 450 Emerald Heights</li>
            </ul>
          </div>

          {/* Col 4: Accreditation banner */}
          <div className="rounded-xl bg-slate-800 p-4 space-y-2 border border-slate-700/50">
            <span className="text-white font-bold block text-xs flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Patient-First Guarantee
            </span>
            <p className="opacity-75 leading-relaxed text-[11px]">
              All treatments utilize certified mercury-free composites, FDA-approved digital low-radiation radiography, and sterilized medical-grade instruments.
            </p>
          </div>

        </div>

        {/* Lower row */}
        <div className="mx-auto max-w-7xl border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Mint Dental Group, Inc. All rights reserved. Registered medical facility.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">HIPAA Compliance Details</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
