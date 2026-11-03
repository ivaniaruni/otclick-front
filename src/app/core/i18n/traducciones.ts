export type IdiomaApp =
  | 'es'
  | 'en'
  | 'fr'
  | 'de'
  | 'ru'
  | 'uk';

const espanol = {
  IDIOMA_ABRIR: 'Elegir idioma',
  IDIOMA_TITULO: 'Idioma de la aplicación',
  IDIOMA_DESCRIPCION: 'Selecciona el idioma que quieres utilizar.',
  IDIOMA_ERROR: 'No hemos podido cambiar el idioma. Inténtalo de nuevo.',

  PERFIL_ABRIR: 'Abrir mi perfil',
  PERFIL_NOMBRE: 'Mi perfil',
  SALUDO: 'Hola',

  TAB_INICIO: 'Inicio',
  TAB_EMPRESAS: 'Empresas',
  TAB_CITAS: 'Mis citas',
  TAB_MENSAJES: 'Mensajes',

  HOME_EYEBROW: 'Tu espacio para reservar',
  HOME_TITULO: 'Encuentra tiempo para lo que te importa.',
  HOME_INTRO: 'Descubre negocios y organiza tus citas desde un solo lugar.',
};

type ClaveTraduccion = keyof typeof espanol;

type Diccionario = Record<ClaveTraduccion, string>;

export const TRADUCCIONES: Record<IdiomaApp, Diccionario> = {
  es: espanol,

  en: {
    IDIOMA_ABRIR: 'Choose language',
    IDIOMA_TITULO: 'App language',
    IDIOMA_DESCRIPCION: 'Select the language you want to use.',
    IDIOMA_ERROR: 'We could not change the language. Please try again.',

    PERFIL_ABRIR: 'Open my profile',
    PERFIL_NOMBRE: 'My profile',
    SALUDO: 'Hello',

    TAB_INICIO: 'Home',
    TAB_EMPRESAS: 'Businesses',
    TAB_CITAS: 'My appointments',
    TAB_MENSAJES: 'Messages',

    HOME_EYEBROW: 'Your place to book',
    HOME_TITULO: 'Make time for what matters to you.',
    HOME_INTRO: 'Discover businesses and manage your appointments in one place.',
  },

  fr: {
    IDIOMA_ABRIR: 'Choisir la langue',
    IDIOMA_TITULO: 'Langue de l’application',
    IDIOMA_DESCRIPCION: 'Sélectionnez la langue que vous souhaitez utiliser.',
    IDIOMA_ERROR: 'Impossible de changer la langue. Veuillez réessayer.',

    PERFIL_ABRIR: 'Ouvrir mon profil',
    PERFIL_NOMBRE: 'Mon profil',
    SALUDO: 'Bonjour',

    TAB_INICIO: 'Accueil',
    TAB_EMPRESAS: 'Entreprises',
    TAB_CITAS: 'Mes rendez-vous',
    TAB_MENSAJES: 'Messages',

    HOME_EYEBROW: 'Votre espace de réservation',
    HOME_TITULO: 'Prenez du temps pour ce qui compte pour vous.',
    HOME_INTRO: 'Découvrez des entreprises et gérez vos rendez-vous au même endroit.',
  },

  de: {
    IDIOMA_ABRIR: 'Sprache auswählen',
    IDIOMA_TITULO: 'App-Sprache',
    IDIOMA_DESCRIPCION: 'Wähle die Sprache aus, die du verwenden möchtest.',
    IDIOMA_ERROR: 'Die Sprache konnte nicht geändert werden. Bitte versuche es erneut.',

    PERFIL_ABRIR: 'Mein Profil öffnen',
    PERFIL_NOMBRE: 'Mein Profil',
    SALUDO: 'Hallo',

    TAB_INICIO: 'Start',
    TAB_EMPRESAS: 'Unternehmen',
    TAB_CITAS: 'Meine Termine',
    TAB_MENSAJES: 'Nachrichten',

    HOME_EYEBROW: 'Dein Ort zum Buchen',
    HOME_TITULO: 'Nimm dir Zeit für das, was dir wichtig ist.',
    HOME_INTRO: 'Entdecke Unternehmen und verwalte deine Termine an einem Ort.',
  },

  ru: {
    IDIOMA_ABRIR: 'Выбрать язык',
    IDIOMA_TITULO: 'Язык приложения',
    IDIOMA_DESCRIPCION: 'Выберите язык, который хотите использовать.',
    IDIOMA_ERROR: 'Не удалось изменить язык. Попробуйте ещё раз.',

    PERFIL_ABRIR: 'Открыть мой профиль',
    PERFIL_NOMBRE: 'Мой профиль',
    SALUDO: 'Здравствуйте',

    TAB_INICIO: 'Главная',
    TAB_EMPRESAS: 'Компании',
    TAB_CITAS: 'Мои записи',
    TAB_MENSAJES: 'Сообщения',

    HOME_EYEBROW: 'Всё для записи на услуги',
    HOME_TITULO: 'Найдите время для того, что вам важно.',
    HOME_INTRO: 'Открывайте для себя компании и управляйте записями в одном месте.',
  },

  uk: {
    IDIOMA_ABRIR: 'Вибрати мову',
    IDIOMA_TITULO: 'Мова застосунку',
    IDIOMA_DESCRIPCION: 'Виберіть мову, якою хочете користуватися.',
    IDIOMA_ERROR: 'Не вдалося змінити мову. Спробуйте ще раз.',

    PERFIL_ABRIR: 'Відкрити мій профіль',
    PERFIL_NOMBRE: 'Мій профіль',
    SALUDO: 'Вітаємо',

    TAB_INICIO: 'Головна',
    TAB_EMPRESAS: 'Компанії',
    TAB_CITAS: 'Мої записи',
    TAB_MENSAJES: 'Повідомлення',

    HOME_EYEBROW: 'Усе для запису на послуги',
    HOME_TITULO: 'Знайдіть час для того, що для вас важливе.',
    HOME_INTRO: 'Знаходьте компанії та керуйте записами в одному місці.',
  },
};
