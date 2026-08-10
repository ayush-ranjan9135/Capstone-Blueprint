import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

const aiRequestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'AI service is currently unavailable (Missing API Key)' }, { status: 500 });
    }

    const body = await req.json();
    const parsed = aiRequestSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input parameters' }, { status: 400 });
    }

    const { title, description } = parsed.data;

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are a professional project planning assistant. 
Your task is to break down the following software engineering task into concise, actionable subtasks.
Avoid unnecessary explanations. Do not duplicate tasks. Output ONLY a valid JSON object matching this schema: 
{ "subtasks": ["Actionable step 1", "Actionable step 2"] }

Task Title: ${title}
Task Description: ${description || 'No description provided.'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    const result = JSON.parse(text);

    if (!result.subtasks || !Array.isArray(result.subtasks)) {
      throw new Error('Invalid schema returned from AI');
    }

    return NextResponse.json({ success: true, data: { subtasks: result.subtasks } });

  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ success: false, error: 'Unable to generate AI suggestions' }, { status: 500 });
  }
}
