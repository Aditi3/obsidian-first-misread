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

// Default HTTP function uses fetch. Obsidian callers should pass
// requestUrl from the obsidian module to bypass CORS.
let _httpFn = null;

export function setHttpFunction(fn) {
  _httpFn = fn;
}

async function httpPost(url, headers, body) {
  if (_httpFn) {
    const response = await _httpFn({
      url,
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      contentType: 'application/json',
    });
    return { ok: response.status >= 200 && response.status < 300, status: response.status, json: response.json, text: JSON.stringify(response.json) };
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    return { ok: false, status: res.status, text };
  }
  const json = await res.json();
  return { ok: true, status: res.status, json };
}

export class AnthropicClient {
  constructor(apiKey, model, baseUrl) {
    this.apiKey = apiKey;
    this.model = model || 'claude-sonnet-4-6';
    this.baseUrl = baseUrl || 'https://api.anthropic.com';
  }

  async call(system, user, maxTokens = 4096) {
    const result = await httpPost(
      `${this.baseUrl}/v1/messages`,
      {
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      {
        model: this.model,
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: user }],
      }
    );
    if (!result.ok) {
      console.error(`Anthropic API ${result.status}: ${result.text}`);
      throw new Error(`Anthropic API error (${result.status})`);
    }
    return parseJSON(result.json.content[0].text);
  }
}

export class OpenAIClient {
  constructor(apiKey, model, baseUrl) {
    this.apiKey = apiKey;
    this.model = model || 'gpt-4o';
    this.baseUrl = baseUrl || 'https://api.openai.com';
  }

  async call(system, user, maxTokens = 4096) {
    const result = await httpPost(
      `${this.baseUrl}/v1/chat/completions`,
      {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      {
        model: this.model,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }
    );
    if (!result.ok) {
      console.error(`OpenAI API ${result.status}: ${result.text}`);
      throw new Error(`OpenAI API error (${result.status})`);
    }
    return parseJSON(result.json.choices[0].message.content);
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
