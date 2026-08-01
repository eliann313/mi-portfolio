import type { SVGProps } from 'react';

/** Clean, High-Legibility Official C# Logo (C# in C# Purple #9B4F96) */
export function CSharpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      {/* Background Rounded Tag / Hexagon in C# Purple */}
      <rect x="1" y="2" width="22" height="20" rx="4" fill="#9B4F96" />
      {/* Large, Sharp C# Text Mark */}
      <path
        fill="#FFFFFF"
        d="M9.2 15.5c-2.4 0-4.2-1.8-4.2-4.5s1.8-4.5 4.2-4.5c1.6 0 3 .8 3.7 2.2l-1.9 1c-.4-.8-1.1-1.2-1.8-1.2-1.3 0-2.2 1.1-2.2 2.5s.9 2.5 2.2 2.5c.7 0 1.4-.4 1.8-1.2l1.9 1c-.7 1.4-2.1 2.2-3.7 2.2zm6-1.2h-1.1l.4-1.8h-1.6l-.4 1.8h-1.1l.4-1.8h-1.2l.2-1h1.2l.4-1.7h-1.2l.2-1h1.2l.4-1.8h1.1l-.4 1.8h1.6l.4-1.8h1.1l-.4 1.8h1.2l-.2 1h-1.2l-.4 1.7h1.2l-.2 1h-1.2l-.4 1.8zm-.7-2.8l.4-1.7h-1.6l-.4 1.7h1.6z"
      />
    </svg>
  );
}

/** Official Playwright Two-Masks (Green Comedy Mask + Red Drama Mask) Logo */
export function PlaywrightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 36 24" width="1.4em" height="1em" fill="none" {...props}>
      {/* Left Mask: Green Comedy Mask */}
      <g id="green-mask">
        {/* Mask shape */}
        <path
          fill="#45BA4B"
          d="M13 2C6.9 2 2 6.9 2 13c0 4.8 3.1 8.9 7.4 10.3l1.1-2.4C7 19.8 4.5 16.7 4.5 13c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5c0 1.8-.6 3.5-1.6 4.9l1.8 1.4c1.4-1.8 2.3-4 2.3-6.3 0-6.1-4.9-11-11-11z"
        />
        {/* Eyes */}
        <circle cx="8.5" cy="11.5" r="1.5" fill="#2EAD33" />
        <circle cx="15.5" cy="11.5" r="1.5" fill="#2EAD33" />
        {/* Smile */}
        <path d="M8.5 15.5c1.2 1.5 3.8 1.5 5 0" stroke="#2EAD33" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Right Mask: Red Drama Mask */}
      <g id="red-mask">
        {/* Mask shape */}
        <path
          fill="#E00000"
          d="M23 6c-4.8 0-8.9 3.1-10.3 7.4l2.4 1.1c1.1-3.5 4.2-6 7.9-6 4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5c-1.8 0-3.5-.6-4.9-1.6l-1.4 1.8c1.8 1.4 4 2.3 6.3 2.3 6.1 0 11-4.9 11-11S29.1 6 23 6z"
        />
        {/* Eyes */}
        <circle cx="19.5" cy="15.5" r="1.3" fill="#B30000" />
        <circle cx="26.5" cy="15.5" r="1.3" fill="#B30000" />
        {/* Expression */}
        <path d="M20 20c1-.8 3-.8 4 0" stroke="#B30000" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Official Alembic Database Migrations Green Distillation Flask Logo */
export function AlembicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path fill="#6BA539" d="M6 22h12a1 1 0 0 0 .8-1.6l-5.3-7.1V6h1.5a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2H11.5v7.3L6.2 20.4A1 1 0 0 0 6 22zm5.5-14h1v5a1 1 0 0 0 .2.6l4 5.4H7.3l4-5.4a1 1 0 0 0 .2-.6V8z"/>
    </svg>
  );
}

/** Official Neon Postgres Lime Green Logo */
export function NeonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path fill="#00E599" d="M4 4h4.5l7.5 11.5V4H20v16h-4.5L8 8.5V20H4V4z"/>
    </svg>
  );
}

/** Official SQLAlchemy Flame Cube Logo */
export function SQLAlchemyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path fill="#D71F00" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l6.7 3.3L12 11.4 5.3 8.1 12 4.8zM4 9.6l7 3.5v7.1l-7-3.5V9.6zm16 7.1l-7 3.5v-7.1l7-3.5v7.1z"/>
    </svg>
  );
}
