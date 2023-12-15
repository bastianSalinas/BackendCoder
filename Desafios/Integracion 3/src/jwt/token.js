import jwt from 'jsonwebtoken';

export function generateAndSetToken(res, email, password) {
  const token = jwt.sign({ email, password, role: "user" }, "Secret-key", { expiresIn: "24h" });
  res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
  return token
}

export function generateAndSetTokenEmail(email) {
  const token = jwt.sign({ email }, 'secreto', { expiresIn: '1h' });
  console.log(token)
  return token
}
export function validateTokenResetPass(token) {
  const result = jwt.verify(token, 'secreto');
  console.log(result)
  return result
}
