"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "cartype",
    plugin: "cartype-picker",
    type: "string",
    inputSize: {
      // optional
      default: 6,
      isResizable: false,
    },
  });
};