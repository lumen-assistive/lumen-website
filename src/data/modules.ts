export interface ModuleInfo {
  id: string;
  nameIt: string;
  nameEn: string;
  descriptionIt: string;
  descriptionEn: string;
  repoUrl: string | null;
  repoLabel: string | null;
}

export const modules: ModuleInfo[] = [
  {
    id: 'vedere',
    nameIt: 'Vedere',
    nameEn: 'See',
    descriptionIt:
      'Descrizione della scena, OCR dal vivo, riconoscimento di scadenze, banconote e confezioni di medicinali, nomi dei colori, modalita di ricerca oggetti.',
    descriptionEn:
      'Scene description, live OCR, expiry date recognition, banknote and medicine box recognition, color naming, object-finding mode.',
    repoUrl: 'https://github.com/lumen-assistive/lumen-plugins/tree/main/packages/vedere',
    repoLabel: 'lumen-plugins/packages/vedere',
  },
  {
    id: 'sentire',
    nameIt: 'Sentire',
    nameEn: 'Hear',
    descriptionIt:
      'Sottotitoli offline in tempo reale, avvisi sonori (campanello, allarme antincendio, sirena, pianto di un bambino) con vibrazione e flash, trascrizioni salvate con riassunto.',
    descriptionEn:
      'Offline live captions, sound alerts (doorbell, smoke alarm, siren, baby crying) with vibration and flash, saved transcripts with summary.',
    repoUrl: 'https://github.com/lumen-assistive/lumen-plugins/tree/main/packages/sentire',
    repoLabel: 'lumen-plugins/packages/sentire',
  },
  {
    id: 'parlare',
    nameIt: 'Parlare',
    nameEn: 'Speak',
    descriptionIt: 'Supporto alla comunicazione per chi ha difficolta a parlare.',
    descriptionEn: 'Communication support for people who have difficulty speaking.',
    repoUrl: null,
    repoLabel: null,
  },
  {
    id: 'leggere',
    nameIt: 'Leggere e Studiare',
    nameEn: 'Read and Study',
    descriptionIt: 'Supporto alla lettura e allo studio.',
    descriptionEn: 'Reading and study support.',
    repoUrl: null,
    repoLabel: null,
  },
  {
    id: 'ricordare',
    nameIt: 'Ricordare',
    nameEn: 'Remember',
    descriptionIt: 'Supporto alla memoria, con riconoscimento facciale solo su consenso esplicito e solo sul dispositivo.',
    descriptionEn: 'Memory support, with face recognition only with explicit consent and only on-device.',
    repoUrl: null,
    repoLabel: null,
  },
  {
    id: 'protezione',
    nameIt: 'Protezione',
    nameEn: 'Safety',
    descriptionIt:
      'Rilevamento di cadute dallo smartphone, SOS via SMS senza connessione a internet, filtro contro SMS e link truffa con spiegazioni semplici, scheda medica di emergenza, condivisione temporanea della posizione.',
    descriptionEn:
      'Fall detection from the phone, offline SOS over SMS, SMS and link scam filter with plain explanations, emergency medical card, temporary location sharing.',
    repoUrl: 'https://github.com/lumen-assistive/lumen-plugins/tree/main/packages/protezione',
    repoLabel: 'lumen-plugins/packages/protezione',
  },
  {
    id: 'muoversi',
    nameIt: 'Muoversi',
    nameEn: 'Move',
    descriptionIt: 'Supporto alla mobilita e allo spostamento in sicurezza.',
    descriptionEn: 'Mobility and safe movement support.',
    repoUrl: null,
    repoLabel: null,
  },
  {
    id: 'famiglia',
    nameIt: 'Famiglia e caregiver',
    nameEn: 'Family and caregivers',
    descriptionIt:
      'Configurazione remota da parte dei caregiver, avvisi solo con consenso, calendario condiviso, stato "tutto ok oggi", ruoli e permessi.',
    descriptionEn:
      'Remote configuration by caregivers, alerts only with consent, shared calendar, "all ok today" status, roles and permissions.',
    repoUrl: 'https://github.com/lumen-assistive/lumen-plugins/tree/main/packages/famiglia',
    repoLabel: 'lumen-plugins/packages/famiglia',
  },
];
