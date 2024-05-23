document.addEventListener('DOMContentLoaded', () => {
    const inputScreen = document.getElementById('input-screen');
    const resultScreen = document.getElementById('result-screen');
    const userInput = document.getElementById('user-input');
    const generateBtn = document.getElementById('generate-btn');
    const robotImage = document.getElementById('robot-image');
    const downloadBtn = document.getElementById('download-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const styleButtons = document.querySelectorAll('.style-btn');

    let selectedStyle = null;

    generateBtn.addEventListener('click', () => {
        const inputValue = userInput.value.trim();
        if (inputValue) {
            const imageUrl = `https://robohash.org/${inputValue}${selectedStyle ? `?set=${selectedStyle}` : ''}`;
            robotImage.src = imageUrl;
            robotImage.onload = () => {
                inputScreen.classList.remove('active');
                resultScreen.classList.add('active');
            };
        } else {
            alert('Please enter something to generate an avatar.');
        }
    });

    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            styleButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedStyle = button.dataset.set;
        });
    });

    downloadBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(robotImage.src);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'cyberavatar.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    });

    tryAgainBtn.addEventListener('click', () => {
        resultScreen.classList.remove('active');
        inputScreen.classList.add('active');
        userInput.value = '';
        robotImage.src = '';
    });
});