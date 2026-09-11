type QuestionTagProps = {
  category: string;
  subCategory: string;
};

// 문제 유형 태그 (예: 핵심파악 | 요지)
export default function QuestionTag({ category, subCategory }: QuestionTagProps) {
  return (
    <span className="inline-block rounded-full bg-[#D5EAFB] px-4 py-1 text-[14px] font-bold text-[#168CF2]">
      {category} | {subCategory}
    </span>
  );
}
