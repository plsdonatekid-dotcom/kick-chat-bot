const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

async function rephrase(text) {
  if (!API_KEY) return null;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Rephrase this chat message for a Kick stream. Keep the same meaning and casual tone but use different wording. Output ONLY the rephrased message, nothing else:\n\n${text}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.8
        }
      })
    });

    if (!res.ok) {
      const err = await res.text().catch(() => '');
      console.error('AI rephrase error:', res.status, err.slice(0, 200));
      return null;
    }

    const data = await res.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (output) {
      console.log('AI rephrase:', text.slice(0, 60), '->', output.slice(0, 60));
      return output;
    }
  } catch (err) {
    console.error('AI rephrase error:', err.message);
  }

  return null;
}

module.exports = { rephrase };
