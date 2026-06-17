import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

// export const sender = {
//     email: "hello@demomailtrap.com",
//     name: "Book Your Spot",
// };

export const sender = {
  email: "hello@bookyourspot.in",
  name: "Book Your Spot",
};
