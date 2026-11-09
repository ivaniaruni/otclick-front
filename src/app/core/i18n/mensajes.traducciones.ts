import { IdiomaApp } from './traducciones';

const es = {
  EYEBROW: 'Tus conversaciones',
  TITULO: 'Mensajes',
  INTRO: 'Consulta tus citas y habla con las empresas desde aquí.',

  CONVERSACIONES: 'Conversaciones',
  CONVERSACION: 'Conversación',
  ABRIR_CONVERSACION: 'Abrir conversación con {{nombre}}',
  CONVERSACION_EMPRESA: 'Conversación con la empresa',
  CONVERSACION_INICIADA: 'Conversación iniciada',

  REINTENTAR: 'Reintentar',
  CARGANDO_CONVERSACIONES: 'Cargando conversaciones…',
  VACIO_TITULO: 'Tus conversaciones empiezan aquí',
  VACIO_TEXTO:
    'Al solicitar una cita, tendrás un chat con la empresa para hablar de los detalles.',

  VOLVER_CONVERSACIONES: 'Volver a conversaciones',
  CARGANDO_MENSAJES: 'Cargando mensajes…',
  ACTUALIZAR_MENSAJES: 'Actualizar mensajes',
  HISTORIAL: 'Historial de mensajes',
  VER_ANTERIORES: 'Ver mensajes anteriores',
  SIN_MENSAJES: 'Todavía no hay mensajes en esta conversación.',

  SOLICITUD: 'Solicitud de cita',
  SERVICIO: 'Servicio',
  MOTIVO_CANCELACION: 'Motivo de cancelación',
  ACEPTAR: 'Aceptar cita',
  RECHAZAR: 'Rechazar',

  ESTADO_PENDING: 'Pendiente de respuesta',
  ESTADO_CONFIRMED: 'Cita aceptada',
  ESTADO_CANCELLED: 'Cita cancelada',
  ESTADO_COMPLETED: 'Cita completada',
  ESTADO_NO_SHOW: 'No asistió',
  ESTADO_REJECTED: 'Solicitud rechazada',

  RECHAZAR_TITULO: 'Rechazar solicitud',
  RECHAZAR_TEXTO:
    'Puedes indicar un motivo para que el cliente sepa qué ha ocurrido.',
  MOTIVO_OPCIONAL: 'Motivo opcional',
  VOLVER: 'Volver',

  ESCRIBIR: 'Escribe un mensaje',
  ESCRIBIR_PLACEHOLDER: 'Escribe un mensaje…',
  ENVIANDO: 'Enviando mensaje',
  ENVIAR: 'Enviar mensaje',

  ERROR_CONEXION: 'No hay conexión con el servidor.',
  ERROR_SESION: 'Tu sesión ha caducado. Vuelve a iniciar sesión.',
  ERROR_PERMISO: 'No tienes permiso para realizar esta operación en la conversación.',
  ERROR_NO_DISPONIBLE: 'La conversación o la reserva ya no está disponible.',
  ERROR_CONFLICTO:
    'La reserva ha cambiado y no se ha podido completar la operación. Actualiza los mensajes.',
  ERROR_VALIDACION:
    'No se ha podido completar la operación. Revisa los datos e inténtalo de nuevo.',
  ERROR_GENERICO:
    'No se ha podido completar la operación. Inténtalo de nuevo.',
};

type DiccionarioMensajes = Record<keyof typeof es, string>;

export const MENSAJES_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioMensajes
> = {
  es,

  en: {
    EYEBROW: 'Your conversations',
    TITULO: 'Messages',
    INTRO: 'View your appointments and chat with businesses here.',

    CONVERSACIONES: 'Conversations',
    CONVERSACION: 'Conversation',
    ABRIR_CONVERSACION: 'Open conversation with {{nombre}}',
    CONVERSACION_EMPRESA: 'Conversation with the business',
    CONVERSACION_INICIADA: 'Conversation started',

    REINTENTAR: 'Try again',
    CARGANDO_CONVERSACIONES: 'Loading conversations…',
    VACIO_TITULO: 'Your conversations start here',
    VACIO_TEXTO:
      'When you request an appointment, you will have a chat with the business to discuss the details.',

    VOLVER_CONVERSACIONES: 'Back to conversations',
    CARGANDO_MENSAJES: 'Loading messages…',
    ACTUALIZAR_MENSAJES: 'Refresh messages',
    HISTORIAL: 'Message history',
    VER_ANTERIORES: 'View older messages',
    SIN_MENSAJES: 'There are no messages in this conversation yet.',

    SOLICITUD: 'Appointment request',
    SERVICIO: 'Service',
    MOTIVO_CANCELACION: 'Reason for cancellation',
    ACEPTAR: 'Accept appointment',
    RECHAZAR: 'Reject',

    ESTADO_PENDING: 'Awaiting response',
    ESTADO_CONFIRMED: 'Appointment accepted',
    ESTADO_CANCELLED: 'Appointment cancelled',
    ESTADO_COMPLETED: 'Appointment completed',
    ESTADO_NO_SHOW: 'Did not attend',
    ESTADO_REJECTED: 'Request rejected',

    RECHAZAR_TITULO: 'Reject request',
    RECHAZAR_TEXTO:
      'You can provide a reason to let the customer know what happened.',
    MOTIVO_OPCIONAL: 'Optional reason',
    VOLVER: 'Go back',

    ESCRIBIR: 'Write a message',
    ESCRIBIR_PLACEHOLDER: 'Write a message…',
    ENVIANDO: 'Sending message',
    ENVIAR: 'Send message',

    ERROR_CONEXION: 'Cannot connect to the server.',
    ERROR_SESION: 'Your session has expired. Please sign in again.',
    ERROR_PERMISO: 'You do not have permission to perform this action in the conversation.',
    ERROR_NO_DISPONIBLE: 'The conversation or booking is no longer available.',
    ERROR_CONFLICTO:
      'The booking has changed and the action could not be completed. Refresh the messages.',
    ERROR_VALIDACION:
      'The action could not be completed. Check the information and try again.',
    ERROR_GENERICO:
      'The action could not be completed. Please try again.',
  },

  fr: {
    EYEBROW: 'Vos conversations',
    TITULO: 'Messages',
    INTRO: 'Consultez vos rendez-vous et discutez avec les entreprises ici.',

    CONVERSACIONES: 'Conversations',
    CONVERSACION: 'Conversation',
    ABRIR_CONVERSACION: 'Ouvrir la conversation avec {{nombre}}',
    CONVERSACION_EMPRESA: 'Conversation avec l’entreprise',
    CONVERSACION_INICIADA: 'Conversation commencée',

    REINTENTAR: 'Réessayer',
    CARGANDO_CONVERSACIONES: 'Chargement des conversations…',
    VACIO_TITULO: 'Vos conversations commencent ici',
    VACIO_TEXTO:
      'Lorsque vous demandez un rendez-vous, un chat avec l’entreprise vous permet de discuter des détails.',

    VOLVER_CONVERSACIONES: 'Retour aux conversations',
    CARGANDO_MENSAJES: 'Chargement des messages…',
    ACTUALIZAR_MENSAJES: 'Actualiser les messages',
    HISTORIAL: 'Historique des messages',
    VER_ANTERIORES: 'Voir les messages précédents',
    SIN_MENSAJES: 'Cette conversation ne contient pas encore de messages.',

    SOLICITUD: 'Demande de rendez-vous',
    SERVICIO: 'Service',
    MOTIVO_CANCELACION: 'Motif de l’annulation',
    ACEPTAR: 'Accepter le rendez-vous',
    RECHAZAR: 'Refuser',

    ESTADO_PENDING: 'En attente de réponse',
    ESTADO_CONFIRMED: 'Rendez-vous accepté',
    ESTADO_CANCELLED: 'Rendez-vous annulé',
    ESTADO_COMPLETED: 'Rendez-vous terminé',
    ESTADO_NO_SHOW: 'Absence',
    ESTADO_REJECTED: 'Demande refusée',

    RECHAZAR_TITULO: 'Refuser la demande',
    RECHAZAR_TEXTO:
      'Vous pouvez indiquer un motif pour expliquer la situation au client.',
    MOTIVO_OPCIONAL: 'Motif facultatif',
    VOLVER: 'Retour',

    ESCRIBIR: 'Écrivez un message',
    ESCRIBIR_PLACEHOLDER: 'Écrivez un message…',
    ENVIANDO: 'Envoi du message',
    ENVIAR: 'Envoyer le message',

    ERROR_CONEXION: 'Connexion au serveur impossible.',
    ERROR_SESION: 'Votre session a expiré. Veuillez vous reconnecter.',
    ERROR_PERMISO: 'Vous n’avez pas l’autorisation d’effectuer cette action dans la conversation.',
    ERROR_NO_DISPONIBLE: 'La conversation ou la réservation n’est plus disponible.',
    ERROR_CONFLICTO:
      'La réservation a changé et l’action n’a pas pu être effectuée. Actualisez les messages.',
    ERROR_VALIDACION:
      'L’action n’a pas pu être effectuée. Vérifiez les informations et réessayez.',
    ERROR_GENERICO:
      'L’action n’a pas pu être effectuée. Veuillez réessayer.',
  },

  de: {
    EYEBROW: 'Deine Unterhaltungen',
    TITULO: 'Nachrichten',
    INTRO: 'Sieh dir deine Termine an und chatte hier mit Unternehmen.',

    CONVERSACIONES: 'Unterhaltungen',
    CONVERSACION: 'Unterhaltung',
    ABRIR_CONVERSACION: 'Unterhaltung mit {{nombre}} öffnen',
    CONVERSACION_EMPRESA: 'Unterhaltung mit dem Unternehmen',
    CONVERSACION_INICIADA: 'Unterhaltung gestartet',

    REINTENTAR: 'Erneut versuchen',
    CARGANDO_CONVERSACIONES: 'Unterhaltungen werden geladen…',
    VACIO_TITULO: 'Hier beginnen deine Unterhaltungen',
    VACIO_TEXTO:
      'Wenn du einen Termin anfragst, erhältst du einen Chat mit dem Unternehmen, um die Details zu besprechen.',

    VOLVER_CONVERSACIONES: 'Zurück zu den Unterhaltungen',
    CARGANDO_MENSAJES: 'Nachrichten werden geladen…',
    ACTUALIZAR_MENSAJES: 'Nachrichten aktualisieren',
    HISTORIAL: 'Nachrichtenverlauf',
    VER_ANTERIORES: 'Ältere Nachrichten anzeigen',
    SIN_MENSAJES: 'In dieser Unterhaltung gibt es noch keine Nachrichten.',

    SOLICITUD: 'Terminanfrage',
    SERVICIO: 'Dienstleistung',
    MOTIVO_CANCELACION: 'Stornierungsgrund',
    ACEPTAR: 'Termin annehmen',
    RECHAZAR: 'Ablehnen',

    ESTADO_PENDING: 'Antwort ausstehend',
    ESTADO_CONFIRMED: 'Termin angenommen',
    ESTADO_CANCELLED: 'Termin storniert',
    ESTADO_COMPLETED: 'Termin abgeschlossen',
    ESTADO_NO_SHOW: 'Nicht erschienen',
    ESTADO_REJECTED: 'Anfrage abgelehnt',

    RECHAZAR_TITULO: 'Anfrage ablehnen',
    RECHAZAR_TEXTO:
      'Du kannst einen Grund angeben, damit der Kunde weiß, was passiert ist.',
    MOTIVO_OPCIONAL: 'Optionaler Grund',
    VOLVER: 'Zurück',

    ESCRIBIR: 'Nachricht schreiben',
    ESCRIBIR_PLACEHOLDER: 'Nachricht schreiben…',
    ENVIANDO: 'Nachricht wird gesendet',
    ENVIAR: 'Nachricht senden',

    ERROR_CONEXION: 'Keine Verbindung zum Server.',
    ERROR_SESION: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
    ERROR_PERMISO: 'Du darfst diese Aktion in der Unterhaltung nicht ausführen.',
    ERROR_NO_DISPONIBLE: 'Die Unterhaltung oder Buchung ist nicht mehr verfügbar.',
    ERROR_CONFLICTO:
      'Die Buchung wurde geändert und die Aktion konnte nicht abgeschlossen werden. Aktualisiere die Nachrichten.',
    ERROR_VALIDACION:
      'Die Aktion konnte nicht abgeschlossen werden. Prüfe die Angaben und versuche es erneut.',
    ERROR_GENERICO:
      'Die Aktion konnte nicht abgeschlossen werden. Bitte versuche es erneut.',
  },

  ru: {
    EYEBROW: 'Ваши переписки',
    TITULO: 'Сообщения',
    INTRO: 'Просматривайте свои записи и общайтесь с компаниями здесь.',

    CONVERSACIONES: 'Переписки',
    CONVERSACION: 'Переписка',
    ABRIR_CONVERSACION: 'Открыть переписку с {{nombre}}',
    CONVERSACION_EMPRESA: 'Переписка с компанией',
    CONVERSACION_INICIADA: 'Переписка начата',

    REINTENTAR: 'Повторить',
    CARGANDO_CONVERSACIONES: 'Загрузка переписок…',
    VACIO_TITULO: 'Здесь начинаются ваши переписки',
    VACIO_TEXTO:
      'После запроса записи у вас появится чат с компанией для обсуждения деталей.',

    VOLVER_CONVERSACIONES: 'Вернуться к перепискам',
    CARGANDO_MENSAJES: 'Загрузка сообщений…',
    ACTUALIZAR_MENSAJES: 'Обновить сообщения',
    HISTORIAL: 'История сообщений',
    VER_ANTERIORES: 'Показать предыдущие сообщения',
    SIN_MENSAJES: 'В этой переписке пока нет сообщений.',

    SOLICITUD: 'Запрос на запись',
    SERVICIO: 'Услуга',
    MOTIVO_CANCELACION: 'Причина отмены',
    ACEPTAR: 'Принять запись',
    RECHAZAR: 'Отклонить',

    ESTADO_PENDING: 'Ожидает ответа',
    ESTADO_CONFIRMED: 'Запись принята',
    ESTADO_CANCELLED: 'Запись отменена',
    ESTADO_COMPLETED: 'Запись завершена',
    ESTADO_NO_SHOW: 'Неявка',
    ESTADO_REJECTED: 'Запрос отклонён',

    RECHAZAR_TITULO: 'Отклонить запрос',
    RECHAZAR_TEXTO:
      'Вы можете указать причину, чтобы клиент знал, что произошло.',
    MOTIVO_OPCIONAL: 'Причина необязательна',
    VOLVER: 'Назад',

    ESCRIBIR: 'Напишите сообщение',
    ESCRIBIR_PLACEHOLDER: 'Напишите сообщение…',
    ENVIANDO: 'Отправка сообщения',
    ENVIAR: 'Отправить сообщение',

    ERROR_CONEXION: 'Нет соединения с сервером.',
    ERROR_SESION: 'Срок действия сеанса истёк. Войдите снова.',
    ERROR_PERMISO: 'У вас нет разрешения выполнить это действие в переписке.',
    ERROR_NO_DISPONIBLE: 'Переписка или запись больше недоступна.',
    ERROR_CONFLICTO:
      'Запись изменилась, и действие не удалось выполнить. Обновите сообщения.',
    ERROR_VALIDACION:
      'Не удалось выполнить действие. Проверьте данные и попробуйте ещё раз.',
    ERROR_GENERICO:
      'Не удалось выполнить действие. Попробуйте ещё раз.',
  },

  uk: {
    EYEBROW: 'Ваші листування',
    TITULO: 'Повідомлення',
    INTRO: 'Переглядайте свої записи та спілкуйтеся з компаніями тут.',

    CONVERSACIONES: 'Листування',
    CONVERSACION: 'Листування',
    ABRIR_CONVERSACION: 'Відкрити листування з {{nombre}}',
    CONVERSACION_EMPRESA: 'Листування з компанією',
    CONVERSACION_INICIADA: 'Листування розпочато',

    REINTENTAR: 'Спробувати ще раз',
    CARGANDO_CONVERSACIONES: 'Завантаження листувань…',
    VACIO_TITULO: 'Тут починаються ваші листування',
    VACIO_TEXTO:
      'Після запиту на запис у вас з’явиться чат із компанією для обговорення деталей.',

    VOLVER_CONVERSACIONES: 'Повернутися до листувань',
    CARGANDO_MENSAJES: 'Завантаження повідомлень…',
    ACTUALIZAR_MENSAJES: 'Оновити повідомлення',
    HISTORIAL: 'Історія повідомлень',
    VER_ANTERIORES: 'Показати попередні повідомлення',
    SIN_MENSAJES: 'У цьому листуванні ще немає повідомлень.',

    SOLICITUD: 'Запит на запис',
    SERVICIO: 'Послуга',
    MOTIVO_CANCELACION: 'Причина скасування',
    ACEPTAR: 'Прийняти запис',
    RECHAZAR: 'Відхилити',

    ESTADO_PENDING: 'Очікує на відповідь',
    ESTADO_CONFIRMED: 'Запис прийнято',
    ESTADO_CANCELLED: 'Запис скасовано',
    ESTADO_COMPLETED: 'Запис завершено',
    ESTADO_NO_SHOW: 'Неявка',
    ESTADO_REJECTED: 'Запит відхилено',

    RECHAZAR_TITULO: 'Відхилити запит',
    RECHAZAR_TEXTO:
      'Ви можете вказати причину, щоб клієнт знав, що сталося.',
    MOTIVO_OPCIONAL: 'Необов’язкова причина',
    VOLVER: 'Назад',

    ESCRIBIR: 'Напишіть повідомлення',
    ESCRIBIR_PLACEHOLDER: 'Напишіть повідомлення…',
    ENVIANDO: 'Надсилання повідомлення',
    ENVIAR: 'Надіслати повідомлення',

    ERROR_CONEXION: 'Немає з’єднання із сервером.',
    ERROR_SESION: 'Термін дії сеансу минув. Увійдіть знову.',
    ERROR_PERMISO: 'У вас немає дозволу виконати цю дію в листуванні.',
    ERROR_NO_DISPONIBLE: 'Листування або запис більше недоступні.',
    ERROR_CONFLICTO:
      'Запис змінився, і дію не вдалося виконати. Оновіть повідомлення.',
    ERROR_VALIDACION:
      'Не вдалося виконати дію. Перевірте дані та спробуйте ще раз.',
    ERROR_GENERICO:
      'Не вдалося виконати дію. Спробуйте ще раз.',
  },
};
