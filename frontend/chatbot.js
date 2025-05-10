document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const chatBtn = document.getElementById('chatBotBtn');
    const chatIconCancel = document.getElementById('chatIconCancel');
    const closeBtn = chatBtn.querySelector('.close-btn');


    // Load saved state
    if (localStorage.getItem('chatOpen') === 'true') {
        chatBox.classList.add('show');
    }

    // Toggle chat
    chatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chatBox.classList.toggle('show');
        localStorage.setItem('chatOpen', chatBox.classList.contains('show'));
    });

    chatIconCancel.addEventListener('click', (e) => {
        e.stopPropagation();
        chatBox.classList.remove('show');
        localStorage.setItem('chatOpen', chatBox.classList.remove('show'));
    });


    // Close when clicking outside
    document.addEventListener('click', () => {
        if (chatBox.classList.contains('show')) {
            chatBox.classList.remove('show');
            localStorage.setItem('chatOpen', 'false');
        }
    });

    // Prevent chat box from closing when clicking inside
    chatBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering button click
        chatBtn.classList.add('hidden'); // Hide button visually
    });

});