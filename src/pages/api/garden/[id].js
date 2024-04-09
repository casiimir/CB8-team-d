import dbConnect from "@/utils/dbConnect";
import Garden from "@/models/garden";

export default async function handler(req, res) {
  const { method, query } = req;

  //   console.log(query.id);

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const garden = await Garden.findById(query.id);

        if (!garden) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: garden });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} non accettato!`);
  }
}
