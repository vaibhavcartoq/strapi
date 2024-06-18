'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('seo-block')
      .service('myService')
      .getWelcomeMessage();
  },
});
