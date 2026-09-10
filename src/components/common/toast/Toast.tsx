type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-28 z-50 mx-auto w-fit rounded-full bg-black/80 px-5 py-3 text-[14px] font-semibold text-white"
    >
      {message}
    </div>
  );
}
