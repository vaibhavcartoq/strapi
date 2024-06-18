"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "isdefault",
    plugin: "isdefault-toggle",
    type: "boolean",
    inputSize: {
      // optional
      default: 6,
      isResizable: false,
    },
  });
};