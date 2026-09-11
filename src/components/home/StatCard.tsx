type StatCardProps = {
  icon: string;
  value: string;
  label: string;
};

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div
      className="
        flex items-center justify-center gap-1
        rounded-xl
        border border-white/90
        bg-[#EAF5FD]
        px-2 py-2
        shadow-[0_4px_16px_rgba(47,141,228,0.18)]
        ring-1 ring-white/60
      "
    >
      <img src={icon} alt="" className="size-9 object-contain" />

      <div>
        <p className="text-base font-bold text-black">{value}</p>

        <p className="whitespace-nowrap text-[12px] font-medium text-gray-400">{label}</p>
      </div>
    </div>
  );
}
