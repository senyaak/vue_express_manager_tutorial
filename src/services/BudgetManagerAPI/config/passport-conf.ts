import * as passport from "passport";
import * as PassportJWT from "passport-jwt";
import * as config from "./index";
import {User} from "../app/model/user";
const ExtractJWT = PassportJWT.ExtractJwt;
const Strategy = PassportJWT.Strategy;

export default (passport: passport.PassportStatic) => {
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  };
  return passport.use(new Strategy(parameters, (payload, done) => {
    User.findOne({ id: payload.id }, (error, user) => {
      if (error){
        return done(error, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
}
