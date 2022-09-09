const emailOutline = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Registration email confirmation",
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}' target='_blank'>Press the button to finish the registration</a>`,
  };

  return mail;
};

module.exports = emailOutline;
