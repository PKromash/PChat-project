import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decodedData;
  if (token) {
    try {
      decodedData = jwt.verify(token, "secret");
      req.userId = decodedData?.id;
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export default auth;
