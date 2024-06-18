"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "head-block",
    plugin: "head-block-plugin",
    type: "json",
    // inputSize: {
    //   default: 12,
    //   isResizable: true,
    // },
  });
};