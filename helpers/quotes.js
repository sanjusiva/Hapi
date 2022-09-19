module.exports = function () {

    const quotes = [
        'Inspiration does exist, but it must find you working.',
        'I have stood on a mountain of no for one yes.',
        'Say no, then negotiate.',
        'Time and tide wait for no man.',
        'To teach is to learn.',
        'Never ask the barber if you need a haircut.',
        'You will forget that you ever knew me.',
        'You will be run over by a beer truck.',
        'Fortune favors the lucky.',
        'Have a nice day!'
    ];

    const x = Math.floor(Math.random() * quotes.length);
    return quotes[x];
};