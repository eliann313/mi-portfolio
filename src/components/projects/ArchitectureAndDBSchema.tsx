import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, Key, ArrowRight, ShieldCheck, Server, Box } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';
import type { CaseStudyDBSchema, SystemArchitecture, Locale } from '../../types';

interface Props {
  dbSchema?: CaseStudyDBSchema;
  systemArchitecture?: SystemArchitecture;
}

export function ArchitectureAndDBSchema({ dbSchema, systemArchitecture }: Props) {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  // Default to architecture if present, otherwise schema
  const [activeTab, setActiveTab] = useState<'architecture' | 'schema'>(
    systemArchitecture ? 'architecture' : 'schema'
  );

  const [selectedTable, setSelectedTable] = useState<string | null>(
    dbSchema?.tables[0]?.name || null
  );

  const [filterDomain, setFilterDomain] = useState<string>('all');

  if (!dbSchema && !systemArchitecture) {
    return null;
  }

  const allDomains = dbSchema
    ? Array.from(new Set(dbSchema.tables.map((t) => t.domain).filter(Boolean)))
    : [];

  const filteredTables = dbSchema
    ? filterDomain === 'all'
      ? dbSchema.tables
      : dbSchema.tables.filter((t) => t.domain === filterDomain)
    : [];

  return (
    <div className="rounded-2xl border p-6 my-10 shadow-sm" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
      {/* Header and Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: c.border }}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2.5" style={{ color: c.textPrimary }}>
            <span className="p-2 rounded-lg" style={{ backgroundColor: `${c.accent}15`, color: c.accent }}>
              {activeTab === 'architecture' ? <Layers size={20} /> : <Database size={20} />}
            </span>
            {activeTab === 'architecture'
              ? systemArchitecture?.title[locale as Locale] || t.caseStudy.tabArchitecture
              : dbSchema?.title[locale as Locale] || t.caseStudy.tabSchema}
          </h3>
          <p className="text-xs mt-1.5 leading-relaxed max-w-2xl" style={{ color: c.textSecondary }}>
            {activeTab === 'architecture'
              ? systemArchitecture?.summary[locale as Locale]
              : dbSchema?.overview[locale as Locale]}
          </p>
        </div>

        {/* Tab Pills */}
        {systemArchitecture && dbSchema && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl self-start sm:self-center border" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'architecture' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: activeTab === 'architecture' ? c.accent : 'transparent',
                color: activeTab === 'architecture' ? '#ffffff' : c.textSecondary,
              }}
            >
              <Layers size={14} />
              {t.caseStudy.tabArchitecture || 'Arquitectura'}
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'schema' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: activeTab === 'schema' ? c.accent : 'transparent',
                color: activeTab === 'schema' ? '#ffffff' : c.textSecondary,
              }}
            >
              <Database size={14} />
              {t.caseStudy.tabSchema || 'Esquema PostgreSQL'}
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: System Architecture */}
      {activeTab === 'architecture' && systemArchitecture && (
        <div className="pt-6 space-y-8">
          {/* Layer Cards */}
          <div className="space-y-4">
            {systemArchitecture.layers.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-xl border p-4.5"
                style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: `${c.border}60` }}>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: layer.color || c.accent }}
                    />
                    <h4 className="text-sm font-bold tracking-wide" style={{ color: c.textPrimary }}>
                      {layer.name[locale as Locale]}
                    </h4>
                  </div>
                  {layer.badge && (
                    <span
                      className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${layer.color || c.accent}15`,
                        borderColor: `${layer.color || c.accent}40`,
                        color: layer.color || c.accent,
                      }}
                    >
                      {layer.badge}
                    </span>
                  )}
                </div>

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
                            {comp.name}
                          </span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: c.textSecondary }}>
                          {comp.desc[locale as Locale]}
                        </p>
                      </div>
                      {comp.tech && (
                        <div className="mt-2.5 pt-2 border-t flex justify-end" style={{ borderColor: `${c.border}40` }}>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.textMuted }}>
                            {comp.tech}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Data Flow Pipeline */}
          {systemArchitecture.dataFlow && systemArchitecture.dataFlow.length > 0 && (
            <div className="rounded-xl border p-5" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: c.accent }}>
                <ArrowRight size={14} />
                Flujo Transaccional de Datos de Punta a Punta
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                {systemArchitecture.dataFlow.map((flow) => (
                  <div
                    key={flow.step}
                    className="p-3.5 rounded-lg border relative flex flex-col justify-between"
                    style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                          style={{ backgroundColor: c.accent, color: '#ffffff' }}
                        >
                          {flow.step}
                        </span>
                        <h5 className="font-semibold text-xs" style={{ color: c.textPrimary }}>
                          {flow.title[locale as Locale]}
                        </h5>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: c.textSecondary }}>
                        {flow.desc[locale as Locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: PostgreSQL Relational Schema (ERD) */}
      {activeTab === 'schema' && dbSchema && (
        <div className="pt-6 space-y-6">
          {/* Engine Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border" style={{ backgroundColor: c.bgElevated, borderColor: c.border }}>
            <div className="flex items-center gap-2.5">
              <Server size={16} style={{ color: c.accent }} />
              <span className="text-xs font-mono font-medium" style={{ color: c.textPrimary }}>
                {dbSchema.engine}
              </span>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
              {dbSchema.tables.length} Tablas Relacionales Verificadas
            </span>
          </div>

          {/* Domain Filter Pills */}
          {allDomains.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium mr-1" style={{ color: c.textMuted }}>
                Dominios:
              </span>
              <button
                onClick={() => setFilterDomain('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                  filterDomain === 'all' ? 'font-bold' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: filterDomain === 'all' ? c.accent : c.bgElevated,
                  borderColor: filterDomain === 'all' ? c.accent : c.border,
                  color: filterDomain === 'all' ? '#ffffff' : c.textSecondary,
                }}
              >
                Todos ({dbSchema.tables.length})
              </button>
              {allDomains.map((dom) => {
                const count = dbSchema.tables.filter((t) => t.domain === dom).length;
                return (
                  <button
                    key={dom}
                    onClick={() => setFilterDomain(dom as string)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                      filterDomain === dom ? 'font-bold' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: filterDomain === dom ? c.accent : c.bgElevated,
                      borderColor: filterDomain === dom ? c.accent : c.border,
                      color: filterDomain === dom ? '#ffffff' : c.textSecondary,
                    }}
                  >
                    {dom} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTables.map((table) => {
              const isSelected = selectedTable === table.name;
              return (
                <motion.div
                  key={table.name}
                  onClick={() => setSelectedTable(table.name)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    isSelected ? 'ring-2' : 'hover:border-opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected ? c.bgElevated : c.bgBase,
                    borderColor: isSelected ? c.accent : c.border,
                    // @ts-expect-error Tailwind custom ring color
                    '--tw-ring-color': c.accent,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm flex items-center gap-1.5" style={{ color: c.textPrimary }}>
                      <Box size={14} style={{ color: c.accent }} />
                      {table.name}
                    </span>
                    {table.domain && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-black/10 dark:bg-white/10" style={{ color: c.accent, borderColor: `${c.accent}40` }}>
                        {table.domain}
                      </span>
                    )}
                  </div>

                  {table.description && (
                    <p className="text-[11px] leading-relaxed mb-3 line-clamp-2" style={{ color: c.textSecondary }}>
                      {table.description[locale as Locale]}
                    </p>
                  )}

                  <div className="space-y-1 pt-2 border-t font-mono text-[11px]" style={{ borderColor: `${c.border}60` }}>
                    {table.columns.slice(0, 4).map((col) => (
                      <div key={col.name} className="flex items-center justify-between text-xs py-0.5">
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: c.textPrimary }}>
                          {col.isPk && <Key size={10} className="text-amber-400" />}
                          {col.isFk && <span className="text-blue-400 font-bold text-[10px]">FK</span>}
                          {col.name}
                        </span>
                        <span className="text-[10px]" style={{ color: c.textMuted }}>
                          {col.type}
                        </span>
                      </div>
                    ))}
                    {table.columns.length > 4 && (
                      <p className="text-[10px] pt-1 italic text-right" style={{ color: c.textMuted }}>
                        +{table.columns.length - 4} columnas más...
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Table Inspector Modal / Detail */}
          <AnimatePresence>
            {selectedTable && (
              <motion.div
                key={selectedTable}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl border p-5 mt-6"
                style={{ backgroundColor: c.bgElevated, borderColor: c.accent }}
              >
                {(() => {
                  const tableObj = dbSchema.tables.find((t) => t.name === selectedTable);
                  if (!tableObj) return null;
                  return (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-mono text-base font-bold" style={{ color: c.textPrimary }}>
                            Tabla: {tableObj.name}
                          </h4>
                          {tableObj.domain && (
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.accent }}>
                              Dominio: {tableObj.domain}
                            </span>
                          )}
                        </div>
                        <span className="text-xs" style={{ color: c.textMuted }}>
                          {tableObj.columns.length} columnas declaradas
                        </span>
                      </div>

                      {tableObj.description && (
                        <p className="text-xs mb-4 leading-relaxed" style={{ color: c.textSecondary }}>
                          {tableObj.description[locale as Locale]}
                        </p>
                      )}

                      {/* Columns Table */}
                      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: c.border }}>
                        <table className="w-full text-left font-mono text-xs">
                          <thead style={{ backgroundColor: c.bgBase, color: c.textMuted }}>
                            <tr>
                              <th className="p-2.5">Columna</th>
                              <th className="p-2.5">Tipo de Dato</th>
                              <th className="p-2.5">Atributos / Claves</th>
                              <th className="p-2.5">Referencia (FK)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y" style={{ borderColor: c.border }}>
                            {tableObj.columns.map((col) => (
                              <tr key={col.name} className="hover:bg-white/5 transition-colors">
                                <td className="p-2.5 font-semibold flex items-center gap-1.5" style={{ color: c.textPrimary }}>
                                  {col.isPk && <Key size={12} className="text-amber-400" />}
                                  {col.name}
                                </td>
                                <td className="p-2.5" style={{ color: c.accent }}>
                                  {col.type}
                                </td>
                                <td className="p-2.5">
                                  {col.isPk && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 mr-1">
                                      PK
                                    </span>
                                  )}
                                  {col.isFk && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 mr-1">
                                      FK
                                    </span>
                                  )}
                                  {col.isUnique && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300">
                                      UNIQUE
                                    </span>
                                  )}
                                </td>
                                <td className="p-2.5 text-[11px]" style={{ color: c.textMuted }}>
                                  {col.ref || '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Relationships Explorer */}
          {dbSchema.relationships && dbSchema.relationships.length > 0 && (
            <div className="rounded-xl border p-4.5" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: c.textPrimary }}>
                <ShieldCheck size={14} style={{ color: c.accent }} />
                Relaciones de Integridad Referencial (Foreign Keys & Cardinalidad)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                {dbSchema.relationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border flex items-center justify-between"
                    style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold" style={{ color: c.accent }}>
                        {rel.from}
                      </span>
                      <span style={{ color: c.textMuted }}>➔</span>
                      <span className="font-bold" style={{ color: c.accent }}>
                        {rel.to}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.textSecondary }}>
                        {rel.type}
                      </span>
                    </div>
                    <span className="text-[11px] truncate ml-2 italic" style={{ color: c.textMuted }}>
                      {rel.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
