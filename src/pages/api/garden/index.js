import dbConnect from "@/utils/dbConnect";
import Garden from "@/models/garden";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const gardens = await Garden.find({ userId });

        res.status(200).json({ success: true, data: gardens });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { body } = req;
        const garden = await Garden.create(body);

        res.status(201).json({ success: true, data: garden });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        await Garden.deleteMany({});

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
