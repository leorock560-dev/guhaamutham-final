
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { formType, fields } = req.body || {};

    if (
      !["Business enquiry", "Feedback"].includes(formType) ||
      !fields ||
      typeof fields !== "object" ||
      Array.isArray(fields)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission."
      });
    }

    const name = String(fields.name || "").trim();
    const email = String(fields.email || "").trim();
    const message = String(
      fields.message || fields.feedback || ""
    ).trim();

    if (
      !name ||
      name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      !message ||
      message.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please check your submitted details."
      });
    }

    const details = Object.entries(fields)
      .map(([key, value]) => {
        return `${key}: ${String(value).slice(0, 5000)}`;
      })
      .join("\n");

    const { data, error } = await resend.emails.send({
      from: "GuhaAmutham Website <website@guhaamutham.com>",
      to: ["info@guhaamutham.com"],
      replyTo: email,
      subject: `New ${formType} - GuhaAmutham`,
      text: `
GUHAAMUTHAM WEBSITE
${formType.toUpperCase()}

--------------------------------

${details}

--------------------------------
Submitted through www.guhaamutham.com
      `
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        success: false,
        message: "Unable to send your email."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submission received."
    });

  } catch (error) {
    console.error("API error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong."
    });
  }
};
