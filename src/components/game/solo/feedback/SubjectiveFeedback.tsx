import correctWhale from "@/assets/images/game/CorrectWhale.png";

export default function SubjectiveFeedback() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#78D51B] bg-[#E7F8D5] px-6 py-6">
      <div className="pr-24">
        <h2 className="text-[22px] font-bold">고래고래!</h2>

        <p className="mt-1 text-[16px] font-semibold leading-6 text-gray-500">
          핵심을 아주 정확히 파악했습니다
        </p>
      </div>

      <img src={correctWhale} alt="" className="absolute bottom-0 right-0 h-28 object-contain" />
    </section>
  );
}
