'use client';
import { useAppStore } from '@/store';
import { translations } from '@/lib/i18n';

export function useTranslation() {
  const language = useAppStore((s) => s.language);
  const t = translations[language] || translations.en;
  return { t, language };
}
