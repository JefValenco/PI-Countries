const postValidate = (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name!" });
  if (!difficulty)
    return res.status(400).json({ error: "Missing difficulty!" });
  if (!duration) return res.status(400).json({ error: "Missing duration!" });
  if (!season) return res.status(400).json({ error: "Missing season!" });
  if (!countries) return res.status(400).json({ error: "Missing countries!" });

  next();
};

module.exports = { postValidate };
