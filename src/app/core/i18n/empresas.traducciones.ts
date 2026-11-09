import { IdiomaApp } from './traducciones';

const es = {
  EYEBROW: 'Explora OtClick',
  TITULO: 'Empresas',
  INTRO: 'Encuentra negocios y guarda los que más te interesen.',

  BUSCAR: 'Buscar empresas',
  BUSQUEDA_PLACEHOLDER: 'Nombre o ubicación',

  VISTAS_LABEL: 'Qué empresas mostrar',
  TODAS: 'Todas las empresas',
  MIS_EMPRESAS: 'Mis empresas',

  DIRECTORIO: 'Directorio',
  EMPRESAS_SEGUIDAS: 'Empresas que sigues',
  RESULTADOS: 'Resultados',
  CONTADOR: 'Resultados: {{cantidad}}',

  CARGANDO: 'Cargando empresas…',
  REINTENTAR: 'Reintentar',

  ERROR_CARGAR: 'No hemos podido cargar las empresas.',
  ERROR_CARGAR_SEGUIDAS:
    'No hemos podido cargar tus empresas seguidas.',
  ERROR_SEGUIR:
    'No hemos podido seguir a {{nombre}}. Inténtalo de nuevo.',
  ERROR_DEJAR_SEGUIR:
    'No hemos podido dejar de seguir a {{nombre}}. Inténtalo de nuevo.',

  VACIO_BUSQUEDA_TITULO: 'No encontramos resultados',
  VACIO_BUSQUEDA_TEXTO: 'Prueba con otro nombre o ubicación.',

  VACIO_SEGUIDAS_TITULO: 'Aún no sigues ninguna empresa',
  VACIO_SEGUIDAS_TEXTO:
    'Las empresas que sigas aparecerán aquí.',

  VACIO_TODAS_TITULO: 'Todavía no hay empresas',
  VACIO_TODAS_TEXTO:
    'Las empresas que se incorporen aparecerán aquí.',

  EXPLORAR_TODAS: 'Explorar todas las empresas',

  VER_EMPRESA: 'Ver empresa {{nombre}}',
  LOGO_EMPRESA: 'Logo de {{nombre}}',
  CONOCER_NEGOCIO: 'Conoce este negocio',

  SEGUIR: 'Seguir a {{nombre}}',
  DEJAR_SEGUIR: 'Dejar de seguir a {{nombre}}',
};

type DiccionarioEmpresas = Record<keyof typeof es, string>;

export const EMPRESAS_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioEmpresas
> = {
  es,

  en: {
    EYEBROW: 'Explore OtClick',
    TITULO: 'Businesses',
    INTRO: 'Find businesses and save the ones you like most.',

    BUSCAR: 'Search businesses',
    BUSQUEDA_PLACEHOLDER: 'Name or location',

    VISTAS_LABEL: 'Which businesses to show',
    TODAS: 'All businesses',
    MIS_EMPRESAS: 'My businesses',

    DIRECTORIO: 'Directory',
    EMPRESAS_SEGUIDAS: 'Businesses you follow',
    RESULTADOS: 'Results',
    CONTADOR: 'Results: {{cantidad}}',

    CARGANDO: 'Loading businesses…',
    REINTENTAR: 'Try again',

    ERROR_CARGAR: 'We could not load the businesses.',
    ERROR_CARGAR_SEGUIDAS:
      'We could not load the businesses you follow.',
    ERROR_SEGUIR:
      'We could not follow {{nombre}}. Please try again.',
    ERROR_DEJAR_SEGUIR:
      'We could not unfollow {{nombre}}. Please try again.',

    VACIO_BUSQUEDA_TITULO: 'No results found',
    VACIO_BUSQUEDA_TEXTO: 'Try another name or location.',

    VACIO_SEGUIDAS_TITULO: 'You are not following any businesses yet',
    VACIO_SEGUIDAS_TEXTO:
      'The businesses you follow will appear here.',

    VACIO_TODAS_TITULO: 'No businesses yet',
    VACIO_TODAS_TEXTO:
      'Businesses will appear here when they join.',

    EXPLORAR_TODAS: 'Explore all businesses',

    VER_EMPRESA: 'View business {{nombre}}',
    LOGO_EMPRESA: '{{nombre}} logo',
    CONOCER_NEGOCIO: 'Discover this business',

    SEGUIR: 'Follow {{nombre}}',
    DEJAR_SEGUIR: 'Unfollow {{nombre}}',
  },

  fr: {
    EYEBROW: 'Explorez OtClick',
    TITULO: 'Entreprises',
    INTRO:
      'Trouvez des entreprises et enregistrez celles qui vous intéressent.',

    BUSCAR: 'Rechercher des entreprises',
    BUSQUEDA_PLACEHOLDER: 'Nom ou lieu',

    VISTAS_LABEL: 'Entreprises à afficher',
    TODAS: 'Toutes les entreprises',
    MIS_EMPRESAS: 'Mes entreprises',

    DIRECTORIO: 'Annuaire',
    EMPRESAS_SEGUIDAS: 'Entreprises que vous suivez',
    RESULTADOS: 'Résultats',
    CONTADOR: 'Résultats : {{cantidad}}',

    CARGANDO: 'Chargement des entreprises…',
    REINTENTAR: 'Réessayer',

    ERROR_CARGAR: 'Impossible de charger les entreprises.',
    ERROR_CARGAR_SEGUIDAS:
      'Impossible de charger les entreprises que vous suivez.',
    ERROR_SEGUIR:
      'Impossible de suivre {{nombre}}. Veuillez réessayer.',
    ERROR_DEJAR_SEGUIR:
      'Impossible de ne plus suivre {{nombre}}. Veuillez réessayer.',

    VACIO_BUSQUEDA_TITULO: 'Aucun résultat',
    VACIO_BUSQUEDA_TEXTO: 'Essayez un autre nom ou un autre lieu.',

    VACIO_SEGUIDAS_TITULO: 'Vous ne suivez encore aucune entreprise',
    VACIO_SEGUIDAS_TEXTO:
      'Les entreprises que vous suivez apparaîtront ici.',

    VACIO_TODAS_TITULO: 'Aucune entreprise pour le moment',
    VACIO_TODAS_TEXTO:
      'Les entreprises apparaîtront ici après leur inscription.',

    EXPLORAR_TODAS: 'Explorer toutes les entreprises',

    VER_EMPRESA: 'Voir l’entreprise {{nombre}}',
    LOGO_EMPRESA: 'Logo de {{nombre}}',
    CONOCER_NEGOCIO: 'Découvrez cette entreprise',

    SEGUIR: 'Suivre {{nombre}}',
    DEJAR_SEGUIR: 'Ne plus suivre {{nombre}}',
  },

  de: {
    EYEBROW: 'Entdecke OtClick',
    TITULO: 'Unternehmen',
    INTRO:
      'Finde Unternehmen und speichere diejenigen, die dich interessieren.',

    BUSCAR: 'Unternehmen suchen',
    BUSQUEDA_PLACEHOLDER: 'Name oder Ort',

    VISTAS_LABEL: 'Welche Unternehmen angezeigt werden',
    TODAS: 'Alle Unternehmen',
    MIS_EMPRESAS: 'Meine Unternehmen',

    DIRECTORIO: 'Verzeichnis',
    EMPRESAS_SEGUIDAS: 'Unternehmen, denen du folgst',
    RESULTADOS: 'Ergebnisse',
    CONTADOR: 'Ergebnisse: {{cantidad}}',

    CARGANDO: 'Unternehmen werden geladen…',
    REINTENTAR: 'Erneut versuchen',

    ERROR_CARGAR: 'Die Unternehmen konnten nicht geladen werden.',
    ERROR_CARGAR_SEGUIDAS:
      'Die Unternehmen, denen du folgst, konnten nicht geladen werden.',
    ERROR_SEGUIR:
      'Du konntest {{nombre}} nicht folgen. Bitte versuche es erneut.',
    ERROR_DEJAR_SEGUIR:
      'Du konntest {{nombre}} nicht entfolgen. Bitte versuche es erneut.',

    VACIO_BUSQUEDA_TITULO: 'Keine Ergebnisse gefunden',
    VACIO_BUSQUEDA_TEXTO: 'Versuche einen anderen Namen oder Ort.',

    VACIO_SEGUIDAS_TITULO: 'Du folgst noch keinem Unternehmen',
    VACIO_SEGUIDAS_TEXTO:
      'Unternehmen, denen du folgst, erscheinen hier.',

    VACIO_TODAS_TITULO: 'Noch keine Unternehmen',
    VACIO_TODAS_TEXTO:
      'Unternehmen erscheinen hier, sobald sie sich registrieren.',

    EXPLORAR_TODAS: 'Alle Unternehmen entdecken',

    VER_EMPRESA: 'Unternehmen {{nombre}} ansehen',
    LOGO_EMPRESA: 'Logo von {{nombre}}',
    CONOCER_NEGOCIO: 'Entdecke dieses Unternehmen',

    SEGUIR: '{{nombre}} folgen',
    DEJAR_SEGUIR: '{{nombre}} nicht mehr folgen',
  },

  ru: {
    EYEBROW: 'Откройте для себя OtClick',
    TITULO: 'Компании',
    INTRO:
      'Находите компании и сохраняйте те, которые вас интересуют.',

    BUSCAR: 'Поиск компаний',
    BUSQUEDA_PLACEHOLDER: 'Название или местоположение',

    VISTAS_LABEL: 'Какие компании показывать',
    TODAS: 'Все компании',
    MIS_EMPRESAS: 'Мои компании',

    DIRECTORIO: 'Каталог',
    EMPRESAS_SEGUIDAS: 'Компании, на которые вы подписаны',
    RESULTADOS: 'Результаты',
    CONTADOR: 'Результаты: {{cantidad}}',

    CARGANDO: 'Загрузка компаний…',
    REINTENTAR: 'Повторить',

    ERROR_CARGAR: 'Не удалось загрузить компании.',
    ERROR_CARGAR_SEGUIDAS:
      'Не удалось загрузить компании, на которые вы подписаны.',
    ERROR_SEGUIR:
      'Не удалось подписаться на {{nombre}}. Попробуйте ещё раз.',
    ERROR_DEJAR_SEGUIR:
      'Не удалось отписаться от {{nombre}}. Попробуйте ещё раз.',

    VACIO_BUSQUEDA_TITULO: 'Ничего не найдено',
    VACIO_BUSQUEDA_TEXTO:
      'Попробуйте другое название или местоположение.',

    VACIO_SEGUIDAS_TITULO: 'Вы пока не подписаны ни на одну компанию',
    VACIO_SEGUIDAS_TEXTO:
      'Здесь появятся компании, на которые вы подпишетесь.',

    VACIO_TODAS_TITULO: 'Компаний пока нет',
    VACIO_TODAS_TEXTO:
      'Компании появятся здесь после регистрации.',

    EXPLORAR_TODAS: 'Посмотреть все компании',

    VER_EMPRESA: 'Посмотреть компанию {{nombre}}',
    LOGO_EMPRESA: 'Логотип {{nombre}}',
    CONOCER_NEGOCIO: 'Узнайте об этой компании',

    SEGUIR: 'Подписаться на {{nombre}}',
    DEJAR_SEGUIR: 'Отписаться от {{nombre}}',
  },

  uk: {
    EYEBROW: 'Відкрийте для себе OtClick',
    TITULO: 'Компанії',
    INTRO:
      'Знаходьте компанії та зберігайте ті, які вас цікавлять.',

    BUSCAR: 'Пошук компаній',
    BUSQUEDA_PLACEHOLDER: 'Назва або розташування',

    VISTAS_LABEL: 'Які компанії показувати',
    TODAS: 'Усі компанії',
    MIS_EMPRESAS: 'Мої компанії',

    DIRECTORIO: 'Каталог',
    EMPRESAS_SEGUIDAS: 'Компанії, на які ви підписані',
    RESULTADOS: 'Результати',
    CONTADOR: 'Результати: {{cantidad}}',

    CARGANDO: 'Завантаження компаній…',
    REINTENTAR: 'Спробувати ще раз',

    ERROR_CARGAR: 'Не вдалося завантажити компанії.',
    ERROR_CARGAR_SEGUIDAS:
      'Не вдалося завантажити компанії, на які ви підписані.',
    ERROR_SEGUIR:
      'Не вдалося підписатися на {{nombre}}. Спробуйте ще раз.',
    ERROR_DEJAR_SEGUIR:
      'Не вдалося відписатися від {{nombre}}. Спробуйте ще раз.',

    VACIO_BUSQUEDA_TITULO: 'Нічого не знайдено',
    VACIO_BUSQUEDA_TEXTO:
      'Спробуйте іншу назву або розташування.',

    VACIO_SEGUIDAS_TITULO: 'Ви ще не підписані на жодну компанію',
    VACIO_SEGUIDAS_TEXTO:
      'Тут з’являться компанії, на які ви підпишетеся.',

    VACIO_TODAS_TITULO: 'Компаній поки немає',
    VACIO_TODAS_TEXTO:
      'Компанії з’являться тут після реєстрації.',

    EXPLORAR_TODAS: 'Переглянути всі компанії',

    VER_EMPRESA: 'Переглянути компанію {{nombre}}',
    LOGO_EMPRESA: 'Логотип {{nombre}}',
    CONOCER_NEGOCIO: 'Дізнайтеся про цю компанію',

    SEGUIR: 'Підписатися на {{nombre}}',
    DEJAR_SEGUIR: 'Відписатися від {{nombre}}',
  },
};
