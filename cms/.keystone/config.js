"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_config = require("dotenv/config");
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone0.db"
    },
    lists,
    session,
    storage: {
      localImages: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${"http://localhost:5050"}/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "storage/localImages"
      }
    },
    server: {
      cors: { origin: [process.env.CLIENT_URL], credentials: true },
      port: process.env.PORT ? parseInt(process.env.PORT) : 3e3
    }
  })
);
//# sourceMappingURL=config.js.map
