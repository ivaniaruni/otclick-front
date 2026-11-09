import { TranslateService } from '@ngx-translate/core';
import { IdiomaApp } from './traducciones';

const es = {
  LOGIN_TITULO: 'Qué bien verte de nuevo.',
  LOGIN_INTRO: 'Entra en tu cuenta para gestionar tus citas.',
  LOGIN_BOTON: 'Iniciar sesión',
  LOGIN_CARGANDO: 'Iniciando sesión…',

  REGISTRO_TITULO: 'Crea tu cuenta.',
  REGISTRO_INTRO: 'Empieza a gestionar tus citas con OtClick.',
  REGISTRO_BOTON: 'Crear cuenta',
  REGISTRO_CARGANDO: 'Creando cuenta…',

  NOMBRE: 'Nombre',
  APELLIDO: 'Apellido',
  EMAIL: 'Correo electrónico',
  EMAIL_PLACEHOLDER: 'tu@email.com',
  TELEFONO: 'Teléfono',
  PASSWORD: 'Contraseña',
  PASSWORD_PLACEHOLDER: 'Tu contraseña',
  PASSWORD_AYUDA: 'Utiliza al menos 8 caracteres.',

  SIN_CUENTA: '¿Aún no tienes cuenta?',
  CON_CUENTA: '¿Ya tienes cuenta?',
  IR_REGISTRO: 'Crear cuenta',
  IR_LOGIN: 'Inicia sesión',

  ERROR_FORMULARIO: 'Revisa los campos del formulario.',
  ERROR_CREDENCIALES:
    'No hemos podido iniciar sesión. Revisa tu correo y contraseña.',
  ERROR_LOGIN:
    'No hemos podido iniciar sesión. Inténtalo de nuevo.',
  ERROR_REGISTRO:
    'No hemos podido crear la cuenta. Revisa tus datos e inténtalo de nuevo.',
  ERROR_CONEXION:
    'No hay conexión con el servidor. Inténtalo de nuevo.',
  ERROR_DEMASIADOS_INTENTOS:
    'Has realizado demasiados intentos. Espera un momento y vuelve a intentarlo.',
};

type DiccionarioAuth = Record<keyof typeof es, string>;

export const AUTH_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioAuth
> = {
  es,

  en: {
    LOGIN_TITULO: 'Great to see you again.',
    LOGIN_INTRO: 'Sign in to your account to manage your appointments.',
    LOGIN_BOTON: 'Sign in',
    LOGIN_CARGANDO: 'Signing in…',

    REGISTRO_TITULO: 'Create your account.',
    REGISTRO_INTRO: 'Start managing your appointments with OtClick.',
    REGISTRO_BOTON: 'Create account',
    REGISTRO_CARGANDO: 'Creating account…',

    NOMBRE: 'First name',
    APELLIDO: 'Last name',
    EMAIL: 'Email address',
    EMAIL_PLACEHOLDER: 'you@email.com',
    TELEFONO: 'Phone number',
    PASSWORD: 'Password',
    PASSWORD_PLACEHOLDER: 'Your password',
    PASSWORD_AYUDA: 'Use at least 8 characters.',

    SIN_CUENTA: 'Don’t have an account yet?',
    CON_CUENTA: 'Already have an account?',
    IR_REGISTRO: 'Create account',
    IR_LOGIN: 'Sign in',

    ERROR_FORMULARIO: 'Check the form fields.',
    ERROR_CREDENCIALES:
      'We could not sign you in. Check your email and password.',
    ERROR_LOGIN:
      'We could not sign you in. Please try again.',
    ERROR_REGISTRO:
      'We could not create your account. Check your details and try again.',
    ERROR_CONEXION:
      'Cannot connect to the server. Please try again.',
    ERROR_DEMASIADOS_INTENTOS:
      'Too many attempts. Please wait a moment and try again.',
  },

  fr: {
    LOGIN_TITULO: 'Quel plaisir de vous revoir.',
    LOGIN_INTRO: 'Connectez-vous à votre compte pour gérer vos rendez-vous.',
    LOGIN_BOTON: 'Se connecter',
    LOGIN_CARGANDO: 'Connexion…',

    REGISTRO_TITULO: 'Créez votre compte.',
    REGISTRO_INTRO: 'Commencez à gérer vos rendez-vous avec OtClick.',
    REGISTRO_BOTON: 'Créer un compte',
    REGISTRO_CARGANDO: 'Création du compte…',

    NOMBRE: 'Prénom',
    APELLIDO: 'Nom',
    EMAIL: 'Adresse e-mail',
    EMAIL_PLACEHOLDER: 'vous@email.com',
    TELEFONO: 'Téléphone',
    PASSWORD: 'Mot de passe',
    PASSWORD_PLACEHOLDER: 'Votre mot de passe',
    PASSWORD_AYUDA: 'Utilisez au moins 8 caractères.',

    SIN_CUENTA: 'Vous n’avez pas encore de compte ?',
    CON_CUENTA: 'Vous avez déjà un compte ?',
    IR_REGISTRO: 'Créer un compte',
    IR_LOGIN: 'Connectez-vous',

    ERROR_FORMULARIO: 'Vérifiez les champs du formulaire.',
    ERROR_CREDENCIALES:
      'Connexion impossible. Vérifiez votre adresse e-mail et votre mot de passe.',
    ERROR_LOGIN:
      'Connexion impossible. Veuillez réessayer.',
    ERROR_REGISTRO:
      'Impossible de créer votre compte. Vérifiez vos informations et réessayez.',
    ERROR_CONEXION:
      'Connexion au serveur impossible. Veuillez réessayer.',
    ERROR_DEMASIADOS_INTENTOS:
      'Trop de tentatives. Patientez un instant, puis réessayez.',
  },

  de: {
    LOGIN_TITULO: 'Schön, dich wiederzusehen.',
    LOGIN_INTRO: 'Melde dich an, um deine Termine zu verwalten.',
    LOGIN_BOTON: 'Anmelden',
    LOGIN_CARGANDO: 'Anmeldung läuft…',

    REGISTRO_TITULO: 'Erstelle dein Konto.',
    REGISTRO_INTRO: 'Verwalte deine Termine mit OtClick.',
    REGISTRO_BOTON: 'Konto erstellen',
    REGISTRO_CARGANDO: 'Konto wird erstellt…',

    NOMBRE: 'Vorname',
    APELLIDO: 'Nachname',
    EMAIL: 'E-Mail-Adresse',
    EMAIL_PLACEHOLDER: 'du@email.com',
    TELEFONO: 'Telefonnummer',
    PASSWORD: 'Passwort',
    PASSWORD_PLACEHOLDER: 'Dein Passwort',
    PASSWORD_AYUDA: 'Verwende mindestens 8 Zeichen.',

    SIN_CUENTA: 'Du hast noch kein Konto?',
    CON_CUENTA: 'Du hast bereits ein Konto?',
    IR_REGISTRO: 'Konto erstellen',
    IR_LOGIN: 'Anmelden',

    ERROR_FORMULARIO: 'Prüfe die Formularfelder.',
    ERROR_CREDENCIALES:
      'Die Anmeldung ist fehlgeschlagen. Prüfe deine E-Mail-Adresse und dein Passwort.',
    ERROR_LOGIN:
      'Die Anmeldung ist fehlgeschlagen. Bitte versuche es erneut.',
    ERROR_REGISTRO:
      'Dein Konto konnte nicht erstellt werden. Prüfe deine Angaben und versuche es erneut.',
    ERROR_CONEXION:
      'Keine Verbindung zum Server. Bitte versuche es erneut.',
    ERROR_DEMASIADOS_INTENTOS:
      'Zu viele Versuche. Warte einen Moment und versuche es erneut.',
  },

  ru: {
    LOGIN_TITULO: 'Рады видеть вас снова.',
    LOGIN_INTRO: 'Войдите в аккаунт, чтобы управлять своими записями.',
    LOGIN_BOTON: 'Войти',
    LOGIN_CARGANDO: 'Вход…',

    REGISTRO_TITULO: 'Создайте аккаунт.',
    REGISTRO_INTRO: 'Начните управлять своими записями с OtClick.',
    REGISTRO_BOTON: 'Создать аккаунт',
    REGISTRO_CARGANDO: 'Создание аккаунта…',

    NOMBRE: 'Имя',
    APELLIDO: 'Фамилия',
    EMAIL: 'Электронная почта',
    EMAIL_PLACEHOLDER: 'you@email.com',
    TELEFONO: 'Телефон',
    PASSWORD: 'Пароль',
    PASSWORD_PLACEHOLDER: 'Ваш пароль',
    PASSWORD_AYUDA: 'Используйте не менее 8 символов.',

    SIN_CUENTA: 'Ещё нет аккаунта?',
    CON_CUENTA: 'Уже есть аккаунт?',
    IR_REGISTRO: 'Создать аккаунт',
    IR_LOGIN: 'Войти',

    ERROR_FORMULARIO: 'Проверьте поля формы.',
    ERROR_CREDENCIALES:
      'Не удалось войти. Проверьте адрес электронной почты и пароль.',
    ERROR_LOGIN:
      'Не удалось войти. Попробуйте ещё раз.',
    ERROR_REGISTRO:
      'Не удалось создать аккаунт. Проверьте данные и попробуйте ещё раз.',
    ERROR_CONEXION:
      'Нет соединения с сервером. Попробуйте ещё раз.',
    ERROR_DEMASIADOS_INTENTOS:
      'Слишком много попыток. Подождите немного и попробуйте снова.',
  },

  uk: {
    LOGIN_TITULO: 'Раді бачити вас знову.',
    LOGIN_INTRO: 'Увійдіть в обліковий запис, щоб керувати своїми записами.',
    LOGIN_BOTON: 'Увійти',
    LOGIN_CARGANDO: 'Вхід…',

    REGISTRO_TITULO: 'Створіть обліковий запис.',
    REGISTRO_INTRO: 'Почніть керувати своїми записами з OtClick.',
    REGISTRO_BOTON: 'Створити обліковий запис',
    REGISTRO_CARGANDO: 'Створення облікового запису…',

    NOMBRE: 'Ім’я',
    APELLIDO: 'Прізвище',
    EMAIL: 'Електронна пошта',
    EMAIL_PLACEHOLDER: 'you@email.com',
    TELEFONO: 'Телефон',
    PASSWORD: 'Пароль',
    PASSWORD_PLACEHOLDER: 'Ваш пароль',
    PASSWORD_AYUDA: 'Використовуйте щонайменше 8 символів.',

    SIN_CUENTA: 'Ще немає облікового запису?',
    CON_CUENTA: 'Уже є обліковий запис?',
    IR_REGISTRO: 'Створити обліковий запис',
    IR_LOGIN: 'Увійти',

    ERROR_FORMULARIO: 'Перевірте поля форми.',
    ERROR_CREDENCIALES:
      'Не вдалося увійти. Перевірте адресу електронної пошти та пароль.',
    ERROR_LOGIN:
      'Не вдалося увійти. Спробуйте ще раз.',
    ERROR_REGISTRO:
      'Не вдалося створити обліковий запис. Перевірте дані та спробуйте ще раз.',
    ERROR_CONEXION:
      'Немає з’єднання із сервером. Спробуйте ще раз.',
    ERROR_DEMASIADOS_INTENTOS:
      'Забагато спроб. Зачекайте трохи та спробуйте знову.',
  },
};

export function registrarTraduccionesAuth(
  translate: TranslateService,
): void {
  const idiomas = Object.keys(
    AUTH_TRADUCCIONES,
  ) as IdiomaApp[];

  for (const idioma of idiomas) {
    translate.setTranslation(
      idioma,
      {
        AUTH: AUTH_TRADUCCIONES[idioma],
      },
      true,
    );
  }
}
