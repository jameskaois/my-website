const fs = require('fs');

const filename = 'myFile.txt';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Example usage:
const myToken = getCookie('token');

alert(myToken);

// if (myToken) {
//     fs.writeFile(filename, myToken, err => {
//         if (err) {
//             alert('error when write file');
//             console.error(err);
//             return;
//         }
//         alert('File written successfully!');
//     });
// } else {
//     alert('Token not found.');
// }
