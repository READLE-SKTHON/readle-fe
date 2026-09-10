import { Copy } from "lucide-react";

type InviteLinkCardProps = {
  link: string;
  onCopy: () => void;
};

export default function InviteLinkCard({ link, onCopy }: InviteLinkCardProps) {
  return (
    <div className="rounded-3xl border-[1.5px] border-[#E3E2E2] p-5">
      <label htmlFor="invite-link" className="block text-[16px] font-bold text-black">
        초대 링크
      </label>

      <div className="mt-3 flex h-13 items-center gap-2 rounded-xl border-[1.5px] border-[#E3E2E2] pr-2 pl-4">
        <input
          id="invite-link"
          type="text"
          value={link}
          readOnly
          className="min-w-0 flex-1 truncate bg-transparent text-[15px] font-medium text-[#5E5E5E] outline-none"
        />

        <button
          type="button"
          onClick={onCopy}
          aria-label="초대 링크 복사"
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center"
        >
          <Copy className="size-5 text-[#8F8F8F]" />
        </button>
      </div>
    </div>
  );
}
