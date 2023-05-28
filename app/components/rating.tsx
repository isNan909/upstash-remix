import React from "react";

interface IRatingProps {
  children: React.ReactElement;
  selected: string;
  onChange: any;
  value: string;
  name: string;
}

export default function Rating({ children, selected, onChange = () => {}, value, name  }:  IRatingProps) {
  const isSelected = selected === value;
  return (
    <label className={isSelected ? "selected" : ""}>
      <input
        type="radio"
        hidden={true}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {children}
    </label>
  )
}