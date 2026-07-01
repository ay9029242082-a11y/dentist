import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, AlertCircle, CheckCircle2, Star, Calendar, RefreshCw } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface SymptomTriageProps {
  onSelectServiceAndBook: (serviceId: string) => void;
}

export default function SymptomTriage({ onSelectServiceAndBook }: SymptomTriageProps) {
  const [step, setStep] = useState<number>(1);
  const [location, setLocation] = useState<string>('');
  const [symptom, setSymptom] = useState<string>('');
  const [severity, setSeverity] = useState<number>(0); // 1 to 5

  const locations = [
    { id: 'loc-1', label: 'Single Tooth', description: 'Pain isolated to one specific tooth.' },
    { id: 'loc-2', label: 'Entire Quadrant', description: 'Pain or pressure spread across a region of the jaw.' },
    { id: 'loc-3', label: 'Gums or Soft Tissues', description: 'Bleeding, swelling, or redness in the gums.' },
    { id: 'loc-4', label: 'Jaw Joint', description: 'Clicking, soreness, or pain when opening/closing the mouth.' }
  ];

  const symptoms = [
    { id: 'sym-1', label: 'Temperature Sensitivity', description: 'Sharp pain triggered by cold liquids or hot food.' },
    { id: 'sym-2', label: 'Severe Throbbing Pain', description: 'Constant pulsing pain that does not subside.' },
    { id: 'sym-3', label: 'Biting Pressure Pain', description: 'Sensation of sharp pain only when chewing down.' },
    { id: 'sym-4', label: 'Swelling or Pus', description: 'Noticeable bump on gums or facial swelling.' },
    { id: 'sym-5', label: 'Mechanical Trauma', description: 'A tooth was chipped, cracked, or knocked loose.' }
  ];

  const getTriageResult = () => {
    // Determine clinical risk level & recommended service based on inputs
    let riskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let title = '';
    let explanation = '';
    let recServiceId = '';

    if (severity >= 4 || symptom === 'Swelling or Pus' || symptom === 'Mechanical Trauma') {
      riskLevel = 'critical';
      title = 'Immediate Emergency Assessment Required';
      explanation = 'Your symptoms indicate potential acute dental trauma, severe pulp infection, or abscess. ImmediateSame-day treatment is strongly recommended to prevent systemic infection spread.';
      recServiceId = 'srv-9'; // Emergency Dental Pain Relief
    } else if (severity === 3 || symptom === 'Severe Throbbing Pain') {
      riskLevel = 'high';
      title = 'Urgent Clinical Evaluation Recommended';
      explanation = 'You are experiencing significant nerve engagement or deep decay. We recommend scheduling an appointment within 48 hours for diagnostic evaluation to see if a root canal or restoration is needed.';
      recServiceId = 'srv-5'; // Root Canal Therapy
    } else if (symptom === 'Biting Pressure Pain' || symptom === 'Temperature Sensitivity') {
      riskLevel = 'moderate';
      title = 'Standard Restorative Checkup Recommended';
      explanation = 'A sharp response to temperature or chewing pressure typically points to standard dental decay, enamel erosion, or a micro-crack. Booking a diagnostic evaluation and minor restoration is recommended.';
      recServiceId = 'srv-4'; // Composite Dental Fillings
    } else {
      riskLevel = 'low';
      title = 'General Oral Health Assessment';
      explanation = 'Mild symptoms are often connected to minor irritation or plaque buildup. A routine cleaning and standard panoramic checkup are ideal to diagnose and treat this early before pain escalates.';
      recServiceId = 'srv-1'; // Routine Dental Cleaning
    }

    const service = SERVICES.find(s => s.id === recServiceId) as Service;

    return {
      riskLevel,
      title,
      explanation,
      service
    };
  };

  const handleRestart = () => {
    setStep(1);
    setLocation('');
    setSymptom('');
    setSeverity(0);
  };

  const result = step === 4 ? getTriageResult() : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-left">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Oral Health Scanner</h2>
        <p className="mt-2 text-sm text-slate-500">Analyze dental symptoms dynamically to find recommended steps and clinical urgency.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        
        {/* Progress header */}
        {step < 4 && (
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-emerald-600 uppercase">Question {step} of 3</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-emerald-600' : 'bg-slate-100'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900">Where is your dental discomfort located?</h3>
              <p className="text-xs text-slate-400">Selecting the general area helps identify biological structures involved.</p>
              
              <div className="grid grid-cols-1 gap-3 pt-2">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setLocation(loc.label);
                      setStep(2);
                    }}
                    className="flex flex-col p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/10 text-left transition-all"
                  >
                    <span className="font-bold text-sm text-slate-800">{loc.label}</span>
                    <span className="text-xs text-slate-500 mt-1">{loc.description}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900">Which symptom matches your experience?</h3>
              <p className="text-xs text-slate-400">Identify the primary sensation or trigger causing discomfort.</p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {symptoms.map((sym) => (
                  <button
                    key={sym.id}
                    onClick={() => {
                      setSymptom(sym.label);
                      setStep(3);
                    }}
                    className="flex flex-col p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/10 text-left transition-all"
                  >
                    <span className="font-bold text-sm text-slate-800">{sym.label}</span>
                    <span className="text-xs text-slate-500 mt-1">{sym.description}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2 block"
              >
                &larr; Back to Location
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">How would you rate the pain level?</h3>
                <p className="text-xs text-slate-400">Estimate how much this is impacting your normal activities (eating, speaking, sleeping).</p>
              </div>

              {/* Custom Number Selection slider or circles */}
              <div className="flex justify-between items-center gap-2 py-4">
                {[1, 2, 3, 4, 5].map((level) => {
                  const labels = ['Mild', 'Noticeable', 'Distracting', 'Severe', 'Debilitating'];
                  return (
                    <button
                      key={level}
                      onClick={() => setSeverity(level)}
                      className={`flex flex-col items-center justify-center h-20 w-full rounded-2xl border transition-all ${
                        severity === level
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-100'
                          : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                      }`}
                    >
                      <span className="text-xl font-extrabold">{level}</span>
                      <span className={`text-[9px] font-bold mt-1.5 ${severity === level ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {labels[level - 1]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  &larr; Back to Symptom
                </button>

                <button
                  onClick={() => setStep(4)}
                  disabled={severity === 0}
                  className={`inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-md transition-all ${
                    severity === 0
                      ? 'bg-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  Generate Health Assessment &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Risk Level Badge */}
              <div className={`flex items-start gap-4 rounded-2xl p-5 border text-left ${
                result.riskLevel === 'critical'
                  ? 'bg-red-50 border-red-100 text-red-900'
                  : result.riskLevel === 'high'
                  ? 'bg-amber-50 border-amber-100 text-amber-900'
                  : 'bg-emerald-50 border-emerald-100 text-emerald-900'
              }`}>
                <div className="mt-0.5 shrink-0">
                  {result.riskLevel === 'critical' ? (
                    <ShieldAlert className="h-6 w-6 text-red-600 animate-bounce" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wide">
                    Urgency Rating: {result.riskLevel.toUpperCase()}
                  </h4>
                  <h3 className="text-base font-extrabold">{result.title}</h3>
                  <p className="text-xs leading-relaxed mt-2 opacity-90">{result.explanation}</p>
                </div>
              </div>

              {/* Recommended Service details */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Clinical Procedure</span>
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{result.service.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{result.service.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-extrabold text-emerald-700">${result.service.price}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Est. Cost</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 mt-4 pt-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Recovery</span>
                    <span className="block font-semibold text-slate-700 mt-0.5">{result.service.recoveryTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Treatment Time</span>
                    <span className="block font-semibold text-slate-700 mt-0.5">{result.service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[10px] text-slate-400 leading-normal border-t border-slate-100 pt-4 text-center">
                <strong>Disclaimer:</strong> This automated Oral Health Scanner is for informational reference only. It does not replace professional dental diagnosis, digital radiography scans, or direct clinical evaluation by a licensed dental professional.
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="flex-1 inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4 mr-1.5 text-slate-400" />
                  Restart Assessment
                </button>
                <button
                  onClick={() => onSelectServiceAndBook(result.service.id)}
                  className="flex-2 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Pre-Select Service & Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
