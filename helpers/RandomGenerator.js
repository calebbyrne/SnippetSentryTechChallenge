class RandomGenerator {
    static async randomString(length) {
        let result = '';
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    };

    static async randomNumber(length) {
        let result = '';
        const numbers = '0123456789';
        for (let i = 0; i < length; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return result;
    };
    
    static async randomEmail(length) { 
        const randomString = await this.randomString(length);
        return `${randomString}@fakemail.com`;
    };
};

module.exports = { RandomGenerator };