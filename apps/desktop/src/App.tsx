type Agent = {
  name: string;
  provider: string;
  status: 'online' | 'thinking' | 'idle';
  metrics: string;
};

type CommitNode = {
  id: string;
  label: string;
  branch?: string;
  active?: boolean;
};

const agents: Agent[] = [
  { name: 'Git Analyst', provider: 'Anthropic', status: 'online', metrics: '92% sync' },
  { name: 'Architecture Router', provider: 'OpenAI', status: 'thinking', metrics: 'routing...' },
  { name: 'Test Orchestrator', provider: 'Gemini', status: 'idle', metrics: 'queued' },
  { name: 'Repair Copilot', provider: 'Claude Code', status: 'online', metrics: '2 issues' },
];

const graphNodes: CommitNode[] = [
  { id: 'a1', label: 'a1b2c3', branch: 'main', active: true },
  { id: 'b2', label: 'd4e5f6', branch: 'feature/ux' },
  { id: 'c3', label: 'g7h8i9', branch: 'release' },
  { id: 'd4', label: 'j0k1l2', branch: 'hotfix' },
  { id: 'e5', label: 'm3n4o5', branch: 'main' },
  { id: 'f6', label: 'p6q7r8', branch: 'feature/ux' },
];

const resolutionOptions = [
  {
    id: 'a',
    title: 'Solución A — segura y conservadora',
    summary: 'Mantiene la rama `main` intacta y aplica el parche mínimo con validación de tests.',
    confidence: '0.92',
  },
  {
    id: 'b',
    title: 'Solución B — más agresiva',
    summary: 'Fusiona cambios estructurales y limpia el conflicto completo en un mismo paso.',
    confidence: '0.84',
  },
  {
    id: 'c',
    title: 'Solución C — rápida',
    summary: 'Resuelve el conflicto con una estrategia de fallback y revisión posterior.',
    confidence: '0.76',
  },
];

function App() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">O</div>
          <div>
            <h1>Onix</h1>
            <small>GitAI Studio</small>
          </div>
        </div>

        <nav className="nav">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Repository</button>
          <button className="nav-item">Agents</button>
          <button className="nav-item">Conflicts</button>
          <button className="nav-item">Deploy</button>
        </nav>

        <div className="panel mini-panel">
          <div className="panel-head">
            <span>Provider status</span>
            <span className="chip online">Live</span>
          </div>
          <ul className="status-list">
            <li><span>Anthropic</span><strong>online</strong></li>
            <li><span>OpenAI</span><strong>online</strong></li>
            <li><span>Gemini</span><strong>queued</strong></li>
          </ul>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">workspace</p>
            <h2>repository / monorepo / onix</h2>
          </div>

          <div className="top-actions">
            <button className="ghost-btn">Sync</button>
            <button className="primary-btn">Resolve with AI</button>
          </div>
        </header>

        <section className="hero-grid">
          <div className="panel graph-panel">
            <div className="panel-head">
              <span>Git graph</span>
              <span className="chip accent">12 refs</span>
            </div>

            <div className="graph-wrap">
              {graphNodes.map((node, index) => (
                <div key={node.id} className="graph-node" style={{ left: `${index * 16 + 8}%`, top: `${(index % 3) * 26 + 18}%` }}>
                  <span className={`dot ${node.active ? 'active' : ''}`} />
                  <div className="node-info">
                    <strong>{node.label}</strong>
                    <small>{node.branch ?? 'branch'}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel quick-panel">
            <div className="panel-head">
              <span>AI command palette</span>
              <span className="chip">ready</span>
            </div>
            <div className="command-box">
              <span className="prompt-symbol">></span>
              <span>resolve merge conflict in auth service</span>
            </div>
            <div className="actions-row">
              <button className="ghost-btn">Smart route</button>
              <button className="primary-btn">Run</button>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel agent-panel">
            <div className="panel-head">
              <span>Multi-agent panel</span>
              <span className="chip accent">4 agents</span>
            </div>

            <div className="agent-list">
              {agents.map((agent) => (
                <div key={agent.name} className="agent-card">
                  <div className="agent-header">
                    <div className="agent-dot" />
                    <div>
                      <strong>{agent.name}</strong>
                      <small>{agent.provider}</small>
                    </div>
                  </div>
                  <div className="agent-meta">
                    <span className={`status ${agent.status}`}>{agent.status}</span>
                    <small>{agent.metrics}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel conflict-panel">
            <div className="panel-head">
              <span>Conflict resolution</span>
              <span className="chip warning">3 options</span>
            </div>

            <div className="resolution-list">
              {resolutionOptions.map((item) => (
                <div key={item.id} className="resolution-item">
                  <div className="resolution-head">
                    <strong>{item.title}</strong>
                    <span className="confidence">{item.confidence}</span>
                  </div>
                  <p>{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
