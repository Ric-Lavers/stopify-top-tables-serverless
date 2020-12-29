const cors = require("micro-cors")();
import { getGroup } from "../../db/models/group.model";

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.send();
      return;
    }

    let group = await getGroup(req.query.group_id);

    res.status(200).json(group);
  } catch (error) {
    console.log("api/groups/[group_id].ts", error);

    res.status(400).send(error);
  }
});
