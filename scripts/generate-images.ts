import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const products = [
  { id: 'p1', prompt: 'A single pack of Poochie Play Pants baby diapers, light green packaging with a baby picture, product photography, white background' },
  { id: 'p2', prompt: 'A single pack of Mamy Poko Pants baby diapers, blue and yellow packaging with a baby picture, product photography, white background' },
  { id: 'p3', prompt: 'A single pack of Britannia Good Day butter cookies, blue packaging, product photography, white background' },
  { id: 'p4', prompt: 'A single pack of Oreo biscuits, blue packaging, product photography, white background' },
  { id: 'p5', prompt: 'A single pack of Parle-G Gold biscuits, red and yellow packaging with a girl picture, product photography, white background' },
  { id: 'p6', prompt: 'A single pack of Haldiram Tasty Gupshup peanuts, red packaging, product photography, white background' },
  { id: 'p7', prompt: 'A single pack of Haldiram Nut Cracker, blue packaging, product photography, white background' },
  { id: 'p8', prompt: 'A single pack of Haldiram Chatpata Dal, green packaging, product photography, white background' },
  { id: 'p9', prompt: 'A single pack of Haldiram Peanut Roasted, light blue packaging, product photography, white background' },
  { id: 'p10', prompt: 'A single pack of Haldiram Shahi Mixture, red packaging, product photography, white background' },
  { id: 'p11', prompt: 'A single pack of Haldiram Samosa snack, green packaging, product photography, white background' },
  { id: 'p12', prompt: 'A single pack of Haldiram Mini Bhakarwadi, purple packaging, product photography, white background' },
  { id: 'p13', prompt: 'A single pack of Haldiram Mathri, pink packaging, product photography, white background' },
  { id: 'p14', prompt: 'A single pack of Haldiram Lite Chiwda, yellow packaging, product photography, white background' },
  { id: 'p15', prompt: 'A single pack of Haldiram Lite Mix, yellow packaging, product photography, white background' },
  { id: 'p16', prompt: 'A single pack of Haldiram Golden Mixture, yellow packaging, product photography, white background' },
  { id: 'p17', prompt: 'A single pack of Haldiram Aloo Bhujia, green packaging, product photography, white background' },
  { id: 'p18', prompt: 'A large pack of Haldiram Aloo Bhujia, green packaging, product photography, white background' },
  { id: 'p19', prompt: 'A large pack of Haldiram Navratna Mix, brown packaging, product photography, white background' },
  { id: 'p20', prompt: 'A single pack of Haldiram Kashmiri Mixture, blue packaging, product photography, white background' },
  { id: 'p21', prompt: 'A single pack of Haldiram Navratan Mix, brown packaging, product photography, white background' },
  { id: 'p22', prompt: 'A single pack of Haldiram Khatta Meetha, orange packaging, product photography, white background' },
  { id: 'p23', prompt: 'A single pack of Haldiram Teekha Meetha, purple packaging, product photography, white background' },
  { id: 'p24', prompt: 'A single pack of Haldiram All in One, blue packaging, product photography, white background' },
  { id: 'p25', prompt: 'A single pack of Haldiram Moong Dal, blue packaging, product photography, white background' },
  { id: 'p26', prompt: 'A single pack of Haldiram Dal Biji, orange packaging, product photography, white background' },
  { id: 'p27', prompt: 'A single pack of Haldiram Gupshup Peanuts, red packaging, product photography, white background' }
];

async function generateImage(product: any) {
  const filePath = path.join(dir, `${product.id}.png`);
  if (fs.existsSync(filePath)) {
    console.log(`Skipping ${product.id}, already exists.`);
    return;
  }
  
  console.log(`Generating image for ${product.id}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: product.prompt,
    });
    
    let base64Data = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        base64Data = part.inlineData.data;
        break;
      }
    }
    
    if (base64Data) {
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
      console.log(`Saved ${product.id}.png`);
    } else {
      console.log(`No image data returned for ${product.id}`);
    }
  } catch (error) {
    console.error(`Error generating ${product.id}:`, error);
  }
}

async function main() {
  for (let i = 0; i < products.length; i += 5) {
    const batch = products.slice(i, i + 5);
    await Promise.all(batch.map(generateImage));
  }
  console.log('Done generating images.');
}

main();
