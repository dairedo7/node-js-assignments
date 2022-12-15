const { User } = require('../../models');
const { Conflict } = require('http-errors');
const { STATUS_CODES } = require('../../middlewares');
const gravatar = require('gravatar');
const { v4: uuid } = require('uuid');

const { CREATED } = STATUS_CODES;

const { sendEmail, emailOutline } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} is in use`);
  }

  const verificationToken = uuid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({
    subscription,
    email,
    avatarURL,
    verificationToken,
  });

  const mailData = emailOutline(email, verificationToken);
  await sendEmail(mailData);
  newUser.setPassword(password);
  newUser.save();

  res.status(CREATED).json({
    status: 'success',
    code: CREATED,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
