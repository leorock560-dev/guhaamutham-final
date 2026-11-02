const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_TYPES = ["Business enquiry", "Feedback"];

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { formType, fields } = req.body || {};
  if (!FORM_TYPES.includes(formType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid form type",
    });
  }

  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return res.status(400).json({
      success: false,
      message: "Invalid form data",
    });
  }

  const allowedFields =
    formType === "Business enquiry"
      ? ["name", "email", "phone", "type", "product", "message"]
      : ["name", "email", "category", "rating", "feedback"];
  const values = Object.fromEntries(
    allowedFields.map((key) => [
      key,
      typeof fields[key] === "string" ? fields[key].trim() : "",
    ]),
  );
  const message = values.message || values.feedback;

  if (
    !values.name ||
    values.name.length > 200 ||
    !EMAIL_PATTERN.test(values.email) ||
    values.email.length > 254 ||
    (formType === "Business enquiry" && !values.phone) ||
    !message ||
    message.length > 10000
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid form details.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Email API configuration error: RESEND_API_KEY is not set.");
    return res.status(500).json({
      success: false,
      message: "Email service is not configured.",
    });
  }

  const emailContent = Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GuhaAmutham Website <website@guhaamutham.com>",
        to: ["leorock560@gmail.com"],
        reply_to: values.email,
        subject: `New ${formType} - GuhaAmutham Website`,
        text: `New ${formType}\n\n${emailContent}\n\nSubmitted through www.guhaamutham.com`,
      }),
    });

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (error) {
      console.error("Resend returned an invalid response:", response.status);
      return res.status(502).json({
        success: false,
        message: "Email delivery failed.",
      });
    }

    if (!response.ok) {
      console.error("Resend error:", response.status, result.message);
      return res.status(502).json({
        success: false,
        message: "Email delivery failed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your submission has been received.",
    });
  } catch (error) {
    console.error("Email API error:", error);
    return res.status(502).json({
      success: false,
      message: "Email delivery failed.",
    });
  }
};
