export interface AgentRequest {
  prompt: string;
  provider?: string;
  context?: Record<string, unknown>;
  sessionId?: string;
}

export interface AgentResponse {
  ok: boolean;
  content: string;
  provider?: string;
  metadata?: Record<string, unknown>;
}

export interface GitGraphNode {
  id: string;
  label: string;
  type: 'commit' | 'branch' | 'tag' | 'repo';
}

export interface GitGraphEdge {
  from: string;
  to: string;
  label?: string;
}
