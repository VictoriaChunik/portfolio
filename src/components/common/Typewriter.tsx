import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import React from "react";

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Wrap = styled.span`
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Caret = styled.span`
  width: 2px;
  height: 1em;
  background: currentColor;
  animation: ${blink} 1s step-start infinite;
`;

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

export function Typewriter({ text, speed = 60, startDelay = 0 }: TypewriterProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    let mounted = true;
    const start = setTimeout(() => {
      const timer = setInterval(() => {
        setI((prev) => {
          if (!mounted) return prev;
          if (prev >= text.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      mounted = false;
      clearTimeout(start);
    };
  }, [text, speed, startDelay]);

  return (
    <Wrap>
      <span>{text.slice(0, i)}</span>
      <Caret aria-hidden="true" />
    </Wrap>
  );
}

export default Typewriter;