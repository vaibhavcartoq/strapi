'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('model-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
