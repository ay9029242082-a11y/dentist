import { motion } from 'motion/react';
import { Star, Shield, Award, Sparkles, HeartHandshake, CheckCircle, Coins } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white py-12 sm:py-16">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-50/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-sky-50/50 blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              Accepting New Patients • Free Consultation
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A healthier smile, <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                crafted with comfort.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl">
              Welcome to Mint Dental. We combine state-of-the-art diagnostic technology with a gentle, patient-first approach to give you the most comfortable clinical experience possible.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-5">
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-slate-900">4.9</span>
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-xs font-medium text-slate-500 mt-1">1,200+ Google Reviews</p>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-slate-900">100%</span>
                <p className="text-xs font-medium text-slate-500 mt-1">Mercury-Free Fillings</p>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-slate-900">12+</span>
                <p className="text-xs font-medium text-slate-500 mt-1">Years Clinical Exp</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-100 transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200"
              >
                Schedule appointment
              </button>
              <button
                onClick={() => onNavigate('triage')}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
              >
                Oral health checkup
              </button>
              <button
                onClick={() => onNavigate('estimator')}
                className="inline-flex h-12 items-center justify-center rounded-xl text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors px-2"
              >
                Calculate pricing &rarr;
              </button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Graphic Panel */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative mx-auto max-w-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-100/55 border border-emerald-50">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
                alt="Modern dentist clinic room setup"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              {/* Overlaid Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-emerald-100 shadow-lg flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Painless Dentistry Promise</p>
                  <p className="text-[10px] text-slate-500 font-medium">Equipped with ultra-gentle advanced clinical tools.</p>
                </div>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full border-4 border-dashed border-emerald-200/50" />
          </motion.div>
        </div>

        {/* Dynamic Trust Badges Block */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-200">
            <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900">Same-Day Relief</h3>
              <p className="text-xs text-slate-500 mt-1">Squeezing emergency pain treatments in quickly on the same day.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-200">
            <Award className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900">Elite Education</h3>
              <p className="text-xs text-slate-500 mt-1">Our clinical experts hail from Harvard, Columbia, and UPenn.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-200">
            <Coins className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900">Transparent Costing</h3>
              <p className="text-xs text-slate-500 mt-1">Estimate exact prices & co-pays before you even sit in the chair.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-200">
            <HeartHandshake className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900">Calming Experience</h3>
              <p className="text-xs text-slate-500 mt-1">Soft lighting, modern noise-cancelling tech, and cozy blankets.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
