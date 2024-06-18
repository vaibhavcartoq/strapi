"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "model",
    plugin: "model-picker",
    type: "string",
    inputSize: {
      // optional
      default: 6,
      isResizable: false,
    },
  });
};