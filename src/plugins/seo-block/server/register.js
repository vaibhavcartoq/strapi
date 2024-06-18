"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "seo",
    plugin: "seo-block",
    type: "json",
    inputSize: {
      // optional
      default: 12,
      isResizable: false,
    },
  });
};