function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

async function getWikipediaImage(title) {
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.thumbnail?.source || null;
    } catch (error) {
        console.error('Error fetching Wikipedia image:', error);
        return null;
    }
}

async function fetchQuotes() {
    try {
        const quotes = [];
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://today.zenquotes.io/api/today'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (!result.contents) {
            throw new Error('No contents in response');
        }
        const data = JSON.parse(result.contents);
        if (data && data.data && Array.isArray(data.data.Events)) {
            const events = data.data.Events.slice(0, 9);
            
            // Process events with their links
            for (const event of events) {
                let thumbnail = null;
                if (event.links) {
                    // Try to get image from the most relevant Wikipedia article
                    const links = Object.values(event.links);
                    for (const link of links) {
                        if (link[1] && link[1].includes('wikipedia.org')) {
                            const title = link[1].split('/').pop();
                            thumbnail = await getWikipediaImage(title);
                            if (thumbnail) break;
                        }
                    }
                }
                quotes.push({
                    q: event.text,
                    thumbnail: thumbnail || 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg' // fallback to Wikipedia logo
                });
            }
        }
        return quotes;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return null;
    }
}

function createQRCode(quote) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(quote)}`;
    return qrUrl;
}

async function displayQRCodes() {
    const grid = document.getElementById('qrGrid');
    const quotes = await fetchQuotes();
    
    if (!quotes || !Array.isArray(quotes)) {
        grid.innerHTML = '<p>Error loading quotes. Please try again later.</p>';
        return;
    }

    grid.innerHTML = '';

    for (let i = 0; i < Math.min(9, quotes.length); i++) {
        const quote = decodeHTMLEntities(quotes[i].q);
        const thumbnail = quotes[i].thumbnail;
        const qrUrl = createQRCode(quote);
        
        const qrItem = document.createElement('div');
        qrItem.className = 'qr-item';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnail;
        thumbnailImg.alt = 'Event Thumbnail';
        thumbnailImg.className = 'thumbnail-img';
        
        const qrImg = document.createElement('img');
        qrImg.src = qrUrl;
        qrImg.alt = 'QR Code';
        qrImg.className = 'qr-code-img';
        
        const quoteText = document.createElement('p');
        quoteText.className = 'quote-text';
        quoteText.textContent = quote;
        
        imageContainer.appendChild(thumbnailImg);
        imageContainer.appendChild(qrImg);
        qrItem.appendChild(imageContainer);
        qrItem.appendChild(quoteText);
        grid.appendChild(qrItem);
    }
}

document.addEventListener('DOMContentLoaded', displayQRCodes);