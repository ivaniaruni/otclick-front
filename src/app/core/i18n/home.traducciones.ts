import { IdiomaApp } from './traducciones';

const es = {
  BUSQUEDA_LABEL: '¿Qué estás buscando?',
  BUSQUEDA_PLACEHOLDER: 'Busca una empresa',
  BUSCAR: 'Buscar empresas',

  TU_ESPACIO: 'Tu espacio',
  TODO_A_MANO: 'Todo a mano',

  CITAS: 'Mis citas',
  CITAS_DESCRIPCION: 'Consulta tus reservas y tu historial.',

  MENSAJES: 'Mensajes',
  MENSAJES_DESCRIPCION: 'Accede a tus conversaciones.',

  EXPLORA: 'Explora',
  DESCUBRE_EMPRESAS: 'Descubre empresas',
  VER_TODAS: 'Ver todas',

  CARGANDO: 'Cargando empresas…',
  ERROR_CARGAR: 'No hemos podido cargar las empresas.',
  REINTENTAR: 'Reintentar',
  SIN_EMPRESAS: 'Aún no hay empresas disponibles.',

  LOGO_EMPRESA: 'Logo de {{nombre}}',
  DESCUBRE_NEGOCIO: 'Descubre este negocio',
};

type DiccionarioHome = Record<keyof typeof es, string>;

export const HOME_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioHome
> = {
  es,

  en: {
    BUSQUEDA_LABEL: 'What are you looking for?',
    BUSQUEDA_PLACEHOLDER: 'Search for a business',
    BUSCAR: 'Search businesses',

    TU_ESPACIO: 'Your space',
    TODO_A_MANO: 'Everything at hand',

    CITAS: 'My appointments',
    CITAS_DESCRIPCION: 'View your bookings and appointment history.',

    MENSAJES: 'Messages',
    MENSAJES_DESCRIPCION: 'Access your conversations.',

    EXPLORA: 'Explore',
    DESCUBRE_EMPRESAS: 'Discover businesses',
    VER_TODAS: 'View all',

    CARGANDO: 'Loading businesses…',
    ERROR_CARGAR: 'We could not load the businesses.',
    REINTENTAR: 'Try again',
    SIN_EMPRESAS: 'No businesses are available yet.',

    LOGO_EMPRESA: '{{nombre}} logo',
    DESCUBRE_NEGOCIO: 'Discover this business',
  },

  fr: {
    BUSQUEDA_LABEL: 'Que recherchez-vous ?',
    BUSQUEDA_PLACEHOLDER: 'Recherchez une entreprise',
    BUSCAR: 'Rechercher des entreprises',

    TU_ESPACIO: 'Votre espace',
    TODO_A_MANO: 'Tout à portée de main',

    CITAS: 'Mes rendez-vous',
    CITAS_DESCRIPCION: 'Consultez vos réservations et votre historique.',

    MENSAJES: 'Messages',
    MENSAJES_DESCRIPCION: 'Accédez à vos conversations.',

    EXPLORA: 'Explorez',
    DESCUBRE_EMPRESAS: 'Découvrez des entreprises',
    VER_TODAS: 'Tout voir',

    CARGANDO: 'Chargement des entreprises…',
    ERROR_CARGAR: 'Impossible de charger les entreprises.',
    REINTENTAR: 'Réessayer',
    SIN_EMPRESAS: 'Aucune entreprise disponible pour le moment.',

    LOGO_EMPRESA: 'Logo de {{nombre}}',
    DESCUBRE_NEGOCIO: 'Découvrez cette entreprise',
  },

  de: {
    BUSQUEDA_LABEL: 'Wonach suchst du?',
    BUSQUEDA_PLACEHOLDER: 'Suche nach einem Unternehmen',
    BUSCAR: 'Unternehmen suchen',

    TU_ESPACIO: 'Dein Bereich',
    TODO_A_MANO: 'Alles griffbereit',

    CITAS: 'Meine Termine',
    CITAS_DESCRIPCION: 'Sieh dir deine Buchungen und bisherigen Termine an.',

    MENSAJES: 'Nachrichten',
    MENSAJES_DESCRIPCION: 'Öffne deine Unterhaltungen.',

    EXPLORA: 'Entdecken',
    DESCUBRE_EMPRESAS: 'Unternehmen entdecken',
    VER_TODAS: 'Alle ansehen',

    CARGANDO: 'Unternehmen werden geladen…',
    ERROR_CARGAR: 'Die Unternehmen konnten nicht geladen werden.',
    REINTENTAR: 'Erneut versuchen',
    SIN_EMPRESAS: 'Noch keine Unternehmen verfügbar.',

    LOGO_EMPRESA: 'Logo von {{nombre}}',
    DESCUBRE_NEGOCIO: 'Entdecke dieses Unternehmen',
  },

  ru: {
    BUSQUEDA_LABEL: 'Что вы ищете?',
    BUSQUEDA_PLACEHOLDER: 'Найдите компанию',
    BUSCAR: 'Поиск компаний',

    TU_ESPACIO: 'Ваше пространство',
    TODO_A_MANO: 'Всё под рукой',

    CITAS: 'Мои записи',
    CITAS_DESCRIPCION: 'Просматривайте свои записи и историю посещений.',

    MENSAJES: 'Сообщения',
    MENSAJES_DESCRIPCION: 'Откройте свои переписки.',

    EXPLORA: 'Обзор',
    DESCUBRE_EMPRESAS: 'Откройте для себя компании',
    VER_TODAS: 'Смотреть все',

    CARGANDO: 'Загрузка компаний…',
    ERROR_CARGAR: 'Не удалось загрузить компании.',
    REINTENTAR: 'Повторить',
    SIN_EMPRESAS: 'Пока нет доступных компаний.',

    LOGO_EMPRESA: 'Логотип {{nombre}}',
    DESCUBRE_NEGOCIO: 'Узнайте об этой компании',
  },

  uk: {
    BUSQUEDA_LABEL: 'Що ви шукаєте?',
    BUSQUEDA_PLACEHOLDER: 'Знайдіть компанію',
    BUSCAR: 'Пошук компаній',

    TU_ESPACIO: 'Ваш простір',
    TODO_A_MANO: 'Усе під рукою',

    CITAS: 'Мої записи',
    CITAS_DESCRIPCION: 'Переглядайте свої записи та історію відвідувань.',

    MENSAJES: 'Повідомлення',
    MENSAJES_DESCRIPCION: 'Відкрийте свої листування.',

    EXPLORA: 'Огляд',
    DESCUBRE_EMPRESAS: 'Відкрийте для себе компанії',
    VER_TODAS: 'Переглянути всі',

    CARGANDO: 'Завантаження компаній…',
    ERROR_CARGAR: 'Не вдалося завантажити компанії.',
    REINTENTAR: 'Спробувати ще раз',
    SIN_EMPRESAS: 'Поки немає доступних компаній.',

    LOGO_EMPRESA: 'Логотип {{nombre}}',
    DESCUBRE_NEGOCIO: 'Дізнайтеся про цю компанію',
  },
};
