'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('cartype-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
