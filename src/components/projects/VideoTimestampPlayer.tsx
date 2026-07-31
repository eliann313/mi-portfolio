import { useRef } from 'react';
import { Play } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';
import type { Locale, VideoTimestamp } from '../../types';

interface VideoPlayerProps {
  src: string;
  timestamps: VideoTimestamp[];
}

export function VideoTimestampPlayer({ src, timestamps }: VideoPlayerProps) {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="rounded-xl border p-6 my-6" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
      <h4 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
        <Play size={16} style={{ color: c.accent }} />
        {t.caseStudy.videoDemoTitle}
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 rounded-lg overflow-hidden border bg-black flex items-center justify-center"
          style={{ borderColor: c.border }}>
          <video
            ref={videoRef}
            src={src}
            controls
            className="w-full max-h-[420px] object-contain"
          />
        </div>

        {/* Timestamps Navigation Sidebar */}
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-xs uppercase tracking-wider mb-2" style={{ color: c.textMuted }}>
            {t.caseStudy.timestampsTitle}
          </h5>
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {timestamps.map((ts) => (
              <button
                key={ts.seconds}
                onClick={() => handleSeek(ts.seconds)}
                className="w-full text-left p-3 rounded-lg border flex items-start gap-3 transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: c.bgElevated,
                  borderColor: c.border,
                  cursor: 'pointer',
                }}
              >
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-bold flex-shrink-0"
                  style={{ backgroundColor: `${c.accent}20`, color: c.accent, border: `1px solid ${c.accentBorder}` }}
                >
                  {ts.timeLabel}
                </span>
                <div>
                  <h6 className="font-bold text-xs mb-0.5" style={{ color: c.textPrimary }}>
                    {ts.title[locale as Locale]}
                  </h6>
                  <p className="text-[11px] leading-tight" style={{ color: c.textSecondary }}>
                    {ts.description[locale as Locale]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
