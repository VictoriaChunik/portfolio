import styled from "styled-components";
import React from "react";

const Wrap = styled.div`
  position: relative;
  width: 220px; height: 220px; border-radius: 9999px; overflow: hidden;
  @media (min-width: 768px){ width: 300px; height: 300px; }
`;


const Bg = styled.img`
  position: absolute; inset: 0; width: 100%; height: 100%; border-radius: inherit;
  object-fit: cover; object-position: var(--pos, 30% 45%);
  filter: blur(6px) brightness(0.98) saturate(0.95) contrast(1.02) hue-rotate(-4deg);
  transform: scale(1.06);
  pointer-events: none; user-select: none; -webkit-user-drag: none;
`;

const Fg = styled.img`
  position: absolute; inset: 0; width: 100%; height: 100%; border-radius: inherit;
  object-fit: cover; object-position: var(--pos, 30% 45%);
  filter: contrast(1.08) saturate(1.06) brightness(1.15);
  outline: 4px solid ${({ theme }) => theme.colors.border}; outline-offset: -4px;
  pointer-events: none; user-select: none; -webkit-user-drag: none;
`;

interface PortraitCircleProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  objectPosition?: string;
}

export default function PortraitCircle({
                                         src,
                                         srcSet,
                                         sizes,
                                         alt,
                                         objectPosition = "30% 45%"
                                       }: PortraitCircleProps) {
  return (
    <Wrap style={{ '--pos': objectPosition } as React.CSSProperties}>
      <Bg
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <Fg
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />
    </Wrap>
  );
}