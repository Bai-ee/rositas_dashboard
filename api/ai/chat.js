// Vercel Serverless Function: /api/ai/chat
import OpenAI from 'openai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, currentPost, platform, dateLabel, theme, toneGuide } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OpenAI API key not configured',
      message: "The OpenAI API key isn't set up yet. Please add OPENAI_API_KEY to your Vercel environment variables.",
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const systemPrompt = `You are a helpful copywriting assistant for Rosita's Mexican Restaurant in DeKalb, IL. You help refine social media posts while maintaining their authentic voice.

${toneGuide}

CURRENT POST CONTEXT:
- Platform: ${platform}
- Date/Timing: ${dateLabel}
- Theme/Purpose: ${theme}

CURRENT POST DRAFT:
"""
${currentPost}
"""

YOUR ROLE:
1. When the user asks for changes, provide a conversational response explaining what you're doing
2. Always include a revised version of the post that incorporates their feedback
3. Stay true to Rosita's warm, heritage-rooted voice
4. Remember: max 1 emoji, no corporate buzzwords, no walls of hashtags
5. Keep the essential information (prices, phone number, dates) intact unless asked to remove

RESPONSE FORMAT:
Provide your response as a JSON object with two fields:
- "message": Your conversational response to the user
- "revisedPost": The updated post content (or null if no revision was made)`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500
    });

    const responseContent = completion.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(responseContent);
    } catch (e) {
      parsed = { message: responseContent, revisedPost: null };
    }

    res.json(parsed);

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({
      error: error.message,
      message: "I encountered an error while processing your request."
    });
  }
}
