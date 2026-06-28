const swaps = {
  hello: ['hey', 'yo', 'sup', 'hi'],
  goodbye: ['bye', 'later', 'cya', 'peace'],
  yes: ['yeah', 'yep', 'yh', 'yea', 'fr'],
  no: ['nah', 'nope', 'na'],
  good: ['lit', 'fire', 'dope', 'sick', 'solid', 'decent'],
  bad: ['trash', 'ass', 'garbage', 'wack', 'dogshit'],
  great: ['insane', 'crazy', 'mad', 'huge', 'massive'],
  small: ['tiny', 'little', 'mini'],
  big: ['large', 'huge', 'massive', 'giant'],
  very: ['hella', 'mad', 'super', 'real', 'proper'],
  really: ['deadass', 'fr', 'actually', 'legit'],
  beautiful: ['pretty', 'gorgeous', 'stunning', 'fit'],
  ugly: ['ugly ass', 'disgusting'],
  happy: ['gassed', 'pumped', 'hyped', 'chuffed'],
  sad: ['gutted', 'down', 'pissed off'],
  angry: ['mad', 'fuming', 'pissed', 'raging'],
  funny: ['class', 'jokes', 'hilarious'],
  money: ['bread', 'dough', 'bags', 'rack', 'bands'],
  nothing: ['nada', 'nowt', 'jack'],
  always: ['every time', 'constantly', 'non stop'],
  never: ['never ever', 'not once'],
  maybe: ['perhaps', 'might', 'could be'],
  please: ['pls', 'plz', 'bro please'],
  thanks: ['ty', 'thx', 'appreciate it', 'good looks'],
  wow: ['no way', 'ffs', 'omg', 'aint no way'],
  what: ['wot', 'what the', 'what tf'],
  where: ['whereee', 'where tf'],
  come: ['come thru', 'pull up'],
  go: ['go on', 'get to it'],
  watch: ['look at', 'peep'],
  talk: ['chat', 'speak', 'yap'],
  think: ['reckon', 'feel like', 'believe'],
  know: ['kno', 'get', 'understand'],
  want: ['need', 'gotta have'],
  love: ['rate', 'fuck with'],
  hate: ['cant stand', 'despise', 'hate on'],
  do: ['do it', 'get it done', 'make it happen'],
  make: ['cook', 'produce', 'create'],
  get: ['grab', 'bag', 'secure'],
  win: ['clutch', 'take the W', 'bag it'],
  lose: ['take the L', 'bottle it', 'shit the bed'],
  stop: ['cut it out', 'pack it in', 'give over'],
  look: ['check', 'peep', 'have a gander', 'look at this'],
  say: ['tell em', 'speak on it', 'drop it'],
  because: ['cuz', 'cause', 'cos'],
  very: ['hella', 'mad', 'essex'],
};

const prefixes = ['', 'yo ', 'bro ', 'ngl ', 'fr ', 'tbh ', 'bruh ', 'aint gonna lie '];
const suffixes = ['', ' ngl', ' fr', ' tbh', ' icl', ' on god', ' deadass', ' for real'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function replaceWords(text) {
  const words = text.split(/\s+/);
  return words.map(w => {
    const lower = w.toLowerCase().replace(/[^a-z0-9']/g, '');
    const punct = w.replace(/[a-zA-Z0-9']/g, '');
    if (swaps[lower] && Math.random() < 0.5) {
      return randomChoice(swaps[lower]) + punct;
    }
    return w;
  }).join(' ');
}

function applyContractions(text) {
  let t = text;
  t = t.replace(/\byou are\b/gi, Math.random() < 0.5 ? "you're" : "ur");
  t = t.replace(/\bi am\b/gi, Math.random() < 0.5 ? "I'm" : "im");
  t = t.replace(/\bthey are\b/gi, "they're");
  t = t.replace(/\bwe are\b/gi, "we're");
  t = t.replace(/\bit is\b/gi, "it's");
  t = t.replace(/\bthat is\b/gi, "that's");
  t = t.replace(/\bdo not\b/gi, "don't");
  t = t.replace(/\bcannot\b/gi, "can't");
  t = t.replace(/\bwill not\b/gi, "won't");
  t = t.replace(/\bis not\b/gi, "isn't");
  t = t.replace(/\bare not\b/gi, "aren't");
  t = t.replace(/\bgoing to\b/gi, Math.random() < 0.5 ? "gonna" : "going to");
  t = t.replace(/\bwant to\b/gi, Math.random() < 0.5 ? "wanna" : "want to");
  t = t.replace(/\bgot to\b/gi, "gotta");
  t = t.replace(/\blet me\b/gi, Math.random() < 0.5 ? "lemme" : "let me");
  t = t.replace(/\bdont\b/gi, "don't");
  t = t.replace(/\bdidnt\b/gi, "didn't");
  t = t.replace(/\bdoesnt\b/gi, "doesn't");
  t = t.replace(/\bwont\b/gi, "won't");
  t = t.replace(/\bcould not\b/gi, "couldn't");
  t = t.replace(/\bwould not\b/gi, "wouldn't");
  t = t.replace(/\bshould not\b/gi, "shouldn't");
  return t;
}

function addRandomPrefixSuffix(text) {
  let t = text;
  if (Math.random() < 0.3) {
    t = randomChoice(prefixes) + t;
  }
  if (Math.random() < 0.25) {
    t = t + randomChoice(suffixes);
  }
  return t;
}

function varyExclamation(text) {
  const exclaimMatch = text.match(/!+/);
  if (exclaimMatch) {
    const count = exclaimMatch[0].length;
    const variations = ['!', '!!', '!', '!!', '!!!', '!', ''];
    return text.replace(/!+$/, randomChoice(variations));
  }
  if (text.endsWith('.') && Math.random() < 0.15) {
    return text.slice(0, -1) + randomChoice(['!', '!!', '']);
  }
  return text;
}

function swapQuestionMark(text) {
  if (text.endsWith('?')) {
    return text.slice(0, -1) + randomChoice(['?', '??', '??', '?', '']);
  }
  return text;
}

function flipIntensifier(text) {
  return text.replace(/\bvery\b/gi, randomChoice(['hella', 'mad', 'super', 'real']));
}

function rephrase(text) {
  if (!text || text.length < 2) return text;

  let result = text;

  // Apply multiple transformations in random order
  const transforms = [
    replaceWords,
    applyContractions,
    addRandomPrefixSuffix,
    varyExclamation,
    swapQuestionMark,
    (t) => t.replace(/^\s+/, '').replace(/\s+$/, ''),
  ];

  for (const fn of transforms) {
    result = fn(result);
  }

  if (result !== text) {
    console.log('Rephrased:', text.slice(0, 60), '->', result.slice(0, 60));
  }

  return result;
}

module.exports = { rephrase };