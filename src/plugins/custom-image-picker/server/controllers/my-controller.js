'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-image-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
