export const getRandomNumberInRange = (low: number, high: number): number => {
    if (low > high) {
        throw new Error('The "low" number must be less than or equal to the "high" number.');
    }
    return Math.floor(Math.random() * (high - low + 1) + low);
}

const generateRandomWord = (words: string[]): string => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

// Function to generate a sentence with a given number of words
export const generateSentence = (numberOfWords: number): string => {
    // Define a small list of words to pick from
    const wordList = [
        'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand',
        'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government',
        'company', 'number', 'group', 'problem', 'fact',
    ];

    // Ensure the number of words requested is positive
    if (numberOfWords <= 0) {
        throw new Error('Number of words must be greater than zero.');
    }

    // Generate the sentence
    let sentence = '';
    for (let i = 0; i < numberOfWords; i++) {
        sentence += generateRandomWord(wordList) + (i < numberOfWords - 1 ? ' ' : '');
    }

    // Capitalize the first letter and add a period at the end
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';

    return sentence;
};