<?php
/**
 * Plugin Name: Text Generator Block
 * Description: A Gutenberg block to generate using chatgpt.
 * Version: 1.0
 * Author: Omomoh Agiogu
 */

class Text_Generator_Block {
    public function __construct() {
        // Load the necessary scripts and styles
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_assets'));
        
        // Register the block
        add_action('init', array($this, 'register_block'));
    }

    public function enqueue_assets() {
        wp_enqueue_script(
            'text-generator-block-script',
            plugin_dir_url(__FILE__) . 'build/index.js',
            array('wp-blocks', 'wp-editor', 'wp-components', 'wp-element')
        );
    }

    public function register_block() {
        register_block_type('text-generator-block/text-generator', array(
            'editor_script' => 'text-generator-block-script',
            'render_callback' => array($this, 'render_block'),
        ));
    }

    public function render_block($attributes) {
        // Define the block's output here
        $generated_text = isset($attributes['generatedText']) ? $attributes['generatedText'] : 'Lorem Ipsum Text';
        return '<div class="text-generator-block">' . esc_html($generated_text) . '</div>';
    }
}

// Initialize the plugin
new Text_Generator_Block();
