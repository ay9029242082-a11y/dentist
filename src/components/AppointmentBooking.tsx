import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS, SERVICES } from '../data';
import { Appointment, Doctor, Service } from '../types';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface AppointmentBookingProps {
  onSuccess: (appointment: Appointment) => void;
  initialDoctorId?: string;
  initialServiceId?: string;
}

export default function AppointmentBooking({ onSuccess, initialDoctorId, initialServiceId }: AppointmentBookingProps) {
  // Booking state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Preventative' | 'Restorative' | 'Cosmetic' | 'Emergency'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(
    initialServiceId ? SERVICES.find(s => s.id === initialServiceId) || null : null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    initialDoctorId ? DOCTORS.find(d => d.id === initialDoctorId) || null : null
  );
  
  // Date selection states
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Patient details state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [bookingCompleted, setBookingCompleted] = useState<Appointment | null>(null);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return SERVICES;
    return SERVICES.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  // Generate the next 14 days for selection
  const bookingDays = useMemo(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, '0');
      const dateVal = String(futureDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${dateVal}`;
      
      const dayOfWeek = futureDate.getDay(); // 0 = Sunday, 1 = Monday ...
      
      // Check if selected doctor works this day of the week
      const isAvailable = selectedDoctor 
        ? selectedDoctor.availableDays.includes(dayOfWeek) 
        : true; // if no doctor selected yet, show available

      days.push({
        dateString,
        dayName: futureDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: futureDate.getDate(),
        monthName: futureDate.toLocaleDateString('en-US', { month: 'short' }),
        isAvailable,
        dayOfWeek
      });
    }
    return days;
  }, [selectedDoctor]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDoctor || !selectedDate || !selectedTimeSlot || !patientName || !patientPhone || !patientEmail) {
      return;
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientName,
      patientPhone,
      patientEmail,
      doctorId: selectedDoctor.id,
      serviceId: selectedService.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Save appointment to LocalStorage
    const existing = localStorage.getItem('mint_appointments');
    const appointments: Appointment[] = existing ? JSON.parse(existing) : [];
    appointments.push(newAppointment);
    localStorage.setItem('mint_appointments', JSON.stringify(appointments));

    setBookingCompleted(newAppointment);
    onSuccess(newAppointment);
  };

  const handleReset = () => {
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setNotes('');
    setBookingCompleted(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-left">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Visit Scheduling Center</h2>
        <p className="mt-2 text-sm text-slate-500">Book your clinical visit in 3 easy steps with real-time slot selection.</p>
      </div>

      <AnimatePresence mode="wait">
        {bookingCompleted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-8 shadow-xl text-center max-w-xl mx-auto space-y-6"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Appointment Scheduled!</h3>
              <p className="text-sm text-slate-600">Your reservation has been locked in. A calendar invitation and clinic briefing are being dispatched to your email.</p>
            </div>

            <div className="rounded-2xl bg-white border border-emerald-100 p-5 text-left space-y-3.5 shadow-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient</span>
                <span className="text-sm font-semibold text-slate-800">{bookingCompleted.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doctor</span>
                <span className="text-sm font-semibold text-slate-800">
                  {DOCTORS.find(d => d.id === bookingCompleted.doctorId)?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Treatment</span>
                <span className="text-sm font-semibold text-slate-800">
                  {SERVICES.find(s => s.id === bookingCompleted.serviceId)?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                <span className="text-sm font-semibold text-emerald-700">
                  {bookingCompleted.date} at {bookingCompleted.timeSlot}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>Ref Code</span>
                <span className="font-mono text-slate-600">{bookingCompleted.id}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all"
              >
                Book another appointment
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* STEP 1: SERVICE SELECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900">Select Required Dental Treatment</h3>
              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap gap-2 py-1">
                {(['all', 'Preventative', 'Restorative', 'Cosmetic', 'Emergency'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'all' ? 'All Treatments' : cat}
                  </button>
                ))}
              </div>

              {/* Service Cards Deck */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(service);
                      // Auto-reset slot details if service changes to ensure consistent bookings
                      setSelectedDate('');
                      setSelectedTimeSlot('');
                    }}
                    className={`flex flex-col p-3.5 rounded-xl border text-left transition-all ${
                      selectedService?.id === service.id
                        ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between w-full items-start">
                      <span className="font-bold text-sm text-slate-800">{service.name}</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        ${service.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{service.description}</p>
                    <span className="text-[10px] font-semibold text-slate-400 mt-2 block">
                      Duration: {service.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: DOCTOR SELECTION */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900">Select Dental Expert</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {DOCTORS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setSelectedDate('');
                      setSelectedTimeSlot('');
                    }}
                    className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${
                      selectedDoctor?.id === doc.id
                        ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="h-14 w-14 rounded-full object-cover shadow-inner"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-bold text-sm text-slate-800 mt-3 block">{doc.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 uppercase mt-0.5">
                      {doc.role.split(' ')[0]}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {doc.education.split(' ').slice(-3).join(' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: DATE & TIME SELECTION */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900">Choose Appointment Time</h3>
              </div>

              {!selectedDoctor ? (
                <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <p className="font-semibold">Please select a Dental Expert in Step 2 to lock in available clinic times.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Horizontally scrollable date deck */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-2.5">Available Dates (Next 2 Weeks)</span>
                    <div className="flex gap-2 overflow-x-auto pb-2.5 scrollbar-none">
                      {bookingDays.map((day) => (
                        <button
                          key={day.dateString}
                          type="button"
                          disabled={!day.isAvailable}
                          onClick={() => {
                            setSelectedDate(day.dateString);
                            setSelectedTimeSlot('');
                          }}
                          className={`flex flex-col items-center justify-center h-16 min-w-[64px] rounded-xl border text-center shrink-0 transition-all ${
                            !day.isAvailable
                              ? 'bg-slate-50 border-slate-100 opacity-30 cursor-not-allowed'
                              : selectedDate === day.dateString
                              ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-100'
                              : 'border-slate-100 hover:border-slate-200 bg-white text-slate-800'
                          }`}
                        >
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${selectedDate === day.dateString ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {day.dayName}
                          </span>
                          <span className="text-lg font-extrabold leading-none mt-1">{day.dayNum}</span>
                          <span className={`text-[8px] font-bold uppercase mt-1 ${selectedDate === day.dateString ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {day.monthName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-2.5">Select Time Slot</span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {selectedDoctor.availableHours.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`flex items-center justify-center rounded-lg border py-2 text-xs font-bold transition-all ${
                              selectedTimeSlot === slot
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600'
                                : 'border-slate-100 hover:border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <Clock className="h-3.5 w-3.5 mr-1 text-slate-400 shrink-0" />
                            {slot.replace(' AM', '').replace(' PM', '')}
                            <span className="text-[9px] text-slate-400 ml-0.5">{slot.includes('AM') ? 'AM' : 'PM'}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* STEP 4: PATIENT CONTACT DATA */}
            {selectedDate && selectedTimeSlot && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Patient Contact Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Symptoms or Special Requests (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      placeholder="Specify if you have severe sensitivity, gum pain, or are requesting sedation options..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submitting Container */}
                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    Confirm Clinical Appointment (${selectedService?.price})
                  </button>
                </div>
              </div>
            )}

          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
