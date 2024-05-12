/**
 * Simple Password Strength Checker & Generator
 * ~ Password Score based on the following rules:
 *      PasswordScore(password: string, username: string|null): number
 * ~ Generate Password based on the following rules:
 *     GeneratePassword(length: number = 12): string
 * ~ Password Strength Level:
 *     PASSWORD_WEAK: 0
 *     PASSWORD_MEDIUM: 1
 *     PASSWORD_STRONG: 2
 *     PASSWORD_VERY_STRONG: 3
 *     PASSWORD_FAILED: -1
 */
export const PASSWORD_WEAK: number = 0;
export const PASSWORD_MEDIUM: number = 1;
export const PASSWORD_STRONG: number = 2;
export const PASSWORD_VERY_STRONG: number = 3;
export const PASSWORD_FAILED: number = -1;
const dictionaries: any = {
    common: [
        'pas+wor[dt]', 'sandi', 'rahasia',
        'secret', 'jesus', 'holy', 'praise',
        'horse', 'pony', 'unicorn', 'dragon', 'football', 'baseball', 'soccer',
        'hockey', 'ncc1701', 'sword', 'access', 'root', 'super', 'linux',
        'i\s*love\s*y?o?u', 'trust', 'princess', 'sunshine', 'shadow',
        'ashley', 'blink182', 'cheese', 'chicken', 'pepper', 'coffee', 'cookie',
        'diamond', 'falcon', 'freedom', 'ginger', 'hammer', 'summer', 'thunder',
        'william', 'winner', 'wizard', 'halo', 'gandalf', 'bond007', 'brandon',
        'jami?es?', 'steven?', 'rachel', 'daniel', 'george', 'compaq', 'merlin',
        'chris', 'crystal', 'dallas', 'michelle', 'michael', 'master', 'github',
        'losalamos', 'nuclear', 'losangeles', 'newyork', 'sanfrancisco',
        'animal', 'planet', 'galaxy', 'universe', 'solar', 'system', 'star',
        'anime', 'manga', 'cartoon', 'comic', 'movie', 'series', 'drama',
        'television', 'music', 'song', 'lyric', 'album', 'artist?', 'band', 'guitar', 'drum',
        'lagu', 'lirik', 'gitar',
        'bass', 'keyboard', 'piano', 'violin', 'cello', 'trumpet', 'saxophone',
        'clarinet', 'flute', 'oboe', 'trombone', 'harmoni[kc]a',
        'seruling', 'harpa', 'java', 'python', 'javascript', 'typescript', 'html',
        'freedom', 'liberty', 'independence', 'democracy', 'republic', 'monarchy',
        'merdeka', 'merahputih', 'bh*in+eka', 'tunggal', 'unity', 'diversity',
        'antelope', 'bear', 'bird', 'bison', 'buffalo', 'butterfly', 'camel',
        'cattle', 'cheetah', 'chicken', 'chimpanzee', 'crab',
        'crocodile', 'deer', 'dog', 'dolphin', 'duck', 'eagle', 'elephant',
        'gajah', 'flamingo', 'fox', 'frog', 'giraffe', 'goat', 'goldfish',
        'semut', 'katak', 'jerapah', 'kambing', 'ikan', 'hamster', 'kuda',
        'kangaroo', 'koala', 'lion', 'lizard', 'lobster', 'monkey', 'moose',
        'kang+uru', 'nyamuk', 'singa', 'kadal', 'lobster', 'monyet', 'rusa',
        'sapi', 'facebook', 'instagram', 'twitter', 'youtube', 'google',
        'pinterest', 'tumblr', 'reddit', 'linkedin', 'whatsapp', 'telegram',
        'yahoo', 'bing', 'amazon', 'ebay', 'paypal', 'apple', 'microsoft',
        'android', 'linux', 'unix', 'windows', 'macos', 'safari', 'chrome',
        'firefox', 'opera', 'edge', 'explorer', 'brave', 'vivaldi', 'browser',
        'ubuntu', 'debian', 'centos', 'fedora', 'redhat', '(open\s*)?suse', 'slackware',
        'power', 'ranger', 'angel', 'demon', 'devil', 'heaven', 'hell', 'earth',
        'bimasakti', 'galaksi', 'sistem', 'bintang', 'matahari',
    ],
    places: [
        'afgh?anistan', 'albania', 'algeria', 'andor+a', 'angola', 'antigua', 'barbuda',
        'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahamas?', 'bahrain',
        'bangladesh?', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia',
        'bosnia', 'herzegovina', 'botswana', 'bra[zs]il', 'brunei', 'bulgaria', 'burkina', 'burundi',
        'cambodia', 'cameroon', 'canada', 'cape\s*verde', 'central\s*african\s*republic',
        'chad', 'chile', 'china', 'colombia', 'comoros', 'congo', 'costa\s*rica', 'croatia',
        'cuba', 'cyprus', 'czech', 'denmark', 'djibouti', 'dominica', 'dominican\s*republic',
        'east\s*timor', 'ecuador', 'egypt', 'el\s*salvador', 'equatorial\s*guinea', 'eritrea',
        'estonia', 'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'gambia', 'georgia',
        'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau',
        'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran',
        'iraq', 'ire?land(ia)?', 'jabooty', 'jamaica', 'japan', 'jordan', 'kazakhstan',
        'kenya', 'kiribati', 'korea', 'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia',
        'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg',
        'macedonia', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall',
        'mauritania', 'mauritius', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia',
        'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal',
        'netherlands', 'new\s*zealand', 'nicaragua', 'niger', 'nigeria', 'norway', 'oman',
        'pakistan', 'palau', 'panama', 'papua\s*new\s*guinea', 'paraguay', 'peru', 'philippines',
        'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda', 'saint\s*kitts', 'nevis',
        'saint\s*lucia', 'saint\s*vincent', 'samoa', 'san\s*marino', 'sao\s*tome', 'principe',
        'saudi\s*arabia', 'senegal', 'serbia', 'seychelles', 'sierra\s*leone', 'singap[uo]r[ea]',
        'slovakia', 'slovenia', 'solomon\s*islands', 'somalia', 'south\s*africa', 'south\s*sudan',
        'spain', 'sri\s*lanka', 'sudan', 'suriname', 'swaziland', 'sweden', 'switzerland',
        'syria', 'taiwan', 'tajikistan', 'tanzania', 'th?ailand?', 'togo', 'tonga', 'trinidad',
        'tobago', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'arabia',
        'united\s*kingdom', 'america', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican', 'venezuela',
        'england', 'scotland', 'wales', 'vietnam', 'yemen', 'zambia', 'zimbabwe',
        'antarctica', 'arctic', 'atlantic', 'pacific', 'indian', 'ocean', 'amazon', 'nile',
        'mississippi', 'missouri', 'colorado', 'ohio', 'tennessee', 'alabama', 'florida',
        'georgia', 'carolina', 'dakota', 'virginia', 'maryland', 'delaware', 'pennsylvania',
        'new\s*york', 'new\s*jersey', 'new\s*hampshire', 'new\s*mexico', 'new\s*england',
        'los\s*angeles', 'san\s*francisco', 'washington', 'oregon', 'idaho', 'montana',
        'wyoming', 'utah', 'nevada', 'arizona', 'texas', 'oklahoma', 'kansas', 'nebraska',
        'iowa', 'missouri', 'illinois', 'indiana', 'michigan', 'ohio', 'kentucky',
        'tennessee', 'alabama', 'georgia', 'florida', 'carolina', 'virginia', 'maryland',
        'delaware', 'pennsylvania', 'new\s*york', 'new\s*jersey', 'new\s*hampshire',
        'new\s*mexico', 'new\s*england', 'alaska', 'hawaii', 'canada', 'greenland',
        'moscow', 'beijing', 'tokyo', 'delhi', 'mumbai', 'moskow', 'manila', 'seoul',
        'bangkok', 'hanoi', 'phnom\s*penh', 'vientiane', 'kuala\s*lumpur', 'papua',
        'iceland', 'ireland', 'scotland', 'wales', 'england', 'france', 'germany', 'jerman',
        'jawa', 'bali', 'lombok', 'surabaya', 'semarang', 'bandung', 'jakarta', 'medan',
        'palembang', 'aceh', 'padang', 'pekanbaru', 'jambi', 'bangka', 'belitung', 'lampung',
        'banten', 'bogor', 'depok', 'tangerang', 'bekasi', 'cirebon', 'tasikmalaya', 'garut',
        'sukabumi', 'cianjur', 'cikarang', 'karawang', 'purwakarta', 'subang', 'indramayu',
        'majalengka', 'sumedang', 'ciamis', 'banjar', 'pangandaran', 'bandung', 'garut',
        'malang', 'blitar', 'kediri', 'jember', 'banyuwangi', 'tulungagung', 'trenggalek',
        'ponorogo', 'pacitan', 'madiun', 'ngawi', 'magetan', 'bojonegoro', 'tuban', 'lamongan',
        'gresik', 'sidoarjo', 'mojokerto', 'jombang', 'surabaya', 'pasuruan', 'probolinggo',
        'situbondo', 'bondowoso', 'banyuwangi', 'jember', 'lumajang', 'batu',
        'bangkalan', 'sampang',
        // mountains
        'bromo', 'ijen', 'merapi', 'merbabu', 'lawu', 'semeru', 'rinjani', 'agung', 'batur',
        'tambora', 'toba', 'kerinci', 'dempo', 'sumbing', 'sindoro', 'sumbing', 'slamet',
        'guntur', 'salak', 'ciremai', 'galunggung', 'krakatau', 'semeru', 'bromo', 'ijen',
        'merapi', 'merbabu', 'lawu', 'rinjani', 'agung', 'batur', 'tambora', 'toba', 'kerinci',
        'dempo', 'sumbing', 'sindoro', 'sumbing', 'slamet', 'guntur', 'salak', 'ciremai',
        'denali', 'foraker', 'hunter', 'mckinley', 'whitney', 'shasta', 'hood', 'adams',
        'sanford', 'foraker', 'churchill', 'crillon', 'blackburn', 'fairweather', 'baker',
        'waddington', 'robson', 'columbia', 'revelation', 'tupper', 'fairweather', 'churchill',
        // ... etc
    ]
}

const weakLength = (password: string): boolean => {
    return password.length <= 6;
}
const veryStrongLength = (password: string): boolean => {
    return password.length >= 12;
}
const strongLength = (password: string): boolean => {
    return password.length >= 8;
}
let regexDictionary: RegExp | null = null;

/**
 * Scoring password
 *
 * @param {string} password
 * @param {string|null} username
 * @returns {number}
 * @constructor
 */
function PasswordScore(password: string, username: string | null = null): number {
    if (password.length === 0 || password.trim() === "") {
        return PASSWORD_FAILED;
    }
    if (weakLength(password)) {
        return PASSWORD_WEAK;
    }
    // check if password contain number only and space
    if (!/[^0-9\s*]/.test(password)) {
        return PASSWORD_WEAK;
    }
    // check if password contain alphabet only and space
    if (!/[^a-zA-Z\s*]/.test(password)) {
        return PASSWORD_WEAK;
    }
    // check if contain started with password
    if (/^password/i.test(password)) {
        return PASSWORD_WEAK;
    }
    // check if contain username
    if (typeof username === 'string' && username.trim().length > 4) {
        username = username.trim().toLowerCase();
        const lowerPassword = password.toLowerCase();
        if (lowerPassword.indexOf(username) > -1) {
            return PASSWORD_WEAK;
        }
    }

    // strong password should contain uppercase, lowercase, number, and special character
    const isStrong: boolean = (/[A-Z]/.test(password)
        && /[a-z]/.test(password)
        && /[0-9]/.test(password)
        && /[^a-zA-Z0-9\s]/.test(password)
    );

    // create regex dictionary
    if (!regexDictionary) {
        let commonPasswordDictionary: string[] = [];
        for (let key in dictionaries) {
            const dict: any = dictionaries[key];
            for (let val of dict) {
                if (commonPasswordDictionary.indexOf(val) === -1) {
                    commonPasswordDictionary.push(val);
                }
            }
            // free memory
            dictionaries[key] = [];
        }
        regexDictionary = new RegExp(commonPasswordDictionary.join('|'), 'i');
    }
    // if contain dictionary word
    if (regexDictionary.test(password)) {
        // just ignorance about 20 characters or more
        // about contain dictionary word
        if (isStrong && password.length >= 20) {
            return PASSWORD_STRONG;
        }
        // if is very strong it will be as medium, otherwise weak
        return !isStrong || !veryStrongLength(password) ? PASSWORD_WEAK : PASSWORD_MEDIUM;
    }
    if (isStrong && veryStrongLength(password)) {
        // check if contain repeated 4 or more characters
        if (/(.)\1{3,}/.test(password)) {
            return PASSWORD_STRONG;
        }
        return PASSWORD_VERY_STRONG;
    }
    // check if contain repeated 4 or more characters
    if (isStrong && strongLength(password) && !/(.)\1{3,}/.test(password)) {
        return PASSWORD_STRONG;
    }
    return PASSWORD_MEDIUM;
}

export function GeneratePassword(length = 12): string {
    const uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase: string = 'abcdefghijklmnopqrstuvwxyz';
    const number: string = '0123456789';
    const special: string = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all: string = uppercase + lowercase + number + special;
    const generate = (length: number) => {
        let password: string = '';
        for (let i = 0; i < length; i++) {
            password += all[Math.floor(Math.random() * all.length)];
        }
        return password;
    }
    if (length === 0) {
        return '';
    }
    if (length < 6) {
        return generate(length);
    }
    let password: string;
    let maxCount: number = 100;
    const strongRecord: string[] = [];
    const mediumRecord: string[] = [];
    do {
        password = generate(length);
        const score: number = PasswordScore(password);
        if (score === PASSWORD_VERY_STRONG) {
            return password;
        }
        if (score === PASSWORD_STRONG) {
            strongRecord.push(password);
            continue;
        }
        if (strongRecord.length === 0 && score === PASSWORD_MEDIUM) {
            mediumRecord.push(password);
        }
    } while (maxCount-- > 0);
    if (strongRecord.length > 0) {
        return strongRecord[Math.floor(Math.random() * strongRecord.length)];
    }
    if (mediumRecord.length > 0) {
        return mediumRecord[Math.floor(Math.random() * mediumRecord.length)];
    }
    // password is nopt strong enough we add the special character & alph numeric
    password = generate(length - 4);
    password += number[Math.floor(Math.random() * number.length)];
    password += special[Math.floor(Math.random() * special.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    // shuffle password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    return password;
}

export const ScorePassword = PasswordScore;
export const PasswordIsStrong = (password: string, username: string | null = null) => PasswordScore(password, username) >= PASSWORD_STRONG;
export const PasswordIsVeryStrong = (password: string, username: string | null = null) => PasswordScore(password, username) >= PASSWORD_VERY_STRONG;

PasswordScore.PASSWORD_WEAK = PASSWORD_WEAK;
PasswordScore.PASSWORD_MEDIUM = PASSWORD_MEDIUM;
PasswordScore.PASSWORD_STRONG = PASSWORD_STRONG;
PasswordScore.PASSWORD_VERY_STRONG = PASSWORD_VERY_STRONG;
PasswordScore.PASSWORD_FAILED = PASSWORD_FAILED;
PasswordScore.generatePassword = GeneratePassword;
PasswordScore.isStrong = PasswordIsStrong;
PasswordScore.isVeryStrong = PasswordIsVeryStrong;
PasswordScore.score = ScorePassword;
Object.freeze(PasswordScore);

// noinspection JSUnusedGlobalSymbols
export default PasswordScore;
