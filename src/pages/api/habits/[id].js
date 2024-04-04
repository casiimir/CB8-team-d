import dbConnect from "@/utils/dbConnect";
import Habit from "@/models/habit";

export default async function handler(req, res) {
  const { method, query } = req;

  console.log(query.id);

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const habit = await Habit.findById(query.id);

        if (!habit) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: habit });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const { body } = req;

        const newBody = {
          ...body,
          streak: body.streak + 1,
          lastCompleted: Date.now(),
        };
        const modifiedHabit = await Habit.findByIdAndUpdate(query.id, newBody);
        // const modifiedHabit = await Habit.findById(query.id);

        // const newBody = {
        //   streak: modifiedHabit.streak + 1,
        //   lastCompleted: Date.now(),
        // };

        // const updatedHabit = await Habit.findByIdAndUpdate(query.id, newBody);

        if (!modifiedHabit) {
          res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: modifiedHabit });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const deletedHabit = await Habit.deleteOne({ _id: query.id });

        if (!deletedHabit) {
          return res.status(404).json({ success: false });
        }

        res.status(204).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Metodo ${method} non accettato!`);
  }
}
