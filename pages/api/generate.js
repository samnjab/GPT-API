// import { Configuration, OpenAIApi } from "openai";
 const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const movie = req.body.movie || '';
  if (movie.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }
  try{
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(movie),
      temperature: 0.6,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    console.log('calling the model')
    res.status(200).json({ result: completion.data.choices[0].text });
    // }
  }catch(error){
   if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }





  // try {
  //   const completion = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: generatePrompt(animal),
  //     temperature: 0.6,
  //   });
    // res.status(200).json({ result: completion.data.choices[0].text });
  // } catch(error) {
  //   // Consider adjusting the error handling logic for your use case
  //   if (error.response) {
  //     console.error(error.response.status, error.response.data);
  //     res.status(error.response.status).json(error.response.data);
  //   } else {
  //     console.error(`Error with OpenAI API request: ${error.message}`);
  //     res.status(500).json({
  //       error: {
  //         message: 'An error occurred during your request.',
  //       }
  //     });
  //   }
  // }
// }
function generatePrompt(movie) {
  const capitalizedMovie =
    movie[0].toUpperCase() + movie.slice(1).toLowerCase();
  return `"Convert movie titles into emoji.
  Back to the Future: 👨👴🚗🕒 
  Batman: 🤵🦇 
  Transformers: 🚗🤖 
  Star Wars: 🌟⭐️⚔️ 
  ${capitalizedMovie}: `;
  }


}
