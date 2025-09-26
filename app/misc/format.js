export default function format(value, {
  locale = "en-US",            // локаль для разделителей
  fiat = "USD",                // валюта цены
  withFiatSymbol = true,       // показывать знак валюты (₽, $, €)
  useGrouping = true,          // пробелы/запятые в разрядах
  fallback = "—",              // что показать при некорректных значениях
} = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;

  const abs = Math.abs(n);

  // Решаем, сколько показывать знаков после запятой
  // (подбирайте пороги под свой продукт)
  let formatOpts = { useGrouping };

  if (abs === 0) {
    formatOpts.minimumFractionDigits = 0;
    formatOpts.maximumFractionDigits = 2;
  } else if (abs < 1e-6) {
    // Очень маленькие: показываем по значащим цифрам, без экспоненты
    formatOpts.minimumSignificantDigits = 2;
    formatOpts.maximumSignificantDigits = 8;
    // Важно: notation:'standard' избегает 1.2e-7
    formatOpts.notation = "standard";
  } else if (abs < 0.01) {
    formatOpts.minimumFractionDigits = 2;
    formatOpts.maximumFractionDigits = 8;
  } else if (abs < 1) {
    formatOpts.minimumFractionDigits = 2;
    formatOpts.maximumFractionDigits = 6;
  } else if (abs < 100) {
    formatOpts.minimumFractionDigits = 2;
    formatOpts.maximumFractionDigits = 4;
  } else {
    formatOpts.minimumFractionDigits = 2;
    formatOpts.maximumFractionDigits = 2;
  }

  // Вывод с символом валюты или как просто число
  const nf = new Intl.NumberFormat(
    locale,
    withFiatSymbol
      ? { style: "currency", currency: fiat, currencyDisplay: "symbol", ...formatOpts }
      : { style: "decimal", ...formatOpts }
  );

  return nf.format(n);
}