import config from "../config.js";

export default class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case "ARRAY":
        let { default: UsersDaoArray } = await import("./usersDaoArray.js");
        return new UsersDaoArray();
      case "FILE":
        let { default: UsersDaoFile } = await import("./usersDaoFile.js");
        return new UsersDaoFile();
    }
  };
}
