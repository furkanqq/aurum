import type { WatchFamily } from "@/lib/watchData";

function HourHandSVG({ highlight }: { highlight: string }) {
  return (
    <g>
      <polygon
        points="120,72 117,120 120,125 123,120"
        fill={highlight}
        opacity="0.9"
        style={{ transformOrigin: "120px 120px", transform: "rotate(-30deg)" }}
      />
      <polygon
        points="120,55 118.5,120 120,125 121.5,120"
        fill="#f0ede8"
        opacity="0.8"
        style={{ transformOrigin: "120px 120px", transform: "rotate(60deg)" }}
      />
      <line
        x1="120"
        y1="130"
        x2="120"
        y2="58"
        stroke="#ff4d1c"
        strokeWidth="0.8"
        opacity="0.9"
        style={{ transformOrigin: "120px 120px", transform: "rotate(130deg)" }}
      />
      <circle cx="120" cy="120" r="4" fill={highlight} />
      <circle cx="120" cy="120" r="2" fill="#080808" />
    </g>
  );
}

export default function WatchFaceIllustration({
  watch,
  index,
  className = "w-full h-full",
}: {
  watch: WatchFamily;
  index: number;
  className?: string;
}) {
  const isTourbillon = index === 3;
  const isMeridian = index === 2;

  return (
    <svg viewBox="0 0 240 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`dialGrad${index}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={watch.highlight} stopOpacity="0.15" />
          <stop offset="100%" stopColor={watch.accent} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`caseGrad${index}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#111111" />
        </radialGradient>
        <filter id={`glow${index}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="120" cy="124" r="96" fill="rgba(0,0,0,0.5)" />
      <circle cx="120" cy="120" r="96" fill={`url(#caseGrad${index})`} />
      <circle
        cx="120"
        cy="120"
        r="96"
        fill="none"
        stroke={watch.highlight}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />

      {[[-8, 50], [8, 50], [-8, 190], [8, 190]].map(([, y], i) => (
        <rect
          key={i}
          x={120 + (i % 2 === 0 ? -52 : 44)}
          y={y}
          width="8"
          height="18"
          rx="2"
          fill="#1a1a1a"
        />
      ))}

      <rect
        x="214"
        y="113"
        width="14"
        height="14"
        rx="3"
        fill="#2a2a2a"
        stroke={watch.highlight}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />

      <circle cx="120" cy="120" r="82" fill={`url(#dialGrad${index})`} />

      {index === 1 && (
        <g opacity="0.15">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="38"
              x2="120"
              y2="202"
              stroke={watch.highlight}
              strokeWidth="0.5"
              transform={`rotate(${i * 11.25} 120 120)`}
            />
          ))}
          {[20, 35, 50, 65].map((r, i) => (
            <circle
              key={i}
              cx="120"
              cy="120"
              r={r}
              fill="none"
              stroke={watch.highlight}
              strokeWidth="0.3"
            />
          ))}
        </g>
      )}

      {isMeridian && (
        <>
          <circle cx="120" cy="120" r="82" fill="none" stroke="#1a1a1a" strokeWidth="12" />
          <circle
            cx="120"
            cy="120"
            r="82"
            fill="none"
            stroke="#a8c5d0"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="40"
              x2="120"
              y2={i % 5 === 0 ? 47 : 44}
              stroke="#a8c5d0"
              strokeWidth={i % 5 === 0 ? "1.5" : "0.7"}
              strokeOpacity="0.7"
              transform={`rotate(${i * 6} 120 120)`}
            />
          ))}
        </>
      )}

      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 120 120)`}>
          <rect
            x="119"
            y={i % 3 === 0 ? 46 : 49}
            width="2"
            height={i % 3 === 0 ? 12 : 8}
            fill={watch.highlight}
            opacity={i % 3 === 0 ? 0.9 : 0.5}
          />
        </g>
      ))}

      <text
        x="120"
        y="95"
        textAnchor="middle"
        fill={watch.highlight}
        fontSize="7"
        fontFamily="serif"
        letterSpacing="3"
        opacity="0.9"
      >
        AURUM
      </text>
      <text
        x="120"
        y="107"
        textAnchor="middle"
        fill={watch.highlight}
        fontSize="4.5"
        fontFamily="monospace"
        letterSpacing="2"
        opacity="0.5"
      >
        GENÈVE
      </text>

      {isTourbillon && (
        <g transform="translate(120, 148)">
          <circle cx="0" cy="0" r="14" fill="none" stroke={watch.highlight} strokeWidth="0.8" strokeOpacity="0.7" />
          <circle cx="0" cy="0" r="10" fill="none" stroke={watch.highlight} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke={watch.highlight} strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke={watch.highlight} strokeWidth="0.5" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="2" fill={watch.highlight} opacity="0.8" />
        </g>
      )}

      {!isTourbillon && (
        <g transform="translate(148, 120)">
          <rect
            x="-8"
            y="-6"
            width="16"
            height="12"
            rx="1"
            fill="#0a0a0a"
            stroke={watch.highlight}
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <text
            x="0"
            y="4.5"
            textAnchor="middle"
            fill={watch.highlight}
            fontSize="7"
            fontFamily="monospace"
            opacity="0.9"
          >
            14
          </text>
        </g>
      )}

      <HourHandSVG highlight={watch.highlight} />

      {index === 1 && (
        <g transform="translate(120, 152)">
          <circle cx="0" cy="0" r="12" fill="none" stroke={watch.highlight} strokeWidth="0.5" strokeOpacity="0.3" />
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-9"
              x2="0"
              y2={i % 5 === 0 ? -7 : -8}
              stroke={watch.highlight}
              strokeWidth="0.5"
              strokeOpacity="0.5"
              transform={`rotate(${i * 6})`}
            />
          ))}
        </g>
      )}

      <path
        d="M 60 65 Q 120 55 180 70 L 185 75 Q 120 62 55 72 Z"
        fill="white"
        opacity="0.04"
      />
    </svg>
  );
}
