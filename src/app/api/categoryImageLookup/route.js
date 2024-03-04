const apiKey = process.env.UNSPLASH_API_KEY;

const images = document.querySelectorAll('.image');

fetch(`https://api.unsplash.com/photos/random?query=restaurant&count=10&client_id=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        data.forEach((photo, index) => {
            images[index].src = photo.urls.regular;
        });
    });

function getCategoryImage(category) {
    // TODO: Implement your logic here

    // Example: Return a placeholder image URL
    return `https://example.com/images/${category}.jpg`;
}

module.exports = getCategoryImage;