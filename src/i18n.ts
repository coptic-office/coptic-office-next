import { getRequestConfig, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
// Can be imported from a shared config
const locales = ["ar", "en"];
export default getRequestConfig(async ({ locale }) => {
  unstable_setRequestLocale(locale);
  // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale ?? "ar"}.json`))
      .default,
  };
});
