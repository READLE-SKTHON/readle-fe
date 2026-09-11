import { MAIN_CATEGORY_LABELS, SUB_CATEGORY_LABELS } from "@/config/questionCategoryConfig";

// 서버 유형 값 기준 조회용 이름 목록
const mainCategoryLabels: Partial<Record<string, string>> = MAIN_CATEGORY_LABELS;
const subCategoryLabels: Partial<Record<string, string>> = SUB_CATEGORY_LABELS;

// 문제 유형 태그 한글 이름 (같이 게임하기와 같은 기준, 정의되지 않은 값은 서버 값 그대로)
export const getQuestionCategoryLabel = (mainCategory: string, subCategory: string) => ({
  type: mainCategoryLabels[mainCategory] ?? mainCategory,
  subtype: subCategoryLabels[subCategory] ?? subCategory,
});
