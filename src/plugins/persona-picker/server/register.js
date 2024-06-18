"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "persona",
    plugin: "persona-picker",
    type: "string",
    inputSize: {
      // optional
      default: 6,
      isResizable: false,
    },
  });
};