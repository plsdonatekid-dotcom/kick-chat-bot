const swaps = {
  // Greetings
  hello: ['hey', 'yo', 'sup', 'hi', 'howdy', 'wagwan', 'ello'],
  hey: ['yo', 'sup', 'hi', 'ello', 'wagwan'],
  hi: ['hey', 'yo', 'sup', 'howdy', 'ello'],
  goodbye: ['bye', 'later', 'cya', 'peace', 'laters', 'catch you later', 'see ya', 'peace out'],
  bye: ['later', 'cya', 'peace', 'laters', 'see ya'],
  morning: ['mornin', 'gm', 'good morning'],
  night: ['night', 'gn', 'goodnight', 'nite'],

  // Affirmatives / Negatives
  yes: ['yeah', 'yep', 'yh', 'yea', 'fr', 'word', 'bet', 'facts', 'forsure', 'defo', 'deffo', 'certified'],
  yeah: ['yes', 'yep', 'yh', 'yea', 'fr', 'word', 'bet', 'forsure'],
  no: ['nah', 'nope', 'na', 'negative', 'aint it', 'no chance'],
  nah: ['no', 'nope', 'na', 'no chance'],
  okay: ['ok', 'k', 'kay', 'bet', 'say less', 'say no more', 'cool', 'aight', 'ight'],
  ok: ['okay', 'k', 'bet', 'aight', 'ight', 'cool'],
  sure: ['bet', 'forsure', 'defo', 'deffo', 'say less', 'no doubt', 'without a doubt'],
  maybe: ['perhaps', 'might', 'could be', 'possibly', 'mayhaps', 'who knows'],
  never: ['never ever', 'not once', 'no chance', 'when pigs fly'],
  always: ['every time', 'constantly', 'non stop', '24/7', 'always on', 'all the time'],

  // Assessments
  good: ['lit', 'fire', 'dope', 'sick', 'solid', 'decent', 'class', 'tough', 'hard', 'cold'],
  bad: ['trash', 'ass', 'garbage', 'wack', 'dogshit', 'rubbish', 'shit', 'piss poor', 'bollocks'],
  great: ['insane', 'crazy', 'mad', 'huge', 'massive', 'enormous', 'phenomenal', 'unreal', 'godly'],
  terrible: ['awful', 'horrendous', 'atrocious', 'dreadful', 'abysmal', 'diabolical', 'dire'],
  amazing: ['incredible', 'unbelievable', 'outstanding', 'spectacular', 'mind blowing', 'bonkers'],
  awful: ['terrible', 'dreadful', 'atrocious', 'abysmal', 'piss poor'],
  nice: ['clean', 'smooth', 'tidy', 'slick', 'classy', 'fresh', 'crisp'],
  cool: ['sick', 'lit', 'dope', 'fire', 'tough', 'fresh'],
  easy: ['easy work', 'light work', 'breeze', 'piece of piss', 'cake', 'easy money'],
  hard: ['tough', 'difficult', 'rough', 'brutal', 'grim', 'heavy'],
  funny: ['class', 'jokes', 'hilarious', 'comical', 'banter', 'mad funny', 'gas'],
  stupid: ['dumb', 'braindead', 'thick', 'dense', 'slow', 'smoothbrain'],
  smart: ['big brain', 'genius', 'clever', 'sharp', 'woke', 'on it'],
  right: ['correct', 'spot on', 'bang on', 'on point', 'on the money'],
  wrong: ['off', 'capped', 'chatting', 'bollocks', 'talking shit'],
  true: ['facts', 'cap', 'no cap', 'on god', 'word', 'fr fr'],
  fake: ['cap', 'capping', 'chatting', 'fraud', 'poser'],
  real: ['legit', 'genuine', 'authentic', 'proper'],

  // Intensifiers
  very: ['hella', 'mad', 'super', 'real', 'proper', 'deadly', 'insanely', 'crazy', 'ridiculously', 'stupidly'],
  really: ['deadass', 'fr', 'actually', 'legit', 'honestly', 'genuinely', 'lowkey', 'highkey'],
  so: ['hella', 'mad', 'dead', 'proper', 'crazy', 'stupidly', 'insanely'],
  too: ['aswell', 'also', 'likewise'],
  extremely: ['insanely', 'unbelievably', 'ridiculously', 'insanely', 'insanely'],
  barely: ['hardly', 'scarcely', 'just about'],
  almost: ['basically', 'practically', 'nearly', 'essentially'],
  actually: ['fr', 'deadass', 'legit', 'honestly', 'lowkey'],
  literally: ['actually', 'genuinely', 'properly', 'legit', 'deadass'],

  // Emotions
  happy: ['gassed', 'pumped', 'hyped', 'chuffed', 'buzzing', 'on cloud nine', 'over the moon', 'made up'],
  sad: ['gutted', 'down', 'pissed off', 'cut deep', 'devastated', 'heartbroken', 'in shambles'],
  angry: ['mad', 'fuming', 'pissed', 'raging', 'livid', 'furious', 'heated', 'steaming', 'gassed', 'vexed'],
  scared: ['spooked', 'shook', 'nervous', 'shooketh', 'terrified', 'bricking it', 'shitting bricks'],
  surprised: ['shook', 'gobsmacked', 'speechless', 'flabbergasted', 'mind blown', 'taken aback', 'stunned'],
  excited: ['hyped', 'gassed', 'pumped', 'buzzing', 'amped', 'frothing', 'keen as'],
  bored: ['dead', 'boring', 'dry', 'tired', 'fed up', 'done'],
  tired: ['knackered', 'dead', 'shattered', 'drained', 'spent', 'wiped out', 'zonked', 'sleepy'],
  confused: ['lost', 'clueless', 'bamboozled', 'perplexed', 'baffled'],
  jealous: ['salty', 'pressed', 'mad', 'hating', 'envious'],
  grateful: ['thankful', 'blessed', 'appreciative'],
  lonely: ['alone', 'on my ones', 'solo', 'by myself'],

  // Verbs - Actions
  look: ['check', 'peep', 'have a gander', 'look at this', 'watch', 'view', 'observe', 'gaze'],
  watch: ['look at', 'peep', 'check out', 'view', 'stream'],
  see: ['spot', 'clock', 'notice', 'observe', 'witness', 'catch', 'peep'],
  talk: ['chat', 'speak', 'yap', 'converse', 'shoot the shit', 'gossip', 'ramble'],
  say: ['tell em', 'speak on it', 'drop it', 'mention', 'state'],
  tell: ['let know', 'inform', 'fill in', 'update'],
  think: ['reckon', 'feel like', 'believe', 'figure', 'assume', 'guess', 'suppose'],
  know: ['kno', 'get', 'understand', 'comprehend', 'realise', 'clock'],
  want: ['need', 'gotta have', 'desire', 'fancy', 'could do with'],
  need: ['gotta', 'have to', 'must', 'got to'],
  love: ['rate', 'fuck with', 'adore', 'am obsessed with', 'live for'],
  hate: ['cant stand', 'despise', 'hate on', 'detest', 'loathe', "can't vibe with"],
  like: ['rate', 'fuck with', 'vibe with', 'mess with', 'dig', 'enjoy'],
  dislike: ['dont rate', 'not feeling', 'not fucking with', "can't vibe with"],
  do: ['do it', 'get it done', 'make it happen', 'pull it off', 'execute'],
  make: ['cook', 'produce', 'create', 'cook up', 'whip up', 'put together'],
  get: ['grab', 'bag', 'secure', 'acquire', 'cop', 'snag', 'obtain'],
  give: ['hand over', 'drop', 'pass', 'gift', 'donate'],
  take: ['grab', 'snatch', 'nick', 'steal', 'swipe', 'pinch', 'bag'],
  come: ['come thru', 'pull up', 'roll up', 'show up', 'turn up'],
  go: ['go on', 'get to it', 'head out', 'make moves', 'dip', 'bounce'],
  leave: ['bounce', 'dip', 'peace out', 'head out', 'make moves', 'ghost'],
  stay: ['stick around', 'hang about', 'linger', 'hold tight'],
  stop: ['cut it out', 'pack it in', 'give over', 'knock it off', 'cease', 'desist'],
  start: ['begin', 'kick off', 'commence', 'get going', 'fire up', 'initiate'],
  finish: ['complete', 'wrap up', 'finish up', 'conclude', 'done with'],
  run: ['sprint', 'bolt', 'race', 'book it', 'leg it'],
  walk: ['stroll', 'wander', 'amble', 'mooch', 'saunter'],
  sit: ['take a seat', 'park up', 'plonk down', 'chill'],
  stand: ['get up', 'rise', 'bounce up'],
  eat: ['munch', 'grub', 'chow down', 'demolish', 'inhale', 'scoff'],
  drink: ['sip', 'down', 'neck', 'chug', 'guzzle'],
  sleep: ['k.o.', 'crash', 'pass out', 'kip', 'snooze', 'doze off', 'hit the hay', 'hit the sack'],
  wake: ['wake up', 'rise', 'get up', 'surface'],
  buy: ['cop', 'bag', 'secure', 'purchase', 'pick up', 'grab'],
  sell: ['flip', 'move', 'offload', 'shift'],
  try: ['give it a go', 'have a crack', 'attempt', 'have a bash', 'give it a shot'],
  win: ['clutch', 'take the W', 'bag it', 'secure the bag', 'come out on top', 'smash it'],
  lose: ['take the L', 'bottle it', 'shit the bed', 'choke', 'crumble', 'fold'],
  play: ['run', 'load up', 'hop on', 'jump on'],
  work: ['grind', 'hustle', 'put in work', 'labour', 'slog'],
  wait: ['hold up', 'hang on', 'hold tight', 'sit tight', 'bide time', 'chill'],
  help: ['assist', 'give a hand', 'help out', 'sort out', 'hook up'],
  ask: ['inquire', 'question', 'wonder'],
  answer: ['reply', 'respond', 'get back', 'hit back'],
  change: ['swap', 'switch', 'replace', 'sub'],
  keep: ['hold onto', 'hang onto', 'maintain', 'hold'],
  find: ['find out', 'discover', 'come across', 'stumble upon', 'unearth', 'locate', 'track down'],
  use: ['utilize', 'employ', 'make use of', 'leverage'],
  care: ['give a damn', 'give a shit', 'give af'],
  matter: ['count', 'carry weight', 'be relevant'],
  guess: ['assume', 'reckon', 'suppose', 'figure', 'imagine'],

  // Question words
  what: ['wot', 'what the', 'what tf', 'what the fuck', 'wth', 'what even'],
  where: ['whereee', 'where tf', 'whereabouts'],
  when: ['when tf', 'what time'],
  why: ['why tf', 'how come', 'for what reason', 'why though'],
  how: ['how tf', 'in what way'],
  who: ['who tf', 'whom', 'who even'],

  // Pronouns / People
  i: ['i', 'me personally', 'yours truly'],
  you: ['u', 'ya', 'yall', 'you lot', 'you guys', 'you all'],
  he: ['that guy', 'the lad', 'the man', 'him', 'dude'],
  she: ['that girl', 'her', 'the girl', 'the woman'],
  they: ['them', 'those lot', 'them lot', 'those guys'],
  we: ['us', 'the gang', 'the squad', 'the boys', 'our lot'],
  my: ['me', 'my', 'mah'],
  your: ['ur', 'ya', 'your'],
  their: ['theyre', 'their', 'theirs'],
  our: ['me and the boys', 'the squads'],
  everyone: ['everybody', 'all of you', 'each and every one', 'the whole lot'],
  someone: ['somebody', 'some geezer', 'some dude'],
  anyone: ['anybody', 'anyone at all'],
  noone: ['nobody', 'no man', 'not a soul'],

  // Time words
  now: ['rn', 'right now', 'as we speak', 'currently', 'at the moment', 'presently'],
  soon: ['shortly', 'in a bit', 'momentarily', 'before you know it', 'any minute'],
  later: ['later on', 'down the line', 'eventually', 'further down the road', 'in a bit'],
  earlier: ['before', 'prior', 'previously', 'a bit ago', 'earlier on'],
  today: ['tdy', 'this fine day'],
  yesterday: ['yd', 'last night', 'the other day'],
  tomorrow: ['tmr', 'next day', 'the morrow'],
  ago: ['back', 'gone', 'past'],
  forever: ['for good', 'for keeps', 'permanently', 'indefinitely', 'ages'],
  temporary: ['short term', 'for now', 'for the time being', 'momentary'],
  quick: ['fast', 'rapid', 'speedy', 'swift', 'lightning', 'rapido'],
  slow: ['slowly', 'sluggish', 'taking its time', 'going at a snail pace'],
  early: ['bright and early', 'first thing', 'early doors'],
  late: ['running late', 'behind', 'lagging', 'tardy'],
  old: ['ancient', 'vintage', 'old school', 'retro', 'aged'],
  new: ['fresh', 'brand new', 'spanking new', 'latest', 'newest'],

  // Quantities / Amounts
  many: ['loads of', 'heaps of', 'tons of', 'masses of', 'shedloads of', 'a ton of', 'a bunch of'],
  much: ['a lot', 'loads', 'heaps', 'tons', 'masses'],
  some: ['a few', 'a couple', 'several', 'certain'],
  all: ['every single', 'all of', 'the whole', 'the entirety'],
  none: ['zero', 'not a single', 'nada', 'zilch', 'zero', 'sweet fa', 'sod all'],
  more: ['extra', 'additional', 'further', 'some more'],
  less: ['fewer', 'not as much', 'less of'],
  enough: ['sufficient', 'adequate', 'plenty', 'enough already'],
  lots: ['loads', 'heaps', 'tons', 'stacks', 'racks', 'a ton'],
  few: ['a handful', 'a couple', 'not many', 'a select few'],
  many: ['numerous', 'countless', 'a multitude', 'loads of'],
  plenty: ['enough', 'more than enough', 'loads', 'ample'],
  little: ['bit', 'small amount', 'tiny bit', 'smidge', 'splash'],
  much: ['a lot', 'loads', 'a bunch', 'a ton'],
  whole: ['entire', 'full', 'complete', 'the whole thing'],
  half: ['50%', 'half of', 'halfway'],
  zero: ['none', 'nada', 'zilch', 'sweet fa', 'not a single one'],

  // Gaming / Streaming
  game: ['session', 'match', 'run', 'lobby', 'ranked'],
  stream: ['broadcast', 'live', 'streaming', 'going live'],
  lobby: ['queue', 'match', 'game', 'session', 'instance'],
  team: ['squad', 'crew', 'boys', 'gang', 'side', 'unit'],
  enemy: ['foe', 'opponent', 'the other team', 'the other side', 'the bad guys'],
  kill: ['eliminate', 'take out', 'clap', 'smoke', 'drop', 'slay', 'destroy', 'obliterate'],
  death: ['death', 'L', 'downfall', 'demise'],
  alive: ['living', 'breathing', 'still in it', 'surviving'],
  dead: ['down', 'finished', 'gone', 'cooked', 'toast', 'done for'],
  fight: ['scrap', 'brawl', 'clash', 'go at it', 'battle', 'rumble'],
  hit: ['smack', 'whack', 'clock', 'strike', 'bonk', 'wallop', 'bang'],
  miss: ['missed', 'whiff', 'fail', 'brick'],
  shoot: ['pop', 'fire', 'blast', 'take a shot', 'squeeze'],
  aim: ['target', 'lock in', 'focus', 'beam'],
  weapon: ['gun', 'tool', 'piece', 'iron'],
  bomb: ['nade', 'grenade', 'explosive', 'banger'],
  speed: ['pace', 'tempo', 'momentum'],
  power: ['strength', 'force', 'muscle', 'authority'],
  level: ['stage', 'map', 'tier', 'rank', 'floor'],
  boss: ['final boss', 'big guy', 'main man', 'top dog'],
  loot: ['loot', 'drops', 'rewards', 'chest', 'swag', 'pickings'],
  health: ['hp', 'health bar', 'hearts', 'life', 'health points'],
  damage: ['dmg', 'hurt', 'harm', 'pain'],

  // Comments / Reactions
  lol: ['lmao', 'lmfao', 'lol', 'lmaoo', 'lmaooo', 'looool', 'lool'],
  wow: ['no way', 'ffs', 'omg', 'aint no way', 'get out of here', 'no fucking way', 'shut up', 'shut the front door'],
  omg: ['oh my god', 'oh my days', 'blimey', 'cor blimey', 'oh my'],
  damn: ['damnn', 'damnnn', 'dayum', 'dayummm'],
  bruh: ['bro', 'bruv', 'fam', 'bredrin', 'cuz', 'brah'],
  bro: ['bruh', 'bruv', 'fam', 'bredrin', 'cuz', 'brah', 'g', 'lad'],
  nice: ['clean', 'smooth', 'tidy', 'slick'],
  rip: ['RIP', 'pour one out', 'F', 'F in chat', 'big L', 'unfortunate'],
  gg: ['good game', 'ggs', 'well played', 'wp'],
  ez: ['easy', 'light work', 'too easy', 'piece of piss', 'breeze'],
  thanks: ['ty', 'thx', 'appreciate it', 'good looks', 'much appreciated', 'big thanks', 'thanks a lot', 'cheers'],
  sorry: ['my bad', 'apologies', 'forgive me', 'didnt mean it', 'mb', 'my b'],
  welcome: ['np', 'no problem', 'no worries', 'my pleasure', 'anytime'],
  please: ['pls', 'plz', 'bro please', 'pretty please', 'i beg', 'beg you'],
  congrats: ['gz', 'grats', 'congratulations', 'well done', 'good stuff', 'happy for you'],
  goodluck: ['gl', 'best of luck', 'god speed', 'hope it goes well'],

  // Descriptors
  big: ['large', 'huge', 'massive', 'giant', 'enormous', 'immense', 'colossal', 'ginormous', 'mega'],
  small: ['tiny', 'little', 'mini', 'micro', 'petite', 'compact', 'minute'],
  tall: ['height', 'towering', 'looming', 'lanky'],
  short: ['vertically challenged', 'fun size', 'compact'],
  fat: ['thick', 'chunky', 'big', 'hefty', 'plus size', 'wide', 'sturdy'],
  thin: ['skinny', 'lean', 'slim', 'slender', 'slight'],
  rich: ['wealthy', 'loaded', 'stacked', 'well off', 'ballin', 'flush with cash'],
  poor: ['broke', 'skint', 'penniless', 'strapped for cash', 'on my arse'],
  young: ['young', 'youth', 'younger', 'little', 'small'],
  old: ['ancient', 'vintage', 'aged', 'eldery', 'getting on'],
  strong: ['powerful', 'beefy', 'robust', 'solid', 'buff', 'jacked', 'swol'],
  weak: ['feeble', 'puny', 'fragile', 'delicate', 'pathetic'],
  fast: ['rapid', 'quick', 'swift', 'speedy', 'lightning', 'blazing'],
  slow: ['sluggish', 'crawling', 'dragging', 'taking ages', 'laggy'],
  loud: ['noisy', 'booming', 'thunderous', 'ear piercing', 'deafening'],
  quiet: ['silent', 'muted', 'hushed', 'low key', 'subdued', 'calm'],
  dark: ['dim', 'shadowy', 'pitch black', 'gloomy', 'murky', 'shady'],
  bright: ['lit up', 'radiant', 'glowing', 'dazzling', 'vibrant'],
  hot: ['scorching', 'boiling', 'roasting', 'burning up', 'sweating', 'toasty'],
  cold: ['freezing', 'ice cold', 'chilly', 'baltic', 'frosty', 'frozen', 'arctic'],
  full: ['stuffed', 'packed', 'filled', 'bursting', 'crowded'],
  empty: ['vacant', 'deserted', 'bare', 'hollow', 'clear', 'dead'],
  cheap: ['bargain', 'dirt cheap', 'affordable', 'budget', 'pennies'],
  expensive: ['pricey', 'costly', 'premium', 'steep', 'dear', 'overpriced', 'daylight robbery'],
  free: ['gratis', 'complimentary', 'no cost', 'on the house', 'nothing'],
  safe: ['secure', 'guarded', 'protected', 'untouchable'],
  dangerous: ['risky', 'perilous', 'treacherous', 'hazardous', 'sketchy', 'dodgy'],
  important: ['crucial', 'vital', 'essential', 'key', 'major', 'paramount', 'critical'],
  famous: ['well known', 'renowned', 'big time', 'celebrated', 'iconic'],
  normal: ['standard', 'regular', 'average', 'ordinary', 'common', 'typical', 'basic'],
  weird: ['strange', 'odd', 'peculiar', 'off', 'bizarre', 'quirky', 'sketchy', 'sus'],
  sus: ['suspect', 'dodgy', 'shady', 'sketchy', 'suspicious', 'fishy'],
  crazy: ['insane', 'bonkers', 'mad', 'bananas', 'wild', 'nuts', 'loco', 'unhinged'],
  serious: ['deadass', 'no cap', 'fr', 'for real', 'genuinely', 'on god'],
  random: ['random', 'out of nowhere', 'unexpected', 'spontaneous', 'haphazard'],
  obvious: ['clear', 'plain', 'obvi', 'obvs', 'blatant', 'obvious', 'evident'],
  different: ['varied', 'miscellaneous', 'assorted', 'various'],

  // Body parts / People descriptors
  head: ['noggin', 'bonce', 'nut', 'head', 'skull', 'cranium'],
  face: ['mug', 'boat', 'face', 'visage'],
  hair: ['locks', 'mane', 'hairdo', 'crop'],
  eyes: ['peepers', 'eyeballs', 'eyes', 'vision'],
  mouth: ['gob', 'mouth', 'trap', 'cakehole', 'piehole'],
  nose: ['hooter', 'conk', 'snout', 'schnozz'],
  hands: ['mitts', 'paws', 'claws', 'hands'],
  feet: ['dogs', 'hooves', 'feet', 'paws'],
  legs: ['chicken legs', 'pins', 'stems', 'legs'],
  arms: ['guns', 'arms', 'limbs'],
  back: ['spine', 'rear', 'behind', 'back'],
  stomach: ['belly', 'gut', 'tummy', 'stomach', 'abdomen'],
  heart: ['ticker', 'heart', 'chest'],
  brain: ['mind', 'noggin', 'grey matter', 'brain', 'head'],

  // Nature / Places
  home: ['crib', 'place', 'house', 'digs', 'spot', 'pad', 'gaff'],
  car: ['whip', 'ride', 'motor', 'vehicle', 'set of wheels'],
  road: ['street', 'road', 'tarmac', 'asphalt', 'route'],
  city: ['town', 'city', 'urban area', 'concrete jungle'],
  country: ['countryside', 'rural area', 'the sticks', 'the boonies', 'the outskirts'],
  school: ['skl', 'school', 'college', 'uni', 'academy', 'institution'],
  work: ['work', 'employment', 'job', 'graft', 'grind', 'hustle', '9-5'],
  shop: ['store', 'shop', 'retailer', 'market'],
  food: ['grub', 'chow', 'noms', 'victuals', 'sustenance', 'eats'],
  water: ['aqua', 'h2o', 'water', 'the wet stuff'],
  weather: ['elements', 'climate', 'the outside'],

  // Prepositions / Connectives
  because: ['cuz', 'cause', 'cos', 'bc', 'since', 'given that', 'seeing as'],
  but: ['however', 'though', 'although', 'yet', 'nevertheless', 'still', 'whereas'],
  and: ['also', 'plus', 'along with', 'as well as', 'on top of that', 'furthermore'],
  if: ['provided that', 'assuming', 'should', 'in case'],
  then: ['after that', 'subsequently', 'following that', 'next'],
  also: ['too', 'as well', 'additionally', 'plus', 'on top'],
  so: ['therefore', 'hence', 'thus', 'consequently', 'that means'],
  about: ['regarding', 'concerning', 'on the topic of', 'in relation to'],
  except: ['other than', 'aside from', 'apart from', 'bar'],
  until: ['till', 'up to', 'up until', 'til'],
  during: ['whilst', 'throughout', 'in the middle of', 'mid'],
  without: ['sans', 'lacking', 'with no', 'in the absence of', 'devoid of'],
  through: ['via', 'by way of', 'by means of', 'using'],
  between: ['in between', 'among', 'amongst', 'midway'],
  before: ['prior to', 'ahead of', 'in advance of', 'preceding'],
  after: ['following', 'subsequent to', 'post', 'later than'],

  // Quantifiers / Articles mods
  this: ['this', 'this one', 'this here'],
  that: ['that', 'that one', 'that there'],
  these: ['these ones', 'these here', 'these'],
  those: ['them', 'those ones', 'those there'],

  // Chat slang / UK slang
  money: ['bread', 'dough', 'bags', 'rack', 'bands', 'paper', 'cheddar', 'coin', 'p', 'wonga', 'spondulicks'],
  nothing: ['nada', 'nowt', 'jack', 'sweet fa', 'sod all', 'zilch', 'diddly squat', 'fuck all'],
  friend: ['mate', 'pal', 'buddy', 'pal', 'china', 'bredrin', 'fam', 'guy', 'geezer', 'lad', 'homie'],
  guy: ['lad', 'geezer', 'bloke', 'dude', 'chap', 'fella', 'man'],
  girl: ['bird', 'girl', 'lass', 'woman', 'maid', 'gal', 'she'],
  child: ['kid', 'youngster', 'youth', 'little one', 'nipper', 'bambino'],
  thing: ['stuff', 'things', 'item', 'object', 'entity'],
  idea: ['notion', 'concept', 'thought', 'inspiration', 'brainwave'],
  problem: ['issue', 'predicament', 'dilemma', 'situation', 'mess', 'trouble', 'palava'],
  situation: ['scenario', 'circumstances', 'position', 'state of affairs', 'predicament'],
  plan: ['scheme', 'strategy', 'approach', 'game plan', 'masterplan'],
  chance: ['opportunity', 'shot', 'crack', 'look in', 'opening'],
  truth: ['facts', 'reality', 'the real', 'gospel'],
  lie: ['cap', 'capping', 'story', 'tall tale'],
  secret: ['hush hush', 'on the low', 'lowkey', 'confidential'],
  nonsense: ['bollocks', 'rubbish', 'crap', 'bullshit', 'bollox', 'talking shit'],
  trouble: ['beef', 'drama', 'conflict', 'issues', 'palava', 'aggro'],
  news: ['gossip', 'info', 'information', 'the word', 'the latest', 'whats good'],
  experience: ['journey', 'trip', 'adventure', 'ordeal', 'time'],
  mistake: ['error', 'blunder', 'fuck up', 'screw up', 'whoopsie', 'mess up'],
  advantage: ['upper hand', 'edge', 'leg up', 'leverage'],
  disadvantage: ['downside', 'drawback', 'handicap', 'weakness'],
};

const synonymCache = new Map();

async function fetchSynonyms(word) {
  if (synonymCache.has(word)) return synonymCache.get(word);
  try {
    const res = await fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=5`);
    if (res.ok) {
      const data = await res.json();
      const syns = data.map(d => d.word).filter(w => w !== word);
      synonymCache.set(word, syns);
      return syns;
    }
  } catch {}
  synonymCache.set(word, []);
  return [];
}

const prefixes = ['', 'yo ', 'bro ', 'ngl ', 'fr ', 'tbh ', 'bruh ', 'aint gonna lie ', 'nbs ', 'icb ', 'lowkey ', 'highkey '];
const suffixes = ['', ' ngl', ' fr', ' tbh', ' icl', ' on god', ' deadass', ' for real', ' no cap', ' fr fr', ' swear down', ' init', ' innit', ' you get me', ' you feel me'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomReplace(word) {
  const lower = word.toLowerCase().replace(/[^a-z0-9']/g, '');
  const punct = word.replace(/[a-zA-Z0-9']/g, '');
  if (!lower) return word;

  // Check dictionary first
  if (swaps[lower]) {
    return randomChoice(swaps[lower]) + punct;
  }

  // Algorithmic transformations for any word not in dictionary
  if (Math.random() < 0.5) {
    let t = lower;

    // Verb tense slangifications
    if (t.endsWith('ing') && Math.random() < 0.4) t = t.slice(0, -3) + "in'";
    else if (t.endsWith('tion') && Math.random() < 0.3) t = t.slice(0, -4) + "shun";
    else if (t.endsWith('sion') && Math.random() < 0.3) t = t.slice(0, -4) + "zhun";
    else if (t.endsWith('ght') && Math.random() < 0.3) t = t.slice(0, -3) + "t";
    else if (t.endsWith('er') && t.length > 3 && Math.random() < 0.3) t = t.slice(0, -2) + "a";
    else if (t.endsWith('le') && t.length > 3 && Math.random() < 0.3) t = t.slice(0, -2) + "el";
    else if (t.endsWith('ed') && Math.random() < 0.2) t = t.slice(0, -2) + "'d";
    else if (t.endsWith('ly') && Math.random() < 0.3) t = t.slice(0, -2) + "lee";

    // Vowel shortening / slang
    else if (t.endsWith('ate') && Math.random() < 0.3) t = t.slice(0, -3) + "8";
    else if (t.endsWith('you') && Math.random() < 0.4) t = "u";
    else if (t === 'the' && Math.random() < 0.3) t = "da";
    else if (t === 'to' && Math.random() < 0.2) t = "2";
    else if (t === 'for' && Math.random() < 0.3) t = "4";
    else if (t === 'your' && Math.random() < 0.4) t = "ur";
    else if (t === 'are' && Math.random() < 0.4) t = "r";
    else if (t === 'why' && Math.random() < 0.3) t = "y";

    // Common shortenings
    else if (t === 'something') t = "summin";
    else if (t === 'with' && Math.random() < 0.3) t = "wiv";
    else if (t === 'this' && Math.random() < 0.3) t = "dis";
    else if (t === 'that' && Math.random() < 0.3) t = "dat";
    else if (t === 'there' && Math.random() < 0.3) t = "dere";
    else if (t === 'their' && Math.random() < 0.3) t = "deir";
    else if (t === 'them' && Math.random() < 0.3) t = "dem";
    else if (t === 'then' && Math.random() < 0.3) t = "den";
    else if (t === 'than' && Math.random() < 0.3) t = "dan";
    else if (t === 'thing' && Math.random() < 0.3) t = "ting";
    else if (t === 'things' && Math.random() < 0.3) t = "tings";
    else if (t === 'brother' && Math.random() < 0.5) t = "bredrin";
    else if (t === 'mother' && Math.random() < 0.3) t = "mum";
    else if (t === 'father' && Math.random() < 0.3) t = "dad";

    // Random letter doubling
    else if (t.length > 3 && Math.random() < 0.1) {
      const idx = Math.floor(Math.random() * (t.length - 1));
      if (/[aeiou]/.test(t[idx])) t = t.slice(0, idx) + t[idx] + t.slice(idx);
    }

    if (t !== lower) return t + punct;
  }

  return word;
}

function replaceWords(text) {
  const words = text.split(/\s+/);
  return words.map(w => randomReplace(w)).join(' ');
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
  t = t.replace(/\bwas not\b/gi, "wasn't");
  t = t.replace(/\bwere not\b/gi, "weren't");
  t = t.replace(/\bhas not\b/gi, "hasn't");
  t = t.replace(/\bhave not\b/gi, "haven't");
  t = t.replace(/\bhad not\b/gi, "hadn't");
  t = t.replace(/\bwould have\b/gi, "would've");
  t = t.replace(/\bcould have\b/gi, "could've");
  t = t.replace(/\bshould have\b/gi, "should've");
  t = t.replace(/\bmust have\b/gi, "must've");
  t = t.replace(/\bmight have\b/gi, "might've");
  t = t.replace(/\bgoing to\b/gi, Math.random() < 0.5 ? "gonna" : "going to");
  t = t.replace(/\bwant to\b/gi, Math.random() < 0.5 ? "wanna" : "want to");
  t = t.replace(/\bgonna\b/gi, Math.random() < 0.3 ? "gon" : "gonna");
  t = t.replace(/\bgot to\b/gi, "gotta");
  t = t.replace(/\bhas got\b/gi, Math.random() < 0.5 ? "'s got" : "has got");
  t = t.replace(/\blet me\b/gi, Math.random() < 0.5 ? "lemme" : "let me");
  t = t.replace(/\bdont\b/gi, "don't");
  t = t.replace(/\bdidnt\b/gi, "didn't");
  t = t.replace(/\bdoesnt\b/gi, "doesn't");
  t = t.replace(/\bwont\b/gi, "won't");
  t = t.replace(/\bcould not\b/gi, "couldn't");
  t = t.replace(/\bwould not\b/gi, "wouldn't");
  t = t.replace(/\bshould not\b/gi, "shouldn't");
  t = t.replace(/\bmust not\b/gi, "mustn't");
  t = t.replace(/\bisn't\b/gi, Math.random() < 0.3 ? "ain't" : "isn't");
  t = t.replace(/\bare not\b/gi, Math.random() < 0.3 ? "ain't" : "aren't");
  t = t.replace(/\bam not\b/gi, Math.random() < 0.5 ? "ain't" : "amn't");
  t = t.replace(/\bthank you\b/gi, Math.random() < 0.5 ? "thanks" : "thank you");
  t = t.replace(/\bgive me\b/gi, Math.random() < 0.5 ? "gimme" : "give me");
  t = t.replace(/\bcome on\b/gi, Math.random() < 0.5 ? "cmon" : "come on");
  t = t.replace(/\bout of\b/gi, Math.random() < 0.5 ? "outta" : "out of");
  t = t.replace(/\bkind of\b/gi, Math.random() < 0.5 ? "kinda" : "kind of");
  t = t.replace(/\bsort of\b/gi, Math.random() < 0.5 ? "sorta" : "sort of");
  t = t.replace(/\ba lot of\b/gi, Math.random() < 0.5 ? "alotta" : "a lot of");
  t = t.replace(/\bbecause\b/gi, Math.random() < 0.4 ? "cuz" : "because");
  t = t.replace(/\babout\b/gi, Math.random() < 0.3 ? "bout" : "about");
  t = t.replace(/\blittle\b/gi, Math.random() < 0.3 ? "li'l" : "little");
  return t;
}

function addRandomPrefixSuffix(text) {
  let t = text;
  if (Math.random() < 0.5) {
    t = randomChoice(prefixes) + t;
  }
  if (Math.random() < 0.4) {
    t = t + randomChoice(suffixes);
  }
  return t;
}

function varyPunctuation(text) {
  const exclaimMatch = text.match(/!+/);
  if (exclaimMatch) {
    const variations = ['!', '!!', '!', '!!', '!!!', '!', ''];
    return text.replace(/!+$/, randomChoice(variations));
  }
  if (text.endsWith('.') && Math.random() < 0.15) {
    return text.slice(0, -1) + randomChoice(['!', '!!', '']);
  }
  if (text.endsWith('?')) {
    if (Math.random() < 0.2) {
      return text.slice(0, -1) + randomChoice(['?', '??', '?', '??']);
    }
  }
  return text;
}

function repeatLetters(text) {
  if (text.length < 4) return text;
  const words = text.split(/\s+/);
  return words.map(w => {
    if (w.length > 3 && Math.random() < 0.08) {
      const idx = Math.floor(Math.random() * w.length);
      const letter = w[idx];
      if (/[a-zA-Z]/.test(letter)) {
        return w.slice(0, idx) + letter.repeat(Math.floor(Math.random() * 2) + 1) + w.slice(idx + 1);
      }
    }
    return w;
  }).join(' ');
}

const emojiRegex = require('emoji-regex');

function stripEmojis(text) {
  if (!text) return text;
  let t = text.replace(/:\s*\w+(?:\s+\w+)*\s*:/g, '');
  t = t.replace(/\{(?:emote|emoji)[^}]*\}?/gi, '');
  t = t.replace(emojiRegex(), '');
  t = t.replace(/\s{2,}/g, ' ').trim();
  return t;
}

async function rephrase(text) {
  if (!text || text.length < 2) return text;

  let result = stripEmojis(text);

  const transforms = [
    replaceWords,
    applyContractions,
    addRandomPrefixSuffix,
    varyPunctuation,
    repeatLetters,
    (t) => t.replace(/^\s+/, '').replace(/\s+$/, ''),
  ];

  for (const fn of transforms) {
    result = fn(result);
  }

  // API pass — look up synonyms for words not in local dict
  const words = result.split(/\s+/);
  let apiChanged = false;
  for (let i = 0; i < words.length; i++) {
    const lower = words[i].toLowerCase().replace(/[^a-z0-9']/g, '');
    if (lower.length > 2 && !swaps[lower] && Math.random() < 0.7) {
      const syns = await fetchSynonyms(lower);
      if (syns.length > 0) {
        const punct = words[i].replace(/[a-zA-Z0-9']/g, '');
        words[i] = syns[Math.floor(Math.random() * syns.length)] + punct;
        apiChanged = true;
      }
    }
  }
  if (apiChanged) {
    const joined = words.join(' ');
    result = joined.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  if (result !== text) {
    console.log('Rephrased:', text.slice(0, 60), '->', result.slice(0, 60));
  }

  return result;
}

module.exports = { rephrase };