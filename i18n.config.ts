import en from './lang/en';
import pt from './lang/pt';
import es from './lang/es';
// Remove the problematic property from the pt object
const { 'Unconfirmed Friends': _, ...ptWithoutUnconfirmedFriends } = pt;

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt',
  messages: {
    pt: ptWithoutUnconfirmedFriends,
    en,
    es,
  },
}));
