
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            agreement: 'AGREEMENT',
            confidence: '0.95',
            score_tag: 'P',
            subjectivity: 'subjective',
            sentence_list: [{ text: 'Example text snippet' }],
        }),
    })
);

import { handleSubmit } from './formHandler';

describe('Form Handler Tests', () => {
    let form, input, resultDiv;


    beforeEach(() => {
        document.body.innerHTML = `
            <form id="urlForm">
                <input id="name" type="text" name="url" />
                <div id="sentimentResult"></div>
            </form>
        `;

        form = document.getElementById('urlForm');
        input = document.getElementById('name');
        resultDiv = document.getElementById('sentimentResult');

        form.addEventListener('submit', handleSubmit);
    });


    it('should display result after sending valid data', async () => {
        input.value = 'https://example.com'; 
        const submitEvent = new Event('submit');
        form.dispatchEvent(submitEvent); 
    
        await new Promise((resolve) => setTimeout(resolve, 0)); 
    
        
        expect(resultDiv.innerHTML).toContain('Agreement: AGREEMENT');
        expect(resultDiv.innerHTML).toContain('Confidence: 0.95');
        expect(resultDiv.innerHTML).toContain('Polarity: P');
        expect(resultDiv.innerHTML).toContain('Subjectivity: subjective');
        expect(resultDiv.innerHTML).toContain('Text Snippet: Example text snippet');
    });

    
});
