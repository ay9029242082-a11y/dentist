import { useState, FormEvent } from 'react';
import { Clock, MapPin, Phone, Mail, AlertTriangle, CheckCircle, Send, Map } from 'lucide-react';

export default function ContactAndHours() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get current day of week to highlight active hours (0=Sun, 1=Mon...6=Sat)
  const currentDay = new Date().getDay();

  const operatingHours = [
    { dayNum: 1, day: 'Monday', hours: '8:00 AM - 5:00 PM' },
    { dayNum: 2, day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
    { dayNum: 3, day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
    { dayNum: 4, day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
    { dayNum: 5, day: 'Friday', hours: '8:30 AM - 4:00 PM' },
    { dayNum: 6, day: 'Saturday', hours: '9:00 AM - 1:00 PM (Emergency Only)' },
    { dayNum: 0, day: 'Sunday', hours: 'Closed' }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-12 text-left">
      
      {/* Upper info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Contact info card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Direct Phone Channels</h4>
            <p className="text-xs text-slate-500 mt-1">Mon - Fri, 8:00 AM to 5:00 PM</p>
            <div className="mt-3.5 space-y-1.5 text-xs">
              <a href="tel:5556468336" className="block font-bold text-slate-800 hover:text-emerald-700">
                (555) 646-MINT (General Enquiry)
              </a>
              <a href="tel:5559113368" className="block font-bold text-red-600 hover:text-red-700">
                (555) 911-DENT (Emergency Hotline)
              </a>
            </div>
          </div>
        </div>

        {/* Address card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Clinic Location</h4>
            <p className="text-xs text-slate-500 mt-1">Ground floor, wheelchair accessible</p>
            <div className="mt-3.5 text-xs text-slate-800 font-bold leading-normal">
              450 Emerald Heights Parkway<br />
              Suite 102, Healthcare Plaza<br />
              Downtown Seattle, WA 98101
            </div>
          </div>
        </div>

        {/* Support email card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Electronic Mailboxes</h4>
            <p className="text-xs text-slate-500 mt-1">Average response time: &lt; 2 hours</p>
            <div className="mt-3.5 space-y-1.5 text-xs">
              <a href="mailto:appointments@mintdental.com" className="block font-bold text-slate-800 hover:text-emerald-700">
                appointments@mintdental.com
              </a>
              <a href="mailto:billing@mintdental.com" className="block font-bold text-slate-800 hover:text-emerald-700">
                billing@mintdental.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Hours Highlight & Map SVG & Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Hours Highlight (Left) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Clock className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">Operating Schedule</h3>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 space-y-2.5 shadow-sm">
            {operatingHours.map((op) => {
              const isToday = currentDay === op.dayNum;
              return (
                <div
                  key={op.day}
                  className={`flex justify-between items-center p-2.5 rounded-lg text-xs ${
                    isToday
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-100 shadow-sm'
                      : 'text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {op.day}
                    {isToday && (
                      <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                    )}
                  </span>
                  <div className="text-right">
                    <span>{op.hours}</span>
                    {isToday && (
                      <span className="block text-[9px] text-emerald-600 uppercase font-bold mt-0.5">Open Today</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-red-50 bg-red-50/20 p-4 flex gap-3 text-xs leading-relaxed text-red-900">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Clinical Emergencies</strong>
              <p className="mt-0.5 text-slate-600">If you are experiencing severe facial trauma, uncontrolled gum bleeding, or extreme tooth pain outside working hours, call our 24/7 hotline directly.</p>
            </div>
          </div>
        </div>

        {/* Map SVG & Inquiry Form (Right) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Custom vector Map (Aesthetic clinical showcase map) */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Map className="h-4 w-4 text-emerald-600" />
                Downtown District Map
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Suite 102</span>
            </div>

            {/* Custom stylized street grid SVG */}
            <div className="relative h-44 bg-emerald-50/10 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
              
              {/* Street grid paths */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-12 left-0 right-0 h-4 bg-slate-200" />
                <div className="absolute top-32 left-0 right-0 h-4 bg-slate-200" />
                <div className="absolute left-16 top-0 bottom-0 w-4 bg-slate-200" />
                <div className="absolute left-48 top-0 bottom-0 w-4 bg-slate-200" />
              </div>

              {/* Park block */}
              <div className="absolute top-16 left-20 w-24 h-12 bg-emerald-100/70 rounded-lg border border-emerald-200 flex items-center justify-center">
                <span className="text-[9px] font-bold text-emerald-800 tracking-wider">EMERALD PARK</span>
              </div>

              {/* Clinic PIN marker */}
              <div className="absolute top-20 left-44 z-10 flex flex-col items-center">
                <div className="relative">
                  {/* Ripple effect */}
                  <div className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-ping" />
                  
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>
                <span className="mt-1 bg-slate-900 text-white font-extrabold text-[8px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  MINT DENTAL
                </span>
              </div>

              <span className="absolute bottom-2 left-2 text-[8px] text-slate-400 font-mono">Transit hub: 2 min walk</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal font-medium">Free validated parking is available for all patients in the healthcare parking structure adjacent to the building lobby.</p>
          </div>

          {/* Quick Inquiry Form */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold text-slate-800 uppercase block border-b border-slate-100 pb-2">Quick Medical Inquiry</span>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              {success && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-xs font-bold">
                  ✓ Message transmitted successfully!
                </div>
              )}

              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs focus:border-emerald-500 focus:outline-none"
              />

              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs focus:border-emerald-500 focus:outline-none"
              />

              <textarea
                required
                placeholder="Inquire about treatments, billing protocols, or cosmetic requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={2}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:border-emerald-500 focus:outline-none resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-slate-300"
              >
                <Send className="h-3 w-3 mr-1.5" />
                {isSubmitting ? 'Transmitting...' : 'Send Inquiry'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
