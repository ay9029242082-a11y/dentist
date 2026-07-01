import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Review } from '../types';
import { INITIAL_REVIEWS, SERVICES } from '../data';
import { Star, CheckCircle, MessageSquare, PlusCircle } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Submit review form states
  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [treatment, setTreatment] = useState('Routine Dental Cleaning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mint_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('mint_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!patientName || !text) return;

    setIsSubmitting(true);

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      patientName,
      rating,
      text,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      treatment
    };

    setTimeout(() => {
      const updated = [newReview, ...reviews];
      setReviews(updated);
      localStorage.setItem('mint_reviews', JSON.stringify(updated));

      // Reset form
      setPatientName('');
      setRating(5);
      setText('');
      setTreatment('Routine Dental Cleaning');
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    }, 800);
  };

  return (
    <div className="space-y-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Reviews Grid/Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Patient Testimonials</h3>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              {reviews.length} total smiles
            </span>
          </div>

          <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block font-bold text-sm text-slate-800">{rev.patientName}</span>
                      <span className="block text-[10px] text-slate-400 font-medium mt-0.5">{rev.date}</span>
                    </div>

                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{rev.text}</p>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-2.5">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                      <CheckCircle className="h-2.5 w-2.5" /> Verified Patient
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      {rev.treatment}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-6">
          <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3 mb-5">
            <PlusCircle className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Share Your Experience</h3>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            
            {successMsg && (
              <div className="bg-emerald-600 text-white rounded-xl p-3.5 text-xs font-bold leading-normal text-center shadow-md">
                ✓ Thank you! Your verified review has been recorded and published in real-time.
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Your Name</label>
              <input
                type="text"
                required
                placeholder="Clarissa M."
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Procedure</label>
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full h-10 px-2 bg-white border border-slate-200 rounded-lg text-xs focus:border-emerald-500 focus:outline-none"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Rating Star</label>
                <div className="flex h-10 items-center justify-start gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-amber-400 focus:outline-none"
                    >
                      <Star className={`h-5 w-5 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Your Comments</label>
              <textarea
                required
                placeholder="Describe your clinic visit, doctor experience, or dental hygiene outcomes..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Recording feedback...' : 'Post Patient Review'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
