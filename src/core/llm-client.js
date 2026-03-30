function stripCodeFences(text) {
  text = text.trim();
  if (text.startsWith('```')) {
    const lines = text.split('\n');
    lines.shift();
    if (lines.length && lines[lines.length - 1].trim() === '```') {
      lines.pop();
    }
    text = lines.join('\n').trim();
  }
  return text;
}

function parseJSON(text) {
  try {
    return JSON.parse(stripCodeFences(text));
  } catch {
    return null;
  }
}

export class AnthropicClient {
  constructor(apiKey, model, baseUrl) {
    this.apiKey = apiKey;
    this.model = model || 'claude-sonnet-4-6';
    this.baseUrl = baseUrl || 'https://api.anthropic.com';
  }

  async call(system, user, maxTokens = 4096) {
    try {
      const res = await fetch(`${this.baseUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: maxTokens,
          system,
          messages: [{ role: 'user', content: user }],
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Anthropic API ${res.status}: ${err}`);
      }
      const data = await res.json();
      return parseJSON(data.content[0].text);
    } catch (e) {
      console.warn('AnthropicClient error:', e.message);
      return null;
    }
  }
}

export class OpenAIClient {
  constructor(apiKey, model, baseUrl) {
    this.apiKey = apiKey;
    this.model = model || 'gpt-4o';
    this.baseUrl = baseUrl || 'https://api.openai.com';
  }

  async call(system, user, maxTokens = 4096) {
    try {
      const res = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: maxTokens,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`OpenAI API ${res.status}: ${err}`);
      }
      const data = await res.json();
      return parseJSON(data.choices[0].message.content);
    } catch (e) {
      console.warn('OpenAIClient error:', e.message);
      return null;
    }
  }
}

export class OpenAICompatibleClient extends OpenAIClient {
  constructor(baseUrl, apiKey, model) {
    super(apiKey || '', model || 'default', baseUrl);
  }
}

export function createClient(provider, config) {
  switch (provider) {
    case 'anthropic':
      return new AnthropicClient(config.apiKey, config.model, config.baseUrl);
    case 'openai':
      return new OpenAIClient(config.apiKey, config.model, config.baseUrl);
    case 'google':
      return new OpenAICompatibleClient(
        config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta/openai',
        config.apiKey, config.model,
      );
    case 'openai-compatible':
      return new OpenAICompatibleClient(config.baseUrl, config.apiKey, config.model);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
