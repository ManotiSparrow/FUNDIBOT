import { describe, it, expect } from 'vitest';

/**
 * Temporary mock version of the chatbot logic.
 * Replace this with an import from your actual logic file later.
 */
function generateResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('apply for funding')) {
    return 'To apply for funding, please visit our funding application page.';
  } else if (lower.includes('deadline')) {
    return 'The deadline for applications is the 15th of every month.';
  } else if (lower.includes('contact') || lower.includes('support')) {
    return 'You can contact support at support@fundibot.org.';
  }

  return "I didn't understand that. Can you please rephrase?";
}

describe('FUNDIBOT Chatbot Logic', () => {
  it('should return a default response for unrecognized input', () => {
    const input = 'xyz123!';
    const response = generateResponse(input);
    expect(response).toBe("I didn't understand that. Can you please rephrase?");
  });

  it('should return a helpful answer for a known query', () => {
    const input = 'How do I apply for funding?';
    const response = generateResponse(input);
    expect(response.toLowerCase()).toContain('apply for funding');
  });

  it('should guide the user when asked about deadlines', () => {
    const input = 'When is the deadline for applications?';
    const response = generateResponse(input);
    expect(response.toLowerCase()).toContain('deadline');
  });

  it('should provide support contact when asked for help', () => {
    const input = 'How can I contact support?';
    const response = generateResponse(input);
    expect(response.toLowerCase()).toContain('contact');
  });
});
