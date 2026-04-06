import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ REACT_APP_GEMINI_API_KEY is not set. Make sure your .env file is in the project root (resume-builder/.env) and contains: REACT_APP_GEMINI_API_KEY=your_key_here');
  console.error('💡 After updating .env, restart the dev server (npm start).');
} else {
  console.log('✅ Gemini API key loaded successfully');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Try multiple models in order of preference
const MODEL_NAMES = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];

const callGeminiAPI = async (prompt) => {
  let lastError;

  for (const modelName of MODEL_NAMES) {
    try {
      console.log(`🚀 Attempting with model: ${modelName}`);
      
      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      if (!response || !response.text()) {
        console.warn(`⚠️ Empty response from ${modelName}`);
        continue;
      }

      console.log(`✅ Success with model: ${modelName}`);
      return response.text();
    } catch (error) {
      const errorMsg = error.message || JSON.stringify(error);
      console.warn(`⚠️ Model ${modelName} failed:`, errorMsg);
      lastError = error;
      
      // If it's a 404, try the next model
      if (errorMsg.includes('404') || errorMsg.includes('not found')) {
        continue;
      }
      
      // For other errors, might be worth breaking and reporting
      if (errorMsg.includes('401') || errorMsg.includes('403')) {
        break; // Auth errors won't be fixed by trying other models
      }
    }
  }

  // If all models failed, provide helpful error
  console.error('❌ All models failed. Last error:', lastError);
  
  if (lastError) {
    const errorMsg = lastError.message || JSON.stringify(lastError);
    
    if (errorMsg.includes('401') || errorMsg.includes('Unauthorized')) {
      throw new Error('Invalid/Expired API key. Get a new key from https://aistudio.google.com/');
    } else if (errorMsg.includes('403') || errorMsg.includes('Forbidden') || errorMsg.includes('PERMISSION_DENIED')) {
      throw new Error('API key lacks permissions. Make sure the Generative AI API is enabled.');
    } else if (errorMsg.includes('404') || errorMsg.includes('not found')) {
      throw new Error('Model not found for this API key. Your key may not support these models. Try getting a fresh key from https://aistudio.google.com/');
    } else if (errorMsg.includes('429')) {
      throw new Error('Rate limit exceeded. Please wait and try again.');
    }
  }
  
  throw lastError || new Error('Failed to generate content with all available models');
};

export const generateSummary = async (personalData, experienceData, skillsData) => {
  try {
    const prompt = `Write a professional summary for a resume based on the following information:

Personal Info: ${JSON.stringify(personalData)}
Experience: ${JSON.stringify(experienceData)}
Skills: ${JSON.stringify(skillsData)}

Write a compelling 2-3 sentence professional summary that highlights key strengths, experience, and career goals. Keep it concise and impactful.`;

    const result = await callGeminiAPI(prompt);
    return result.trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    return 'Error generating summary. Please try again.';
  }
};

export const generateJobDescription = async (jobData, skillsData) => {
  try {
    const prompt = `Write a professional job description/responsibilities section for a resume based on:

Job Info: ${JSON.stringify(jobData)}
Skills: ${JSON.stringify(skillsData)}

Write 3-5 bullet points describing key responsibilities, achievements, and technologies used. Use action verbs and quantify achievements where possible. Format with bullet points (•).`;

    const result = await callGeminiAPI(prompt);
    return result.trim();
  } catch (error) {
    console.error('Error generating job description:', error);
    return 'Error generating job description. Please try again.';
  }
};

export const suggestSkills = async (experienceData, currentSkills) => {
  try {
    const prompt = `Based on the following work experience, suggest additional relevant skills that should be included in a resume:

Experience: ${JSON.stringify(experienceData)}
Current Skills: ${JSON.stringify(currentSkills)}

Suggest 5-8 technical and soft skills that would complement the experience shown. Group them into categories like "Technical Skills" and "Soft Skills". Return as comma-separated values for each category.`;

    const result = await callGeminiAPI(prompt);
    return result.trim();
  } catch (error) {
    console.error('Error suggesting skills:', error);
    return 'Error suggesting skills. Please try again.';
  }
};

export const generateProjectDescription = async (projectData) => {
  try {
    const prompt = `Write a compelling project description for a resume based on:

Project Info: ${JSON.stringify(projectData)}

Write 2-4 sentences describing what the project is, the technologies used, and the impact or key features. Make it engaging and highlight technical skills.`;

    const result = await callGeminiAPI(prompt);
    return result.trim();
  } catch (error) {
    console.error('Error generating project description:', error);
    return 'Error generating project description. Please try again.';
  }
};