
import * as React from "react";
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="input min-h-[120px]" {...props} />;
}
