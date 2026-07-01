import { Doctor, Service, Review, HygieneTask } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Lin, DDS',
    role: 'Orthodontics & Pediatric Care',
    specialty: 'Clear aligners, traditional braces, and pediatric dental hygiene.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    education: 'Harvard School of Dental Medicine',
    bio: 'Dr. Sarah Lin has over 12 years of experience creating healthy, straight smiles for children and adults. She believes in preventative care and gentle guidance for young patients.',
    availableDays: [1, 2, 3, 4], // Mon - Thu
    availableHours: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. James Carter, DMD',
    role: 'Oral & Maxillofacial Surgeon',
    specialty: 'Complex extractions, dental implants, and reconstructive jaw surgery.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    education: 'University of Pennsylvania Dental Medicine',
    bio: 'Dr. Carter specializes in advanced implant dentistry and painless wisdom teeth extractions. He uses state-of-the-art 3D imaging to deliver precise and comfortable surgical solutions.',
    availableDays: [2, 4, 5], // Tue, Thu, Fri
    availableHours: ['08:30 AM', '09:30 AM', '10:30 AM', '01:30 PM', '02:30 PM', '03:30 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova, DDS',
    role: 'Cosmetic & Aesthetic Dentist',
    specialty: 'Smile makeovers, porcelain veneers, and professional whitening.',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    education: 'Columbia University College of Dental Medicine',
    bio: 'Dr. Elena is passionate about combining art and science to design confident, radiant smiles. Her meticulous craftsmanship has made her a highly sought-after cosmetic dentist.',
    availableDays: [1, 3, 5], // Mon, Wed, Fri
    availableHours: ['09:00 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM']
  },
  {
    id: 'doc-4',
    name: 'Dr. Marcus Vance, DMD',
    role: 'General & Preventive Dentist',
    specialty: 'Routine cleanings, mercury-free fillings, and crown fittings.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    education: 'Tufts University School of Dental Medicine',
    bio: 'Dr. Vance focuses on comprehensive general dentistry. He is known for his calm, friendly chairside manner, making nervous patients feel instantly at ease.',
    availableDays: [1, 2, 3, 4, 5], // Mon - Fri
    availableHours: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Routine Dental Cleaning',
    category: 'Preventative',
    price: 120,
    duration: '45 mins',
    description: 'Professional teeth scaling, polishing, and a detailed periodontal assessment to prevent cavities and maintain gum health.',
    icon: 'Sparkles',
    recoveryTime: 'Immediate (No downtime)'
  },
  {
    id: 'srv-2',
    name: 'Comprehensive Exam & 3D X-Rays',
    category: 'Preventative',
    price: 180,
    duration: '60 mins',
    description: 'In-depth evaluation of teeth, gums, jaw, and soft tissues using digital low-radiation 3D imaging for ultra-precise diagnostics.',
    icon: 'ShieldAlert',
    recoveryTime: 'Immediate (No downtime)'
  },
  {
    id: 'srv-3',
    name: 'Porcelain Dental Crown',
    category: 'Restorative',
    price: 950,
    duration: '90 mins',
    description: 'Custom-designed ceramic cap placed over a damaged, decayed, or weakened tooth to restore shape, strength, and premium aesthetics.',
    icon: 'Shield',
    recoveryTime: '1 - 2 hours (Until local anesthesia wears off)'
  },
  {
    id: 'srv-4',
    name: 'Composite Dental Fillings',
    category: 'Restorative',
    price: 190,
    duration: '45 mins',
    description: 'Mercury-free, tooth-colored composite resin fillings to repair mild tooth decay, seamlessly blended for a natural appearance.',
    icon: 'Wrench',
    recoveryTime: '1 hour'
  },
  {
    id: 'srv-5',
    name: 'Root Canal Therapy',
    category: 'Restorative',
    price: 750,
    duration: '90 mins',
    description: 'Advanced gentle therapy to save a severely infected or painful tooth, removing inflamed pulp tissue, disinfecting, and sealing.',
    icon: 'HeartPulse',
    recoveryTime: '2 - 3 days mild sensitivity'
  },
  {
    id: 'srv-6',
    name: 'Porcelain Smile Veneers',
    category: 'Cosmetic',
    price: 1200,
    duration: '120 mins',
    description: 'Wafer-thin, handcrafted porcelain shells bonded to the front of teeth to instantly transform discoloration, chips, or alignment gaps.',
    icon: 'Smile',
    recoveryTime: '1 - 2 days adaptation'
  },
  {
    id: 'srv-7',
    name: 'Professional Zoom Whitening',
    category: 'Cosmetic',
    price: 350,
    duration: '60 mins',
    description: 'In-office light-activated dental bleaching that brightens your enamel by up to 8 shades in a single safe, monitored session.',
    icon: 'Flame',
    recoveryTime: '24 hours temperature sensitivity'
  },
  {
    id: 'srv-8',
    name: 'Invisalign® Clear Aligners',
    category: 'Cosmetic',
    price: 4200,
    duration: '30 mins consultations',
    description: 'A series of custom-made, virtually invisible removable aligner trays that gradually straighten teeth without metal wires.',
    icon: 'RefreshCw',
    recoveryTime: 'None (Minor pressure per tray)'
  },
  {
    id: 'srv-9',
    name: 'Emergency Dental Pain Relief',
    category: 'Emergency',
    price: 150,
    duration: '45 mins',
    description: 'Priority same-day diagnostic visit designed to identify the source of sudden toothaches, swelling, or trauma, providing immediate relief.',
    icon: 'AlertOctagon',
    recoveryTime: 'Varies by treatment'
  },
  {
    id: 'srv-10',
    name: 'Wisdom Tooth Extraction',
    category: 'Emergency',
    price: 280,
    duration: '60 mins',
    description: 'Painless, surgical removal of impacted or painful third molars using local anesthesia or mild sedation for quick, safe recovery.',
    icon: 'Activity',
    recoveryTime: '3 - 5 days healing time'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    patientName: 'Clarissa Montgomery',
    rating: 5,
    text: 'Dr. Elena is an absolute artist! I got porcelain veneers, and they look incredibly natural. The staff was gentle, professional, and explain everything with patience.',
    date: '2026-06-15',
    verified: true,
    treatment: 'Porcelain Smile Veneers'
  },
  {
    id: 'rev-2',
    patientName: 'David K.',
    rating: 5,
    text: 'I have severe dental anxiety, but Dr. Vance was incredible. He made sure I was comfortable throughout my entire composite filling procedure. Absolutely no pain!',
    date: '2026-06-22',
    verified: true,
    treatment: 'Composite Dental Fillings'
  },
  {
    id: 'rev-3',
    patientName: 'Megan Alvarez',
    rating: 5,
    text: 'Brought my 7-year-old here for her first cleaning with Dr. Lin. She loved the interactive explanation and is actually looking forward to brushing her teeth now!',
    date: '2026-06-28',
    verified: true,
    treatment: 'Routine Dental Cleaning'
  }
];

export const INITIAL_HYGIENE_TASKS: HygieneTask[] = [
  {
    id: 'task-1',
    name: 'Brush Twice Daily',
    description: 'Brush for at least 2 minutes using a soft-bristled toothbrush and fluoride toothpaste.',
    streak: 3,
    lastCompleted: '2026-06-29'
  },
  {
    id: 'task-2',
    name: 'Interdental Flossing',
    description: 'Clean between teeth once daily to remove plaque and prevent gum disease.',
    streak: 1,
    lastCompleted: '2026-06-29'
  },
  {
    id: 'task-3',
    name: 'Antiseptic Mouthwash',
    description: 'Rinse with therapeutic, alcohol-free mouthwash to destroy bacteria and freshen breath.',
    streak: 0,
    lastCompleted: null
  }
];
