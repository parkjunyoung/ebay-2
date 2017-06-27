import crypto from 'crypto';
const mysalt = "ebay";

export default (password) => {
    return crypto.createHash('sha512').update( password + mysalt).digest('base64');
}
