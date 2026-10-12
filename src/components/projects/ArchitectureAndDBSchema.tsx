import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, Key, ShieldCheck, Server, Box, Network, LayoutGrid, ChevronRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';
import type { CaseStudyDBSchema, SystemArchitecture, Locale } from '../../types';
import { InteractiveERDDiagram } from './InteractiveERDDiagram';
import { VisualArchitectureDiagram } from './VisualArchitectureDiagram';

interface Props {
  dbSchema?: CaseStudyDBSchema;
  systemArchitecture?: SystemArchitecture;
}

export function ArchitectureAndDBSchema({ dbSchema, systemArchitecture }: Props) {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];
  const inspectorRef = useRef<HTMLDivElement>(null);

  // Default to database schema (ERD) if present, otherwise system architecture
  const [activeTab, setActiveTab] = useState<'schema' | 'architecture'>(
    dbSchema ? 'schema' : 'architecture'
  );

  // Sub-view mode for schema: tabular inspector (default) or visual diagram
  const [schemaViewMode, setSchemaViewMode] = useState<'inspector' | 'diagram'>('inspector');

  const [selectedTable, setSelectedTable] = useState<string | null>(
    dbSchema?.tables[0]?.name || null
  );

  const [filterDomain, setFilterDomain] = useState<string>('all');

  const allDomains = useMemo(
    () => (dbSchema ? Array.from(new Set(dbSchema.tables.map((t) => t.domain).filter(Boolean))) : []),
    [dbSchema]
  );

  const filteredTables = useMemo(
    () =>
      dbSchema
        ? filterDomain === 'all'
          ? dbSchema.tables
          : dbSchema.tables.filter((t) => t.domain === filterDomain)
        : [],
    [dbSchema, filterDomain]
  );

  useEffect(() => {
    if (filteredTables.length > 0 && !filteredTables.some((t) => t.name === selectedTable)) {
      setSelectedTable(filteredTables[0].name);
    }
  }, [filteredTables, selectedTable]);

  if (!dbSchema && !systemArchitecture) {
    return null;
  }

  return (
    <div className="rounded-2xl border p-6 my-10 shadow-sm" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
      {/* Header and Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: c.border }}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2.5" style={{ color: c.textPrimary }}>
            <span className="p-2 rounded-lg" style={{ backgroundColor: `${c.accent}15`, color: c.accent }}>
              {activeTab === 'schema' ? <Database size={20} /> : <Layers size={20} />}
            </span>
            {activeTab === 'schema'
              ? dbSchema?.title[locale as Locale] || t.caseStudy.tabSchema
              : systemArchitecture?.title[locale as Locale] || t.caseStudy.tabArchitecture}
          </h3>
          <p className="text-xs mt-1.5 leading-relaxed max-w-2xl" style={{ color: c.textSecondary }}>
            {activeTab === 'schema'
              ? dbSchema?.overview[locale as Locale]
              : systemArchitecture?.summary[locale as Locale]}
          </p>
        </div>

        {/* Tab Pills: Schema (Primary) and Architecture (Secondary) */}
        {systemArchitecture && dbSchema && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl self-start sm:self-center border" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
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
              {t.caseStudy.tabSchema || (locale === 'es' ? 'Modelo PostgreSQL (ERD)' : 'PostgreSQL Schema (ERD)')}
            </button>
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
              {t.caseStudy.tabArchitecture || (locale === 'es' ? 'Arquitectura del Sistema' : 'System Architecture')}
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: System Architecture */}
      {activeTab === 'architecture' && systemArchitecture && (
        <div className="pt-6">
          <VisualArchitectureDiagram systemArchitecture={systemArchitecture} />
        </div>
      )}

      {/* Tab 2: PostgreSQL Relational Schema (ERD) */}
      {activeTab === 'schema' && dbSchema && (
        <div className="pt-6 space-y-6">
          {/* Engine Banner & Sub-View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border" style={{ backgroundColor: c.bgElevated, borderColor: c.border }}>
            <div className="flex items-center gap-2.5">
              <Server size={16} style={{ color: c.accent }} />
              <span className="text-xs font-mono font-medium" style={{ color: c.textPrimary }}>
                {dbSchema.engine}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium hidden sm:inline">
                {dbSchema.tables.length} {locale === 'es' ? 'Tablas Relacionales Verificadas' : 'Verified Relational Tables'}
              </span>

              {/* View Switcher Pills */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg border" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
                <button
                  onClick={() => setSchemaViewMode('inspector')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    schemaViewMode === 'inspector' ? 'shadow-xs font-bold' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: schemaViewMode === 'inspector' ? c.accent : 'transparent',
                    color: schemaViewMode === 'inspector' ? '#ffffff' : c.textSecondary,
                  }}
                  title={t.caseStudy.viewTableInspector || (locale === 'es' ? 'Inspector y Diccionario' : 'Inspector & Dictionary')}
                >
                  <LayoutGrid size={13} />
                  <span>{t.caseStudy.viewTableInspector || (locale === 'es' ? 'Inspector y Diccionario' : 'Inspector & Dictionary')}</span>
                </button>
                <button
                  onClick={() => setSchemaViewMode('diagram')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    schemaViewMode === 'diagram' ? 'shadow-xs font-bold' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: schemaViewMode === 'diagram' ? c.accent : 'transparent',
                    color: schemaViewMode === 'diagram' ? '#ffffff' : c.textSecondary,
                  }}
                  title={t.caseStudy.viewErdDiagram || 'Grafo Visual ERD'}
                >
                  <Network size={13} />
                  <span>{t.caseStudy.viewErdDiagram || 'Grafo Visual ERD'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-View 1: Interactive ERD Diagram (SVG Graph) */}
          {schemaViewMode === 'diagram' && (
            <InteractiveERDDiagram
              dbSchema={dbSchema}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
              onSwitchToInspector={() => setSchemaViewMode('inspector')}
            />
          )}

          {/* Sub-View 2: Tabular Cards & Column Inspector */}
          {schemaViewMode === 'inspector' && (
            <div className="space-y-6">
              {/* Domain Filter Pills */}
              {allDomains.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium mr-1" style={{ color: c.textMuted }}>
                    {locale === 'es' ? 'Dominios:' : 'Domains:'}
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
                    {locale === 'es' ? 'Todos' : 'All'} ({dbSchema.tables.length})
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

              {/* Master-Detail Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left Column (Master): Scrollable Tables List */}
                <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between" style={{ color: c.textMuted }}>
                    <span>{locale === 'en' ? 'Tables' : 'Tablas'} ({filteredTables.length})</span>
                    <span className="text-[11px] font-normal lowercase">{locale === 'en' ? 'click to inspect' : 'click para inspeccionar'}</span>
                  </div>
                  {filteredTables.map((table) => {
                    const isSelected = selectedTable === table.name;
                    return (
                      <motion.div
                        key={table.name}
                        onClick={() => {
                          setSelectedTable(table.name);
                          if (typeof window !== 'undefined' && window.innerWidth < 1024 && inspectorRef.current) {
                            inspectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className={`rounded-xl border p-3.5 cursor-pointer transition-all ${
                          isSelected ? 'ring-2 shadow-sm' : 'hover:border-opacity-100 opacity-90 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: isSelected ? c.bgElevated : c.bgBase,
                          borderColor: isSelected ? c.accent : c.border,
                          // @ts-expect-error Tailwind custom ring color
                          '--tw-ring-color': c.accent,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono font-bold text-xs flex items-center gap-1.5" style={{ color: isSelected ? c.accent : c.textPrimary }}>
                            <Box size={13} style={{ color: c.accent }} />
                            {table.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {table.domain && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-black/10 dark:bg-white/10" style={{ color: c.accent, borderColor: `${c.accent}40` }}>
                                {table.domain}
                              </span>
                            )}
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5" style={{ color: c.textMuted }}>
                              {table.columns.length} cols
                            </span>
                            <ChevronRight size={13} className={`transition-transform ${isSelected ? 'rotate-90' : 'opacity-40'}`} style={{ color: isSelected ? c.accent : c.textMuted }} />
                          </div>
                        </div>

                        {table.description && (
                          <p className="text-[11px] leading-snug mb-2 line-clamp-2" style={{ color: c.textSecondary }}>
                            {table.description[locale as Locale]}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                          {table.columns.slice(0, 3).map((col) => (
                            <span
                              key={col.name}
                              className="px-1.5 py-0.5 rounded inline-flex items-center gap-1 border"
                              style={{ backgroundColor: c.bgSurface, borderColor: c.border, color: c.textMuted }}
                            >
                              {col.isPk && <Key size={9} className="text-amber-400" />}
                              {col.isFk && <span className="text-blue-400 font-bold text-[9px]">FK</span>}
                              <span className="truncate max-w-[80px]">{col.name}</span>
                            </span>
                          ))}
                          {table.columns.length > 3 && (
                            <span className="text-[10px] px-1 py-0.5 self-center italic" style={{ color: c.textMuted }}>
                              +{table.columns.length - 3} {locale === 'es' ? 'más' : 'more'}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Column (Detail): Sticky Real-time Table Inspector */}
                <div ref={inspectorRef} className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
                  {(() => {
                    const tableObj = dbSchema.tables.find((t) => t.name === selectedTable) || filteredTables[0] || dbSchema.tables[0];
                    if (!tableObj) return null;

                    const tableRelationships = dbSchema.relationships?.filter(
                      (rel) => rel.from === tableObj.name || rel.to === tableObj.name
                    ) || [];

                    return (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={tableObj.name}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="rounded-xl border p-5 shadow-sm"
                          style={{ backgroundColor: c.bgElevated, borderColor: c.accent }}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b" style={{ borderColor: c.border }}>
                            <div className="flex items-center gap-2">
                              <h4 className="font-mono text-base font-bold flex items-center gap-1.5" style={{ color: c.textPrimary }}>
                                <Box size={16} style={{ color: c.accent }} />
                                {tableObj.name}
                              </h4>
                              {tableObj.domain && (
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.accent }}>
                                  {tableObj.domain}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-mono px-2 py-0.5 rounded border" style={{ borderColor: c.border, color: c.textMuted }}>
                              {tableObj.columns.length} {locale === 'en' ? 'columns declared' : 'columnas declaradas'}
                            </span>
                          </div>

                          {tableObj.description && (
                            <p className="text-xs mb-4 leading-relaxed" style={{ color: c.textSecondary }}>
                              {tableObj.description[locale as Locale]}
                            </p>
                          )}

                          {/* Columns Table */}
                          <div className="overflow-x-auto rounded-lg border max-h-[360px] overflow-y-auto" style={{ borderColor: c.border }}>
                            <table className="w-full text-left font-mono text-xs">
                              <thead className="sticky top-0 z-10" style={{ backgroundColor: c.bgBase, color: c.textMuted }}>
                                <tr>
                                  <th className="p-2.5">{locale === 'en' ? 'Column' : 'Columna'}</th>
                                  <th className="p-2.5">{locale === 'en' ? 'Data Type' : 'Tipo de Dato'}</th>
                                  <th className="p-2.5">{locale === 'en' ? 'Attributes / Keys' : 'Atributos / Claves'}</th>
                                  <th className="p-2.5">{locale === 'en' ? 'Reference (FK)' : 'Referencia (FK)'}</th>
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
                                      {!col.isPk && !col.isFk && !col.isUnique && (
                                        <span className="text-[11px]" style={{ color: c.textMuted }}>—</span>
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

                          {/* Direct relationships of this table */}
                          {tableRelationships.length > 0 && (
                            <div className="pt-3.5 mt-3.5 border-t" style={{ borderColor: `${c.border}70` }}>
                              <h5 className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: c.textMuted }}>
                                <ShieldCheck size={12} style={{ color: c.accent }} />
                                {locale === 'en' ? 'Direct Table Relationships' : 'Relaciones Directas de la Tabla'}
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {tableRelationships.map((rel, idx) => (
                                  <div
                                    key={idx}
                                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg border flex items-center gap-1.5"
                                    style={{ backgroundColor: c.bgBase, borderColor: c.border }}
                                  >
                                    <span className={rel.from === tableObj.name ? 'font-bold' : ''} style={{ color: rel.from === tableObj.name ? c.accent : c.textSecondary }}>
                                      {rel.from}
                                    </span>
                                    <span style={{ color: c.textMuted }}>➔</span>
                                    <span className={rel.to === tableObj.name ? 'font-bold' : ''} style={{ color: rel.to === tableObj.name ? c.accent : c.textSecondary }}>
                                      {rel.to}
                                    </span>
                                    <span className="text-[10px] px-1 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.accent }}>
                                      {rel.type}
                                    </span>
                                    <span className="text-[10px] italic" style={{ color: c.textMuted }}>
                                      ({rel.label})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    );
                  })()}
                </div>
              </div>

              {/* All System Relationships Explorer */}
              {dbSchema.relationships && dbSchema.relationships.length > 0 && (
                <div className="rounded-xl border p-4.5" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: c.textPrimary }}>
                    <ShieldCheck size={14} style={{ color: c.accent }} />
                    {locale === 'en'
                      ? 'Referential Integrity & Cardinality Map (All Foreign Keys)'
                      : 'Mapa Global de Integridad Referencial (Foreign Keys y Cardinalidad)'}
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
      )}
    </div>
  );
}
