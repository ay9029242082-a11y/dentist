import { Smile, Calendar, HeartPulse, Coins, User, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Overview', icon: Smile },
    { id: 'booking', label: 'Book Visit', icon: Calendar },
    { id: 'triage', label: 'Health Scanner', icon: HeartPulse },
    { id: 'estimator', label: 'Cost Estimator', icon: Coins },
    { id: 'portal', label: 'My Portal', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-200">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="block text-lg font-bold tracking-tight text-slate-800">Mint Dental</span>
            <span className="block text-xs font-medium text-emerald-600">Modern Clinical Care</span>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex space-x-1" aria-label="Global navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          {activeTab !== 'booking' && (
            <button
              onClick={() => setActiveTab('booking')}
              className="relative inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Book Appointment
            </button>
          )}

          {/* Mobile Bottom Bar Label / Small Menu indicator */}
          <div className="md:hidden text-xs text-slate-400 font-medium px-2 py-1 bg-slate-100 rounded-lg">
            Tabbed App
          </div>
        </div>
      </div>

      {/* Mobile Sticky Tab bar at top-ish */}
      <div className="flex md:hidden border-t border-emerald-50 bg-emerald-50/20 overflow-x-auto scrollbar-none py-1.5 px-2 justify-around gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
