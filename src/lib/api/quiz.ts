import { QuizData } from "@/lib/types/quiz";
import { promises as fs } from "fs";
import path from "path";

export async function getQuiz(): Promise<QuizData> {
  const filePath = path.join(process.cwd(), "src/data/quiz.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}
