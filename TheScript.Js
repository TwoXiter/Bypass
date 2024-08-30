document.getElementById('bypassButton').addEventListener('click', async () => {
    const link = document.getElementById('linkInput').value.trim();
    if (!link) {
        alert('Please enter a link.');
        return;
    }

    try {
        const response = await fetch(`https://api.bypass.vip/bypass?url=${encodeURIComponent(link)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log('API response:', data);

        if (data.status === 'success' && data.result) {
            document.getElementById('result').style.display = 'block';
            document.getElementById('bypassedLink').value = data.result;
        } else {
            console.error('API response issue:', data);
            alert('There was an issue with the bypass process. Please enter a valid link and try again.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again.');
    }
});

document.getElementById('redirectButton').addEventListener('click', () => {
    const bypassedLink = document.getElementById('bypassedLink').value;
    if (bypassedLink) {
        window.location.href = bypassedLink;
    }
});

document.getElementById('copyButton').addEventListener('click', () => {
    const bypassedLink = document.getElementById('bypassedLink');
    bypassedLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

document.getElementById('toggleMode').addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        document.getElementById('toggleMode').textContent = 'Switch to RGB Mode';
    } else if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('rgb-mode');
        document.getElementById('toggleMode').textContent = 'Switch to Dark Mode';
    } else {
        body.classList.add('dark-mode');
        document.getElementById('toggleMode').textContent = 'Switch to Light Mode';
    }
});
