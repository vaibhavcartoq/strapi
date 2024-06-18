'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('featured-image-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
