import './style.scss'
import './editor.scss'

import { __ } from '@wordpress/i18n'
const { registerBlockType, createBlock } = wp.blocks
const { RichText } = wp.blockEditor

export default registerBlockType(
  'advanced-gutenberg-blocks/intro',
  {
    title: __( 'Intro', 'advanced-gutenberg-blocks' ),
    description: __( 'Display a nice introduction text at the beginning of your post', 'advanced-gutenberg-blocks' ),
    category: 'agb',
    icon: { background: '#2F313A', foreground: '#DEBB8F', src: 'editor-textcolor' },
    keywords: [
      __( 'introduction', 'advanced-gutenberg-blocks' ),
      __( 'subhead', 'advanced-gutenberg-blocks' ),
      __( 'chapo', 'advanced-gutenberg-blocks' ),
    ],
    attributes: {
      content: {
        type: 'array',
        source: 'children',
        selector: '.wp-block-advanced-gutenberg-blocks-intro__content',
      },
    },
    useOnce: true,
    transforms: {
      from: [
        {
          type: 'block',
          blocks: [ 'core/paragraph' ],
          transform: function ( attributes ) {
            return createBlock( 'advanced-gutenberg-blocks/intro', {
                content: attributes.content,
            } )
          }
        }
      ],
      to: [
        {
          type: 'block',
          blocks: [ 'core/paragraph' ],
          transform: function ( attributes ) {
            return createBlock( 'core/paragraph', {
                content: attributes.content,
            } )
          }
        }
      ]
    },
    edit: props => {

			const { attributes: { content }, setAttributes } = props

      return (
        <div className='wp-block-advanced-gutenberg-blocks-intro'>

          <RichText
            tagName="p"
            placeholder={ __( 'Your introduction here', 'advanced-gutenberg-blocks' ) }
            value={ content }
            className='wp-block-advanced-gutenberg-blocks-intro__content'
            onChange={ content => setAttributes( { content } ) }
  				/>
        </div>
      )
    },
    save: props => {

			const { content } = props.attributes

			return (
        <div className='wp-block-advanced-gutenberg-blocks-intro'>
          <p className='wp-block-advanced-gutenberg-blocks-intro__content'>{ content }</p>
        </div>
      )
    },
  },
)
