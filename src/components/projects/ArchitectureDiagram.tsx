import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';
import type { Locale } from '../../types';

interface C4Props {
  diagram: {
    title: Record<Locale, string>;
    nodes: { id: string; label: string; desc: string; type: 'client' | 'api' | 'db' | 'service' }[];
    connections: { from: string; to: string; label: string }[];
  };
}

export function ArchitectureDiagram({ diagram }: C4Props) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const c = colors[theme];

  const typeColors = {
    client: { bg: `${c.accent}15`, border: c.accent, text: c.accent },
    api: { bg: '#8b5cf615', border: '#8b5cf6', text: '#a78bfa' },
    service: { bg: '#10b98115', border: '#10b981', text: '#34d399' },
    db: { bg: '#f59e0b15', border: '#f59e0b', text: '#fbbf24' },
  };

  return (
    <div className="rounded-xl border p-6 my-6" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
      <h4 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.accent }} />
        {diagram.title[locale as Locale]}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {diagram.nodes.map((node, i) => {
          const style = typeColors[node.type];
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg border flex flex-col justify-between"
              style={{ backgroundColor: style.bg, borderColor: style.border }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ color: style.text, border: `1px solid ${style.border}` }}>
                  {node.type}
                </span>
                <h5 className="font-bold text-sm mt-2 mb-1" style={{ color: c.textPrimary }}>
                  {node.label}
                </h5>
                <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
                  {node.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Connections List */}
      <div className="border-t pt-4" style={{ borderColor: c.border }}>
        <p className="text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: c.textMuted }}>
          Flujo de Transacciones & Protocolos:
        </p>
        <ul className="space-y-1.5 text-xs">
          {diagram.connections.map((conn, idx) => {
            const fromNode = diagram.nodes.find(n => n.id === conn.from);
            const toNode = diagram.nodes.find(n => n.id === conn.to);
            return (
              <li key={idx} className="flex items-center gap-2" style={{ color: c.textSecondary }}>
                <span className="font-mono px-1.5 py-0.5 rounded bg-black/20 text-xs" style={{ color: c.accent }}>
                  {fromNode?.label}
                </span>
                <span>➔</span>
                <span className="font-mono px-1.5 py-0.5 rounded bg-black/20 text-xs" style={{ color: c.accent }}>
                  {toNode?.label}
                </span>
                <span className="text-xs italic" style={{ color: c.textMuted }}>
                  ({conn.label})
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
