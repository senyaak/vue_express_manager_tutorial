import * as http from "http";
import BudgetManagerAPI from "./config/passport";

const BudgetManagerServer = new http.Server(BudgetManagerAPI);
const BudgetManagerPORT = process.env.PORT || 3001;
const LOCAL: string = "0.0.0.0";
BudgetManagerServer.listen(
  BudgetManagerPORT,
  0,//LOCAL,
  () => console.log(`BudgetManagerAPI running on ${BudgetManagerPORT}`)
);
