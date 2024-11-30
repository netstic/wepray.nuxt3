import { useI18n } from 'vue-i18n';
import countriesAlpha3 from '~/assets/json/countries_alpha3.json';

export const useCountries = () => {
  const { t } = useI18n();

  const countries = countriesAlpha3.map((countryCode) => ({
    label: t('countries.' + countryCode),
    value: countryCode,
  }));

  return {
    countries,
  };
};
