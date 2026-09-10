type StatCardProps = {
  icon: string;
  value: string;
  label: string;
};

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-xl border border-gray-100 bg-white px-2 py-2 shadow-sm">
      <img src={icon} className="size-9 object-contain" />

      <div>
        <p className="text-base font-bold text-black">{value}</p>

        <p className="whitespace-nowrap text-[12px] font-medium text-gray-400">{label}</p>
      </div>
    </div>
  );
}
