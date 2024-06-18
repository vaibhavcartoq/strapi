"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "carousel",
    plugin: "custom-carousel-picker",
    type: "json",
    // inputSize: {
    //   default: 12,
    //   isResizable: true,
    // },
  });
};