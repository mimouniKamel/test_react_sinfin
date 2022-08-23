import 'react-i18next';
import fr from './locales/fr.json'

declare module 'react-i18next' {
  interface CustomTypeOptions  {
    defaultNS: 'common';
    resources: typeof fr;
  }
}