
import * as React from "react";
export function Select({ options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: {value:string,label:string}[]}) {
  return <select className="input" {...props}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}
