import { cn } from "../../lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("font-bold tracking-tight text-3xl flex items-baseline font-sans", className)}>
      <span className="text-foreground">codro</span>
      <span className="text-foreground relative">
        <span className="opacity-0">i</span>
        {/* Custom drawn 'i' to match the teal dot and navy stem */}
        <span className="absolute inset-0 flex flex-col items-center justify-end pb-[2px]">
          <span className="w-[6px] h-[6px] rounded-full bg-primary absolute top-[6px]"></span>
          <span className="w-[6px] h-[16px] bg-foreground rounded-sm"></span>
        </span>
      </span>
      <span className="text-primary tracking-tighter">t</span>
    </div>
  );
}
