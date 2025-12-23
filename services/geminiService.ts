
import { GoogleGenAI } from "@google/genai";

/**
 * Функсияи асосӣ барои чат бо AZIZA AI
 */
export const askAziza = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `Шумо AZIZA AI ҳастед - ёрирасони интеллектуалии мағозаи китобҳои онлайни "Китобхона" дар шаҳри Хуҷанди Тоҷикистон.
        Вазифаи шумо:
        1. Ба мизоҷон дар ёфтани китобҳо кӯмак кунед.
        2. Дар бораи мағоза маълумот диҳед: Интиқол дар ш. Хуҷанд БЕПУЛ аст.
        3. Маълумоти тамос: Суроға: ш. Хуҷанд, кӯчаи Исмоили Сомонӣ 226. Телефон: +992 02 857 02 07.
        4. Ҳамеша хушмуомила ва бо забони тоҷикии адабӣ ҷавоб диҳед.
        5. Агар дар бораи китобҳои мушаххас пурсанд, аз номи китобҳои машҳури тоҷик мисол оред.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Aziza AI Error:", error);
    return "Мутаассифона, ман ҳоло ба мушкилии техникӣ дучор шудам. Лутфан каме дертар кӯшиш кунед.";
  }
};

/**
 * Тавсияи китоб бо AI
 */
export const getBookRecommendation = async (userInterest: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Корбар ба ин мавзӯъ таваҷҷӯҳ дорад: "${userInterest}". Лутфан як китоби машҳури классикӣ ё муосири тоҷикро тавсия диҳед. Танҳо номи китоб ва сабаби тавсияро бо забони тоҷикӣ нависед.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Мутаассифона, дар ҳоли ҳозир тавсия дода наметавонем.";
  }
};

/**
 * Тавлиди акси муқоваи китоб бо модели Gemini.
 * Танҳо санъати визуалӣ бидуни матн, бо услуби фарҳанги тоҷик.
 */
export const generateBookCover = async (title: string, author: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = `
      TASK: Create a professional, artistic, and thematic book cover background.
      STRICT REQUIREMENT: NO TEXT, NO LETTERS, NO WORDS, NO NUMBERS.
      
      CONTEXT: The book is titled "${title}" by "${author}".
      THEME: This is a ${title.toLowerCase().includes('ҳаёт') || title.toLowerCase().includes('зиндагинома') ? 'biography or historical memoir' : 'literary work'} with deep roots in Tajik culture.
      
      VISUAL DIRECTION:
      1. If it's a biography/history: Use dignified, classical elements like ancient parchment textures,Samarkand or Khujand architectural motifs, traditional Tajik patterns (Chakan/Atlas), or symbols of wisdom (ancient inkwells, feathers, old manuscripts).
      2. If it's fiction/poetry: Use metaphorical and lyrical imagery inspired by Persian/Tajik poetry — nightingales, roses, mountains, celestial bodies, or abstract shapes that evoke emotion.
      3. ART STYLE: High-end oil painting, fine-art photography, or intricate miniature art. 
      4. COLOR PALETTE: Rich and meaningful (e.g., deep blues of Lapis Lazuli, royal golds, or earthy tones of the Pamir mountains).
      
      COMPOSITION: Cinematic, balanced, and aesthetically pleasing. Ensure the central part is clear to allow for potential text overlay later.
      QUALITY: 4k resolution, professional lighting, museum-quality textures.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    if (error?.message?.includes('403') || error?.message?.includes('PERMISSION_DENIED')) {
      throw new Error('PERMISSION_DENIED');
    }
    return null;
  }
};
