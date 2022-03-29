// 
// Get modules
// 
fs = require('fs');
readline = require('readline');

// 
// Variables
// 
var chat;
var removes = [
    "Nachrichten und Anrufe sind Ende-zu-Ende-verschlüsselt.",
    "Tippe, um mehr zu erfahren.",
    "Audio weggelassen",
    "Video weggelassen",
    "Verpasster Gruppen-",
    "Verpasster Videoanruf",
    "Verpasster Sprachanruf",
    "Du hast diese Nachricht gelöscht.",
    "Du hast diesen Anruf gelöscht.",
    "Bild weggelassen",
    "Sticker weggelassen",
    "Diese Nachricht wurde gelöscht.",
    "Dokument weggelassen",
    "GIF weggelassen"
];
var skip_line = false;
var regex_line_begin = /\[\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2}:\d{2}\]/;

// 
// Functions
//


// 
// Main
//

// Create readline interface
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Read file
fs.readFile('./input/chat.txt', 'utf8', function(err, data) {

    // If error
    if (err) console.log(err);

    // Remove all unicode 200E characters
    data = data.replace(/[\u200E]/g, '');

    // Read line by line
    chat = data.split('\n');

    // Remove last line
    chat.pop();

    // Get number of lines
    var chat_lines = chat.length;

    // Loop through lines
    for (var i = 0; i < chat_lines; i++) {

        // Check if line matches regex
        if (!regex_line_begin.test(chat[i])) {

            // Add the line to the previous line
            chat[i - 1] += ' ' + chat[i];

            // Remove the line
            chat.splice(i, 1);

            // Decrease the number of lines
            chat_lines--;

            // Status message
            console.log('Line ' + i + ' removed');

            // Decrease the index
            i--;

        }
    }

    // Loop through lines
    for (var i = 0; i < chat_lines; i++) {

        // Turn off skip line
        skip_line = false;

        // Get line 
        var line = chat[i];

        // Check if line contains one of the strings in the array "removes"
        for (var j = 0; j < removes.length; j++) {

            // If line contains string
            if (line.indexOf(removes[j]) > -1) {

                // Skip line
                skip_line = true;
            }
        }

        // If line is not skipped
        if (!skip_line) {

            // Print status message
            console.log("Checking message " + (i + 1) + " of " + chat_lines);
        }
    }
});