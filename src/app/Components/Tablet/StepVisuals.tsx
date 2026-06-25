"use client";
import { motion, AnimatePresence } from "framer-motion";

// ─── Panel 1: Automation Flow ──────────────────────────────────────────────────
const AutomationPanel = () => {
  const tasks = [
    { label: "Recibir solicitud", done: true },
    { label: "Validar datos", done: true },
    { label: "Procesar flujo", active: true },
    { label: "Generar reporte", done: false },
    { label: "Enviar resultado", done: false },
  ];

  return (
    <div className="h-full flex flex-col justify-center p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-blue-400 text-xs font-mono tracking-wider">automation.run</span>
        </div>
        <p className="text-white font-semibold text-lg">Flujo automático activo</p>
      </motion.div>

      {/* Task list */}
      <div className="space-y-2.5 relative">
        {/* Vertical connector line */}
        <div className="absolute left-[10px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500 via-blue-400/40 to-transparent z-0" />

        {tasks.map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.14, duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-3 relative z-10"
          >
            {/* Node */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                task.done
                  ? "bg-blue-500"
                  : task.active
                  ? "bg-blue-400"
                  : "bg-gray-800 border border-gray-600"
              }`}
            >
              {task.done && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {task.active && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>

            {/* Row */}
            <div
              className={`flex-1 rounded-lg px-3 py-2 text-sm ${
                task.done
                  ? "bg-blue-900/20 border border-blue-800/30 text-blue-300/70 line-through"
                  : task.active
                  ? "bg-blue-500/10 border border-blue-500/40 text-white font-medium"
                  : "bg-white/[0.03] border border-white/8 text-gray-600"
              }`}
            >
              {task.label}
              {task.active && (
                <motion.span
                  className="inline-block ml-2 text-blue-400 text-xs"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  procesando...
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-7"
      >
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Progreso general</span>
          <span className="text-blue-400 font-semibold">60%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 1 }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-gray-600 text-xs">2 de 5 tareas completas</span>
          <span className="text-green-400 text-xs font-medium">↑ -3.2h ahorradas hoy</span>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Panel 2: Code Editor ──────────────────────────────────────────────────────
const CodePanel = () => {
  const lines = [
    { tokens: [{ text: "// Aspa Software — solución a medida", color: "text-gray-500" }] },
    { tokens: [{ text: "const ", color: "text-blue-400" }, { text: "deploy", color: "text-yellow-300" }, { text: " = async (", color: "text-white" }, { text: "idea", color: "text-orange-300" }, { text: ") => {", color: "text-white" }] },
    { tokens: [{ text: "  const ", color: "text-blue-400" }, { text: "plan", color: "text-white" }, { text: " = await ", color: "text-blue-300" }, { text: "analyze(idea)", color: "text-green-300" }, { text: ";", color: "text-white" }] },
    { tokens: [{ text: "  const ", color: "text-blue-400" }, { text: "code", color: "text-white" }, { text: " = await ", color: "text-blue-300" }, { text: "build(plan)", color: "text-green-300" }, { text: ";", color: "text-white" }] },
    { tokens: [{ text: "  await ", color: "text-blue-300" }, { text: "test", color: "text-yellow-300" }, { text: "(code, ", color: "text-white" }, { text: "{ coverage:", color: "text-gray-400" }, { text: " 95 ", color: "text-orange-300" }, { text: "})", color: "text-white" }, { text: ";", color: "text-white" }] },
    { tokens: [{ text: "  return ", color: "text-blue-400" }, { text: "ship(code)", color: "text-green-400" }, { text: ";", color: "text-white" }] },
    { tokens: [{ text: "}", color: "text-white" }] },
  ];

  return (
    <div className="h-full flex flex-col font-mono p-4 md:p-6">
      {/* Editor tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-0 mb-4 border-b border-white/10 pb-2"
      >
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-gray-300 text-xs bg-white/5 px-3 py-1 rounded-t border-t border-x border-white/10">deploy.ts</span>
        <span className="text-gray-600 text-xs px-3 py-1">config.ts</span>
        <div className="ml-auto flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-green-400 text-xs">auto-save</span>
        </div>
      </motion.div>

      {/* Code lines */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <span className="text-gray-700 text-xs w-5 flex-shrink-0 text-right mt-0.5 select-none">{i + 1}</span>
            <span className="text-sm leading-relaxed">
              {line.tokens.map((t, j) => (
                <span key={j} className={t.color}>{t.text}</span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Terminal output + Deploy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-4 pt-4 border-t border-white/10"
      >
        <div className="bg-black/40 rounded-lg p-3 mb-3 text-xs font-mono">
          <p className="text-gray-600">$ aspa deploy --prod</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-green-400"
          >
            ✓ Build successful · 847ms
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
            className="text-blue-400"
          >
            ↑ Deploying to production...
          </motion.p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg"
            animate={{
              boxShadow: [
                "0 0 0px rgba(59,130,246,0)",
                "0 0 20px rgba(59,130,246,0.6)",
                "0 0 0px rgba(59,130,246,0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
          >
            ▶ Deploy
          </motion.button>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="text-green-400 text-xs"
          >
            ✓ Tests passed (47/47)
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Panel 3: Dashboard ─────────────────────────────────────────────────────────
const DashboardPanel = () => {
  const kpis = [
    { label: "Usuarios", value: "2,847", change: "+12%", color: "text-green-400" },
    { label: "Ingresos", value: "$48K", change: "+34%", color: "text-green-400" },
    { label: "Procesos auto.", value: "1,203", change: "+89%", color: "text-blue-400" },
  ];
  const bars = [
    { label: "Ventas", pct: 78, color: "from-blue-600 to-cyan-400" },
    { label: "Retención", pct: 91, color: "from-indigo-600 to-blue-400" },
    { label: "Eficiencia", pct: 63, color: "from-violet-600 to-indigo-400" },
  ];

  return (
    <div className="h-full flex flex-col p-5 md:p-7">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5"
      >
        <div>
          <p className="text-white font-semibold">Panel de Control</p>
          <p className="text-gray-600 text-xs">Actualizado hace 2 min</p>
        </div>
        <motion.div
          className="flex items-center gap-1.5 bg-green-400/10 border border-green-400/30 px-2.5 py-1 rounded-full"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-green-400 text-xs font-medium">En vivo</span>
        </motion.div>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="bg-white/5 border border-white/8 rounded-xl p-3"
          >
            <p className="text-gray-500 text-xs mb-1 truncate">{kpi.label}</p>
            <p className="text-white text-sm md:text-base font-bold">{kpi.value}</p>
            <p className={`text-xs font-semibold ${kpi.color}`}>{kpi.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Metric bars */}
      <div className="space-y-4 mb-5">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">{bar.label}</span>
              <span className="text-white font-medium">{bar.pct}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                initial={{ width: "0%" }}
                animate={{ width: `${bar.pct}%` }}
                transition={{ duration: 1.3, ease: "easeOut", delay: 0.6 + i * 0.15 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* SVG line chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex-1 min-h-0"
      >
        <p className="text-gray-600 text-xs mb-2">Crecimiento mensual</p>
        <svg
          viewBox="0 0 220 70"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ maxHeight: "80px" }}
        >
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Fill area */}
          <motion.path
            d="M0,65 L0,58 C20,52 40,50 60,42 C80,34 100,36 120,26 C140,18 160,22 180,12 L200,6 L220,2 L220,70 Z"
            fill="url(#fillGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          />
          {/* Line */}
          <motion.polyline
            points="0,58 30,50 60,42 90,32 120,26 150,18 180,12 200,6 220,2"
            fill="none"
            stroke="url(#chartGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.3 }}
          />
          {/* Dots */}
          {[[0, 58], [60, 42], [120, 26], [180, 12], [220, 2]].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#3b82f6"
              stroke="#000"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.12, duration: 0.2 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

// ─── Exports ───────────────────────────────────────────────────────────────────
export const stepVisualComponents = [
  <AutomationPanel key="automation" />,
  <CodePanel key="code" />,
  <DashboardPanel key="dashboard" />,
];
