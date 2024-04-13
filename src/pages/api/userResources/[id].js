import dbConnect from "@/utils/dbConnect";
import UserResources from "@/models/userResources";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userResources = await UserResources.findById(id);

        if (!userResources) {
          return res.status(404).json({ success: false });
        }

        // Return all user resources without checking for a specific resource type
        res.status(200).json({ success: true, data: userResources });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
      break;

    //   switch (method) {
    //     case "GET":
    //       try {
    //         const resourceType = req.query.resourceType;
    //         const userResources = await UserResources.findById(id);

    //         if (!userResources) {
    //           return res.status(404).json({ success: false });
    //         }

    //         // If a resourceType is provided, return its value.
    //         if (resourceType && ["water", "soil", "seeds"].includes(resourceType)) {
    //           return res
    //             .status(200)
    //             .json({
    //               success: true,
    //               data: { [resourceType]: userResources[resourceType] },
    //             });
    //         }

    //         res.status(200).json({ success: true, data: userResources });
    //       } catch (error) {
    //         return res.status(400).json({ success: false });
    //       }
    //       break;

    case "PUT":
      try {
        const resourceType = req.query.resourceType; // Assuming the type is passed as a query parameter
        if (!["water", "soil", "seeds"].includes(resourceType)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid resource type" });
        }

        const userResources = await UserResources.findById(id);
        if (!userResources) {
          return res.status(404).json({ success: false });
        }

        // Increment the specified resource
        console.log(userResources[resourceType]);
        userResources[resourceType] += 1;
        await userResources.save();

        res.status(200).json({ success: true, data: userResources });
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
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Metodo ${method} non accettato!`);
  }
}
