'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('isdefault-toggle')
      .service('myService')
      .getWelcomeMessage();
  },
});
