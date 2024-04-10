import dbConnect from "@/utils/dbConnect";
import Daily from "@/models/daily";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const daily = await Daily.findById(id);

        if (!daily) {
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
        const daily = await Daily.findByIdAndUpdate(id, body);

        if (!daily) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: daily });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedDaily = await Daily.deleteOne({ _id: id });

        if (!deletedDaily) {
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
