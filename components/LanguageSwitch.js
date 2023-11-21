"use client";

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18n.config';
import 'flag-icons/css/flag-icons.min.css';

// This component is used to switch between languages
// The current language is stored in NEXT_LOCALE cookie
const LanguageSwtich = ({ extraStyle }) => {

  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = i18n.language;

  const handleChange = (lang) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${lang};expires=${expires};path=/`;
    router.refresh();
  };

  let cssClassNameCurrentLang = 'fi fi-' + currentLocale;
  if (currentLocale === 'en') cssClassNameCurrentLang = 'fi fi-gb';

  return (
    <>
      <details className='dropdown'>
        <summary className='m-1 btn border-2 border-gray-500'><span className={cssClassNameCurrentLang}></span> {t(currentLocale)}</summary>
        <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
          {i18nConfig.locales.map(function (d, idx) {
            let className = "fi fi-" + d;
            if (d === 'en') className = 'fi fi-gb';
            return (
              <li key={idx} className="flex">
                <button className='btn-ghost' onClick={() => { handleChange(d) }}><span className={className}></span>{t(d)}</button>
              </li>
            )
          })}
        </ul>
      </details >
    </>
  );
};

export default LanguageSwtich;
