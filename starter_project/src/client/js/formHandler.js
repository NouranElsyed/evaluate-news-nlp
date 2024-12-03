const serverURL = 'http://localhost:8000/sentiment';

let form = document.getElementById('urlForm');
console.log(form);
if(form){
form.addEventListener('submit', handleSubmit);
}else{
   form= ` <form id="urlForm">
    <input id="name" type="text" name="url" placeholder="Enter URL" required>
    <button id="submitButton" type="submit">Submit</button>
</form>`;
}
function handleSubmit(event) {
    console.log(event);
    event.preventDefault();

    
    const formText = document.getElementById('name').value;
    console.log(formText);

    if (isValidURL(formText)) {
        sendDataToServer(formText);
    } else {
        alert('Please enter a valid URL');
    }
}


function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

async function sendDataToServer(url) {
    console.log(url);
    
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();
        console.log(data);
        
        displayResult(data); 
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
}

function displayResult(data) {
        console.log('Displaying result:', data); 
        const resultDiv = document.getElementById('sentimentResult');
        resultDiv.innerHTML = `
            <strong>Form Results:</strong>
            <p>Agreement: ${data.agreement || 'N/A'}</p>
            <p>Confidence: ${data.confidence || 'N/A'}</p>
            <p>Polarity: ${data.score_tag || 'N/A'}</p>
            <p>Subjectivity: ${data.subjectivity || 'N/A'}</p>
            <p>Text Snippet: ${data.sentence_list?.[0]?.text || 'N/A'}</p>
        `;
    }


export { handleSubmit };