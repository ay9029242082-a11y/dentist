import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Appointment, HygieneTask, Doctor, Service } from '../types';
import { DOCTORS, SERVICES, INITIAL_HYGIENE_TASKS } from '../data';
import { Calendar, Trash2, CheckCircle2, Award, Sparkles, Plus, Clock, Smile, Star } from 'lucide-react';

interface PatientPortalProps {
  onNavigateToBooking: () => void;
}

export default function PatientPortal({ onNavigateToBooking }: PatientPortalProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [hygieneTasks, setHygieneTasks] = useState<HygieneTask[]>([]);
  const [showGoalNotification, setShowGoalNotification] = useState<string | null>(null);

  // Initialize and load data from LocalStorage
  useEffect(() => {
    // Appointments
    const savedApts = localStorage.getItem('mint_appointments');
    if (savedApts) {
      setAppointments(JSON.parse(savedApts));
    }

    // Hygiene Tasks
    const savedTasks = localStorage.getItem('mint_hygiene_tasks');
    if (savedTasks) {
      setHygieneTasks(JSON.parse(savedTasks));
    } else {
      setHygieneTasks(INITIAL_HYGIENE_TASKS);
      localStorage.setItem('mint_hygiene_tasks', JSON.stringify(INITIAL_HYGIENE_TASKS));
    }
  }, []);

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem('mint_appointments', JSON.stringify(updated));
  };

  const handleCompleteTask = (taskId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    const updated = hygieneTasks.map(task => {
      if (task.id === taskId) {
        // Prevent completing multiple times a day
        if (task.lastCompleted === todayStr) {
          return task;
        }

        const newStreak = task.streak + 1;
        
        // Trigger short reward notification
        setShowGoalNotification(`Goal completed! Your streak is now ${newStreak} days.`);
        setTimeout(() => setShowGoalNotification(null), 3000);

        return {
          ...task,
          streak: newStreak,
          lastCompleted: todayStr
        };
      }
      return task;
    });

    setHygieneTasks(updated);
    localStorage.setItem('mint_hygiene_tasks', JSON.stringify(updated));
  };

  const handleResetStreaks = () => {
    const reset = hygieneTasks.map(task => ({
      ...task,
      streak: 0,
      lastCompleted: null
    }));
    setHygieneTasks(reset);
    localStorage.setItem('mint_hygiene_tasks', JSON.stringify(reset));
  };

  const getDoctorName = (docId: string) => {
    return DOCTORS.find(d => d.id === docId)?.name || 'Dentist Specialist';
  };

  const getServiceName = (srvId: string) => {
    return SERVICES.find(s => s.id === srvId)?.name || 'Dental procedure';
  };

  const getDoctorImage = (docId: string) => {
    return DOCTORS.find(d => d.id === docId)?.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400';
  };

  // Check if a task was already completed today
  const isTaskCompletedToday = (task: HygieneTask) => {
    const todayStr = new Date().toISOString().split('T')[0];
    return task.lastCompleted === todayStr;
  };

  // Calculate overall streak average or sum
  const totalStreakSum = hygieneTasks.reduce((sum, t) => sum + t.streak, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-left space-y-8">
      
      {/* Banner/Intro */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Patient Dental Portal</h2>
          <p className="mt-2 text-sm text-slate-500">Track scheduled visits and daily oral hygiene routines to unlock healthy gums.</p>
        </div>
        
        {totalStreakSum > 0 && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl shadow-md">
            <Award className="h-5 w-5" />
            <div>
              <span className="block text-[10px] font-bold uppercase text-emerald-100">Dental Habit Streak</span>
              <span className="block text-sm font-extrabold">{totalStreakSum} Days Total</span>
            </div>
          </div>
        )}
      </div>

      {/* Grid: Appointments (Left/Main) & Goals Tracker (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Appointments */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">My Scheduled Visits</h3>
            </div>
            {appointments.length > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                {appointments.length} Booked
              </span>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {appointments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center"
              >
                <Clock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 text-base">No appointments scheduled</h4>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                  You do not have any upcoming visits booked. Schedule a routine clean or assessment today.
                </p>
                <button
                  onClick={onNavigateToBooking}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
                >
                  Schedule visit now
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={getDoctorImage(apt.doctorId)}
                        alt="Doctor"
                        className="h-12 w-12 rounded-full object-cover shrink-0 border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                          {getServiceName(apt.serviceId)}
                        </span>
                        <span className="block font-bold text-slate-800 text-sm mt-0.5">{getDoctorName(apt.doctorId)}</span>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span className="font-bold text-slate-700">{apt.date}</span>
                          <span>•</span>
                          <span>{apt.timeSlot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-100 pt-3.5 sm:pt-0 shrink-0 gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" /> Ready
                      </span>
                      
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="inline-flex h-8 items-center justify-center rounded-lg border border-red-100 text-red-600 hover:bg-red-50 text-xs px-2.5 font-bold transition-all"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Goals & Hygiene Tracker */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Hygiene Goal Tracker</h3>
            </div>
            
            <button
              onClick={handleResetStreaks}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Reset Streaks
            </button>
          </div>

          {/* Goals Checklist container */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            
            {/* Short Toast alert */}
            <AnimatePresence>
              {showGoalNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-emerald-600 text-white rounded-xl p-3 text-xs font-bold"
                >
                  <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
                  <p>{showGoalNotification}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {hygieneTasks.map((task) => {
                const completed = isTaskCompletedToday(task);
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-2xl border transition-all flex justify-between items-center gap-4 ${
                      completed
                        ? 'bg-emerald-50/15 border-emerald-100'
                        : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800">{task.name}</span>
                        {task.streak > 0 && (
                          <span className="inline-flex items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-700">
                            🔥 {task.streak}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{task.description}</p>
                    </div>

                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={completed}
                      className={`h-10 px-4.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                        completed
                          ? 'bg-emerald-100 text-emerald-800 font-extrabold cursor-default'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      }`}
                    >
                      {completed ? 'Completed ✓' : 'Done'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-50 rounded-2xl p-4 flex gap-3.5">
              <Star className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-slate-600">
                <strong className="text-slate-800">Preventative Dentistry tip:</strong> Maintaining daily hygiene habits like regular flossing avoids high restorative costs and reduces cavity occurrences by up to 80%.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
