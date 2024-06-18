'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('specifications-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
