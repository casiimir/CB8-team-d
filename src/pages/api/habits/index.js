import dbConnect from "@/utils/dbConnect";
import Habit from "@/models/habit";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const habits = await Habit.find({});

        res.status(200).json({ success: true, data: habits });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { body } = req;
        const habit = await Habit.create(body);

        res.status(201).json({ success: true, data: habit });
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
