"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "author",
    plugin: "author-picker",
    type: "string",
    inputSize: {
      // optional
      default: 6,
      isResizable: false,
    },
  });
};