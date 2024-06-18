"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "image",
    plugin: "custom-image-picker",
    type: "json",
    // inputSize: {
    //   default: 12,
    //   isResizable: true,
    // },
  });
};