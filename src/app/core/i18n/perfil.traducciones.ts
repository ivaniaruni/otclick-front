import { IdiomaApp } from './traducciones';

const es = {
  VOLVER: 'Volver al inicio',
  CARGANDO: 'Cargando perfil…',
  REINTENTAR: 'Reintentar',

  FOTO_ALT: 'Foto de perfil',
  EYEBROW: 'Tu perfil en OtClick',
  TITULO: 'Mi perfil',

  IMAGEN_PERFIL: 'Imagen de perfil',
  TU_FOTO: 'Tu foto',
  SELECCIONAR_DESCRIPCION:
    'Selecciona una imagen desde tu dispositivo',
  FORMATOS: 'JPG, PNG o WEBP · Máximo 5 MB',
  SELECCIONAR: 'Seleccionar imagen',
  QUITAR_SELECCION: 'Quitar selección',

  INFORMACION: 'Información personal',
  DATOS: 'Tus datos',
  NOMBRE: 'Nombre',
  APELLIDO: 'Apellido',
  TELEFONO: 'Teléfono',
  URL_IMAGEN: 'URL de imagen externa',
  URL_AYUDA:
    'Opcional. Si seleccionas un archivo, se usará esa imagen.',

  EMAIL: 'Correo electrónico',
  TIPO_CUENTA: 'Tipo de cuenta',

  ROL_CLIENTE: 'Cliente',
  ROL_EMPRESA: 'Empresa',
  ROL_TRABAJADOR: 'Trabajador',
  ROL_ADMIN: 'Administrador',
  ROL_OTRO: 'Cuenta de OtClick',

  GUARDANDO: 'Guardando…',
  GUARDAR: 'Guardar cambios',

  SESION: 'Sesión',
  CUENTA: 'Cuenta',
  SESION_ACTIVA: 'Sesión activa',
  CERRANDO_SESION: 'Cerrando sesión…',
  CERRAR_SESION: 'Cerrar sesión',

  EXITO_GUARDAR: 'Perfil actualizado correctamente.',

  ERROR_CARGAR: 'No hemos podido cargar tu perfil.',
  ERROR_GUARDAR: 'No hemos podido guardar los cambios.',
  ERROR_SALIR:
    'No hemos podido cerrar sesión. Inténtalo de nuevo.',
  ERROR_TIPO_IMAGEN:
    'Selecciona una imagen JPG, PNG o WEBP.',
  ERROR_TAMANO_IMAGEN:
    'La imagen no puede superar 5 MB.',
  ERROR_FORMULARIO:
    'Revisa los datos del formulario.',
};

type DiccionarioPerfil = Record<keyof typeof es, string>;

export const PERFIL_TRADUCCIONES: Record<
  IdiomaApp,
  DiccionarioPerfil
> = {
  es,

  en: {
    VOLVER: 'Back to home',
    CARGANDO: 'Loading profile…',
    REINTENTAR: 'Try again',

    FOTO_ALT: 'Profile photo',
    EYEBROW: 'Your OtClick profile',
    TITULO: 'My profile',

    IMAGEN_PERFIL: 'Profile image',
    TU_FOTO: 'Your photo',
    SELECCIONAR_DESCRIPCION:
      'Select an image from your device',
    FORMATOS: 'JPG, PNG or WEBP · Maximum 5 MB',
    SELECCIONAR: 'Select image',
    QUITAR_SELECCION: 'Clear selection',

    INFORMACION: 'Personal information',
    DATOS: 'Your details',
    NOMBRE: 'First name',
    APELLIDO: 'Last name',
    TELEFONO: 'Phone number',
    URL_IMAGEN: 'External image URL',
    URL_AYUDA:
      'Optional. If you select a file, that image will be used.',

    EMAIL: 'Email address',
    TIPO_CUENTA: 'Account type',

    ROL_CLIENTE: 'Customer',
    ROL_EMPRESA: 'Business',
    ROL_TRABAJADOR: 'Staff member',
    ROL_ADMIN: 'Administrator',
    ROL_OTRO: 'OtClick account',

    GUARDANDO: 'Saving…',
    GUARDAR: 'Save changes',

    SESION: 'Session',
    CUENTA: 'Account',
    SESION_ACTIVA: 'Signed in',
    CERRANDO_SESION: 'Signing out…',
    CERRAR_SESION: 'Sign out',

    EXITO_GUARDAR: 'Profile updated successfully.',

    ERROR_CARGAR: 'We could not load your profile.',
    ERROR_GUARDAR: 'We could not save your changes.',
    ERROR_SALIR:
      'We could not sign you out. Please try again.',
    ERROR_TIPO_IMAGEN:
      'Select a JPG, PNG or WEBP image.',
    ERROR_TAMANO_IMAGEN:
      'The image cannot exceed 5 MB.',
    ERROR_FORMULARIO:
      'Check the form details.',
  },

  fr: {
    VOLVER: 'Retour à l’accueil',
    CARGANDO: 'Chargement du profil…',
    REINTENTAR: 'Réessayer',

    FOTO_ALT: 'Photo de profil',
    EYEBROW: 'Votre profil sur OtClick',
    TITULO: 'Mon profil',

    IMAGEN_PERFIL: 'Image de profil',
    TU_FOTO: 'Votre photo',
    SELECCIONAR_DESCRIPCION:
      'Sélectionnez une image sur votre appareil',
    FORMATOS: 'JPG, PNG ou WEBP · Maximum 5 Mo',
    SELECCIONAR: 'Sélectionner une image',
    QUITAR_SELECCION: 'Retirer la sélection',

    INFORMACION: 'Informations personnelles',
    DATOS: 'Vos informations',
    NOMBRE: 'Prénom',
    APELLIDO: 'Nom',
    TELEFONO: 'Téléphone',
    URL_IMAGEN: 'URL d’une image externe',
    URL_AYUDA:
      'Facultatif. Si vous sélectionnez un fichier, cette image sera utilisée.',

    EMAIL: 'Adresse e-mail',
    TIPO_CUENTA: 'Type de compte',

    ROL_CLIENTE: 'Client',
    ROL_EMPRESA: 'Entreprise',
    ROL_TRABAJADOR: 'Membre de l’équipe',
    ROL_ADMIN: 'Administrateur',
    ROL_OTRO: 'Compte OtClick',

    GUARDANDO: 'Enregistrement…',
    GUARDAR: 'Enregistrer les modifications',

    SESION: 'Session',
    CUENTA: 'Compte',
    SESION_ACTIVA: 'Session active',
    CERRANDO_SESION: 'Déconnexion…',
    CERRAR_SESION: 'Se déconnecter',

    EXITO_GUARDAR: 'Profil mis à jour.',

    ERROR_CARGAR: 'Impossible de charger votre profil.',
    ERROR_GUARDAR:
      'Impossible d’enregistrer les modifications.',
    ERROR_SALIR:
      'Impossible de vous déconnecter. Veuillez réessayer.',
    ERROR_TIPO_IMAGEN:
      'Sélectionnez une image JPG, PNG ou WEBP.',
    ERROR_TAMANO_IMAGEN:
      'L’image ne peut pas dépasser 5 Mo.',
    ERROR_FORMULARIO:
      'Vérifiez les informations du formulaire.',
  },

  de: {
    VOLVER: 'Zurück zur Startseite',
    CARGANDO: 'Profil wird geladen…',
    REINTENTAR: 'Erneut versuchen',

    FOTO_ALT: 'Profilfoto',
    EYEBROW: 'Dein Profil auf OtClick',
    TITULO: 'Mein Profil',

    IMAGEN_PERFIL: 'Profilbild',
    TU_FOTO: 'Dein Foto',
    SELECCIONAR_DESCRIPCION:
      'Wähle ein Bild von deinem Gerät',
    FORMATOS: 'JPG, PNG oder WEBP · Maximal 5 MB',
    SELECCIONAR: 'Bild auswählen',
    QUITAR_SELECCION: 'Auswahl entfernen',

    INFORMACION: 'Persönliche Informationen',
    DATOS: 'Deine Daten',
    NOMBRE: 'Vorname',
    APELLIDO: 'Nachname',
    TELEFONO: 'Telefonnummer',
    URL_IMAGEN: 'URL eines externen Bildes',
    URL_AYUDA:
      'Optional. Wenn du eine Datei auswählst, wird dieses Bild verwendet.',

    EMAIL: 'E-Mail-Adresse',
    TIPO_CUENTA: 'Kontotyp',

    ROL_CLIENTE: 'Kunde',
    ROL_EMPRESA: 'Unternehmen',
    ROL_TRABAJADOR: 'Mitarbeiter',
    ROL_ADMIN: 'Administrator',
    ROL_OTRO: 'OtClick-Konto',

    GUARDANDO: 'Wird gespeichert…',
    GUARDAR: 'Änderungen speichern',

    SESION: 'Sitzung',
    CUENTA: 'Konto',
    SESION_ACTIVA: 'Angemeldet',
    CERRANDO_SESION: 'Abmeldung läuft…',
    CERRAR_SESION: 'Abmelden',

    EXITO_GUARDAR: 'Profil erfolgreich aktualisiert.',

    ERROR_CARGAR: 'Dein Profil konnte nicht geladen werden.',
    ERROR_GUARDAR:
      'Deine Änderungen konnten nicht gespeichert werden.',
    ERROR_SALIR:
      'Die Abmeldung ist fehlgeschlagen. Bitte versuche es erneut.',
    ERROR_TIPO_IMAGEN:
      'Wähle ein Bild im Format JPG, PNG oder WEBP.',
    ERROR_TAMANO_IMAGEN:
      'Das Bild darf nicht größer als 5 MB sein.',
    ERROR_FORMULARIO:
      'Prüfe die Formularangaben.',
  },

  ru: {
    VOLVER: 'На главную',
    CARGANDO: 'Загрузка профиля…',
    REINTENTAR: 'Повторить',

    FOTO_ALT: 'Фото профиля',
    EYEBROW: 'Ваш профиль в OtClick',
    TITULO: 'Мой профиль',

    IMAGEN_PERFIL: 'Изображение профиля',
    TU_FOTO: 'Ваше фото',
    SELECCIONAR_DESCRIPCION:
      'Выберите изображение на устройстве',
    FORMATOS: 'JPG, PNG или WEBP · Не более 5 МБ',
    SELECCIONAR: 'Выбрать изображение',
    QUITAR_SELECCION: 'Снять выбор',

    INFORMACION: 'Личная информация',
    DATOS: 'Ваши данные',
    NOMBRE: 'Имя',
    APELLIDO: 'Фамилия',
    TELEFONO: 'Телефон',
    URL_IMAGEN: 'URL внешнего изображения',
    URL_AYUDA:
      'Необязательно. Если выбрать файл, будет использовано это изображение.',

    EMAIL: 'Электронная почта',
    TIPO_CUENTA: 'Тип аккаунта',

    ROL_CLIENTE: 'Клиент',
    ROL_EMPRESA: 'Компания',
    ROL_TRABAJADOR: 'Сотрудник',
    ROL_ADMIN: 'Администратор',
    ROL_OTRO: 'Аккаунт OtClick',

    GUARDANDO: 'Сохранение…',
    GUARDAR: 'Сохранить изменения',

    SESION: 'Сеанс',
    CUENTA: 'Аккаунт',
    SESION_ACTIVA: 'Активный сеанс',
    CERRANDO_SESION: 'Выход…',
    CERRAR_SESION: 'Выйти',

    EXITO_GUARDAR: 'Профиль успешно обновлён.',

    ERROR_CARGAR: 'Не удалось загрузить профиль.',
    ERROR_GUARDAR: 'Не удалось сохранить изменения.',
    ERROR_SALIR:
      'Не удалось выйти. Попробуйте ещё раз.',
    ERROR_TIPO_IMAGEN:
      'Выберите изображение JPG, PNG или WEBP.',
    ERROR_TAMANO_IMAGEN:
      'Размер изображения не должен превышать 5 МБ.',
    ERROR_FORMULARIO:
      'Проверьте данные формы.',
  },

  uk: {
    VOLVER: 'На головну',
    CARGANDO: 'Завантаження профілю…',
    REINTENTAR: 'Спробувати ще раз',

    FOTO_ALT: 'Фото профілю',
    EYEBROW: 'Ваш профіль в OtClick',
    TITULO: 'Мій профіль',

    IMAGEN_PERFIL: 'Зображення профілю',
    TU_FOTO: 'Ваше фото',
    SELECCIONAR_DESCRIPCION:
      'Виберіть зображення на пристрої',
    FORMATOS: 'JPG, PNG або WEBP · Не більше 5 МБ',
    SELECCIONAR: 'Вибрати зображення',
    QUITAR_SELECCION: 'Скасувати вибір',

    INFORMACION: 'Особиста інформація',
    DATOS: 'Ваші дані',
    NOMBRE: 'Ім’я',
    APELLIDO: 'Прізвище',
    TELEFONO: 'Телефон',
    URL_IMAGEN: 'URL зовнішнього зображення',
    URL_AYUDA:
      'Необов’язково. Якщо вибрати файл, буде використано це зображення.',

    EMAIL: 'Електронна пошта',
    TIPO_CUENTA: 'Тип облікового запису',

    ROL_CLIENTE: 'Клієнт',
    ROL_EMPRESA: 'Компанія',
    ROL_TRABAJADOR: 'Працівник',
    ROL_ADMIN: 'Адміністратор',
    ROL_OTRO: 'Обліковий запис OtClick',

    GUARDANDO: 'Збереження…',
    GUARDAR: 'Зберегти зміни',

    SESION: 'Сеанс',
    CUENTA: 'Обліковий запис',
    SESION_ACTIVA: 'Активний сеанс',
    CERRANDO_SESION: 'Вихід…',
    CERRAR_SESION: 'Вийти',

    EXITO_GUARDAR: 'Профіль успішно оновлено.',

    ERROR_CARGAR: 'Не вдалося завантажити профіль.',
    ERROR_GUARDAR: 'Не вдалося зберегти зміни.',
    ERROR_SALIR:
      'Не вдалося вийти. Спробуйте ще раз.',
    ERROR_TIPO_IMAGEN:
      'Виберіть зображення JPG, PNG або WEBP.',
    ERROR_TAMANO_IMAGEN:
      'Розмір зображення не повинен перевищувати 5 МБ.',
    ERROR_FORMULARIO:
      'Перевірте дані форми.',
  },
};
