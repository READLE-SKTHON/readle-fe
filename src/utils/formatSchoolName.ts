// 학교 종류 축약 (고등학교 → 고, 중학교 → 중, 대학교 → 대)
const schoolSuffixes = [
  ["고등학교", "고"],
  ["중학교", "중"],
  ["대학교", "대"],
] as const;

// 학교명 축약 표시 (예: 리들고등학교 → 리들고)
export const formatSchoolName = (name: string) =>
  schoolSuffixes.reduce((result, [full, short]) => result.replaceAll(full, short), name);
