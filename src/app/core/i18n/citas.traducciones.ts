import { IdiomaApp } from './traducciones';

const es = {
  EYEBROW: 'Tu agenda',
  TITULO: 'Mis citas',
  INTRO: 'Consulta tus próximas reservas y las citas anteriores.',

  FILTRAR: 'Filtrar citas',
  PROXIMAS: 'Próximas',
  HISTORIAL: 'Historial',
  TODAS: 'Todas',

  MOSTRANDO_EMPRESA: 'Mostrando citas de',
  ESTA_EMPRESA: 'Esta empresa',
  VER_TODAS: 'Ver todas mis citas',

  EYEBROW_PROXIMAS: 'Lo que viene',
  EYEBROW_HISTORIAL: 'Citas anteriores',
  EYEBROW_TODAS: 'Tu actividad',

  TITULO_PROXIMAS: 'Próximas citas',
  TITULO_HISTORIAL: 'Historial de citas',
  TITULO_TODAS: 'Todas tus citas',
  CONTADOR: 'Resultados: {{cantidad}}',

  CARGANDO: 'Cargando tus citas…',
  ERROR_CARGAR: 'No hemos podido cargar tus citas.',
  REINTENTAR: 'Reintentar',

  VACIO_TITULO: 'Aún no tienes citas',
  VACIO_TEXTO:
    'Explora las empresas de OtClick para encontrar un servicio y reservar tu primera cita.',
  EXPLORAR: 'Explorar empresas',

  VACIO_PROXIMAS_TITULO: 'No tienes próximas citas',
  VACIO_PROXIMAS_TEXTO: 'Cuando reserves una cita, aparecerá aquí.',
  VACIO_HISTORIAL_TITULO: 'Todavía no hay citas en el historial',
  VACIO_HISTORIAL_TEXTO:
    'Las citas completadas, canceladas o anteriores aparecerán aquí.',
  VACIO_TODAS_TITULO: 'No hay citas para mostrar',
  VACIO_TODAS_TEXTO: 'Las citas que tengas aparecerán aquí.',

  SERVICIO: 'Servicio',
  SERVICIO_NO_DISPONIBLE: 'Servicio no disponible',
  EMPRESA_NO_DISPONIBLE: 'Empresa no disponible',
  TRABAJADOR: 'Te atiende {{nombre}}',

  ESTADO_PENDING: 'Pendiente',
  ESTADO_CONFIRMED: 'Confirmada',
  ESTADO_COMPLETED: 'Completada',
  ESTADO_CANCELLED: 'Cancelada',
  ESTADO_NO_SHOW: 'No asististe',
  ESTADO_REJECTED: 'Rechazada',
  ESTADO_DESCONOCIDO: 'Estado no disponible',

  FECHA_NO_DISPONIBLE: 'Fecha no disponible',
  HORA_NO_DISPONIBLE: 'Hora no disponible',

  RECORDATORIO_CANCELAR:
    'Puedes cancelar esta cita hasta {{horas}} horas antes de su inicio.',
  CANCELACION_CERRADA:
    'Ya no se puede cancelar desde la aplicación porque faltan menos de {{horas}} horas para la cita.',
  CANCELACION_AUTOMATICA:
    'Esta cita se canceló automáticamente porque pasó su horario sin confirmarse.',

  CANCELAR_CITA: 'Cancelar cita',
  CANCELANDO: 'Cancelando…',
  CANCELAR_CONFIRMACION:
    '¿Quieres cancelar esta cita? Dejará de aparecer entre tus próximas reservas.',
  MANTENER_CITA: 'Mantener cita',
  CONFIRMAR_CANCELAR: 'Sí, cancelar',

  QUITAR_TITULO: 'Quitar de Mis citas',
  QUITAR_CONFIRMACION:
    'Esta cita dejará de aparecer solo en tu listado. La empresa conservará su registro.',
  CONSERVAR_CITA: 'Conservar cita',
  QUITAR_CITA: 'Quitar cita',
  QUITANDO: 'Quitando…',

  EXITO_CANCELAR: 'La cita se ha cancelado correctamente.',
  EXITO_QUITAR: 'La cita se ha quitado de tu listado.',

  CHAT_EMPRESA: 'Hablar con {{nombre}}',
  CHAT_SIN_NOMBRE: 'Hablar con la empresa',

  COMPROBANDO_RESENA: 'Comprobando reseña…',
  ESCRIBIR_RESENA: 'Escribir reseña',
  RESENA_PUBLICADA: 'Reseña publicada',
  TU_OPINION: 'Tu opinión',
  COMO_FUE: '¿Cómo fue tu cita?',
  CERRAR_FORMULARIO: 'Cerrar formulario de reseña',
  CERRAR: 'Cerrar',
  PUNTUACION: 'Puntuación de la cita',
  ESTRELLAS: '{{valor}} de 5 estrellas',
  COMENTARIO: 'Comentario opcional',
  COMENTARIO_PLACEHOLDER: 'Cuéntanos cómo fue el servicio',
  CANCELAR: 'Cancelar',
  PUBLICANDO: 'Publicando…',
  PUBLICAR_RESENA: 'Publicar reseña',

  EXITO_RESENA:
    'Gracias. Tu reseña se ha publicado y aparecerá en la empresa.',
  ERROR_COMENTARIO:
    'El comentario no puede superar 500 caracteres.',
  ERROR_RESENA_EXISTENTE:
    'Esta cita ya tiene una reseña publicada.',

  ERROR_SESION: 'Tu sesión ha caducado. Vuelve a iniciar sesión.',
  ERROR_CONEXION: 'No hay conexión con el servidor. Inténtalo de nuevo.',
  ERROR_NO_DISPONIBLE: 'La cita ya no está disponible.',
  ERROR_PERMISO_QUITAR: 'No tienes permiso para quitar esta cita.',
  ERROR_PERMISO_CANCELAR: 'No tienes permiso para cancelar esta cita.',
  ERROR_PERMISO_RESENA: 'No tienes permiso para reseñar esta cita.',
  ERROR_CONFLICTO_QUITAR:
    'Solo puedes quitar de tu lista una cita cancelada.',
  ERROR_CONFLICTO_CANCELAR:
    'La cita ya no se puede cancelar o quedan menos de {{horas}} horas.',
  ERROR_CONFLICTO_RESENA:
    'Esta cita ya tiene una reseña o ya no se puede reseñar.',
  ERROR_QUITAR: 'No hemos podido quitar la cita. Inténtalo de nuevo.',
  ERROR_CANCELAR: 'No hemos podido cancelar la cita. Inténtalo de nuevo.',
  ERROR_RESENA: 'No hemos podido publicar tu reseña. Inténtalo de nuevo.',
  ERROR_PLAZO: 'El plazo para cancelar esta cita ha terminado.',
  ERROR_NO_CANCELABLE:
    'Esta cita ya no se puede cancelar desde la aplicación.',
};

type DiccionarioCitas = Record<keyof typeof es, string>;

export const CITAS_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioCitas
> = {
  es,

  en: {
    EYEBROW: 'Your schedule',
    TITULO: 'My appointments',
    INTRO: 'View your upcoming bookings and past appointments.',

    FILTRAR: 'Filter appointments',
    PROXIMAS: 'Upcoming',
    HISTORIAL: 'History',
    TODAS: 'All',

    MOSTRANDO_EMPRESA: 'Showing appointments with',
    ESTA_EMPRESA: 'This business',
    VER_TODAS: 'View all my appointments',

    EYEBROW_PROXIMAS: 'Coming up',
    EYEBROW_HISTORIAL: 'Past appointments',
    EYEBROW_TODAS: 'Your activity',

    TITULO_PROXIMAS: 'Upcoming appointments',
    TITULO_HISTORIAL: 'Appointment history',
    TITULO_TODAS: 'All your appointments',
    CONTADOR: 'Results: {{cantidad}}',

    CARGANDO: 'Loading your appointments…',
    ERROR_CARGAR: 'We could not load your appointments.',
    REINTENTAR: 'Try again',

    VACIO_TITULO: 'You have no appointments yet',
    VACIO_TEXTO:
      'Explore businesses on OtClick to find a service and book your first appointment.',
    EXPLORAR: 'Explore businesses',

    VACIO_PROXIMAS_TITULO: 'You have no upcoming appointments',
    VACIO_PROXIMAS_TEXTO: 'Your appointments will appear here when you book.',
    VACIO_HISTORIAL_TITULO: 'No appointments in your history yet',
    VACIO_HISTORIAL_TEXTO:
      'Completed, cancelled and past appointments will appear here.',
    VACIO_TODAS_TITULO: 'No appointments to display',
    VACIO_TODAS_TEXTO: 'Your appointments will appear here.',

    SERVICIO: 'Service',
    SERVICIO_NO_DISPONIBLE: 'Service unavailable',
    EMPRESA_NO_DISPONIBLE: 'Business unavailable',
    TRABAJADOR: 'Your service provider: {{nombre}}',

    ESTADO_PENDING: 'Pending',
    ESTADO_CONFIRMED: 'Confirmed',
    ESTADO_COMPLETED: 'Completed',
    ESTADO_CANCELLED: 'Cancelled',
    ESTADO_NO_SHOW: 'Did not attend',
    ESTADO_REJECTED: 'Rejected',
    ESTADO_DESCONOCIDO: 'Status unavailable',

    FECHA_NO_DISPONIBLE: 'Date unavailable',
    HORA_NO_DISPONIBLE: 'Time unavailable',

    RECORDATORIO_CANCELAR:
      'You can cancel this appointment up to {{horas}} hours before it starts.',
    CANCELACION_CERRADA:
      'You can no longer cancel in the app because the appointment starts in less than {{horas}} hours.',
    CANCELACION_AUTOMATICA:
      'This appointment was cancelled automatically because its scheduled time passed without confirmation.',

    CANCELAR_CITA: 'Cancel appointment',
    CANCELANDO: 'Cancelling…',
    CANCELAR_CONFIRMACION:
      'Do you want to cancel this appointment? It will no longer appear in your upcoming bookings.',
    MANTENER_CITA: 'Keep appointment',
    CONFIRMAR_CANCELAR: 'Yes, cancel',

    QUITAR_TITULO: 'Remove from My appointments',
    QUITAR_CONFIRMACION:
      'This appointment will only be removed from your list. The business will keep its record.',
    CONSERVAR_CITA: 'Keep appointment',
    QUITAR_CITA: 'Remove appointment',
    QUITANDO: 'Removing…',

    EXITO_CANCELAR: 'The appointment has been cancelled successfully.',
    EXITO_QUITAR: 'The appointment has been removed from your list.',

    CHAT_EMPRESA: 'Chat with {{nombre}}',
    CHAT_SIN_NOMBRE: 'Chat with the business',

    COMPROBANDO_RESENA: 'Checking review…',
    ESCRIBIR_RESENA: 'Write a review',
    RESENA_PUBLICADA: 'Review published',
    TU_OPINION: 'Your feedback',
    COMO_FUE: 'How was your appointment?',
    CERRAR_FORMULARIO: 'Close review form',
    CERRAR: 'Close',
    PUNTUACION: 'Appointment rating',
    ESTRELLAS: '{{valor}} out of 5 stars',
    COMENTARIO: 'Optional comment',
    COMENTARIO_PLACEHOLDER: 'Tell us about the service',
    CANCELAR: 'Cancel',
    PUBLICANDO: 'Publishing…',
    PUBLICAR_RESENA: 'Publish review',

    EXITO_RESENA:
      'Thank you. Your review has been published and will appear on the business page.',
    ERROR_COMENTARIO: 'The comment cannot exceed 500 characters.',
    ERROR_RESENA_EXISTENTE: 'This appointment already has a published review.',

    ERROR_SESION: 'Your session has expired. Please sign in again.',
    ERROR_CONEXION: 'Cannot connect to the server. Please try again.',
    ERROR_NO_DISPONIBLE: 'The appointment is no longer available.',
    ERROR_PERMISO_QUITAR: 'You do not have permission to remove this appointment.',
    ERROR_PERMISO_CANCELAR: 'You do not have permission to cancel this appointment.',
    ERROR_PERMISO_RESENA: 'You do not have permission to review this appointment.',
    ERROR_CONFLICTO_QUITAR:
      'You can only remove cancelled appointments from your list.',
    ERROR_CONFLICTO_CANCELAR:
      'The appointment can no longer be cancelled or starts in less than {{horas}} hours.',
    ERROR_CONFLICTO_RESENA:
      'This appointment already has a review or can no longer be reviewed.',
    ERROR_QUITAR: 'We could not remove the appointment. Please try again.',
    ERROR_CANCELAR: 'We could not cancel the appointment. Please try again.',
    ERROR_RESENA: 'We could not publish your review. Please try again.',
    ERROR_PLAZO: 'The cancellation deadline for this appointment has passed.',
    ERROR_NO_CANCELABLE: 'This appointment can no longer be cancelled in the app.',
  },

  fr: {
    EYEBROW: 'Votre agenda',
    TITULO: 'Mes rendez-vous',
    INTRO: 'Consultez vos prochaines réservations et vos rendez-vous passés.',

    FILTRAR: 'Filtrer les rendez-vous',
    PROXIMAS: 'À venir',
    HISTORIAL: 'Historique',
    TODAS: 'Tous',

    MOSTRANDO_EMPRESA: 'Rendez-vous avec',
    ESTA_EMPRESA: 'Cette entreprise',
    VER_TODAS: 'Voir tous mes rendez-vous',

    EYEBROW_PROXIMAS: 'À venir',
    EYEBROW_HISTORIAL: 'Rendez-vous passés',
    EYEBROW_TODAS: 'Votre activité',

    TITULO_PROXIMAS: 'Prochains rendez-vous',
    TITULO_HISTORIAL: 'Historique des rendez-vous',
    TITULO_TODAS: 'Tous vos rendez-vous',
    CONTADOR: 'Résultats : {{cantidad}}',

    CARGANDO: 'Chargement de vos rendez-vous…',
    ERROR_CARGAR: 'Impossible de charger vos rendez-vous.',
    REINTENTAR: 'Réessayer',

    VACIO_TITULO: 'Vous n’avez pas encore de rendez-vous',
    VACIO_TEXTO:
      'Explorez les entreprises sur OtClick pour trouver un service et réserver votre premier rendez-vous.',
    EXPLORAR: 'Explorer les entreprises',

    VACIO_PROXIMAS_TITULO: 'Vous n’avez aucun rendez-vous à venir',
    VACIO_PROXIMAS_TEXTO: 'Vos rendez-vous apparaîtront ici après réservation.',
    VACIO_HISTORIAL_TITULO: 'Aucun rendez-vous dans l’historique',
    VACIO_HISTORIAL_TEXTO:
      'Les rendez-vous terminés, annulés ou passés apparaîtront ici.',
    VACIO_TODAS_TITULO: 'Aucun rendez-vous à afficher',
    VACIO_TODAS_TEXTO: 'Vos rendez-vous apparaîtront ici.',

    SERVICIO: 'Service',
    SERVICIO_NO_DISPONIBLE: 'Service indisponible',
    EMPRESA_NO_DISPONIBLE: 'Entreprise indisponible',
    TRABAJADOR: 'Votre prestataire : {{nombre}}',

    ESTADO_PENDING: 'En attente',
    ESTADO_CONFIRMED: 'Confirmé',
    ESTADO_COMPLETED: 'Terminé',
    ESTADO_CANCELLED: 'Annulé',
    ESTADO_NO_SHOW: 'Absence',
    ESTADO_REJECTED: 'Refusé',
    ESTADO_DESCONOCIDO: 'Statut indisponible',

    FECHA_NO_DISPONIBLE: 'Date indisponible',
    HORA_NO_DISPONIBLE: 'Heure indisponible',

    RECORDATORIO_CANCELAR:
      'Vous pouvez annuler ce rendez-vous jusqu’à {{horas}} heures avant son début.',
    CANCELACION_CERRADA:
      'L’annulation dans l’application n’est plus possible, car le rendez-vous commence dans moins de {{horas}} heures.',
    CANCELACION_AUTOMATICA:
      'Ce rendez-vous a été annulé automatiquement, car son horaire est passé sans confirmation.',

    CANCELAR_CITA: 'Annuler le rendez-vous',
    CANCELANDO: 'Annulation…',
    CANCELAR_CONFIRMACION:
      'Voulez-vous annuler ce rendez-vous ? Il ne figurera plus parmi vos prochaines réservations.',
    MANTENER_CITA: 'Garder le rendez-vous',
    CONFIRMAR_CANCELAR: 'Oui, annuler',

    QUITAR_TITULO: 'Retirer de Mes rendez-vous',
    QUITAR_CONFIRMACION:
      'Ce rendez-vous sera retiré uniquement de votre liste. L’entreprise conservera son enregistrement.',
    CONSERVAR_CITA: 'Garder le rendez-vous',
    QUITAR_CITA: 'Retirer le rendez-vous',
    QUITANDO: 'Suppression…',

    EXITO_CANCELAR: 'Le rendez-vous a bien été annulé.',
    EXITO_QUITAR: 'Le rendez-vous a été retiré de votre liste.',

    CHAT_EMPRESA: 'Discuter avec {{nombre}}',
    CHAT_SIN_NOMBRE: 'Discuter avec l’entreprise',

    COMPROBANDO_RESENA: 'Vérification de l’avis…',
    ESCRIBIR_RESENA: 'Écrire un avis',
    RESENA_PUBLICADA: 'Avis publié',
    TU_OPINION: 'Votre avis',
    COMO_FUE: 'Comment s’est passé votre rendez-vous ?',
    CERRAR_FORMULARIO: 'Fermer le formulaire d’avis',
    CERRAR: 'Fermer',
    PUNTUACION: 'Note du rendez-vous',
    ESTRELLAS: '{{valor}} sur 5 étoiles',
    COMENTARIO: 'Commentaire facultatif',
    COMENTARIO_PLACEHOLDER: 'Décrivez votre expérience du service',
    CANCELAR: 'Annuler',
    PUBLICANDO: 'Publication…',
    PUBLICAR_RESENA: 'Publier l’avis',

    EXITO_RESENA:
      'Merci. Votre avis a été publié et apparaîtra sur la page de l’entreprise.',
    ERROR_COMENTARIO: 'Le commentaire ne peut pas dépasser 500 caractères.',
    ERROR_RESENA_EXISTENTE: 'Ce rendez-vous possède déjà un avis publié.',

    ERROR_SESION: 'Votre session a expiré. Veuillez vous reconnecter.',
    ERROR_CONEXION: 'Connexion au serveur impossible. Veuillez réessayer.',
    ERROR_NO_DISPONIBLE: 'Ce rendez-vous n’est plus disponible.',
    ERROR_PERMISO_QUITAR: 'Vous n’avez pas l’autorisation de retirer ce rendez-vous.',
    ERROR_PERMISO_CANCELAR: 'Vous n’avez pas l’autorisation d’annuler ce rendez-vous.',
    ERROR_PERMISO_RESENA: 'Vous n’avez pas l’autorisation de noter ce rendez-vous.',
    ERROR_CONFLICTO_QUITAR:
      'Vous pouvez uniquement retirer les rendez-vous annulés de votre liste.',
    ERROR_CONFLICTO_CANCELAR:
      'Ce rendez-vous ne peut plus être annulé ou commence dans moins de {{horas}} heures.',
    ERROR_CONFLICTO_RESENA:
      'Ce rendez-vous possède déjà un avis ou ne peut plus être noté.',
    ERROR_QUITAR: 'Impossible de retirer le rendez-vous. Veuillez réessayer.',
    ERROR_CANCELAR: 'Impossible d’annuler le rendez-vous. Veuillez réessayer.',
    ERROR_RESENA: 'Impossible de publier votre avis. Veuillez réessayer.',
    ERROR_PLAZO: 'Le délai d’annulation de ce rendez-vous est dépassé.',
    ERROR_NO_CANCELABLE: 'Ce rendez-vous ne peut plus être annulé dans l’application.',
  },

  de: {
    EYEBROW: 'Dein Kalender',
    TITULO: 'Meine Termine',
    INTRO: 'Sieh dir deine nächsten Buchungen und vergangenen Termine an.',

    FILTRAR: 'Termine filtern',
    PROXIMAS: 'Anstehend',
    HISTORIAL: 'Verlauf',
    TODAS: 'Alle',

    MOSTRANDO_EMPRESA: 'Termine bei',
    ESTA_EMPRESA: 'Diesem Unternehmen',
    VER_TODAS: 'Alle meine Termine anzeigen',

    EYEBROW_PROXIMAS: 'Demnächst',
    EYEBROW_HISTORIAL: 'Vergangene Termine',
    EYEBROW_TODAS: 'Deine Aktivitäten',

    TITULO_PROXIMAS: 'Anstehende Termine',
    TITULO_HISTORIAL: 'Terminverlauf',
    TITULO_TODAS: 'Alle deine Termine',
    CONTADOR: 'Ergebnisse: {{cantidad}}',

    CARGANDO: 'Deine Termine werden geladen…',
    ERROR_CARGAR: 'Deine Termine konnten nicht geladen werden.',
    REINTENTAR: 'Erneut versuchen',

    VACIO_TITULO: 'Du hast noch keine Termine',
    VACIO_TEXTO:
      'Entdecke Unternehmen auf OtClick, finde eine Dienstleistung und buche deinen ersten Termin.',
    EXPLORAR: 'Unternehmen entdecken',

    VACIO_PROXIMAS_TITULO: 'Du hast keine anstehenden Termine',
    VACIO_PROXIMAS_TEXTO: 'Deine Termine erscheinen hier nach der Buchung.',
    VACIO_HISTORIAL_TITULO: 'Noch keine Termine im Verlauf',
    VACIO_HISTORIAL_TEXTO:
      'Abgeschlossene, stornierte und vergangene Termine erscheinen hier.',
    VACIO_TODAS_TITULO: 'Keine Termine zum Anzeigen',
    VACIO_TODAS_TEXTO: 'Deine Termine erscheinen hier.',

    SERVICIO: 'Dienstleistung',
    SERVICIO_NO_DISPONIBLE: 'Dienstleistung nicht verfügbar',
    EMPRESA_NO_DISPONIBLE: 'Unternehmen nicht verfügbar',
    TRABAJADOR: 'Du wirst betreut von {{nombre}}',

    ESTADO_PENDING: 'Ausstehend',
    ESTADO_CONFIRMED: 'Bestätigt',
    ESTADO_COMPLETED: 'Abgeschlossen',
    ESTADO_CANCELLED: 'Storniert',
    ESTADO_NO_SHOW: 'Nicht erschienen',
    ESTADO_REJECTED: 'Abgelehnt',
    ESTADO_DESCONOCIDO: 'Status nicht verfügbar',

    FECHA_NO_DISPONIBLE: 'Datum nicht verfügbar',
    HORA_NO_DISPONIBLE: 'Uhrzeit nicht verfügbar',

    RECORDATORIO_CANCELAR:
      'Du kannst diesen Termin bis {{horas}} Stunden vor Beginn stornieren.',
    CANCELACION_CERRADA:
      'Eine Stornierung in der App ist nicht mehr möglich, da der Termin in weniger als {{horas}} Stunden beginnt.',
    CANCELACION_AUTOMATICA:
      'Dieser Termin wurde automatisch storniert, da die geplante Zeit ohne Bestätigung verstrichen ist.',

    CANCELAR_CITA: 'Termin stornieren',
    CANCELANDO: 'Wird storniert…',
    CANCELAR_CONFIRMACION:
      'Möchtest du diesen Termin stornieren? Er erscheint dann nicht mehr unter deinen anstehenden Buchungen.',
    MANTENER_CITA: 'Termin behalten',
    CONFIRMAR_CANCELAR: 'Ja, stornieren',

    QUITAR_TITULO: 'Aus Meine Termine entfernen',
    QUITAR_CONFIRMACION:
      'Dieser Termin wird nur aus deiner Liste entfernt. Das Unternehmen behält seinen Eintrag.',
    CONSERVAR_CITA: 'Termin behalten',
    QUITAR_CITA: 'Termin entfernen',
    QUITANDO: 'Wird entfernt…',

    EXITO_CANCELAR: 'Der Termin wurde erfolgreich storniert.',
    EXITO_QUITAR: 'Der Termin wurde aus deiner Liste entfernt.',

    CHAT_EMPRESA: 'Mit {{nombre}} chatten',
    CHAT_SIN_NOMBRE: 'Mit dem Unternehmen chatten',

    COMPROBANDO_RESENA: 'Bewertung wird geprüft…',
    ESCRIBIR_RESENA: 'Bewertung schreiben',
    RESENA_PUBLICADA: 'Bewertung veröffentlicht',
    TU_OPINION: 'Deine Meinung',
    COMO_FUE: 'Wie war dein Termin?',
    CERRAR_FORMULARIO: 'Bewertungsformular schließen',
    CERRAR: 'Schließen',
    PUNTUACION: 'Terminbewertung',
    ESTRELLAS: '{{valor}} von 5 Sternen',
    COMENTARIO: 'Optionaler Kommentar',
    COMENTARIO_PLACEHOLDER: 'Erzähle uns, wie die Dienstleistung war',
    CANCELAR: 'Abbrechen',
    PUBLICANDO: 'Wird veröffentlicht…',
    PUBLICAR_RESENA: 'Bewertung veröffentlichen',

    EXITO_RESENA:
      'Danke. Deine Bewertung wurde veröffentlicht und erscheint beim Unternehmen.',
    ERROR_COMENTARIO: 'Der Kommentar darf höchstens 500 Zeichen enthalten.',
    ERROR_RESENA_EXISTENTE: 'Für diesen Termin wurde bereits eine Bewertung veröffentlicht.',

    ERROR_SESION: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
    ERROR_CONEXION: 'Keine Verbindung zum Server. Bitte versuche es erneut.',
    ERROR_NO_DISPONIBLE: 'Dieser Termin ist nicht mehr verfügbar.',
    ERROR_PERMISO_QUITAR: 'Du darfst diesen Termin nicht entfernen.',
    ERROR_PERMISO_CANCELAR: 'Du darfst diesen Termin nicht stornieren.',
    ERROR_PERMISO_RESENA: 'Du darfst diesen Termin nicht bewerten.',
    ERROR_CONFLICTO_QUITAR:
      'Du kannst nur stornierte Termine aus deiner Liste entfernen.',
    ERROR_CONFLICTO_CANCELAR:
      'Dieser Termin kann nicht mehr storniert werden oder beginnt in weniger als {{horas}} Stunden.',
    ERROR_CONFLICTO_RESENA:
      'Dieser Termin wurde bereits bewertet oder kann nicht mehr bewertet werden.',
    ERROR_QUITAR: 'Der Termin konnte nicht entfernt werden. Bitte versuche es erneut.',
    ERROR_CANCELAR: 'Der Termin konnte nicht storniert werden. Bitte versuche es erneut.',
    ERROR_RESENA: 'Deine Bewertung konnte nicht veröffentlicht werden. Bitte versuche es erneut.',
    ERROR_PLAZO: 'Die Stornierungsfrist für diesen Termin ist abgelaufen.',
    ERROR_NO_CANCELABLE: 'Dieser Termin kann nicht mehr in der App storniert werden.',
  },

  ru: {
    EYEBROW: 'Ваше расписание',
    TITULO: 'Мои записи',
    INTRO: 'Просматривайте предстоящие и прошлые записи.',

    FILTRAR: 'Фильтр записей',
    PROXIMAS: 'Предстоящие',
    HISTORIAL: 'История',
    TODAS: 'Все',

    MOSTRANDO_EMPRESA: 'Записи в компании',
    ESTA_EMPRESA: 'Эта компания',
    VER_TODAS: 'Показать все мои записи',

    EYEBROW_PROXIMAS: 'Скоро',
    EYEBROW_HISTORIAL: 'Прошлые записи',
    EYEBROW_TODAS: 'Ваша активность',

    TITULO_PROXIMAS: 'Предстоящие записи',
    TITULO_HISTORIAL: 'История записей',
    TITULO_TODAS: 'Все ваши записи',
    CONTADOR: 'Результаты: {{cantidad}}',

    CARGANDO: 'Загрузка ваших записей…',
    ERROR_CARGAR: 'Не удалось загрузить ваши записи.',
    REINTENTAR: 'Повторить',

    VACIO_TITULO: 'У вас пока нет записей',
    VACIO_TEXTO:
      'Найдите компанию на OtClick, выберите услугу и запишитесь впервые.',
    EXPLORAR: 'Посмотреть компании',

    VACIO_PROXIMAS_TITULO: 'У вас нет предстоящих записей',
    VACIO_PROXIMAS_TEXTO: 'Ваши записи появятся здесь после бронирования.',
    VACIO_HISTORIAL_TITULO: 'История записей пока пуста',
    VACIO_HISTORIAL_TEXTO:
      'Здесь появятся завершённые, отменённые и прошлые записи.',
    VACIO_TODAS_TITULO: 'Нет записей для отображения',
    VACIO_TODAS_TEXTO: 'Здесь появятся ваши записи.',

    SERVICIO: 'Услуга',
    SERVICIO_NO_DISPONIBLE: 'Услуга недоступна',
    EMPRESA_NO_DISPONIBLE: 'Компания недоступна',
    TRABAJADOR: 'Вас обслуживает {{nombre}}',

    ESTADO_PENDING: 'Ожидает',
    ESTADO_CONFIRMED: 'Подтверждена',
    ESTADO_COMPLETED: 'Завершена',
    ESTADO_CANCELLED: 'Отменена',
    ESTADO_NO_SHOW: 'Неявка',
    ESTADO_REJECTED: 'Отклонена',
    ESTADO_DESCONOCIDO: 'Статус недоступен',

    FECHA_NO_DISPONIBLE: 'Дата недоступна',
    HORA_NO_DISPONIBLE: 'Время недоступно',

    RECORDATORIO_CANCELAR:
      'Вы можете отменить запись не позднее чем за {{horas}} ч до начала.',
    CANCELACION_CERRADA:
      'Отмена в приложении больше недоступна: до начала осталось менее {{horas}} ч.',
    CANCELACION_AUTOMATICA:
      'Эта запись была отменена автоматически, поскольку её время прошло без подтверждения.',

    CANCELAR_CITA: 'Отменить запись',
    CANCELANDO: 'Отмена…',
    CANCELAR_CONFIRMACION:
      'Хотите отменить эту запись? Она больше не будет отображаться среди предстоящих.',
    MANTENER_CITA: 'Оставить запись',
    CONFIRMAR_CANCELAR: 'Да, отменить',

    QUITAR_TITULO: 'Убрать из моих записей',
    QUITAR_CONFIRMACION:
      'Эта запись исчезнет только из вашего списка. Компания сохранит её в своих данных.',
    CONSERVAR_CITA: 'Оставить запись',
    QUITAR_CITA: 'Убрать запись',
    QUITANDO: 'Удаление…',

    EXITO_CANCELAR: 'Запись успешно отменена.',
    EXITO_QUITAR: 'Запись убрана из вашего списка.',

    CHAT_EMPRESA: 'Написать в {{nombre}}',
    CHAT_SIN_NOMBRE: 'Написать компании',

    COMPROBANDO_RESENA: 'Проверка отзыва…',
    ESCRIBIR_RESENA: 'Написать отзыв',
    RESENA_PUBLICADA: 'Отзыв опубликован',
    TU_OPINION: 'Ваше мнение',
    COMO_FUE: 'Как прошло посещение?',
    CERRAR_FORMULARIO: 'Закрыть форму отзыва',
    CERRAR: 'Закрыть',
    PUNTUACION: 'Оценка посещения',
    ESTRELLAS: '{{valor}} из 5 звёзд',
    COMENTARIO: 'Комментарий необязателен',
    COMENTARIO_PLACEHOLDER: 'Расскажите, как прошла услуга',
    CANCELAR: 'Отмена',
    PUBLICANDO: 'Публикация…',
    PUBLICAR_RESENA: 'Опубликовать отзыв',

    EXITO_RESENA:
      'Спасибо. Ваш отзыв опубликован и появится на странице компании.',
    ERROR_COMENTARIO: 'Комментарий не может превышать 500 символов.',
    ERROR_RESENA_EXISTENTE: 'Для этой записи уже опубликован отзыв.',

    ERROR_SESION: 'Срок действия сеанса истёк. Войдите снова.',
    ERROR_CONEXION: 'Нет соединения с сервером. Попробуйте ещё раз.',
    ERROR_NO_DISPONIBLE: 'Эта запись больше недоступна.',
    ERROR_PERMISO_QUITAR: 'У вас нет разрешения убрать эту запись.',
    ERROR_PERMISO_CANCELAR: 'У вас нет разрешения отменить эту запись.',
    ERROR_PERMISO_RESENA: 'У вас нет разрешения оставить отзыв об этой записи.',
    ERROR_CONFLICTO_QUITAR:
      'Из списка можно убрать только отменённую запись.',
    ERROR_CONFLICTO_CANCELAR:
      'Эту запись больше нельзя отменить или до начала осталось менее {{horas}} ч.',
    ERROR_CONFLICTO_RESENA:
      'Для этой записи уже есть отзыв или оставить отзыв больше нельзя.',
    ERROR_QUITAR: 'Не удалось убрать запись. Попробуйте ещё раз.',
    ERROR_CANCELAR: 'Не удалось отменить запись. Попробуйте ещё раз.',
    ERROR_RESENA: 'Не удалось опубликовать отзыв. Попробуйте ещё раз.',
    ERROR_PLAZO: 'Срок отмены этой записи истёк.',
    ERROR_NO_CANCELABLE: 'Эту запись больше нельзя отменить в приложении.',
  },

  uk: {
    EYEBROW: 'Ваш розклад',
    TITULO: 'Мої записи',
    INTRO: 'Переглядайте майбутні та минулі записи.',

    FILTRAR: 'Фільтр записів',
    PROXIMAS: 'Майбутні',
    HISTORIAL: 'Історія',
    TODAS: 'Усі',

    MOSTRANDO_EMPRESA: 'Записи в компанії',
    ESTA_EMPRESA: 'Ця компанія',
    VER_TODAS: 'Показати всі мої записи',

    EYEBROW_PROXIMAS: 'Незабаром',
    EYEBROW_HISTORIAL: 'Минулі записи',
    EYEBROW_TODAS: 'Ваша активність',

    TITULO_PROXIMAS: 'Майбутні записи',
    TITULO_HISTORIAL: 'Історія записів',
    TITULO_TODAS: 'Усі ваші записи',
    CONTADOR: 'Результати: {{cantidad}}',

    CARGANDO: 'Завантаження ваших записів…',
    ERROR_CARGAR: 'Не вдалося завантажити ваші записи.',
    REINTENTAR: 'Спробувати ще раз',

    VACIO_TITULO: 'У вас ще немає записів',
    VACIO_TEXTO:
      'Знайдіть компанію на OtClick, виберіть послугу та зробіть свій перший запис.',
    EXPLORAR: 'Переглянути компанії',

    VACIO_PROXIMAS_TITULO: 'У вас немає майбутніх записів',
    VACIO_PROXIMAS_TEXTO: 'Ваші записи з’являться тут після бронювання.',
    VACIO_HISTORIAL_TITULO: 'Історія записів поки порожня',
    VACIO_HISTORIAL_TEXTO:
      'Тут з’являться завершені, скасовані та минулі записи.',
    VACIO_TODAS_TITULO: 'Немає записів для відображення',
    VACIO_TODAS_TEXTO: 'Тут з’являться ваші записи.',

    SERVICIO: 'Послуга',
    SERVICIO_NO_DISPONIBLE: 'Послуга недоступна',
    EMPRESA_NO_DISPONIBLE: 'Компанія недоступна',
    TRABAJADOR: 'Вас обслуговує {{nombre}}',

    ESTADO_PENDING: 'Очікує',
    ESTADO_CONFIRMED: 'Підтверджено',
    ESTADO_COMPLETED: 'Завершено',
    ESTADO_CANCELLED: 'Скасовано',
    ESTADO_NO_SHOW: 'Неявка',
    ESTADO_REJECTED: 'Відхилено',
    ESTADO_DESCONOCIDO: 'Статус недоступний',

    FECHA_NO_DISPONIBLE: 'Дата недоступна',
    HORA_NO_DISPONIBLE: 'Час недоступний',

    RECORDATORIO_CANCELAR:
      'Ви можете скасувати запис не пізніше ніж за {{horas}} год до початку.',
    CANCELACION_CERRADA:
      'Скасування в застосунку більше недоступне: до початку залишилося менш ніж {{horas}} год.',
    CANCELACION_AUTOMATICA:
      'Цей запис скасовано автоматично, оскільки його час минув без підтвердження.',

    CANCELAR_CITA: 'Скасувати запис',
    CANCELANDO: 'Скасування…',
    CANCELAR_CONFIRMACION:
      'Хочете скасувати цей запис? Він більше не відображатиметься серед майбутніх.',
    MANTENER_CITA: 'Залишити запис',
    CONFIRMAR_CANCELAR: 'Так, скасувати',

    QUITAR_TITULO: 'Прибрати з моїх записів',
    QUITAR_CONFIRMACION:
      'Цей запис зникне лише з вашого списку. Компанія збереже його у своїх даних.',
    CONSERVAR_CITA: 'Залишити запис',
    QUITAR_CITA: 'Прибрати запис',
    QUITANDO: 'Видалення…',

    EXITO_CANCELAR: 'Запис успішно скасовано.',
    EXITO_QUITAR: 'Запис прибрано з вашого списку.',

    CHAT_EMPRESA: 'Написати до {{nombre}}',
    CHAT_SIN_NOMBRE: 'Написати компанії',

    COMPROBANDO_RESENA: 'Перевірка відгуку…',
    ESCRIBIR_RESENA: 'Написати відгук',
    RESENA_PUBLICADA: 'Відгук опубліковано',
    TU_OPINION: 'Ваша думка',
    COMO_FUE: 'Як минув ваш візит?',
    CERRAR_FORMULARIO: 'Закрити форму відгуку',
    CERRAR: 'Закрити',
    PUNTUACION: 'Оцінка візиту',
    ESTRELLAS: '{{valor}} із 5 зірок',
    COMENTARIO: 'Необов’язковий коментар',
    COMENTARIO_PLACEHOLDER: 'Розкажіть, як пройшла послуга',
    CANCELAR: 'Скасувати',
    PUBLICANDO: 'Публікація…',
    PUBLICAR_RESENA: 'Опублікувати відгук',

    EXITO_RESENA:
      'Дякуємо. Ваш відгук опубліковано, він з’явиться на сторінці компанії.',
    ERROR_COMENTARIO: 'Коментар не може перевищувати 500 символів.',
    ERROR_RESENA_EXISTENTE: 'Для цього запису вже опубліковано відгук.',

    ERROR_SESION: 'Термін дії сеансу минув. Увійдіть знову.',
    ERROR_CONEXION: 'Немає з’єднання із сервером. Спробуйте ще раз.',
    ERROR_NO_DISPONIBLE: 'Цей запис більше недоступний.',
    ERROR_PERMISO_QUITAR: 'У вас немає дозволу прибрати цей запис.',
    ERROR_PERMISO_CANCELAR: 'У вас немає дозволу скасувати цей запис.',
    ERROR_PERMISO_RESENA: 'У вас немає дозволу залишити відгук про цей запис.',
    ERROR_CONFLICTO_QUITAR:
      'Зі списку можна прибрати лише скасований запис.',
    ERROR_CONFLICTO_CANCELAR:
      'Цей запис більше не можна скасувати або до початку залишилося менш ніж {{horas}} год.',
    ERROR_CONFLICTO_RESENA:
      'Для цього запису вже є відгук або залишити відгук більше не можна.',
    ERROR_QUITAR: 'Не вдалося прибрати запис. Спробуйте ще раз.',
    ERROR_CANCELAR: 'Не вдалося скасувати запис. Спробуйте ще раз.',
    ERROR_RESENA: 'Не вдалося опублікувати відгук. Спробуйте ще раз.',
    ERROR_PLAZO: 'Строк скасування цього запису минув.',
    ERROR_NO_CANCELABLE: 'Цей запис більше не можна скасувати в застосунку.',
  },
};
