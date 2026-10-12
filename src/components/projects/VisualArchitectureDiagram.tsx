import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ArrowDown,
  Play,
  RotateCcw,
  CheckCircle2,
  Server,
  Database,
  Smartphone,
  Cpu,
  Workflow,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';
import type { SystemArchitecture, Locale } from '../../types';

interface Props {
  systemArchitecture: SystemArchitecture;
}

export function VisualArchitectureDiagram({ systemArchitecture }: Props) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const c = colors[theme];

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false);

  const layerIcons = [Smartphone, Server, Cpu, Database];

  const handlePlayFlow = () => {
    if (!systemArchitecture.dataFlow || systemArchitecture.dataFlow.length === 0) return;
    setIsPlayingFlow(true);
    setActiveStep(1);

    const totalSteps = systemArchitecture.dataFlow.length;
    let current = 1;

    const interval = setInterval(() => {
      current += 1;
      if (current > totalSteps) {
        clearInterval(interval);
        setIsPlayingFlow(false);
      } else {
        setActiveStep(current);
      }
    }, 2800);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Step-by-Step Data Flow Simulator */}
      {systemArchitecture.dataFlow && systemArchitecture.dataFlow.length > 0 && (
        <div
          className="rounded-xl border p-5 transition-all"
          style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${c.border}60` }}>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg" style={{ backgroundColor: `${c.accent}20`, color: c.accent }}>
                <Workflow size={16} />
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.textPrimary }}>
                  {locale === 'es' ? 'Simulador del Flujo de Datos Arquitectónico' : 'Architectural Data Flow Simulator'}
                </h4>
                <p className="text-[11px]" style={{ color: c.textMuted }}>
                  {locale === 'es' ? 'Recorre cómo viajan las transacciones de punta a punta' : 'Inspect transaction trajectory from client to database'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayFlow}
                disabled={isPlayingFlow}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all disabled:opacity-50 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.accent,
                  borderColor: c.accent,
                  color: '#ffffff',
                }}
              >
                <Play size={12} fill="#ffffff" />
                {isPlayingFlow
                  ? (locale === 'es' ? 'Reproduciendo...' : 'Playing...')
                  : (locale === 'es' ? 'Reproducir Flujo' : 'Play Flow')}
              </button>
              {activeStep !== null && (
                <button
                  onClick={() => {
                    setActiveStep(null);
                    setIsPlayingFlow(false);
                  }}
                  className="p-1.5 rounded-lg border hover:opacity-100 opacity-70 transition-all text-xs"
                  style={{ backgroundColor: c.bgBase, borderColor: c.border, color: c.textSecondary }}
                  title={locale === 'es' ? 'Reiniciar' : 'Reset'}
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Stepper Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {systemArchitecture.dataFlow.map((flow) => {
              const isActive = activeStep === flow.step;
              return (
                <div
                  key={flow.step}
                  onClick={() => setActiveStep(flow.step)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isActive ? 'ring-2 scale-[1.01]' : 'hover:border-opacity-100 opacity-80'
                  }`}
                  style={{
                    backgroundColor: isActive ? c.bgBase : c.bgElevated,
                    borderColor: isActive ? c.accent : c.border,
                    // @ts-expect-error Tailwind ring color
                    '--tw-ring-color': c.accent,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{
                        backgroundColor: isActive ? c.accent : `${c.accent}20`,
                        color: isActive ? '#ffffff' : c.accent,
                      }}
                    >
                      {isActive ? <CheckCircle2 size={12} /> : flow.step}
                    </span>
                    <h5 className="font-semibold text-xs truncate" style={{ color: c.textPrimary }}>
                      {flow.title[locale as Locale]}
                    </h5>
                  </div>
                  <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: c.textSecondary }}>
                    {flow.desc[locale as Locale]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Step Deep Explanation Box */}
          <AnimatePresence>
            {activeStep !== null && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-3 border-t text-xs"
                style={{ borderColor: `${c.border}60` }}
              >
                {(() => {
                  const currentFlow = systemArchitecture.dataFlow?.find((f) => f.step === activeStep);
                  if (!currentFlow) return null;
                  return (
                    <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border" style={{ borderColor: `${c.accent}40` }}>
                      <div className="flex items-center gap-2 font-mono font-bold mb-1" style={{ color: c.accent }}>
                        <span>Paso {currentFlow.step}:</span>
                        <span>{currentFlow.title[locale as Locale]}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: c.textPrimary }}>
                        {currentFlow.desc[locale as Locale]}
                      </p>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Visual Block Diagram of Architectural Layers */}
      <div className="space-y-3">
        {systemArchitecture.layers.map((layer, idx) => {
          const Icon = layerIcons[idx] || Layers;
          const isSelected = selectedLayerIndex === idx;
          const layerColor = layer.color || c.accent;

          return (
            <div key={idx} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedLayerIndex(isSelected ? null : idx)}
                className={`rounded-xl border p-4.5 cursor-pointer transition-all ${
                  isSelected ? 'ring-2' : 'hover:scale-[1.005]'
                }`}
                style={{
                  backgroundColor: c.bgElevated,
                  borderColor: isSelected ? layerColor : c.border,
                  // @ts-expect-error Tailwind ring color
                  '--tw-ring-color': layerColor,
                }}
              >
                {/* Layer Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: `${c.border}50` }}>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="p-1.5 rounded-lg text-white"
                      style={{ backgroundColor: layerColor }}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide flex items-center gap-2" style={{ color: c.textPrimary }}>
                        {layer.name[locale as Locale]}
                      </h4>
                    </div>
                  </div>
                  {layer.badge && (
                    <span
                      className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${layerColor}15`,
                        borderColor: `${layerColor}40`,
                        color: layerColor,
                      }}
                    >
                      {typeof layer.badge === 'object' ? layer.badge[locale as Locale] : layer.badge}
                    </span>
                  )}
                </div>

                {/* Layer Components Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {layer.components.map((comp, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-lg border flex flex-col justify-between"
                      style={{ backgroundColor: c.bgBase, borderColor: c.border }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-xs leading-snug" style={{ color: c.textPrimary }}>
                            {typeof comp.name === 'object' ? comp.name[locale as Locale] : comp.name}
                          </span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: c.textSecondary }}>
                          {comp.desc[locale as Locale]}
                        </p>
                      </div>
                      {comp.tech && (
                        <div className="mt-2.5 pt-2 border-t flex justify-end" style={{ borderColor: `${c.border}40` }}>
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded border"
                            style={{
                              backgroundColor: `${layerColor}10`,
                              borderColor: `${layerColor}30`,
                              color: layerColor,
                            }}
                          >
                            {typeof comp.tech === 'object' ? comp.tech[locale as Locale] : comp.tech}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Connecting Pipe / Down Arrow between Layers */}
              {idx < systemArchitecture.layers.length - 1 && (
                <div className="flex justify-center my-1.5">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-full border shadow-xs"
                    style={{
                      backgroundColor: c.bgBase,
                      borderColor: c.border,
                      color: c.textMuted,
                    }}
                  >
                    <ArrowDown size={14} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
