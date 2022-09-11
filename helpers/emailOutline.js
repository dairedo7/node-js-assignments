const emailOutline = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Registration email confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Click here to verify email</a>`,
  };

  return mail;
};

module.exports = emailOutline;
