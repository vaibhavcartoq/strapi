'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('head-block-plugin')
      .service('myService')
      .getWelcomeMessage();
  },
});
