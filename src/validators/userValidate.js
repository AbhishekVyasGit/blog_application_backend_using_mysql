const { validationResult, body } = require('express-validator');

// Middleware for generic request validation
const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

// Specific validation middleware for signup
const signupValidation = validateRequest([
  body("name").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]);

// Specific validation middleware for login
const loginValidation = validateRequest([
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
]);

module.exports = { signupValidation, loginValidation };
