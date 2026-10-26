export class GooseBridge {
  constructor(private readonly baseUrl: string = 'http://localhost:8000') {}

  async sendPrompt(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const payload = await response.json();
    return payload.reply ?? payload.message ?? 'No response';
  }
}
