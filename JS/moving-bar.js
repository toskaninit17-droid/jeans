document.addEventListener("DOMContentLoaded", () => {
    const text = document.getElementById("tickerText");
    const messages = [
        "🔥 شحن لجميع المحافظات خلال 48 ساعة!",
        "⚡ عروض جديدة كل يوم!",
        "🛍️ خامات ممتازة وجودة عالية!"
    ];
    
    let i = 0;

    function update() {
        text.style.opacity = 0;
        setTimeout(() => {
            text.textContent = messages[i];
            text.style.opacity = 1;
        }, 200);

        i = (i + 1) % messages.length;
    }

    update();
    setInterval(update, 4000);
});
