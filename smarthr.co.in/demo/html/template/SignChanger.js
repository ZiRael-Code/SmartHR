const fs = require('fs');
const path = require('path');

// Function to process files in a directory
function replaceDollarWithNaira(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            // Check if it's a file and if it's an HTML file
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error reading file stats:', err);
                    return;
                }

                if (stats.isFile() && path.extname(file) === '.html') {
                    // Read the HTML file
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        // Replace all $ signs with ₦
                        const updatedData = data.replace(/\$/g, '₦');

                        // Write the updated content back to the file
                        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                            } else {
                                console.log(`Updated: ${filePath}`);
                            }
                        });
                    });
                }
            });
        });
    });
}

// Example usage: Replace with your actual directory path
const directoryPath = 'C:\\My Web Sites\\SmartHr\\smarthr.co.in\\demo\\html\\template\\super_admin'; // Change this
replaceDollarWithNaira(directoryPath);
