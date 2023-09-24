import { h, FunctionComponent, JSX } from "preact";
import { cn } from "@/lib/utils.ts";

interface TextareaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: FunctionComponent<TextareaProps> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
Textarea.displayName = "Textarea";

export { Textarea };

