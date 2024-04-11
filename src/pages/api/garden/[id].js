import dbConnect from "@/utils/dbConnect";
import Garden from "@/models/garden";
import GardenPage from "@/pages/garden";
import { IoPlayOutline } from "react-icons/io5";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const garden = await Garden.findById(id);

        if (!garden) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: garden });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const { body } = req;
        const garden = await Garden.findByIdAndUpdate(id, body);

        if (!garden) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: garden });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedGarden = await Habit.deleteOne({ _id: id });

        if (!deletedGarden) {
          return res.status(404).json({ success: false });
        }

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Metodo ${method} non accettato!`);
  }
}
