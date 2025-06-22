import { Loader2 } from "lucide-react";

export const Spinner = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Loader2
      height={100}
      width={100}
      aria-label="Loading"
      {...props}
      className="animate-spin text-red-500 m-auto h-full"
    />
  );
};
