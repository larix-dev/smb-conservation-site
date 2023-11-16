"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      isAdmin: (0, import_fields.checkbox)()
    }
  }),
  Announcement: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      text: (0, import_fields.text)({ validation: { isRequired: true } }),
      colour: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "Red", value: "red" },
          { label: "Orange", value: "orange" },
          { label: "Yellow", value: "yellow" },
          { label: "Green", value: "green" },
          { label: "Blue", value: "blue" },
          { label: "Violet", value: "violet" }
        ],
        defaultValue: "blue",
        validation: { isRequired: true }
      }),
      active: (0, import_fields.checkbox)({ defaultValue: true })
    }
  }),
  About: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true
      })
    }
  }),
  Burial: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true
      })
    }
  }),
  Feedback: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      image: (0, import_fields.image)({ storage: "localImages" }),
      content: (0, import_fields_document.document)({
        formatting: true
      })
    }
  }),
  GalleryTag: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      tagName: (0, import_fields.text)({ validation: { isRequired: true } })
    }
  }),
  GalleryImage: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      image: (0, import_fields.image)({ storage: "localImages" }),
      caption: (0, import_fields.text)({ validation: { isRequired: true, length: { max: 100 } } }),
      author: (0, import_fields.text)({ validation: { isRequired: true } }),
      dateTaken: (0, import_fields.calendarDay)({ validation: { isRequired: true } }),
      tags: (0, import_fields.relationship)({
        ref: "GalleryTag",
        many: true,
        ui: {
          labelField: "tagName"
        }
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
  secure: false
});

// keystone.ts
var import_config = require("dotenv/config");

// extensions.ts
var import_nodemailer = __toESM(require("nodemailer"));
var import_body_parser = __toESM(require("body-parser"));
var import_cors = __toESM(require("cors"));
function extendApp(app) {
  app.use(import_body_parser.default.json());
  const transport = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  const corsOpts = {
    origin: (origin, callback) => {
      if (origin === process.env.CLIENT_URL) {
        callback(null, true);
      } else {
        callback("Error: origin not allowed by CORS");
      }
    }
  };
  app.post("/send-message", (0, import_cors.default)(corsOpts), async (req, res) => {
    console.log(req.body.images);
    const { to, subject, text: text2 } = req.body.data;
    const from = `${process.env.SENDER_NAME} <${process.env.SENDER_ADDR}>`;
    const mail = { from, to, subject, text: text2 };
    transport.sendMail(mail, (error) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      console.log(`Message sent to ${to}`);
    });
    return res.sendStatus(200);
  });
}

// keystone.ts
var port = process.env.PORT ? parseInt(process.env.PORT) : 3e3;
var apiUrl = process.env.API_URL || `http://localhost:${port}`;
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: process.env.DB_URL
    },
    lists,
    session,
    storage: {
      localImages: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${apiUrl}/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "storage/localImages"
      }
    },
    server: {
      cors: { origin: [process.env.CLIENT_URL], credentials: true },
      port,
      extendExpressApp: (app) => extendApp(app)
    }
  })
);
//# sourceMappingURL=config.js.map
