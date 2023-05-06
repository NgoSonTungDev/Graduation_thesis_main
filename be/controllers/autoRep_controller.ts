import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const autoRepController = {
  getMessageChatGpt: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const prompt = req.body.prompt;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      res.json(
        errorFunction(false, 200, "Có lời nhắn !", {
          type: true,
          content: response.data.choices[0].text,
          dateTime: Number(new Date()),
        })
      );
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default autoRepController;
