import dbConnect from "@/utils/dbConnect";
import Todo from "@/models/todo";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const todos = await Todo.find({});

        res.status(200).json({ success: true, data: todos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { body } = req;
        const todo = await Todo.create(body);

        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        await Habit.deleteMany({});

        res.status(204).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
