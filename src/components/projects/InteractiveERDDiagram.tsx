import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Lightbulb,
  Box,
  Layers,
  ArrowRight,
  HelpCircle,
  Move,
  X,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';
import type { CaseStudyDBSchema, Locale, CaseStudyTable } from '../../types';
import { erdInterviewInsights } from '../../data/erdInterviewInsights';

interface Props {
  dbSchema: CaseStudyDBSchema;
  selectedTable: string | null;
  onSelectTable: (tableName: string) => void;
  onSwitchToInspector?: () => void;
}

const NODE_WIDTH = 230;

// Curated layout positions for clean, non-crossing relational diagrams
const defaultLayouts: Record<string, { x: number; y: number }> = {
  // GridHub WMS (Estructura topológica y operativa estrictamente planar)
  client: { x: 50, y: 140 },
  warehouse: { x: 360, y: 140 },
  pickertable: { x: 680, y: 50 },
  location: { x: 680, y: 240 },
  replenishmentrule: { x: 1000, y: 240 },
  item: { x: 360, y: 440 },
  lot: { x: 360, y: 640 },
  stock: { x: 680, y: 540 },
  stockmovement: { x: 1000, y: 540 },
  order: { x: 1320, y: 240 },
  orderline: { x: 1640, y: 80 },
  task: { x: 1640, y: 240 },
  orderfulfillment: { x: 1640, y: 400 },
  erp_outbound_event: { x: 1960, y: 400 },

  // SkillRadar (User en centro; perfil/candidato a la izquierda; simulador/reclutador a la derecha)
  JobMatch: { x: 60, y: 70 },
  Resume: { x: 380, y: 70 },
  GithubAnalysis: { x: 380, y: 280 },
  ContactRequest: { x: 380, y: 490 },
  User: { x: 740, y: 280 },
  InterviewSession: { x: 1100, y: 70 },
  RoadmapTask: { x: 1100, y: 280 },
  JobPosting: { x: 1100, y: 490 },
  JobPostingApplication: { x: 1460, y: 490 },
  InterviewScorecard: { x: 1820, y: 490 },

  // Prop² (usuario a la izquierda; flujo directo a publicacion y sub-entidades)
  usuario: { x: 60, y: 300 },
  token_verificacion: { x: 60, y: 80 },
  favorito: { x: 60, y: 520 },
  publicacion: { x: 380, y: 300 },
  imagen_publicacion: { x: 700, y: 80 },
  publicacion_caracteristica: { x: 700, y: 300 },
  caracteristica: { x: 1020, y: 300 },
  mensaje_contacto: { x: 700, y: 520 },
};

const domainColors: Record<string, string> = {
  admin: '#8B5CF6',
  auth: '#8B5CF6',
  warehouse: '#3B82F6',
  catalog: '#06B6D4',
  inventory: '#10B981',
  operations: '#F59E0B',
  integration: '#EC4899',
  properties: '#3B82F6',
  media: '#8B5CF6',
  crm: '#14B8A6',
  social: '#F43F5E',
  cv: '#6366F1',
  matching: '#06B6D4',
  analytics: '#3B82F6',
  simulator: '#F59E0B',
  recruiter: '#EC4899',
  copilot: '#10B981',
};

export function InteractiveERDDiagram({
  dbSchema,
  selectedTable,
  onSelectTable,
  onSwitchToInspector,
}: Props) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const c = colors[theme];
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize node positions
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const initial: Record<string, { x: number; y: number }> = {};
    dbSchema.tables.forEach((t, idx) => {
      if (defaultLayouts[t.name]) {
        initial[t.name] = { ...defaultLayouts[t.name] };
      } else {
        initial[t.name] = {
          x: 40 + (idx % 4) * 290,
          y: 70 + Math.floor(idx / 4) * 230,
        };
      }
    });
    return initial;
  });

  const [scale, setScale] = useState<number>(0.65);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 30, y: 30 });
  const [isPanning, setIsPanning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);
  const [hoveredRelationship, setHoveredRelationship] = useState<string | null>(null);
  const [filterDomain, setFilterDomain] = useState<string>('all');

  // Dragging individual nodes
  const [draggingNode, setDraggingNode] = useState<{
    name: string;
    startX: number;
    startY: number;
    initialNodeX: number;
    initialNodeY: number;
  } | null>(null);

  const startPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Calculate table node height based on column count
  const getNodeHeight = (table: CaseStudyTable) => {
    const visibleCols = Math.min(table.columns.length, 5);
    return 36 + visibleCols * 22 + (table.columns.length > 5 ? 20 : 8);
  };

  // Connected tables to hovered or selected table
  const activeFocusTable = hoveredTable || selectedTable;

  const connectedTables = useMemo(() => {
    if (!activeFocusTable) return new Set<string>();
    const set = new Set<string>();
    set.add(activeFocusTable);
    dbSchema.relationships.forEach((rel) => {
      if (rel.from === activeFocusTable) set.add(rel.to);
      if (rel.to === activeFocusTable) set.add(rel.from);
    });
    return set;
  }, [activeFocusTable, dbSchema.relationships]);

  // All unique domains
  const allDomains = useMemo(() => {
    return Array.from(new Set(dbSchema.tables.map((t) => t.domain).filter(Boolean))) as string[];
  }, [dbSchema.tables]);

  // Mouse pan event handlers
  const handleMouseDownBackground = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPanRef.current.x,
        y: e.clientY - startPanRef.current.y,
      });
    } else if (draggingNode) {
      const dx = (e.clientX - draggingNode.startX) / scale;
      const dy = (e.clientY - draggingNode.startY) / scale;
      setPositions((prev) => ({
        ...prev,
        [draggingNode.name]: {
          x: Math.max(0, Math.round(draggingNode.initialNodeX + dx)),
          y: Math.max(0, Math.round(draggingNode.initialNodeY + dy)),
        },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNode(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsPanning(false);
      setDraggingNode(null);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => Math.min(Math.max(s - e.deltaY * 0.001, 0.45), 1.5));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleResetView = () => {
    setScale(0.65);
    setPan({ x: 30, y: 30 });
    // Reset positions to defaults
    const reset: Record<string, { x: number; y: number }> = {};
    dbSchema.tables.forEach((t, idx) => {
      if (defaultLayouts[t.name]) {
        reset[t.name] = { ...defaultLayouts[t.name] };
      } else {
        reset[t.name] = {
          x: 40 + (idx % 4) * 290,
          y: 70 + Math.floor(idx / 4) * 230,
        };
      }
    });
    setPositions(reset);
  };

  // Calculate canvas dimensions
  const canvasWidth = useMemo(() => {
    let max = 2400;
    Object.values(positions).forEach((p) => {
      if (p.x + NODE_WIDTH + 200 > max) max = p.x + NODE_WIDTH + 200;
    });
    return max;
  }, [positions]);

  const canvasHeight = useMemo(() => {
    let max = 1150;
    Object.entries(positions).forEach(([name, p]) => {
      const table = dbSchema.tables.find((t) => t.name === name);
      const h = table ? getNodeHeight(table) : 150;
      if (p.y + h + 200 > max) max = p.y + h + 200;
    });
    return max;
  }, [positions, dbSchema.tables]);

  // Selected table insight
  const activeTableObj = dbSchema.tables.find((t) => t.name === (selectedTable || dbSchema.tables[0]?.name));
  const activeInsight = activeTableObj ? erdInterviewInsights[activeTableObj.name] : null;

  return (
    <div className="space-y-4">
      {/* Top Toolbar: Domains & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border" style={{ backgroundColor: c.bgElevated, borderColor: c.border }}>
        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-medium mr-1" style={{ color: c.textMuted }}>
            {locale === 'es' ? 'Filtrar Dominio:' : 'Domain Filter:'}
          </span>
          <button
            onClick={() => setFilterDomain('all')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-all border ${
              filterDomain === 'all' ? 'font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: filterDomain === 'all' ? c.accent : 'transparent',
              borderColor: filterDomain === 'all' ? c.accent : c.border,
              color: filterDomain === 'all' ? '#ffffff' : c.textSecondary,
            }}
          >
            {locale === 'es' ? 'Todos' : 'All'} ({dbSchema.tables.length})
          </button>
          {allDomains.map((dom) => {
            const domColor = domainColors[dom] || c.accent;
            const isSelected = filterDomain === dom;
            return (
              <button
                key={dom}
                onClick={() => setFilterDomain(dom)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-all border flex items-center gap-1 ${
                  isSelected ? 'font-bold' : 'opacity-75 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isSelected ? domColor : 'transparent',
                  borderColor: isSelected ? domColor : `${domColor}40`,
                  color: isSelected ? '#ffffff' : domColor,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSelected ? '#ffffff' : domColor }} />
                {dom}
              </button>
            );
          })}
        </div>

        {/* Viewport Action Buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          {activeTableObj && (
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-1.5 px-2.5 rounded-lg border hover:opacity-100 transition-all text-xs flex items-center gap-1.5 font-medium"
              style={{
                backgroundColor: isDrawerOpen ? c.accent : c.bgBase,
                borderColor: isDrawerOpen ? c.accent : c.border,
                color: isDrawerOpen ? '#ffffff' : c.textPrimary,
              }}
              title={locale === 'es' ? `Ver ficha técnica de ${activeTableObj.name}` : `View details of ${activeTableObj.name}`}
            >
              <Box size={13} />
              <span className="hidden sm:inline">{locale === 'es' ? 'Ficha Técnica' : 'Tech Sheet'}</span>
            </button>
          )}
          <button
            onClick={() => setScale((s) => Math.min(s + 0.15, 1.5))}
            className="p-1.5 rounded-lg border hover:opacity-100 opacity-80 transition-all text-xs flex items-center"
            style={{ backgroundColor: c.bgBase, borderColor: c.border, color: c.textPrimary }}
            title={locale === 'es' ? 'Acercar (+)' : 'Zoom In (+)'}
          >
            <ZoomIn size={14} />
          </button>
          <span className="text-[11px] font-mono px-1" style={{ color: c.textMuted }}>
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.max(s - 0.15, 0.45))}
            className="p-1.5 rounded-lg border hover:opacity-100 opacity-80 transition-all text-xs flex items-center"
            style={{ backgroundColor: c.bgBase, borderColor: c.border, color: c.textPrimary }}
            title={locale === 'es' ? 'Alejar (-)' : 'Zoom Out (-)'}
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg border hover:opacity-100 opacity-80 transition-all text-xs flex items-center gap-1"
            style={{ backgroundColor: c.bgBase, borderColor: c.border, color: c.textPrimary }}
            title={locale === 'es' ? 'Centrar y Restaurar' : 'Reset Canvas'}
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg border hover:opacity-100 opacity-80 transition-all text-xs flex items-center gap-1"
            style={{ backgroundColor: c.bgBase, borderColor: c.border, color: c.textPrimary }}
            title={isExpanded ? (locale === 'es' ? 'Contraer' : 'Collapse') : (locale === 'es' ? 'Pantalla Completa' : 'Expand View')}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Main Interactive ERD SVG Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDownBackground}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative rounded-xl border overflow-hidden select-none cursor-grab active:cursor-grabbing transition-all ${
          isExpanded ? 'h-[850px] shadow-2xl' : 'h-[680px]'
        }`}
        style={{
          backgroundColor: theme === 'dark' ? '#090d16' : '#f8fafc',
          borderColor: c.border,
        }}
      >
        {/* Canvas Helper Pill */}
        <div
          className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] font-mono border backdrop-blur-md opacity-80"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
            borderColor: c.border,
            color: c.textMuted,
          }}
        >
          <Move size={11} style={{ color: c.accent }} />
          <span>{locale === 'es' ? 'Arrastra nodos o el lienzo · Clic en tabla para abrir ficha técnica' : 'Drag nodes or pan · Click table to inspect details'}</span>
        </div>

        {/* Scalable & Pannable SVG World */}
        <svg
          width="100%"
          height="100%"
          className="w-full h-full block overflow-visible"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Subtle Grid Pattern */}
            <pattern id="erd-grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'} />
            </pattern>

            {/* Default Arrow Marker */}
            <marker
              id="erd-arrow-default"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={c.textMuted} fillOpacity="0.6" />
            </marker>

            {/* Active Highlight Arrow Marker */}
            <marker
              id="erd-arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={c.accent} />
            </marker>
          </defs>

          {/* Pannable & Scalable World Container */}
          <g
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              transition: isPanning || draggingNode ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {/* Grid Background in World Space */}
            <rect width={canvasWidth} height={canvasHeight} fill="url(#erd-grid-pattern)" />

          {/* LAYER 1: Relational Bezier Edges */}
          <g className="edges-layer">
            {dbSchema.relationships.map((rel, idx) => {
              const fromPos = positions[rel.from];
              const toPos = positions[rel.to];
              const fromTable = dbSchema.tables.find((t) => t.name === rel.from);
              const toTable = dbSchema.tables.find((t) => t.name === rel.to);

              if (!fromPos || !toPos || !fromTable || !toTable) return null;

              // Check domain visibility: only draw edge if both endpoints are visible
              if (
                filterDomain !== 'all' &&
                (fromTable.domain !== filterDomain || toTable.domain !== filterDomain)
              ) {
                return null;
              }

              const fromH = getNodeHeight(fromTable);
              const toH = getNodeHeight(toTable);

              const fromCenter = { x: fromPos.x + NODE_WIDTH / 2, y: fromPos.y + fromH / 2 };
              const toCenter = { x: toPos.x + NODE_WIDTH / 2, y: toPos.y + toH / 2 };
              const dx = toCenter.x - fromCenter.x;
              const dy = toCenter.y - fromCenter.y;

              let startX: number, startY: number, endX: number, endY: number;

              const isHorizontal = Math.abs(dx) >= NODE_WIDTH * 0.7;

              if (isHorizontal) {
                if (dx > 0) {
                  startX = fromPos.x + NODE_WIDTH;
                  startY = fromCenter.y;
                  endX = toPos.x;
                  endY = toCenter.y;
                } else {
                  startX = fromPos.x;
                  startY = fromCenter.y;
                  endX = toPos.x + NODE_WIDTH;
                  endY = toCenter.y;
                }
              } else {
                if (dy > 0) {
                  startX = fromCenter.x;
                  startY = fromPos.y + fromH;
                  endX = toCenter.x;
                  endY = toPos.y;
                } else {
                  startX = fromCenter.x;
                  startY = fromPos.y;
                  endX = toCenter.x;
                  endY = toPos.y + toH;
                }
              }

              const dist = Math.hypot(endX - startX, endY - startY);
              const curvature = Math.min(dist * 0.45, 120);

              let cp1X: number, cp1Y: number, cp2X: number, cp2Y: number;

              if (isHorizontal) {
                const dir = dx > 0 ? 1 : -1;
                cp1X = startX + dir * curvature;
                cp1Y = startY;
                cp2X = endX - dir * curvature;
                cp2Y = endY;
              } else {
                const dir = dy > 0 ? 1 : -1;
                cp1X = startX;
                cp1Y = startY + dir * curvature;
                cp2X = endX;
                cp2Y = endY - dir * curvature;
              }

              const midX = (startX + endX) / 2;
              const midY = (startY + endY) / 2;

              const isEdgeConnectedToActive =
                activeFocusTable && (rel.from === activeFocusTable || rel.to === activeFocusTable);
              const isHoveredRel = hoveredRelationship === `${rel.from}-${rel.to}`;

              const strokeColor = isEdgeConnectedToActive || isHoveredRel
                ? c.accent
                : theme === 'dark'
                ? '#475569'
                : '#94a3b8';

              const strokeOpacity = activeFocusTable
                ? isEdgeConnectedToActive || isHoveredRel
                  ? 1
                  : 0.15
                : 0.6;

              const strokeWidth = isEdgeConnectedToActive || isHoveredRel ? 2.5 : 1.5;

              return (
                <g
                  key={`${rel.from}-${rel.to}-${idx}`}
                  onMouseEnter={() => setHoveredRelationship(`${rel.from}-${rel.to}`)}
                  onMouseLeave={() => setHoveredRelationship(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Invisible wide stroke for easy hover */}
                  <path
                    d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="18"
                  />

                  {/* Visible Relational Bezier Path */}
                  <path
                    d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={isEdgeConnectedToActive ? '6 3' : 'none'}
                    markerEnd={isEdgeConnectedToActive ? 'url(#erd-arrow-active)' : 'url(#erd-arrow-default)'}
                    className={isEdgeConnectedToActive ? 'animate-pulse' : ''}
                  />

                  {/* Cardinality Badge on Midpoint */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-14"
                      y="-9"
                      width="28"
                      height="18"
                      rx="4"
                      fill={theme === 'dark' ? '#0f172a' : '#ffffff'}
                      stroke={strokeColor}
                      strokeWidth={isEdgeConnectedToActive ? '1.5' : '1'}
                      strokeOpacity={strokeOpacity}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="monospace"
                      fill={isEdgeConnectedToActive ? c.accent : c.textSecondary}
                    >
                      {rel.type}
                    </text>
                  </g>

                  {/* Edge Tooltip on Hover */}
                  {isHoveredRel && (
                    <g transform={`translate(${midX}, ${midY - 22})`}>
                      <rect
                        x="-100"
                        y="-12"
                        width="200"
                        height="24"
                        rx="6"
                        fill={theme === 'dark' ? '#1e293b' : '#ffffff'}
                        stroke={c.accent}
                        strokeWidth="1.5"
                        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fontWeight="600"
                        fill={c.textPrimary}
                      >
                        {rel.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* LAYER 2: Table Node Cards */}
          <g className="nodes-layer">
            {dbSchema.tables.map((table) => {
              const pos = positions[table.name];
              if (!pos) return null;

              // Domain filter visibility check
              const isFilteredOut = filterDomain !== 'all' && table.domain !== filterDomain;
              if (isFilteredOut) return null;

              const isSelected = selectedTable === table.name;
              const isHovered = hoveredTable === table.name;
              const isConnected = activeFocusTable ? connectedTables.has(table.name) : true;
              const h = getNodeHeight(table);
              const domColor = domainColors[table.domain || ''] || c.accent;

              const nodeOpacity = activeFocusTable ? (isConnected ? 1 : 0.25) : 1;

              return (
                <g
                  key={table.name}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  opacity={nodeOpacity}
                  className="transition-opacity duration-200"
                >
                  {/* Card Drop Shadow / Border Background */}
                  <rect
                    width={NODE_WIDTH}
                    height={h}
                    rx="10"
                    fill={theme === 'dark' ? '#111827' : '#ffffff'}
                    stroke={isSelected ? c.accent : isHovered ? domColor : c.border}
                    strokeWidth={isSelected ? '2.5' : isHovered ? '2' : '1'}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTable(table.name);
                      setIsDrawerOpen(true);
                    }}
                    onMouseEnter={() => setHoveredTable(table.name)}
                    onMouseLeave={() => setHoveredTable(null)}
                  />

                  {/* Top Domain Color Accent Bar */}
                  <path
                    d={`M 0 10 Q 0 0 10 0 L ${NODE_WIDTH - 10} 0 Q ${NODE_WIDTH} 0 ${NODE_WIDTH} 10 L ${NODE_WIDTH} 4 L 0 4 Z`}
                    fill={domColor}
                  />

                  {/* Header Handle for Node Dragging */}
                  <rect
                    x="0"
                    y="4"
                    width={NODE_WIDTH}
                    height="32"
                    fill="transparent"
                    className="cursor-move"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setDraggingNode({
                        name: table.name,
                        startX: e.clientX,
                        startY: e.clientY,
                        initialNodeX: pos.x,
                        initialNodeY: pos.y,
                      });
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTable(table.name);
                      setIsDrawerOpen(true);
                    }}
                  />

                  {/* Table Header Icon & Name */}
                  <g
                    transform="translate(10, 22)"
                    className="pointer-events-none select-none"
                  >
                    <circle cx="4" cy="0" r="3" fill={domColor} />
                    <text
                      x="14"
                      y="1"
                      dominantBaseline="central"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="monospace"
                      fill={isSelected ? c.accent : c.textPrimary}
                    >
                      {table.name}
                    </text>
                  </g>

                  {/* Domain Tag Pill */}
                  {table.domain && (
                    <g transform={`translate(${NODE_WIDTH - 65}, 14)`} className="pointer-events-none">
                      <rect
                        width="55"
                        height="16"
                        rx="4"
                        fill={`${domColor}20`}
                        stroke={`${domColor}60`}
                        strokeWidth="0.5"
                      />
                      <text
                        x="27.5"
                        y="9"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                        fill={domColor}
                      >
                        {table.domain}
                      </text>
                    </g>
                  )}

                  {/* Header Divider Line */}
                  <line
                    x1="0"
                    y1="36"
                    x2={NODE_WIDTH}
                    y2="36"
                    stroke={c.border}
                    strokeWidth="0.8"
                  />

                  {/* Columns List (Top 5 visible) */}
                  {table.columns.slice(0, 5).map((col, cIdx) => {
                    const rowY = 50 + cIdx * 22;
                    return (
                      <g
                        key={col.name}
                        transform={`translate(10, ${rowY})`}
                        className="pointer-events-none select-none text-xs"
                      >
                        {/* PK Icon / FK Indicator */}
                        {col.isPk ? (
                          <g transform="translate(0, -6)">
                            <rect width="18" height="12" rx="2" fill="#F59E0B" fillOpacity="0.25" />
                            <text x="9" y="7" textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="800" fill="#F59E0B">
                              PK
                            </text>
                          </g>
                        ) : col.isFk ? (
                          <g transform="translate(0, -6)">
                            <rect width="18" height="12" rx="2" fill="#3B82F6" fillOpacity="0.25" />
                            <text x="9" y="7" textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="800" fill="#3B82F6">
                              FK
                            </text>
                          </g>
                        ) : (
                          <circle cx="5" cy="0" r="2" fill={c.textMuted} fillOpacity="0.4" />
                        )}

                        {/* Column Name */}
                        <text
                          x="24"
                          y="1"
                          dominantBaseline="central"
                          fontSize="10.5"
                          fontWeight={col.isPk || col.isFk ? '600' : '400'}
                          fontFamily="monospace"
                          fill={col.isPk ? '#F59E0B' : col.isFk ? '#60A5FA' : c.textPrimary}
                        >
                          {col.name}
                        </text>

                        {/* Column Data Type */}
                        <text
                          x={NODE_WIDTH - 22}
                          y="1"
                          textAnchor="end"
                          dominantBaseline="central"
                          fontSize="9"
                          fontFamily="monospace"
                          fill={c.textMuted}
                        >
                          {col.type.length > 12 ? `${col.type.slice(0, 11)}…` : col.type}
                        </text>
                      </g>
                    );
                  })}

                  {/* Overflow Columns Indicator */}
                  {table.columns.length > 5 && (
                    <g transform={`translate(10, ${50 + 5 * 22})`} className="pointer-events-none">
                      <text
                        x={NODE_WIDTH - 22}
                        y="2"
                        textAnchor="end"
                        dominantBaseline="central"
                        fontSize="9"
                        fontStyle="italic"
                        fill={c.textMuted}
                      >
                        +{table.columns.length - 5} {locale === 'es' ? 'más...' : 'more...'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
          </g>
        </svg>

          {/* Slide-over Drawer for Selected Table Details */}
          <AnimatePresence>
            {isDrawerOpen && activeTableObj && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="absolute top-0 right-0 bottom-0 z-30 w-full sm:w-[460px] md:w-[490px] border-l shadow-2xl flex flex-col backdrop-blur-xl"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(11, 17, 33, 0.96)' : 'rgba(255, 255, 255, 0.98)',
                  borderColor: c.border,
                }}
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b gap-3" style={{ borderColor: c.border }}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="p-1.5 rounded-lg text-white shrink-0"
                      style={{ backgroundColor: domainColors[activeTableObj.domain || ''] || c.accent }}
                    >
                      <Box size={16} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono text-sm sm:text-base font-bold truncate" style={{ color: c.textPrimary }}>
                          {activeTableObj.name}
                        </h4>
                        {activeTableObj.domain && (
                          <span
                            className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: `${domainColors[activeTableObj.domain] || c.accent}20`,
                              color: domainColors[activeTableObj.domain] || c.accent,
                            }}
                          >
                            {activeTableObj.domain}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] truncate" style={{ color: c.textMuted }}>
                        {activeTableObj.columns.length} {locale === 'es' ? 'columnas relacionales' : 'columns'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 rounded-lg border hover:opacity-100 opacity-70 transition-all text-xs"
                    style={{ backgroundColor: c.bgElevated, borderColor: c.border, color: c.textPrimary }}
                    title={locale === 'es' ? 'Cerrar ficha' : 'Close panel'}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Drawer Body (Scrollable) */}
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                  {/* Table Description */}
                  <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
                    {activeTableObj.description?.[locale as Locale] ||
                      activeInsight?.architectureRole[locale as Locale]}
                  </p>

                  {/* Action Button: Jump to Inspector */}
                  {onSwitchToInspector && (
                    <button
                      onClick={() => {
                        onSwitchToInspector();
                        setIsDrawerOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all hover:scale-[1.01]"
                      style={{
                        backgroundColor: c.bgBase,
                        borderColor: c.accent,
                        color: c.accent,
                      }}
                    >
                      <Layers size={13} />
                      {locale === 'es' ? 'Ver Columnas y Tipos en Inspector' : 'View in Schema Inspector'}
                      <ArrowRight size={13} />
                    </button>
                  )}

                  {/* Box 1: Technical & Relational Invariants */}
                  <div className="p-3.5 rounded-xl border" style={{ backgroundColor: c.bgBase, borderColor: c.border }}>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: '#10B981' }}>
                      <ShieldCheck size={14} />
                      {locale === 'es' ? 'Invariante de Integridad en Base de Datos' : 'Database Integrity Invariant'}
                    </h5>
                    <p className="text-xs leading-relaxed" style={{ color: c.textPrimary }}>
                      {activeInsight?.keyInvariant[locale as Locale] ||
                        (locale === 'es'
                          ? 'Integridad referencial y validación estricta de tipos de datos en PostgreSQL.'
                          : 'Referential integrity and strict type validation in PostgreSQL.')}
                    </p>

                    {/* Connected Foreign Keys summary */}
                    <div className="mt-3 pt-2.5 border-t text-[11px] font-mono flex flex-wrap items-center gap-1.5" style={{ borderColor: `${c.border}50` }}>
                      <span style={{ color: c.textMuted }}>
                        {locale === 'es' ? 'Relaciones:' : 'Relations:'}
                      </span>
                      {dbSchema.relationships
                        .filter((r) => r.from === activeTableObj.name || r.to === activeTableObj.name)
                        .map((r, rIdx) => {
                          const other = r.from === activeTableObj.name ? r.to : r.from;
                          const dir = r.from === activeTableObj.name ? '➔' : '⬅';
                          return (
                            <button
                              key={rIdx}
                              onClick={() => {
                                onSelectTable(other);
                                setIsDrawerOpen(true);
                              }}
                              className="px-2 py-0.5 rounded border hover:opacity-100 opacity-85 transition-opacity text-[10px]"
                              style={{
                                backgroundColor: c.bgElevated,
                                borderColor: c.border,
                                color: c.accent,
                              }}
                            >
                              {dir} {other} ({r.type})
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Box 2: Interview Rationale (Why this design?) */}
                  <div
                    className="p-3.5 rounded-xl border"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.07)' : 'rgba(245, 158, 11, 0.08)',
                      borderColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.35)',
                    }}
                  >
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-amber-500">
                      <Lightbulb size={14} />
                      {locale === 'es' ? 'Clave de Diseño para Entrevistas Técnicas' : 'Technical Interview Rationale'}
                    </h5>
                    <p className="text-xs leading-relaxed" style={{ color: c.textPrimary }}>
                      {activeInsight?.interviewRationale[locale as Locale] ||
                        (locale === 'es'
                          ? 'Diseñado para desacoplamiento modular, atomicidad ACID y rendimiento en queries indexadas.'
                          : 'Designed for modular decoupling, ACID atomicity, and indexed query performance.')}
                    </p>
                    <div className="mt-2.5 pt-2 flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
                      <HelpCircle size={12} />
                      <span>
                        {locale === 'es'
                          ? 'Explica este punto al justificar la persistencia y la arquitectura del proyecto.'
                          : 'Highlight this rationale when explaining persistence and system tradeoffs.'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
