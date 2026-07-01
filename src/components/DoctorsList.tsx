import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Doctor } from '../types';
import { DOCTORS } from '../data';
import { Star, GraduationCap, Calendar, X, Heart, Award } from 'lucide-react';

interface DoctorsListProps {
  onSelectDoctorAndBook: (docId: string) => void;
}

export default function DoctorsList({ onSelectDoctorAndBook }: DoctorsListProps) {
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  const getWeekDaysString = (days: number[]) => {
    const map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(d => map[d]).join(', ');
  };

  return (
    <div className="space-y-8">
      {/* List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DOCTORS.map((doc) => (
          <motion.div
            key={doc.id}
            onClick={() => setActiveDoctor(doc)}
            className="group flex flex-col rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer text-left"
            whileHover={{ y: -4 }}
          >
            {/* Image Frame */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <img
                src={doc.image}
                alt={doc.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              {/* Rating float */}
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-xl bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{doc.rating}</span>
              </div>
            </div>

            {/* Profile Brief */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                  {doc.role}
                </span>
                <h4 className="text-base font-extrabold text-slate-800 mt-0.5 line-clamp-1">{doc.name}</h4>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{doc.specialty}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Available</span>
                <span className="font-bold text-slate-700">{doc.availableDays.length} days/week</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {activeDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-100 overflow-hidden shadow-2xl text-left"
            >
              {/* Image Banner */}
              <div className="relative h-48 sm:h-56 bg-slate-100">
                <img
                  src={activeDoctor.image}
                  alt={activeDoctor.name}
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveDoctor(null)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all focus:outline-none"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                {/* Overlaid Title */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                    {activeDoctor.role}
                  </span>
                  <h3 className="text-xl font-black mt-0.5">{activeDoctor.name}</h3>
                </div>
              </div>

              {/* Bio & Academic stats */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Education</span>
                      <span className="block text-xs font-bold text-slate-700 truncate max-w-[200px]" title={activeDoctor.education}>
                        {activeDoctor.education}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Award className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Clinic Rating</span>
                      <span className="block text-xs font-extrabold text-slate-700 flex items-center gap-1">
                        {activeDoctor.rating} ★
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Doctor Profile</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeDoctor.bio}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Clinic Days</span>
                    <span className="block font-bold text-slate-800 mt-1">
                      {getWeekDaysString(activeDoctor.availableDays)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider text-right">Hours</span>
                    <span className="block font-bold text-emerald-700 mt-1">
                      {activeDoctor.availableHours[0]} - {activeDoctor.availableHours.slice(-1)[0]}
                    </span>
                  </div>
                </div>

                {/* Booking CTA inside modal */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveDoctor(null)}
                    className="flex-1 inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Close Profile
                  </button>
                  <button
                    onClick={() => {
                      onSelectDoctorAndBook(activeDoctor.id);
                      setActiveDoctor(null);
                    }}
                    className="flex-2 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Schedule with {activeDoctor.name.split(',')[0]}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
