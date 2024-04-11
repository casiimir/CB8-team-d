import dbConnect from "@/utils/dbConnect";
import UserResources from "@/models/userResources";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const userResources = await UserResources.find({ userId });

        res.status(200).json({ success: true, data: userResources });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { body } = req;
        const userResources = await UserResources.create(body);

        res.status(201).json({ success: true, data: userResources });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // in questo caso la richiesta della put sarebbe verso /api/garden/:userId
    case "PUT":
      try {
        const { body, query } = req;
        const { userId } = query; // Estrai l'userId dalla query della richiesta

        // Assicurati che l'userId sia incluso nella query della richiesta
        if (!userId) {
          return res
            .status(400)
            .json({ success: false, error: "userId is required" });
        }

        const updatedUserResources = await UserResources.findOneAndUpdate(
          { userId }, // Filtra per userId
          body, // Dati da aggiornare
          { new: true } // Opzione: restituisci il nuovo documento aggiornato
        );

        if (!updatedUserResources) {
          return res
            .status(404)
            .json({ success: false, error: "Document not found" });
        }

        res.status(200).json({ success: true, data: updatedUserResources });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
      break;

    // in quest'altro modo l'userId deve essere parte del corpo della richiesta:
    case "PUT":
      try {
        const { body } = req;
        const { userId } = body; // Estrai l'userId dal corpo della richiesta

        // Assicurati che l'userId sia incluso nel corpo della richiesta
        if (!userId) {
          return res
            .status(400)
            .json({ success: false, error: "userId is required" });
        }

        const updatedUserResources = await UserResources.findOneAndUpdate(
          { userId }, // Filtra per userId
          body, // Dati da aggiornare
          { new: true } // restituisce il nuovo documento aggiornato
        );

        if (!updatedUserResources) {
          return res
            .status(404)
            .json({ success: false, error: "Document not found" });
        }

        res.status(200).json({ success: true, data: updatedUserResources });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
      break;
  }
}
