"use client";

import { useState } from "react";

type IProps = {
  children: string;
};

function TextExpander({ children }: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "收起" : "显示更多"}
      </button>
    </span>
  );
}

export default TextExpander;
