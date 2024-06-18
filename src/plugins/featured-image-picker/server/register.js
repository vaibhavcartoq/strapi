"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "featured-image",
    plugin: "featured-image-picker",
    type: "string",
    inputSize: {
      // optional
      default: 12,
      isResizable: false,
    },
  });
};