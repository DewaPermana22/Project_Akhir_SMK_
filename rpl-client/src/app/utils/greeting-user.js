export const greetUser = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Selamat Pagi';
    } else if (hour < 18) {
        return 'Selamat Siang';
    } else {
        return 'Selamat Malam';
    }
}