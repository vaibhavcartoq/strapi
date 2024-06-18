'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('author-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
