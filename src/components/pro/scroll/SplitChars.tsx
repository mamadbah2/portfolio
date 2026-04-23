'use client';

interface Props {
  text: string;
  startIndex?: number;
}

export default function SplitChars({ text, startIndex = 0 }: Props) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="char"
          style={{ ['--i' as string]: startIndex + i }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}
