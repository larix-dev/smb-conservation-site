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
var latRegex = /([0-8]?\d|90)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[NS]/;
var lngRegex = /(\d{1,2}|1[0-7][0-9]|180)\:(0\d|[1-5]\d|60)\:(0\d|[1-5]\d|60)(\.\d{1,3})?[EW]/;
var coordRegex = new RegExp(`^${latRegex.source},\\s*${lngRegex.source}\\s*\\n?$`);
var trailRegex = new RegExp(`^(${latRegex.source},\\s*${lngRegex.source}\\s*\\n?){2,}$`);
var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
      image: (0, import_fields.image)({ storage: "localImages" }),
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
  Footer: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      address: (0, import_fields.text)({
        validation: {
          isRequired: true
        },
        ui: {
          displayMode: "textarea"
        }
      }),
      phone: (0, import_fields.text)({ validation: { isRequired: true } }),
      ...(0, import_core.group)({
        label: "Instagram",
        fields: {
          instagramHandle: (0, import_fields.text)({ validation: { isRequired: true } })
        }
      }),
      ...(0, import_core.group)({
        label: "Facebook",
        fields: {
          facebookHandle: (0, import_fields.text)({ validation: { isRequired: true } })
        }
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
  }),
  Map: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true
      }),
      centreCoords: (0, import_fields.text)({
        ui: {
          description: "Coordinates representing the centre point of the map\n\nCoordinates must be latitude-longitude in DMS format\ni.e. 00:00:00.000N, 00:00:00.000W"
        },
        validation: {
          isRequired: true,
          match: { regex: coordRegex, explanation: "Coordinate pair must be in valid DMS format (see above)" }
        }
      }),
      zoom: (0, import_fields.integer)({
        ui: {
          description: "The initial and maximum zoom factor of the map"
        },
        validation: { isRequired: true }
      })
    }
  }),
  Trail: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({
        ui: {
          description: "Trail name that will be displayed on the map"
        },
        validation: { isRequired: true }
      }),
      trailCoords: (0, import_fields.text)({
        ui: {
          displayMode: "textarea",
          description: "A list of coordinates representing a trail\n\nCoordinates must be latitude-longitude in DMS format\ni.e. 00:00:00.000N, 00:00:00.000W\nEach coordinate pair must be on its own line\nAt least two points are required to create a trail"
        },
        validation: {
          isRequired: true,
          match: {
            regex: trailRegex,
            explanation: "Coordinate pairs must be in valid DMS format (see above), each on their own line"
          }
        }
      }),
      colour: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "Red", value: "#dc2626" },
          { label: "Orange", value: "#f97316" },
          { label: "Yellow", value: "#eab308" },
          { label: "Green", value: "#22c55e" },
          { label: "Blue", value: "#3b82f6" },
          { label: "Violet", value: "#8b5cf6" }
        ],
        defaultValue: "blue",
        validation: { isRequired: true }
      })
    }
  }),
  Privacy: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true
      })
    }
  }),
  Disclaimer: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true
      })
    }
  }),
  ProductsServicesPage: (0, import_core.list)({
    access: import_access.allowAll,
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true
      })
    }
  }),
  Product: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      urlId: (0, import_fields.text)({
        label: "URL ID",
        validation: {
          isRequired: true,
          match: {
            regex: /^[a-z\-]*$/,
            explanation: "URL ID must only contain lowercase letters, hypens, and no spaces"
          }
        }
      }),
      image: (0, import_fields.image)({ storage: "localImages" }),
      isService: (0, import_fields.checkbox)(),
      origin: (0, import_fields.text)({ ui: { description: "Not required for services" } }),
      description: (0, import_fields_document.document)({
        formatting: true,
        ui: {
          description: "First paragraph is used for the preview"
        }
      })
    }
  }),
  MailRecipient: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: {
          isRequired: true,
          match: {
            regex: emailRegex,
            explanation: "Must be a valid email"
          }
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
var import_multer = __toESM(require("multer"));
function extendApp(app) {
  app.use(import_body_parser.default.json());
  const transport = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  const sendMail = async (message) => {
    const from = `${process.env.SENDER_NAME} <${process.env.SENDER_ADDR}>`;
    const mail = { from, ...message };
    return new Promise((resolve) => {
      transport.sendMail(mail, (error) => {
        if (error) {
          console.log(`\u{1F4E7} Mail error: ${error.message}`);
          resolve(500);
        } else {
          console.log(`\u{1F4E7} Message sent to ${message.to}`);
          resolve(200);
        }
      });
    });
  };
  const corsOpts = {
    origin: (origin, callback) => {
      if (origin === process.env.CLIENT_URL) {
        callback(null, true);
      } else {
        callback("Error: origin not allowed by CORS");
      }
    }
  };
  const upload = (0, import_multer.default)();
  const mailFields = upload.fields([
    { name: "message", maxCount: 1 },
    { name: "images[]", maxCount: 10 }
  ]);
  app.post("/send-multipart-message", (0, import_cors.default)(corsOpts), mailFields, async (req, res) => {
    const files = req.files;
    const attachments = [];
    if (files && files["images[]"]) {
      files["images[]"].map(
        (file) => attachments.push({
          filename: file.originalname,
          content: file.buffer
        })
      );
    }
    return res.sendStatus(await sendMail({ ...req.body.message, attachments }));
  });
  app.post("/send-message", (0, import_cors.default)(corsOpts), async (req, res) => {
    return res.sendStatus(await sendMail(req.body));
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
