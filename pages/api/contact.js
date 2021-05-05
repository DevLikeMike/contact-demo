import nodemailer from "nodemailer";
export default async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  try {
    const emailRes = await transporter.sendMail({
      from: email,
      to: "mhall.project@gmail.com",
      subject: `Contact form submission from ${email}`,
      html: `<p>New Form Submission from your site</p>
      <p><strong>Name: </strong> ${name} </p>
      <p><strong>Message: </strong> ${message} </p>

      `,
    });

    console.log("Message Sent");
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};
