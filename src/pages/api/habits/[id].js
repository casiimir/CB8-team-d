import dbConnect from "@/utils/dbConnect";
import Habit from "@/models/habit";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const habit = await Habit.findById(id);

        if (!habit) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: habit });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    // case "PUT":
    //   try {
    //     const { body } = req;
    //     const newBody = {
    //       ...body,
    //       streak: body.streak + 1,
    //       lastCompleted: Date.now(),
    //     };

    //     const modifiedHabit = await Habit.findByIdAndUpdate(query.id, newBody, {
    //       new: true,
    //     });

    //     if (!modifiedHabit) {
    //       res.status(404).json({ success: false });
    //     }

    //     res.status(200).json({ success: true, data: modifiedHabit });
    //   } catch (error) {
    //     return res.status(400).json({ success: false });
    //   }
    //   break;

    case "PUT":
      try {
        const { body } = req;
        const habit = await Habit.findByIdAndUpdate(id, body);

        if (!habit) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: habit });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedHabit = await Habit.deleteOne({ _id: id });

        if (!deletedHabit) {
          return res.status(404).json({ success: false });
        }

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Metodo ${method} non accettato!`);
  }
}
