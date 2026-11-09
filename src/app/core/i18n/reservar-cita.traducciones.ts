import { IdiomaApp } from './traducciones';

const es = {
  VOLVER: 'Volver a la empresa',
  CARGANDO: 'Cargando opciones de reserva…',
  EYEBROW: 'Reserva en OtClick',
  INTRO: 'Selecciona un servicio, un profesional y una hora disponible.',

  PASO: 'Paso {{numero}}',
  SERVICIO: 'Servicio',
  PROFESIONAL: 'Profesional',
  PROFESIONAL_EMPRESA: 'Profesional de la empresa',

  SIN_SERVICIOS_TITULO: 'No hay servicios para esta selección',
  SIN_SERVICIOS_TEXTO:
    'Esta empresa todavía no ha publicado servicios disponibles para el profesional seleccionado.',

  SIN_PROFESIONALES_TITULO: 'No hay profesionales disponibles',
  SIN_PROFESIONALES_TEXTO:
    'No hay profesionales asociados al servicio seleccionado.',

  DURACION_VALOR: '{{minutos}} min',

  FECHAS_HORAS: 'Fechas y horas disponibles',
  CALENDARIO_AYUDA:
    'Los días marcados en azul tienen al menos una hora libre.',
  MES_ANTERIOR: 'Mes anterior',
  MES_SIGUIENTE: 'Mes siguiente',
  BUSCANDO_DIAS: 'Buscando días con disponibilidad…',

  DIA_DISPONIBLE: '{{fecha}}, hay horas disponibles',
  DIA_SIN_DISPONIBILIDAD: '{{fecha}}, sin horas disponibles',
  HORAS_DISPONIBLES: 'Horas disponibles: {{cantidad}}',
  BUSCANDO_HORAS: 'Buscando horas libres…',

  SIN_FECHAS_TITULO: 'No encontramos fechas con horas libres',
  SIN_FECHAS_TEXTO:
    'Prueba otro profesional o vuelve a consultar más adelante.',
  DIA_OCUPADO_TITULO: 'Ese día se ha ocupado',
  DIA_OCUPADO_TEXTO: 'Selecciona otro día marcado en azul.',

  RESUMEN: 'Resumen',
  SOLICITUD: 'Tu solicitud',
  EMPRESA: 'Empresa',
  FECHA: 'Fecha',
  HORA: 'Hora',
  DURACION: 'Duración',
  PRECIO: 'Precio',

  NOTAS: 'Notas para la empresa',
  OPCIONAL: 'Opcional',
  NOTAS_AYUDA: 'La nota se enviará junto con la solicitud de cita.',

  ENVIANDO: 'Enviando solicitud…',
  SOLICITAR: 'Solicitar cita',
  ENVIADA_BOTON: 'Solicitud enviada',
  PENDIENTE_AYUDA:
    'La cita quedará pendiente hasta que la empresa la confirme.',
  EXITO: 'Solicitud enviada. La empresa debe confirmarla.',

  ERROR_SIN_EMPRESA: 'No se ha indicado ninguna empresa.',
  ERROR_DATOS: 'No hemos podido cargar los datos de reserva.',
  ERROR_HORAS: 'No hemos podido cargar las horas disponibles.',
  ERROR_SELECCION_HORA: 'Selecciona una hora disponible.',
  ERROR_CREAR: 'No hemos podido crear la reserva. Inténtalo de nuevo.',
  ERROR_CONEXION: 'No hay conexión con el servidor. Inténtalo de nuevo.',
  ERROR_SESION: 'Tu sesión ha caducado. Vuelve a iniciar sesión.',
  ERROR_PERMISO: 'No tienes permiso para realizar esta reserva.',
  ERROR_CONFLICTO:
    'La disponibilidad ha cambiado. Vuelve a consultar las horas antes de reservar.',
};

type DiccionarioReserva = Record<keyof typeof es, string>;

export const RESERVAR_CITA_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioReserva
> = {
  es,

  en: {
    VOLVER: 'Back to the business',
    CARGANDO: 'Loading booking options…',
    EYEBROW: 'Book on OtClick',
    INTRO: 'Select a service, a professional and an available time.',

    PASO: 'Step {{numero}}',
    SERVICIO: 'Service',
    PROFESIONAL: 'Professional',
    PROFESIONAL_EMPRESA: 'Business professional',

    SIN_SERVICIOS_TITULO: 'No services for this selection',
    SIN_SERVICIOS_TEXTO:
      'This business has not published any available services for the selected professional yet.',

    SIN_PROFESIONALES_TITULO: 'No professionals available',
    SIN_PROFESIONALES_TEXTO:
      'No professionals are assigned to the selected service.',

    DURACION_VALOR: '{{minutos}} min',

    FECHAS_HORAS: 'Available dates and times',
    CALENDARIO_AYUDA:
      'Days highlighted in blue have at least one available time.',
    MES_ANTERIOR: 'Previous month',
    MES_SIGUIENTE: 'Next month',
    BUSCANDO_DIAS: 'Looking for available dates…',

    DIA_DISPONIBLE: '{{fecha}}, times available',
    DIA_SIN_DISPONIBILIDAD: '{{fecha}}, no times available',
    HORAS_DISPONIBLES: 'Available times: {{cantidad}}',
    BUSCANDO_HORAS: 'Looking for available times…',

    SIN_FECHAS_TITULO: 'No available dates found',
    SIN_FECHAS_TEXTO:
      'Try another professional or check again later.',
    DIA_OCUPADO_TITULO: 'That day is now fully booked',
    DIA_OCUPADO_TEXTO: 'Select another day highlighted in blue.',

    RESUMEN: 'Summary',
    SOLICITUD: 'Your request',
    EMPRESA: 'Business',
    FECHA: 'Date',
    HORA: 'Time',
    DURACION: 'Duration',
    PRECIO: 'Price',

    NOTAS: 'Notes for the business',
    OPCIONAL: 'Optional',
    NOTAS_AYUDA: 'Your note will be sent with the appointment request.',

    ENVIANDO: 'Sending request…',
    SOLICITAR: 'Request appointment',
    ENVIADA_BOTON: 'Request sent',
    PENDIENTE_AYUDA:
      'The appointment will remain pending until the business confirms it.',
    EXITO: 'Request sent. The business needs to confirm it.',

    ERROR_SIN_EMPRESA: 'No business was specified.',
    ERROR_DATOS: 'We could not load the booking details.',
    ERROR_HORAS: 'We could not load the available times.',
    ERROR_SELECCION_HORA: 'Select an available time.',
    ERROR_CREAR: 'We could not create the booking. Please try again.',
    ERROR_CONEXION: 'Cannot connect to the server. Please try again.',
    ERROR_SESION: 'Your session has expired. Please sign in again.',
    ERROR_PERMISO: 'You do not have permission to make this booking.',
    ERROR_CONFLICTO:
      'Availability has changed. Check the available times again before booking.',
  },

  fr: {
    VOLVER: 'Retour à l’entreprise',
    CARGANDO: 'Chargement des options de réservation…',
    EYEBROW: 'Réservez sur OtClick',
    INTRO: 'Sélectionnez un service, un professionnel et un horaire disponible.',

    PASO: 'Étape {{numero}}',
    SERVICIO: 'Service',
    PROFESIONAL: 'Professionnel',
    PROFESIONAL_EMPRESA: 'Professionnel de l’entreprise',

    SIN_SERVICIOS_TITULO: 'Aucun service pour cette sélection',
    SIN_SERVICIOS_TEXTO:
      'Cette entreprise n’a pas encore publié de services disponibles pour le professionnel sélectionné.',

    SIN_PROFESIONALES_TITULO: 'Aucun professionnel disponible',
    SIN_PROFESIONALES_TEXTO:
      'Aucun professionnel n’est associé au service sélectionné.',

    DURACION_VALOR: '{{minutos}} min',

    FECHAS_HORAS: 'Dates et horaires disponibles',
    CALENDARIO_AYUDA:
      'Les jours en bleu proposent au moins un horaire disponible.',
    MES_ANTERIOR: 'Mois précédent',
    MES_SIGUIENTE: 'Mois suivant',
    BUSCANDO_DIAS: 'Recherche de dates disponibles…',

    DIA_DISPONIBLE: '{{fecha}}, horaires disponibles',
    DIA_SIN_DISPONIBILIDAD: '{{fecha}}, aucun horaire disponible',
    HORAS_DISPONIBLES: 'Horaires disponibles : {{cantidad}}',
    BUSCANDO_HORAS: 'Recherche d’horaires disponibles…',

    SIN_FECHAS_TITULO: 'Aucune date disponible trouvée',
    SIN_FECHAS_TEXTO:
      'Essayez un autre professionnel ou consultez à nouveau plus tard.',
    DIA_OCUPADO_TITULO: 'Cette journée est désormais complète',
    DIA_OCUPADO_TEXTO: 'Sélectionnez un autre jour en bleu.',

    RESUMEN: 'Récapitulatif',
    SOLICITUD: 'Votre demande',
    EMPRESA: 'Entreprise',
    FECHA: 'Date',
    HORA: 'Heure',
    DURACION: 'Durée',
    PRECIO: 'Prix',

    NOTAS: 'Notes pour l’entreprise',
    OPCIONAL: 'Facultatif',
    NOTAS_AYUDA: 'La note sera envoyée avec la demande de rendez-vous.',

    ENVIANDO: 'Envoi de la demande…',
    SOLICITAR: 'Demander un rendez-vous',
    ENVIADA_BOTON: 'Demande envoyée',
    PENDIENTE_AYUDA:
      'Le rendez-vous restera en attente jusqu’à sa confirmation par l’entreprise.',
    EXITO: 'Demande envoyée. L’entreprise doit la confirmer.',

    ERROR_SIN_EMPRESA: 'Aucune entreprise n’a été indiquée.',
    ERROR_DATOS: 'Impossible de charger les informations de réservation.',
    ERROR_HORAS: 'Impossible de charger les horaires disponibles.',
    ERROR_SELECCION_HORA: 'Sélectionnez un horaire disponible.',
    ERROR_CREAR: 'Impossible de créer la réservation. Veuillez réessayer.',
    ERROR_CONEXION: 'Connexion au serveur impossible. Veuillez réessayer.',
    ERROR_SESION: 'Votre session a expiré. Veuillez vous reconnecter.',
    ERROR_PERMISO: 'Vous n’avez pas l’autorisation d’effectuer cette réservation.',
    ERROR_CONFLICTO:
      'Les disponibilités ont changé. Consultez à nouveau les horaires avant de réserver.',
  },

  de: {
    VOLVER: 'Zurück zum Unternehmen',
    CARGANDO: 'Buchungsoptionen werden geladen…',
    EYEBROW: 'Auf OtClick buchen',
    INTRO: 'Wähle eine Dienstleistung, eine Fachkraft und eine verfügbare Uhrzeit.',

    PASO: 'Schritt {{numero}}',
    SERVICIO: 'Dienstleistung',
    PROFESIONAL: 'Fachkraft',
    PROFESIONAL_EMPRESA: 'Fachkraft des Unternehmens',

    SIN_SERVICIOS_TITULO: 'Keine Dienstleistungen für diese Auswahl',
    SIN_SERVICIOS_TEXTO:
      'Dieses Unternehmen hat noch keine verfügbaren Dienstleistungen für die ausgewählte Fachkraft veröffentlicht.',

    SIN_PROFESIONALES_TITULO: 'Keine Fachkräfte verfügbar',
    SIN_PROFESIONALES_TEXTO:
      'Der ausgewählten Dienstleistung sind keine Fachkräfte zugeordnet.',

    DURACION_VALOR: '{{minutos}} Min.',

    FECHAS_HORAS: 'Verfügbare Tage und Uhrzeiten',
    CALENDARIO_AYUDA:
      'Blau markierte Tage haben mindestens eine freie Uhrzeit.',
    MES_ANTERIOR: 'Vorheriger Monat',
    MES_SIGUIENTE: 'Nächster Monat',
    BUSCANDO_DIAS: 'Verfügbare Tage werden gesucht…',

    DIA_DISPONIBLE: '{{fecha}}, Uhrzeiten verfügbar',
    DIA_SIN_DISPONIBILIDAD: '{{fecha}}, keine Uhrzeiten verfügbar',
    HORAS_DISPONIBLES: 'Verfügbare Uhrzeiten: {{cantidad}}',
    BUSCANDO_HORAS: 'Freie Uhrzeiten werden gesucht…',

    SIN_FECHAS_TITULO: 'Keine verfügbaren Tage gefunden',
    SIN_FECHAS_TEXTO:
      'Wähle eine andere Fachkraft oder versuche es später erneut.',
    DIA_OCUPADO_TITULO: 'Dieser Tag ist inzwischen ausgebucht',
    DIA_OCUPADO_TEXTO: 'Wähle einen anderen blau markierten Tag.',

    RESUMEN: 'Zusammenfassung',
    SOLICITUD: 'Deine Anfrage',
    EMPRESA: 'Unternehmen',
    FECHA: 'Datum',
    HORA: 'Uhrzeit',
    DURACION: 'Dauer',
    PRECIO: 'Preis',

    NOTAS: 'Notizen für das Unternehmen',
    OPCIONAL: 'Optional',
    NOTAS_AYUDA: 'Die Notiz wird mit der Terminanfrage gesendet.',

    ENVIANDO: 'Anfrage wird gesendet…',
    SOLICITAR: 'Termin anfragen',
    ENVIADA_BOTON: 'Anfrage gesendet',
    PENDIENTE_AYUDA:
      'Der Termin bleibt ausstehend, bis das Unternehmen ihn bestätigt.',
    EXITO: 'Anfrage gesendet. Das Unternehmen muss sie bestätigen.',

    ERROR_SIN_EMPRESA: 'Es wurde kein Unternehmen angegeben.',
    ERROR_DATOS: 'Die Buchungsdaten konnten nicht geladen werden.',
    ERROR_HORAS: 'Die verfügbaren Uhrzeiten konnten nicht geladen werden.',
    ERROR_SELECCION_HORA: 'Wähle eine verfügbare Uhrzeit.',
    ERROR_CREAR: 'Die Buchung konnte nicht erstellt werden. Bitte versuche es erneut.',
    ERROR_CONEXION: 'Keine Verbindung zum Server. Bitte versuche es erneut.',
    ERROR_SESION: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
    ERROR_PERMISO: 'Du darfst diese Buchung nicht vornehmen.',
    ERROR_CONFLICTO:
      'Die Verfügbarkeit hat sich geändert. Prüfe vor der Buchung erneut die freien Uhrzeiten.',
  },

  ru: {
    VOLVER: 'Назад к компании',
    CARGANDO: 'Загрузка вариантов записи…',
    EYEBROW: 'Запись в OtClick',
    INTRO: 'Выберите услугу, специалиста и свободное время.',

    PASO: 'Шаг {{numero}}',
    SERVICIO: 'Услуга',
    PROFESIONAL: 'Специалист',
    PROFESIONAL_EMPRESA: 'Специалист компании',

    SIN_SERVICIOS_TITULO: 'Нет услуг для выбранных параметров',
    SIN_SERVICIOS_TEXTO:
      'Эта компания пока не опубликовала доступные услуги для выбранного специалиста.',

    SIN_PROFESIONALES_TITULO: 'Нет доступных специалистов',
    SIN_PROFESIONALES_TEXTO:
      'Для выбранной услуги не назначены специалисты.',

    DURACION_VALOR: '{{minutos}} мин',

    FECHAS_HORAS: 'Доступные даты и время',
    CALENDARIO_AYUDA:
      'В дни, отмеченные синим, есть хотя бы одно свободное время.',
    MES_ANTERIOR: 'Предыдущий месяц',
    MES_SIGUIENTE: 'Следующий месяц',
    BUSCANDO_DIAS: 'Поиск доступных дат…',

    DIA_DISPONIBLE: '{{fecha}}, есть свободное время',
    DIA_SIN_DISPONIBILIDAD: '{{fecha}}, нет свободного времени',
    HORAS_DISPONIBLES: 'Свободные интервалы: {{cantidad}}',
    BUSCANDO_HORAS: 'Поиск свободного времени…',

    SIN_FECHAS_TITULO: 'Не найдены даты со свободным временем',
    SIN_FECHAS_TEXTO:
      'Выберите другого специалиста или проверьте позже.',
    DIA_OCUPADO_TITULO: 'Этот день уже полностью занят',
    DIA_OCUPADO_TEXTO: 'Выберите другой день, отмеченный синим.',

    RESUMEN: 'Сводка',
    SOLICITUD: 'Ваш запрос',
    EMPRESA: 'Компания',
    FECHA: 'Дата',
    HORA: 'Время',
    DURACION: 'Длительность',
    PRECIO: 'Цена',

    NOTAS: 'Примечания для компании',
    OPCIONAL: 'Необязательно',
    NOTAS_AYUDA: 'Примечание будет отправлено вместе с запросом на запись.',

    ENVIANDO: 'Отправка запроса…',
    SOLICITAR: 'Отправить запрос на запись',
    ENVIADA_BOTON: 'Запрос отправлен',
    PENDIENTE_AYUDA:
      'Запись будет ожидать подтверждения компании.',
    EXITO: 'Запрос отправлен. Компания должна его подтвердить.',

    ERROR_SIN_EMPRESA: 'Компания не указана.',
    ERROR_DATOS: 'Не удалось загрузить данные для записи.',
    ERROR_HORAS: 'Не удалось загрузить свободное время.',
    ERROR_SELECCION_HORA: 'Выберите свободное время.',
    ERROR_CREAR: 'Не удалось создать запись. Попробуйте ещё раз.',
    ERROR_CONEXION: 'Нет соединения с сервером. Попробуйте ещё раз.',
    ERROR_SESION: 'Срок действия сеанса истёк. Войдите снова.',
    ERROR_PERMISO: 'У вас нет разрешения создать эту запись.',
    ERROR_CONFLICTO:
      'Доступность изменилась. Проверьте свободное время ещё раз перед записью.',
  },

  uk: {
    VOLVER: 'Назад до компанії',
    CARGANDO: 'Завантаження варіантів запису…',
    EYEBROW: 'Запис в OtClick',
    INTRO: 'Виберіть послугу, фахівця та вільний час.',

    PASO: 'Крок {{numero}}',
    SERVICIO: 'Послуга',
    PROFESIONAL: 'Фахівець',
    PROFESIONAL_EMPRESA: 'Фахівець компанії',

    SIN_SERVICIOS_TITULO: 'Немає послуг для вибраних параметрів',
    SIN_SERVICIOS_TEXTO:
      'Ця компанія ще не опублікувала доступні послуги для вибраного фахівця.',

    SIN_PROFESIONALES_TITULO: 'Немає доступних фахівців',
    SIN_PROFESIONALES_TEXTO:
      'Для вибраної послуги не призначено фахівців.',

    DURACION_VALOR: '{{minutos}} хв',

    FECHAS_HORAS: 'Доступні дати й час',
    CALENDARIO_AYUDA:
      'У дні, позначені синім, є щонайменше один вільний час.',
    MES_ANTERIOR: 'Попередній місяць',
    MES_SIGUIENTE: 'Наступний місяць',
    BUSCANDO_DIAS: 'Пошук доступних дат…',

    DIA_DISPONIBLE: '{{fecha}}, є вільний час',
    DIA_SIN_DISPONIBILIDAD: '{{fecha}}, немає вільного часу',
    HORAS_DISPONIBLES: 'Вільні інтервали: {{cantidad}}',
    BUSCANDO_HORAS: 'Пошук вільного часу…',

    SIN_FECHAS_TITULO: 'Не знайдено дат із вільним часом',
    SIN_FECHAS_TEXTO:
      'Виберіть іншого фахівця або перевірте пізніше.',
    DIA_OCUPADO_TITULO: 'Цей день уже повністю зайнятий',
    DIA_OCUPADO_TEXTO: 'Виберіть інший день, позначений синім.',

    RESUMEN: 'Підсумок',
    SOLICITUD: 'Ваш запит',
    EMPRESA: 'Компанія',
    FECHA: 'Дата',
    HORA: 'Час',
    DURACION: 'Тривалість',
    PRECIO: 'Ціна',

    NOTAS: 'Примітки для компанії',
    OPCIONAL: 'Необов’язково',
    NOTAS_AYUDA: 'Примітку буде надіслано разом із запитом на запис.',

    ENVIANDO: 'Надсилання запиту…',
    SOLICITAR: 'Надіслати запит на запис',
    ENVIADA_BOTON: 'Запит надіслано',
    PENDIENTE_AYUDA:
      'Запис очікуватиме на підтвердження компанії.',
    EXITO: 'Запит надіслано. Компанія має його підтвердити.',

    ERROR_SIN_EMPRESA: 'Компанію не вказано.',
    ERROR_DATOS: 'Не вдалося завантажити дані для запису.',
    ERROR_HORAS: 'Не вдалося завантажити вільний час.',
    ERROR_SELECCION_HORA: 'Виберіть вільний час.',
    ERROR_CREAR: 'Не вдалося створити запис. Спробуйте ще раз.',
    ERROR_CONEXION: 'Немає з’єднання із сервером. Спробуйте ще раз.',
    ERROR_SESION: 'Термін дії сеансу минув. Увійдіть знову.',
    ERROR_PERMISO: 'У вас немає дозволу створити цей запис.',
    ERROR_CONFLICTO:
      'Доступність змінилася. Перевірте вільний час ще раз перед записом.',
  },
};
