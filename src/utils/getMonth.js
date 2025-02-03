// import { useTranslation } from "react-i18next";

const getMonthOptions = (t,isYear = false, selectedYear = "") => {
  // const { t } = useTranslation(); // Hook for translation

  // Use selectedYear directly or fallback to the current year
  const currentYear = selectedYear || new Date().getFullYear();

  // Define month ranges and construct options dynamically
  const monthRanges = [
    { key: "janFeb", month: "01" },
    { key: "marApr", month: "03" },
    { key: "mayJun", month: "05" },
    { key: "julAug", month: "07" },
    { key: "sepOct", month: "09" },
    { key: "novDec", month: "11" },
  ];

  // Map over monthRanges to create options based on the isYear flag
  const months = monthRanges.map(({ key, month }) => ({
    label: t(`months.${key}`),
    value: isYear ? `${currentYear}-${month}` : month,
  }));

  return months;
};

export default getMonthOptions;
