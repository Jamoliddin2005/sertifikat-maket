const fs = require('fs')
const path = require('path')

module.exports = (img) => {
    if (img) {
        fs.unlink(path.join(__dirname, '../public/images/' + img), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}