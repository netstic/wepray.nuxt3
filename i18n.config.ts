import en from './lang/en';
import pt from './lang/pt';

// Remove the problematic property from the pt object
const { 'Unconfirmed Friends': _, ...ptWithoutUnconfirmedFriends } = pt;

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt',
  messages: {
    pt: ptWithoutUnconfirmedFriends,
    en,
  },
}));
