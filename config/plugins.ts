export default {
  // ...
  'custom-image-picker': {
    enabled: true,
    resolve: './src/plugins/custom-image-picker'
  },
  'custom-carousel-picker': {
    enabled: true,
    resolve: './src/plugins/custom-carousel-picker'
  },
  'specifications-picker': {
    enabled: true,
    resolve: './src/plugins/specifications-picker'
  },
  'head-block-plugin': {
    enabled: true,
    resolve: './src/plugins/head-block-plugin'
  },


  'model-picker': {
    enabled: true,
    resolve: './src/plugins/model-picker'
  },
  'cartype-picker': {
    enabled: true,
    resolve: './src/plugins/cartype-picker'
  },
  'persona-picker': {
    enabled: true,
    resolve: './src/plugins/persona-picker'
  },
  'author-picker': {
    enabled: true,
    resolve: './src/plugins/author-picker'
  },
  'featured-image-picker': {
    enabled: true,
    resolve: './src/plugins/featured-image-picker'
  },
  'isdefault-toggle': {
    enabled: true,
    resolve: './src/plugins/isdefault-toggle'
  },
  'seo-block': {
    enabled: true,
    resolve: './src/plugins/seo-block'
  },

  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::article.article',
          draft: {
            url: 'http://localhost:3000/mlpnkobji/{Model}',
            // query: {
            //   type: 'post',
            //   slug: '{Model}',
            // },
          },
          published: {
            url: 'http://localhost:3000/mlpnkobji/{Model}',
          },
        },
      ],
    },
  },
  // ...
}