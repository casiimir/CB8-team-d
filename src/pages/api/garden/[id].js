import dbConnect from "@/utils/dbConnect";
import Garden from "@/models/garden";

export default async function handler(req, res) {
  const {
    method,
    query: { userId, id },
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const { body } = req;
        const garden = await Garden.findById(req.params.id);

        if (!garden) {
          return res.status(404).json({ success: false });
        }
        const plotIndex = garden.plots.findIndex(
          (plot) => plot.x === body.x && plot.y === body.y
        );
        if (plotIndex !== -1) {
          garden.plots[plotIndex] = {
            ...garden.plots[plotIndex],
            plant: body.plant,
            empty: body.empty,
          };
          console.log(garden.plots[plotIndex]);
          garden.markModified("plots");
        } else {
          garden.plots.push(body);
        }
        await garden.save();
        res.status(200).json({ success: true, data: garden });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, error: error.message });
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
