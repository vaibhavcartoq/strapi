import type { Schema, Attribute } from '@strapi/strapi';

export interface ArticleBlockCarouselImageBlock extends Schema.Component {
  collectionName: 'components_article_block_carousel_image_blocks';
  info: {
    displayName: 'Carousel Image Block';
    description: '';
  };
  attributes: {
    Carousel: Attribute.JSON &
      Attribute.CustomField<'plugin::custom-carousel-picker.carousel'>;
  };
}

export interface ArticleBlockImageBlock extends Schema.Component {
  collectionName: 'components_article_block_image_blocks';
  info: {
    displayName: 'Image Block';
    description: '';
  };
  attributes: {
    Image: Attribute.JSON &
      Attribute.CustomField<'plugin::custom-image-picker.image'>;
  };
}

export interface ArticleBlockSectionBlock extends Schema.Component {
  collectionName: 'components_article_block_section_blocks';
  info: {
    displayName: 'Section Block';
  };
  attributes: {
    Section_Block: Attribute.Blocks;
  };
}

export interface ArticleBlockSpecificationsBlock extends Schema.Component {
  collectionName: 'components_article_block_specifications_blocks';
  info: {
    displayName: 'Specifications Block';
  };
  attributes: {
    Specifications: Attribute.JSON &
      Attribute.CustomField<'plugin::specifications-picker.specifications'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'article-block.carousel-image-block': ArticleBlockCarouselImageBlock;
      'article-block.image-block': ArticleBlockImageBlock;
      'article-block.section-block': ArticleBlockSectionBlock;
      'article-block.specifications-block': ArticleBlockSpecificationsBlock;
    }
  }
}
