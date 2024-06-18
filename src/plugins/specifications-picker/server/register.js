"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "specifications",
    plugin: "specifications-picker",
    type: "json",
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  });
};