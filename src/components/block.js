const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

registerBlockType('text-generator-block/text-generator', {
    title: 'Text Generator',
    icon: 'editor-textcolor',
    category: 'common',
    attributes: {
        generatedText: {
            type: 'string',
            default: 'Loading...', // Display a loading message initially
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props;

        // Function to fetch text from the ChatGPT-3 API and update the generatedText attribute
        const fetchTextFromAPI = async () => {
            try {
                const prompt = 'Generate text for me.'; // Your text generation prompt
                const apiKey = ''; // Replace with your ChatGPT-3 API key

                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        prompt,
                        max_tokens: 50, // Adjust the max_tokens based on your desired text length
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                const generatedText = data.choices[0].text;
                setAttributes({ generatedText });
            } catch (error) {
                console.error('Error:', error);
                setAttributes({ generatedText: 'Error fetching text.' });
            }
        };

        return (
            <div className={props.className}>
                <TextControl
                    label="Generated Text"
                    value={attributes.generatedText}
                    onChange={(newText) => setAttributes({ generatedText: newText })}
                />
                <button onClick={fetchTextFromAPI}>Generate Text</button>
            </div>
        );
    },
    // save
    save: function (props) {
        const { attributes } = props;

        return (
            <div className="text-generator-block">
                {attributes.generatedText}
            </div>
        );
    },
});
