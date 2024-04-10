import dbConnect from "@/utils/dbConnect";
import Daily from "@/models/daily";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const dailies = await Daily.find({ userId });

        res.status(200).json({ success: true, data: dailies });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { body } = req;
        const daily = await Daily.create(body);

        res.status(201).json({ success: true, data: daily });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        await Daily.deleteMany({});

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
