import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Coins, Check, FileText, Info, ArrowRight } from 'lucide-react';

interface CostCalculatorProps {
  onBookService: (serviceId: string) => void;
}

export default function CostCalculator({ onBookService }: CostCalculatorProps) {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [insuranceCoverage, setInsuranceCoverage] = useState<number>(80); // percentage

  const handleToggleService = (service: Service) => {
    const exists = selectedServices.some(s => s.id === service.id);
    if (exists) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totals = useMemo(() => {
    const gross = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const coPayPct = (100 - insuranceCoverage) / 100;
    const outOfPocket = gross * coPayPct;
    const insurancePaid = gross * (insuranceCoverage / 100);

    return {
      gross,
      outOfPocket,
      insurancePaid
    };
  }, [selectedServices, insuranceCoverage]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-left">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Treatment Cost Estimator</h2>
        <p className="mt-2 text-sm text-slate-500">Select procedures and adjust coverage to calculate your out-of-pocket co-pay transparently.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Procedures Selector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Coins className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">Select Procedures</h3>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {SERVICES.map((service) => {
              const isChecked = selectedServices.some(s => s.id === service.id);
              return (
                <button
                  key={service.id}
                  onClick={() => handleToggleService(service)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-50/10'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                      isChecked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-200 bg-white'
                    }`}>
                      {isChecked && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-slate-800">{service.name}</span>
                      <span className="block text-xs text-slate-400 mt-1">{service.category} • Recovery: {service.recoveryTime}</span>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold text-slate-800 shrink-0 ml-4">
                    ${service.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Estimator Pricing Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-md space-y-6">
            <h3 className="text-base font-bold text-slate-900">Coverage & Cost Breakdown</h3>

            {/* Insurance Slider */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600 uppercase">Insurance Coverage</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg text-sm">
                  {insuranceCoverage}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={insuranceCoverage}
                onChange={(e) => setInsuranceCoverage(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <span className="block text-[10px] text-slate-400 font-medium">Drag to simulate your health insurance plan's coverage rate.</span>
            </div>

            {/* Price Calculations */}
            <div className="border-t border-slate-200/60 pt-5 space-y-3">
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>Gross Treatment Sum</span>
                <span>${totals.gross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-600 font-bold">
                <span>Paid by Insurance</span>
                <span>-${totals.insurancePaid.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-4">
                <div>
                  <span className="block font-extrabold text-slate-900 text-base">Your Co-Pay</span>
                  <span className="block text-[9px] text-slate-400 font-medium">Estimated patient out-of-pocket</span>
                </div>
                <span className="text-2xl font-black text-slate-900">${totals.outOfPocket.toFixed(2)}</span>
              </div>
            </div>

            {/* Estimate Item list */}
            {selectedServices.length > 0 ? (
              <div className="rounded-xl border border-slate-200/60 bg-white p-3.5 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-1.5"> procedimientos estimados</span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {selectedServices.map(s => (
                    <div key={s.id} className="flex justify-between items-center text-xs text-slate-700">
                      <span className="truncate pr-4 font-medium">{s.name}</span>
                      <span className="font-bold shrink-0">${s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 p-6 text-center text-xs text-slate-400">
                <Info className="h-5 w-5 text-slate-300 mx-auto mb-2" />
                Select one or more dental services to build your estimated pricing statement.
              </div>
            )}

            {/* Proceed Booking CTA */}
            <button
              onClick={() => {
                if (selectedServices.length > 0) {
                  // Book the first selected service by default
                  onBookService(selectedServices[0].id);
                } else {
                  // Book default visit
                  onBookService('srv-1');
                }
              }}
              className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Book Procedures Now
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </button>
            
            <div className="flex items-start gap-2 bg-emerald-50/45 p-3.5 rounded-xl border border-emerald-50">
              <FileText className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-normal font-medium">We accept all major PPO insurance plans. We handle all insurance pre-authorizations and direct billing on your behalf.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
