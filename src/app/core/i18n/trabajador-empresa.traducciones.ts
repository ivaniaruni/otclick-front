import { IdiomaApp } from './traducciones';

export const TRABAJADOR_EMPRESA_TRADUCCIONES: Record<
  IdiomaApp,
  Record<string, string>
> = {
  es: {
    EYEBROW: 'Tu espacio profesional',
    TITULO: 'Mi empresa',
    INTRO:
      'Consulta tu empresa, tus servicios y tu horario de trabajo.',
    CARGANDO: 'Cargando tu información…',
    ERROR:
      'No se ha podido cargar la información. Vuelve a intentarlo.',
    SIN_EMPRESA_TITULO: 'Todavía no tienes una empresa vinculada',
    SIN_EMPRESA_TEXTO:
      'Cuando se complete tu vinculación, aquí aparecerán tu empresa, tus servicios y tu horario.',
    MI_FICHA: 'Mi ficha profesional',
    SERVICIOS: 'Mis servicios',
    SIN_SERVICIOS: 'Todavía no tienes servicios asignados.',
    DURACION: '{{minutos}} min',
    HORARIO: 'Mi horario',
    HORARIO_TEXTO:
      'Horario efectivo según tus turnos y la apertura de la empresa. No representa los huecos libres para reservar.',
    ANTERIOR: 'Anterior',
    ACTUAL: 'Semana actual',
    SIGUIENTE: 'Siguiente',
    ANTERIOR_ARIA: 'Ver la semana anterior',
    SIGUIENTE_ARIA: 'Ver la semana siguiente',
    SIN_TURNO: 'Sin horario efectivo',
    ASIGNADO: 'Asignado',
    CONTACTO: 'Contacto',
    DIRECCION: 'Dirección',
    TELEFONO: 'Teléfono',
    EMAIL: 'Correo electrónico',
  },

  en: {
    EYEBROW: 'Your professional space',
    TITULO: 'My company',
    INTRO:
      'View your company, services and working hours.',
    CARGANDO: 'Loading your information…',
    ERROR:
      'Your information could not be loaded. Please try again.',
    SIN_EMPRESA_TITULO: 'You do not have a linked company yet',
    SIN_EMPRESA_TEXTO:
      'Once your company association is complete, your company, services and working hours will appear here.',
    MI_FICHA: 'My professional profile',
    SERVICIOS: 'My services',
    SIN_SERVICIOS: 'You have no assigned services yet.',
    DURACION: '{{minutos}} min',
    HORARIO: 'My working hours',
    HORARIO_TEXTO:
      'Effective working hours based on your shifts and company opening hours. These are not available booking slots.',
    ANTERIOR: 'Previous',
    ACTUAL: 'Current week',
    SIGUIENTE: 'Next',
    ANTERIOR_ARIA: 'View the previous week',
    SIGUIENTE_ARIA: 'View the next week',
    SIN_TURNO: 'No effective working hours',
    ASIGNADO: 'Assigned',
    CONTACTO: 'Contact',
    DIRECCION: 'Address',
    TELEFONO: 'Phone',
    EMAIL: 'Email',
  },

  fr: {
    EYEBROW: 'Votre espace professionnel',
    TITULO: 'Mon entreprise',
    INTRO:
      'Consultez votre entreprise, vos services et vos horaires de travail.',
    CARGANDO: 'Chargement de vos informations…',
    ERROR:
      'Impossible de charger les informations. Veuillez réessayer.',
    SIN_EMPRESA_TITULO: 'Aucune entreprise ne vous est encore associée',
    SIN_EMPRESA_TEXTO:
      'Une fois votre rattachement effectué, votre entreprise, vos services et vos horaires apparaîtront ici.',
    MI_FICHA: 'Mon profil professionnel',
    SERVICIOS: 'Mes services',
    SIN_SERVICIOS: 'Aucun service ne vous est encore attribué.',
    DURACION: '{{minutos}} min',
    HORARIO: 'Mes horaires',
    HORARIO_TEXTO:
      'Horaires effectifs selon vos plages de travail et les heures d’ouverture de l’entreprise. Il ne s’agit pas des créneaux disponibles à la réservation.',
    ANTERIOR: 'Précédente',
    ACTUAL: 'Semaine actuelle',
    SIGUIENTE: 'Suivante',
    ANTERIOR_ARIA: 'Voir la semaine précédente',
    SIGUIENTE_ARIA: 'Voir la semaine suivante',
    SIN_TURNO: 'Aucun horaire effectif',
    ASIGNADO: 'Attribué',
    CONTACTO: 'Contact',
    DIRECCION: 'Adresse',
    TELEFONO: 'Téléphone',
    EMAIL: 'E-mail',
  },

  de: {
    EYEBROW: 'Ihr beruflicher Bereich',
    TITULO: 'Mein Unternehmen',
    INTRO:
      'Sehen Sie Ihr Unternehmen, Ihre Dienstleistungen und Arbeitszeiten ein.',
    CARGANDO: 'Ihre Informationen werden geladen…',
    ERROR:
      'Die Informationen konnten nicht geladen werden. Bitte versuchen Sie es erneut.',
    SIN_EMPRESA_TITULO: 'Ihnen ist noch kein Unternehmen zugeordnet',
    SIN_EMPRESA_TEXTO:
      'Nach der Zuordnung werden hier Ihr Unternehmen, Ihre Dienstleistungen und Arbeitszeiten angezeigt.',
    MI_FICHA: 'Mein berufliches Profil',
    SERVICIOS: 'Meine Dienstleistungen',
    SIN_SERVICIOS: 'Ihnen sind noch keine Dienstleistungen zugewiesen.',
    DURACION: '{{minutos}} Min.',
    HORARIO: 'Meine Arbeitszeiten',
    HORARIO_TEXTO:
      'Effektive Arbeitszeiten anhand Ihrer Schichten und der Öffnungszeiten des Unternehmens. Dies sind keine freien Buchungstermine.',
    ANTERIOR: 'Zurück',
    ACTUAL: 'Aktuelle Woche',
    SIGUIENTE: 'Weiter',
    ANTERIOR_ARIA: 'Vorherige Woche anzeigen',
    SIGUIENTE_ARIA: 'Nächste Woche anzeigen',
    SIN_TURNO: 'Keine effektive Arbeitszeit',
    ASIGNADO: 'Zugewiesen',
    CONTACTO: 'Kontakt',
    DIRECCION: 'Adresse',
    TELEFONO: 'Telefon',
    EMAIL: 'E-Mail',
  },

  ru: {
    EYEBROW: 'Ваш рабочий раздел',
    TITULO: 'Моя компания',
    INTRO:
      'Просматривайте информацию о компании, своих услугах и рабочем графике.',
    CARGANDO: 'Загрузка информации…',
    ERROR:
      'Не удалось загрузить информацию. Попробуйте ещё раз.',
    SIN_EMPRESA_TITULO: 'Вы пока не связаны с компанией',
    SIN_EMPRESA_TEXTO:
      'После привязки здесь появятся ваша компания, услуги и рабочий график.',
    MI_FICHA: 'Мой профессиональный профиль',
    SERVICIOS: 'Мои услуги',
    SIN_SERVICIOS: 'Вам пока не назначены услуги.',
    DURACION: '{{minutos}} мин',
    HORARIO: 'Мой график',
    HORARIO_TEXTO:
      'Фактические рабочие часы с учётом ваших смен и часов работы компании. Это не свободные интервалы для записи.',
    ANTERIOR: 'Назад',
    ACTUAL: 'Текущая неделя',
    SIGUIENTE: 'Вперёд',
    ANTERIOR_ARIA: 'Посмотреть предыдущую неделю',
    SIGUIENTE_ARIA: 'Посмотреть следующую неделю',
    SIN_TURNO: 'Нет рабочих часов',
    ASIGNADO: 'Назначено',
    CONTACTO: 'Контакты',
    DIRECCION: 'Адрес',
    TELEFONO: 'Телефон',
    EMAIL: 'Электронная почта',
  },

  uk: {
    EYEBROW: 'Ваш робочий розділ',
    TITULO: 'Моя компанія',
    INTRO:
      'Переглядайте інформацію про компанію, свої послуги та робочий графік.',
    CARGANDO: 'Завантаження інформації…',
    ERROR:
      'Не вдалося завантажити інформацію. Спробуйте ще раз.',
    SIN_EMPRESA_TITULO: 'Ви ще не пов’язані з компанією',
    SIN_EMPRESA_TEXTO:
      'Після прив’язки тут з’являться ваша компанія, послуги та робочий графік.',
    MI_FICHA: 'Мій професійний профіль',
    SERVICIOS: 'Мої послуги',
    SIN_SERVICIOS: 'Вам ще не призначено послуг.',
    DURACION: '{{minutos}} хв',
    HORARIO: 'Мій графік',
    HORARIO_TEXTO:
      'Фактичні робочі години з урахуванням ваших змін і годин роботи компанії. Це не вільні проміжки для запису.',
    ANTERIOR: 'Назад',
    ACTUAL: 'Поточний тиждень',
    SIGUIENTE: 'Далі',
    ANTERIOR_ARIA: 'Переглянути попередній тиждень',
    SIGUIENTE_ARIA: 'Переглянути наступний тиждень',
    SIN_TURNO: 'Немає робочих годин',
    ASIGNADO: 'Призначено',
    CONTACTO: 'Контакти',
    DIRECCION: 'Адреса',
    TELEFONO: 'Телефон',
    EMAIL: 'Електронна пошта',
  },
};
