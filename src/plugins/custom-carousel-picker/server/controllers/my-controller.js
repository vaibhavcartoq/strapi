'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-carousel-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
