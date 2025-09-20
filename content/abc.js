const fs = require('fs');

const filename = 'myFile.txt';

function getCookie(name) {
    // Add a leading semicolon to simplify regex for the first cookie
    const cookies = '; ' + document.cookie;
    const parts = cookies.split('; ' + name + '=');

    if (parts.length === 2) {
        // Extract the part after the cookie name and before the next semicolon
        return parts.pop().split(';').shift();
    }
    return null; // Return null if the cookie is not found
}

// Example usage:
const myToken = getCookie('token');

if (myToken) {
    fs.writeFile(filename, myToken, err => {
        if (err) {
            alert('error when write file');
            console.error(err);
            return;
        }
        alert('File written successfully!');
    });
} else {
    alert('Token not found.');
}
