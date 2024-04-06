import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      const { email, password, username } = req.body;

      const exists = await User.findOne({ $or: [{ email }, { username }] });
      if (exists) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        username,
        password: hashedPassword,
      });

      await user.save();

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
