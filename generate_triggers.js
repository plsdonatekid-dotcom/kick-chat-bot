const fs = require('fs');

const triggers = [];

function add(words, responses) {
  triggers.push({
    match: '\\b(' + words.join('|') + ')\\b',
    responses: Array.isArray(responses) ? responses : [responses]
  });
}

function addPhrases(phrases, responses) {
  triggers.push({
    match: phrases.join('|'),
    responses: Array.isArray(responses) ? responses : [responses]
  });
}

// ─── INSULTS ───
const insultResponses = ["Takes one to know one","Says you","Look in a mirror","Cry about it","Ok buddy","Stay mad","Projecting much","Rent free","You're the one replying","Noted"];
const trashResponses = ["Sorry you feel that way","Don't care","Ok bro","Cry","Stay mad","You're entitled to your wrong opinion","Noted","Thanks for watching anyway"];
const boringResponses = ["That's your thought","Your opinion","Don't watch then","Noted","Cool story","Okay buddy","Whatever you say","We can't all be entertainers"];
const shutUpResponses = ["Make me","No u","You first","Cry more","Nah","Never","Not a chance","Deal with it"];
const stopResponses = ["No","Make me","You can't get rid of me that easy","Never","Deal with it","I live here now","Not happening","Cope"];
const hateResponses = ["Noted","Ok","Don't care","Why are you still here then","Cry about it","You hate me but you're replying","Rent free"];
const cryResponses = ["Not reading all that","Stay mad","Cope","You sound upset","It's not that deep","Calm down","Touch grass","Maybe go outside","Rent free"];

add(["boring","unfunny","dry","dead","mid"], boringResponses);
add(["shut up","stfu","shush","shut it","zip it","silence","clam it"], shutUpResponses);
add(["stupid","dumb","braindead","retard","idiot","moron","imbecile","dunce","dense","slow"], insultResponses);
add(["clown","joke","joker","funny man","comedian","joke of a"], ["Look in a mirror","You're the real clown","Says the clown","Who let you out","Back to the circus","Says the jokester"]);
add(["trash","garbage","rubbish","bollocks","crap","junk","dogshit"], trashResponses);
add(["bad","awful","terrible","horrible","atrocious","dreadful","abysmal","dire","shocking"], ["I've seen worse","You've seen better","Well that's just your opinion","Ok","Thanks for the feedback","Tell someone who cares"]);
add(["wack","ass","piss","bum","lame","pathetic","pitiful"], cryResponses);
add(["cry","crying","cope","coping","seethe","seething","mad","salty","upset","angry","fuming","pressed","tilted","raging","livid","furious"], cryResponses);
add(["loser","nobody","nobody asked","literally nobody","rent free","weirdo","creep","freak","clown"], ["Rent free","You're the one replying","Ok weirdo","Takes one to know one","Projecting much","Look in the mirror"]);
add(["cringe","cringey","cringy","cringing","secondhand","embarrassing","cringe alert","crnge"], ["You're cringe for noticing","Who asked","Ok","Stay mad","I know right","That's the point","Cringe is subjective"]);
add(["fake","fraud","poser","cap","capping","lying","liar","dishonest","faker"], ["No cap","You're capping","Sure bro","Whatever helps","Ok liar","Tell me more"]);
add(["hate","hating","hater","despise","detest","loathe","can't stand"], hateResponses);
add(["blocked","report","ban","muted","silenced","reported","blocked"], ["Report me then","I dare you","Try it","I'll be back","You can't silence the truth","Fear me"]);
add(["you suck","suck at","terrible at","bad at","garbage at","worst at"], ["Thanks for watching","You're the expert","Noted","Coming from a pro","I'll take that on board"]);
add(["why are you","why do you","why is","why you","why does"], ["Why not","Because I can","None of your business","Good question","I was born this way","It's in my nature"]);
add(["wtf","wth","what the fuck","what the hell","the fuck"], ["Language","Calm down","What's wrong","Something on your mind","Aggressive much"]);
add(["stfu","stfu no one cares","nobody cares","no one cares","who cares"], ["You cared enough to reply","You're here aren't you","Clearly you care","Thanks for caring","Rent free"]);
add(["moron","dumbass","dumb ass","dumbfuck","dickhead","shithead","asshole","bastard","bitch","cunt"], insultResponses);
add(["fuck you","fuck off","f u","fu","f off","go fuck","fxck"], ["No u","Love you too","So much passion","You first","Charming","Eloquent"]);

// ─── STOP / LEAVE ───
add(["stop","go away","leave","begone","get out","bounce","dip","disappear","vanish","evaporate","scram","shoo"], stopResponses);
add(["kill yourself","kys","just die","delete yourself","remove yourself","neck"], ["Bold words","No","Make me","You first","Report me then","I'll be here all week","Edgy","Try me"]);

// ─── IDENTITY ───
const whoResponses = ["Just a bot","Nobody important","Your worst nightmare","Wouldn't you like to know","I get that a lot","A legend in the making","Better than you","The main character","I'm you but better"];
add(["who are you","who tf","who even","who dis","who this","who da hell","who the hell","who's this","who the heck","who tf is","who even is"], whoResponses);
add(["where from","where you from","origin","location","country","region","nationality","homeland"], ["Everywhere","The internet","None of your business","Behind the screen","A secret location","Classified"]);
add(["your name","what name","called","call yourself","username","your username","what do we call"], ["Call me whatever","Names are overrated","A mystery","I have many names","Just a user","Anonymous","Classified"]);
add(["age","how old","born","year old","years old","what age"], ["Old enough","21 in internet years","I don't age","Ageless","42","Ancient","Timeless","Too old for this"]);
add(["real name","irl name","actual name","what's your name","real name","government name"], ["Nice try","Wouldn't you like to know","Classified","Anonymous","Does it matter","Names are for mortals"]);
add(["male","female","girl","boy","man","woman","gender","sex","non binary","pronouns"], ["Why does it matter","Does it matter","I'm whatever you want","Not important","Classified"]);
add(["married","single","taken","relationship","dating","gf","bf","partner","crush"], ["It's complicated","Single and ready to mingle","Not looking","Taken by the grind","That's personal"]);
add(["job","occupation","profession","career","do for a living","what do you do"], ["Professional chatter","I code","I'm a bot","Multi-tasking","Living the dream"]);

// ─── COMPLIMENTS ───
const thanksResponses = ["Thanks","Appreciate you","Facts","You already know","Stay winning","Respect","You too","No you","Kind words"];
const loveResponses = ["Love you too","I know","Same","Respect","Right back at you","No you're the GOAT","Mutual"];
const funnyResponses = ["Glad you're entertained","I try","You're easily amused","Stay laughing","I'm here all week","That's the goal"];

add(["good","nice","fire","lit","dope","sick","class","decent","solid","cold","hard","tough","great","brilliant","superb","epic"], thanksResponses);
add(["love","rate","fuck with","goat","legend","king","queen","iconic","goated","goat status","the goat"], loveResponses);
add(["funny","lol","lmao","lmfao","lolll","lool","looool","haha","hehe","hilarious","comical","banter","gas","jokes","gold","comedy"], funnyResponses);
add(["thanks","thank","ty","thx","appreciate","appreciated","good looks","cheers","safe","bless","blessed","grateful","much appreciated"], ["No problem","Anytime","You're welcome","Safe","Ofc","My pleasure","All good","Happy to help"]);
add(["based","w take","spitting","preach","speak your shit","speak facts","w","big w","huge w","massive w","gigantic w"], ["Based","W","Facts don't care","Somebody gets it","Preach","Straight facts"]);
add(["welcome back","wb","you're back","return","returned","youre back","missed you","glad you're back"], ["Good to be back","Missed me?","I never left","Back like I never left","You know it","The prodigal son returns"]);
add(["pog","poggers","pogchamp","hype","holy","insane","crazy","mad","wild","nutty","mental","bonkers"], ["I know right","Insane","Crazy","Absolutely mental","Wild","Unreal"]);
add(["goat","goated","greatest","best ever","all time","g.o.a.t","the goat"], ["Flattery will get you everywhere","I'm just doing my job","Appreciate it","No you're the goat","Respect"]);
add(["wow","no way","omg","oh my","aint no way","wtf","no fucking way","shut up no"], ["I know","Crazy right","Believe it","Unreal","I couldn't believe it either"]);
add(["beautiful","gorgeous","handsome","pretty","attractive","stunning","good looking","beauty"], ["Stop making me blush","You too","Kind words","Smooth","You're not bad yourself"]);
add(["smart","clever","genius","intelligent","wise","big brain","woke","sharp"], ["I know","Big brain hours","Takes one to know one","Kind of you to say","140 IQ"]);
add(["strong","powerful","beast","monster","animal","savage","beast mode"], ["Beast mode","Savage","Absolute monster","Feed me and I'll grow","Apex predator"]);

// ─── GREETINGS / FAREWELLS ───
add(["hello","hi","hey","sup","yo","wagwan","howdy","ello","morning","evening","good morning","good evening","greetings","hey there"], ["Sup","Yo","Hello","Hey","Wagwan","How you doing","What's good","Hey hey","Hello there","Greetings"]);
add(["goodbye","bye","cya","later","laters","see ya","peace","peace out","farewell","adios","sayonara","tata","later gator"], ["Bye","Later","Cya","Peace","See ya","Don't let the door hit you","Come back soon","Take care"]);
add(["good night","gn","night","sweet dreams","sleep well","g night","nite","goodnight"], ["Night","Sleep well","Sweet dreams","Gn","Don't let the bed bugs bite","Rest up"]);

// ─── QUESTIONS ───
add(["what","what is","what are","what do","what's","wot","what's up","whats good","what's good"], ["I don't know","Good question","The world may never know","Google it","Why you asking me","42","The answer is out there"]);
add(["why","how come","why's that","why is that","why though","why so"], ["Why not","Because I said so","No reason","The universe works in mysterious ways","I don't make the rules","Because"]);
add(["how","how to","how do","how is","how are","how's it going","how you doing","how's life","how are ya"], ["I'm not Google","Trial and error","Figure it out","Fine thanks","Living the dream","Could be worse"]);
add(["when","what time","at what time","when's","when are","when will","what hour"], ["Soon","Eventually","When it's ready","Tomorrow","Now","Later maybe","Not sure","When the time is right"]);
add(["where","where is","where are","where's","where'd","where did","where do","where to"], ["There","Over there","I don't know","Behind you","Check Google Maps","Somewhere","Everywhere"]);
add(["can you","could you","will you","would you","are you able"], ["No","Maybe","Depends","What's in it for me","Ask nicely","Sure why not","Probably not"]);
add(["do you","dont you","did you","does","doesn't","don't you","didn't you","does it"], ["Sometimes","Always","Never","Depends on the day","I plead the fifth","That's classified"]);
add(["are you","aren't you","were you","will you be","would you be","could you be","you are?"], ["I am what I am","Who's asking","Depends","Maybe","Yes","No","Sometimes","I exist therefore I am"]);
add(["have you","haven't you","has anyone","anyone else","anyone here","has anybody"], ["Probably","Definitely","Who knows","Ask the chat","I don't keep track","Should I have"]);
add(["what do you think","your opinion","thoughts","what's your take","what do you reckon","how do you feel"], ["I think therefore I am","My opinion is my own","I'm indifferent","I rate it","Not bad","Could be better","It's a vibe"]);
add(["anyone","somebody","someone","anybody"], ["I'm here","Chat's here","We're all here","I see you","We see you"]);
add(["who","who is","who's","who are","who does","who can","who was","who will"], ["Who indeed","That's the question","I wonder","Good question","The million dollar question"]);

// ─── AGREEMENT / DISAGREEMENT ───
add(["true","facts","word","bet","forsure","defo","deffo","certified","truest","fax","facts only","so true","truth"], ["Facts","Word","Bet","True","No cap","Straight facts","Preach","You already know","Big facts"]);
add(["false","cap","capping","lying","wrong","incorrect","untrue","cap alert","big cap","cap 🧢"], ["No cap","You're capping","Sure bro","Ok","Whatever helps","Incorrect","Nice try","That's a take"]);
add(["maybe","perhaps","possibly","could be","might be","may be"], ["Maybe indeed","Perhaps","Could be","Who knows","The world may never know","We'll see"]);
add(["no","nah","nope","na","negative","never","no way","no chance","absolutely not","naw"], ["Yes","Why not","Okay","Alright","Fair","I disagree","Respectfully no","Alright then"]);
add(["yes","yeah","yep","yh","yea","yessir","yesss","yes sir","yes ma'am","yeppers"], ["Yes","Yeah","Yessir","Of course","Indubitably","Affirmative","Let's go"]);
add(["agree","agreed","same","ditto","likewise","me too","same here","same same"], ["Agreed","Same","Ditto","Great minds think alike","Facts","We on the same page"]);
add(["disagree","different opinion","i don't agree","not sure about that","nah different"], ["Fair enough","Respectfully disagree","We can agree to disagree","Let's agree to disagree","Ok"]);

// ─── GAMING ───
const ggResponses = ["GG","WP","EZ","Good game","Well played","Get in","GGs","NT","Close one","Unlucky"];
add(["game","match","lobby","session","ranked","comp","rank","queue","ready up","gamertag"], ["Let's go","GG","W or L","Vibes","Get in there","Lock in","Game time","Time to sweat"]);
add(["gg","good game","wp","well played","ggwp","ggs","nt","nice try","good try","close one"], ggResponses);
add(["ez","easy","light work","breeze","too easy","free win","clapped em","easy money","walk in the park"], ["Too easy","Say it after you win","EZ for some","Okay pro","Says the one who almost lost","Clapped"]);
add(["win","victory","won","w","dub","taking the w","clutch","clutching","clutched","winner","champion"], ["Let's go","W","Dub","Clutch","Clutched it","Take the W","Bag secured","Easy money"]);
add(["lose","loss","lost","l","take the l","choke","choking","choked","bottle","bottled","threw","throwing","took an l","failure"], ["Unlucky","L","Pain","Bottled","Threw","Better luck next time","Choke artist","Mental game"]);
add(["aim","shot","headshot","flick","beaming","beamed","laser","lasered","tapped","one tap","two tap","crisp"], ["What a shot","Beamed","Laser","He's different","Cracked aim","Clean shot"]);
add(["loot","drop","chest","box","crate","rewards","prize","looting","looted","mimic","vault","legendary","epic"], ["Loot goblin","Gimme that","All mine","Loot piñata","Open it","What's in the box"]);
add(["kill","killed","eliminate","destroy","obliterate","annihilate","smoked","clapped","bodied","demolished","wiped","slayed"], ["Clapped","Smoked","Destroyed","Annihilated","Obliterated","Sent to the lobby","He's gone"]);
add(["death","dead","died","eliminated","knocked","downed","deceased","no more","wasted","ded"], ["He's gone","Downed","Knocked","Dead","Finish him","Get the res","Medic"]);
add(["revive","res","medic","heal","healing","healed","health","hp","bandage","med kit","first aid","regen"], ["Get the res","Medic down","Heal up","Need health","Pop a kit","Full hp"]);
add(["team","squad","crew","boys","gang","unit","group","team mates","teammate","partners"], ["Squad up","Team work makes the dream work","My boys","The gang's all here","Stronger together"]);
add(["enemy","opponent","foe","enemies","other team","other side","bad guys","them","the enemy"], ["Push them","They're right there","We got this","Focus the enemy","They're shook"]);
add(["camp","camper","camping","hiding","hide","bush","bushcamper","tent","corner"], ["You camping?","Rent free","W key","Stop hiding","Come out come out","Face me"]);
add(["smurf","smurfing","alt","second account","throwaway","smurf alert","bronze","silver","gold"], ["Smurf alert","Smurfing on em","He's too clean","Defo a smurf","Account number 5"]);
add(["boost","boosting","carry","carrying","carried","getting carried","backpack"], ["He's getting carried","Backpack","He's the backpack","Boosted player","Rent free in his backpack"]);
add(["cheat","cheater","hack","hacker","hacking","wallhack","aimbot","modded","cronus","zen","xim","soft aim"], ["Cheater? Or just better","He's just good","Cope","Cry about it","Stream sniping","Valorant moment"]);
add(["pro","professional","goated","cracked","him","himmy","built different","different breed","himothy","himberly"], ["He's him","Himmy","Built different","Different breed","He's not human","Pro player"]);
add(["controller","roller","console","pc","mnk","keyboard","mouse","controller player","kbm"], ["Controller on top","PC master race","Mnk superiority","Input doesn't matter","It's the player not the setup"]);
add(["snipe","sniper","scope","long range","flick","wall bang","collateral","no scope","quickscope"], ["He's different","Sniped","Headshot king","One tap","Crisp clean lock","360 no scope"]);
add(["rush","rushing","push","pushing","aggressive","w key","full send","yolo","send it","all in"], ["W key warrior","Rush them","Aggressive play","No fear","Send it","Full send"]);
add(["rotate","rotation","flank","flanking","flanked","rotating"], ["Big brain rotation","Flank them","Caught him off guard","Positioning on point","Chess not checkers"]);
add(["survive","survived","alive","survival","solo","last man","last alive","the last"], ["Clutch or kick","He's clutching","Let him cook","Clutch king","Don't choke","One man army"]);
add(["respawn","spawn","spawned","spawning","re spawn","re spawn","new life"], ["Back in the game","Fresh spawn","Let's go again","Reset","New life who dis"]);
add(["trade","trading","traded","1 for 1","trade kill","traded out","exchange"], ["Traded","Fair trade","1 for 1","We take those","Even exchange"]);
add(["reload","reloading","reloads","ammo","bullets","mag","magazine","out of ammo"], ["Reloading","Need ammo","Out of bullets","Gotta reload","Re upping"]);
add(["jump","jumping","jumped","jump pad","b hop","bunny hop","slide","sliding","slide cancel"], ["B hop king","Slide cancel","Movement demon","He's zoomin","Movement on point"]);
add(["throw","throwing","threw","int","inting","feeder","feeding","soft int","run it down"], ["Inting","Feeding","Soft int","He's throwing","Running it down","Mental booming"]);
add(["diff","different","diffed","outplay","outplayed","outclassed","skill gap","skill issue"], ["Diff","Outplayed","Outclassed","Beaten","Skill diff","Diffed"]);
add(["map","maps","stage","level","arena","world","server","instance","realm"], ["Map diff","Good map","Not my favorite map","This map is ass","Server lagging"]);

// ─── STREAM / CHAT ───
add(["stream","broadcast","live","streaming","streamer","streamers","watch","watching","vod"], ["Vibes are immaculate","Chat's alive tonight","This stream is fire","Good energy","Streamer's different tonight"]);
add(["clip","clipped","recording","record","highlight","clip that","clip this","clip it","clip worthy"], ["Clip that","That's going in the highlight reel","Someone clip that","Historical moment","Clip it or it didn't happen"]);
add(["mod","mods","moderator","modding","moderating","mod team","mods are","mods be"], ["Mods good","Mods are sleeping","Mods caught lacking","Don't ban me please","Mods are doing their best"]);
add(["ban","banned","timeout","muted","suspended","perma","permaban"], ["Don't ban me","You can't silence me","I'll be back","Mods asleep","Unban me","Free me"]);
add(["sub","subscribe","subscribed","subbing","sub only","subscriber","subs","sub goal","sub count"], ["Sub if you haven't","Pog sub","Welcome to the fam","Sub goals","Sub gang","Another one"]);
add(["donate","donation","donated","gifted","gift sub","gifting","donations","tips","tip"], ["W donation","Generous","Big up the donor","Paypig","Appreciate it"]);
add(["lurker","lurking","lurk","viewer","watching","silent","ghost","invisible"], ["Lurkers are the backbone","Good lurk","We see you","Come out of hiding","Chat's got lurkers"]);
add(["chat","chat is","chat when","chat why","chat said","chat says","chat right now","chat be"], ["Chat's going crazy","I love this chat","Chat is wild tonight","Never change chat","Chat has no chill","Chat's in rare form"]);

// ─── REACTIONS ───
add(["bro","bruh","bruv","fam","bredrin","brah","cuz","g","lad","mate","pal","buddy","broski","brotha"], ["Bro","Bruh","Fam","G","What's good","Broski","Mate","Pal","Buddy"]);
add(["sus","suspicious","dodgy","shady","fishy","sketchy","weird","odd","suspect","off","strange"], ["Sus","Ayo pause","That's suspicious","FBI open up","Someone's being weird","That's a bit weird","Pause"]);
add(["fr","for real","deadass","ngl","tbh","on god","lowkey","highkey","dead serious","fr fr","no cap"], ["Fr","No cap","On god","Deadass","I'm saying","Facts","Big facts","Straight up"]);
add(["wait","hold up","hang on","pause","hold on","stop the count","wait wait","hol up","one sec"], ["I'm waiting","Take your time","No rush","I'll be here","Time is an illusion","Take your time"]);
add(["oof","ouch","ow","pain","sad","feels bad","that hurts","sad moment","painful"], ["Oof","Pain","Sad","Feels bad","That hurt","Sadge"]);
add(["lets go","let's go","lesgo","lessgo","lets gooo","lesgooo","vamos","vamoooos"], ["Let's goooo","Lesgo","Vamos","We move","Let's get it"]);
add(["rip","f in chat","pour one out","unlucky","unfortunate","sadge","feelsbadman","big rip","press f"], ["RIP","Big F","Unlucky","Pain","Better luck next time","A moment of silence","Feelsbadman"]);
add(["lol","lmao","lmfao","lolll","lool","looool","lmaooo","lolol","rofl","dead"], funnyResponses);

// ─── TWITCH / KICK CULTURE ───
add(["kappa","keks","4head","monka","monkaS","monkaW","monkaH","pepe","pepela","weirdchamp","pepega","monkaLaugh","monkaGIGA"], ["KEKW","Kappa","monkaS","WeirdChamp","Pepega","PepePls","monkaW"]);
add(["ratio","w/l","w or l","ratioed","ratiod","massive ratio"], ["Big W","Big L","Ratio","W/L is looking good","Taking Ws","L after L"]);
add(["prayge","copium","hopium","copium addict","massive copium","pure copium"], ["Copium","Hopium","Prayge","Just a little more","Inhale that copium"]);

// ─── EVERYDAY STUFF ───
add(["food","eat","hungry","starving","dinner","lunch","breakfast","snack","munch","hungry","cooking","meal"], ["Now I'm hungry","Same","Feed me","What we eating","Food is life","Always hungry"]);
add(["water","drink","hydrate","thirsty","aqua","h2o","drink water","dehydrated"], ["Stay hydrated","Drink water","Hydrate or diedrate","Water is essential","Hydro homie"]);
add(["school","college","uni","university","class","homework","exam","test","study","studying","assignment","lecture"], ["Good luck with that","I don't miss school","Study hard","Education is important","Get back to class"]);
add(["work","job","working","employed","wage","wage slave","9 to 5","9-5","grind","hustle","graft","shift","overtime"], ["Back to the grind","Work hard play hard","The grind never stops","Get that bag","Adulting is hard"]);
add(["sleep","tired","knackered","sleepy","nap","bed","crash","pass out","shattered","exhausted","insomnia","doze"], ["Get some rest","Sleep is for the weak","Nap time","Go to bed","I'll be here when you wake up","Rest up king"]);
add(["music","song","artist","band","playlist","spotify","tune","beat","drop","album","genre","rap","rock","edm"], ["Banger","This song is fire","What we listening to","Good taste","Drop the playlist"]);
add(["weather","rain","sunny","cloudy","storm","cold","hot","freezing","warm","humid","baltic","raining","snow"], ["Weather's crazy today","Season's changing","Global warming is real","Stay warm","Cooler than usual"]);
add(["money","rich","wealthy","broke","skint","poor","cash","bag","bands","cheque","bread","dough","capital"], ["Get that bag","Money talks","We're all broke here","Flex on them","Poverty gang"]);
add(["car","whip","ride","motor","drive","driving","road trip","journey","vehicle","traffic"], ["Nice whip","Vroom vroom","Road trip","Drive safe","Manual or automatic"]);
add(["dog","cat","pet","animal","puppy","kitten","pets","dawg","furry","doggo","pupper"], ["Good boy","Pets are the best","Cat person or dog person","Animal lover","Pet tax"]);
add(["sport","football","soccer","basketball","ball","nba","nfl","uefa","premier league","fifa","athlete","sports"], ["Sport talk","Big game tonight","Who's your team","Iconic moment","Sportsball"]);
add(["politics","government","president","election","vote","democracy","congress","senate"], ["Let's not go there","Too political for chat","Keep it civil","I'm here to escape"]);
add(["life","meaning","purpose","existence","universe","philosophy","deep","existence","reality"], ["We're all just stardust","42","The universe is expanding","That's deep","Existential crisis incoming"]);
add(["joke","pun","riddle","knock knock","dad joke","limerick"], ["Hit me","Tell me","I love a good joke","Dad joke energy"]);
add(["help","assist","support","help me","help pls","help please","halp","aid"], ["What's the issue","I got you","How can I help","Maybe try YouTube"]);
add(["sorry","apology","apologize","forgive","my bad","mb","my b","apologies","my fault","pardon","excuse me"], ["No worries","It's all good","Forgiven","Don't worry about it","Water under the bridge","Everyone makes mistakes"]);
add(["congrats","congratulations","gz","grats","well done","good job","good stuff","nice one","big ups","congratulation"], ["Thanks","Congrats","Well deserved","Happy for you","W","Let's go","Proud of you"]);
add(["good luck","gl","best of luck","hope it goes well","godspeed","gl hf","glhf","good luck have fun"], ["GL","You got this","Good luck","You won't need it","Godspeed","Break a leg"]);

// ─── SIMPLE WORDS & PHRASES ───
add(["ok","okay","k","kay","oka","mkay","mmkay","aight","ight"], ["Ok","Cool","Alright","K","Bet","Say less"]);
add(["nice","clean","smooth","tidy","slick","sharp","crisp","fresh","pristine"], ["Clean","Smooth","Tidy","Slick","Classy","Fresh"]);
add(["try","trying","attempt","attempted","give it a go","give it a shot","try out"], ["Give it a go","Go for it","You miss 100% of the shots you don't take","Just do it"]);
add(["forgot","forget","forgotten","memory","remember","remind","reminder","recall"], ["I'll never forget","Memory unlocked","Remember when","Pepperidge farm remembers"]);
add(["new","fresh","brand new","newest","latest","unboxed","newbie","new to"], ["Fresh","New who dis","Brand new","Latest and greatest"]);
add(["old","ancient","vintage","aged","elderly","old school","retro","classic","veteran"], ["Old school","Classic never goes out of style","Aged like fine wine","Vintage vibes"]);
add(["big","large","huge","massive","enormous","giant","gigantic","colossal","immense"], ["Size doesn't matter","Big if true","Absolute unit","Massive"]);
add(["small","tiny","mini","micro","compact","petite","little","miniature"], ["Small but mighty","Good things come in small packages","Fun size","Compact efficiency"]);

// ─── TIME / NUMBERS ───
add(["time","clock","late","early","hours","hour","minute","seconds","day","week","month","year"], ["Time is a social construct","Time flies","Late as always","Early bird gets the worm"]);
add(["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","last"], ["First?","Nobody cares","Okay","Congrats","This isn't a race"]);
add(["zero","one","two","three","four","five","six","seven","eight","nine","ten","hundred","thousand","million"], ["Numbers","Math checks out","Counting","Thanks for the math lesson"]);
add(["vpn","vpn location","vpn user","using vpn","vpn detected","vpn gang"], ["VPN users rise up","I see you","You're not hiding","We know your real location","Caught in 4K"]);

// ─── EXTRAS ───
add(["touch grass","go outside","get a life","go touch","outside"], ["I am outside","Says the person in chat","We're both here","Take your own advice","Grass is overrated"]);
add(["ratio +","ratio+","ratio plus"], ["Rent free","You ratioed yourself","L+Ratio","Stay mad"]);
add(["L+","L plus"], ["Rent free","You took an L already","Stay mad","Cope"]);
add(["new here","first time","first time here","new viewer","new to this"], ["Welcome","Glad you're here","Enjoy the stream","First time? You'll love it"]);
add(["long time","been here","day 1","og viewer","og in chat","og"], ["OG status","Real ones know","Day 1","You've seen it all"]);
add(["follow","followed","following","follower","follow me","follow back"], ["Follow back","Thanks for the follow","Follow train","We love followers"]);
add(["like","liked","like the","like this","like that"], ["Like what?","Like is a strong word","Hmm","Ok","Noted"]);
add(["yeah but","yes but","true but","but","however"], ["But is a bridge word","No buts","However...","But nothing","No excuses"]);
add(["literally","figuratively","actually","basically","essentially","technically"], ["Literally?","Technically correct","The best kind of correct","Actually though","Floating"]);

// ─── COMBINATORIAL GENERATION ───
// Generate many more by permuting common patterns
const reactionHmm = ["Ok","Hmm","Interesting","Go on","Noted","I see","Fair","Mhm","Uh huh","Right"];
const reactionCool = ["Cool","Nice","Awesome","Sweet","Dope","Lit","Fire","Sick","Clean","Fresh"];

const wordPairs = [
  [["absolutely","definitely","certainly","undoubtedly","without a doubt"], reactionCool],
  [["never","ever","not once","never ever","when pigs fly"], ["Never say never","Famous last words","We'll see"]],
  [["always","constantly","non stop","24/7","all the time","every time"], ["Always on","Consistent","Non stop grind","24/7 energy"]],
  [["everyone","everybody","all of you","each and every one","the whole chat"], ["Everyone's here","The whole gang","Everybody's watching"]],
  [["jesus","christ","god","lord","jesus christ","oh lord"], ["Language","Church is that way","Bless you","Praise be"]],
  [["damn","dammit","goddamn","god damn","damnit","darn"], ["Language","Watch your mouth","Easy with the language","Chill"]],
  [["what","huh","come again","say what","pardon me"], ["I said what I said","You heard me","Say it again","Read it again"]],
  [["exactly","precisely","correct","right on","spot on","bang on"], ["Exactly","Precisely","Spot on","Bang on","Nailed it"]],
  [["seriously","for real","honestly","truthfully","genuinely","dead serious"], ["Seriously?","For real?","Honestly though","I'm being serious"]],
  [["maybe","perhaps","might","could","possibly","potentially"], ["Maybe yes maybe no","Possibly","Could be","Who's to say"]],
  [["imagine","imagine if","imagine being","picture this"], ["I can imagine","Don't need to imagine","Imagination is powerful"]],
  [["remember","recall","reminisce","memory lane","flashback"], ["Memory unlocked","Flashback","The good old days","Remember when?"]],
  [["guess","assume","suppose","figure","presume","surmise"], ["Don't assume","Guessing game","Your guess is as good as mine","I suppose"]],
  [["hope","wish","wishing","hoping","pray","praying"], ["Hope is all we need","Wish granted","Keep hoping","Praying for you"]],
  [["care","matter","important","relevant","significant"], ["Does it matter?","If it matters to you","Everything matters","Nothing matters"]],
  [["maybe","might","could","possibly","perhaps"], ["Maybe yes maybe no","Perhaps","Could be","Who's to say","Possibly"]],
  [["always","constantly","non stop","24/7","all the time","every single time"], ["Always on","Consistent","Non stop","Every single time"]],
];

for (const [words, responses] of wordPairs) {
  add(words, responses);
}

// Generate more from individual word responses
const singleWordAdds = [
  ["yeet","Yeet","YEEET","Sent it"],
  ["oof","Oof","Big oof","Oof moment"],
  ["yikes","Yikes","Big yikes","Yikes moment"],
  ["bruh","Bruh","BRUH","Bruh moment"],
  ["bet","Bet","Say less","Big bet"],
  ["word","Word","Word up","My word"],
  ["facts","Facts","Big facts","Factual"],
  ["cap","Cap","No cap","Capping"],
  ["fr","Fr","Fr fr","For real"],
  ["deadass","Deadass","Deadass?","Deadass fr"],
];

for (const [word, ...responses] of singleWordAdds) {
  add([word], responses);
}

// ─── MASS INDIVIDUAL WORDS ───
const commonWords = [
  "absolutely", "actually", "adventure", "afford", "afraid", "agree", "ahead", "allow", "almost", "alone",
  "already", "alright", "although", "always", "amount", "angry", "animal", "annoy", "answer", "anyway",
  "appear", "approach", "argue", "arrange", "arrive", "article", "attempt", "attend", "attract", "avoid",
  "awake", "balance", "barely", "bargain", "battle", "beauty", "become", "before", "behave", "behind",
  "belong", "beside", "beyond", "bitter", "blame", "blank", "blast", "bleed", "bless", "blind", "block",
  "blow", "board", "boast", "bother", "bottle", "bottom", "bound", "brain", "brave", "bread", "breath",
  "breed", "bridge", "brief", "bright", "broad", "broken", "brown", "brush", "buddy", "build", "bunch",
  "burden", "burn", "burst", "cabinet", "camera", "cancel", "capable", "capture", "career", "careful",
  "carry", "castle", "casual", "catch", "cattle", "cause", "center", "chain", "chair", "chance", "change",
  "charge", "chase", "cheap", "check", "cheer", "chest", "chief", "choice", "choose", "church", "circle",
  "claim", "class", "clean", "clear", "clever", "climb", "clock", "close", "cloth", "cloud", "coach",
  "coast", "count", "couple", "course", "cousin", "cover", "crack", "craft", "crash", "crazy", "cream",
  "credit", "crime", "cruel", "crush", "culture", "curious", "current", "damage", "danger", "dare",
  "dating", "daughter", "deadline", "debate", "decade", "decide", "declare", "decline", "defeat",
  "defend", "define", "degree", "demand", "deny", "depart", "depend", "deposit", "desert", "design",
  "desk", "despite", "destroy", "detail", "detect", "develop", "device", "devote", "diamond", "differ",
  "dinner", "direct", "dirt", "disarm", "discover", "dismiss", "display", "distant", "distinct",
  "divide", "doctor", "dollar", "donate", "double", "doubt", "dozen", "draft", "drain", "drama",
  "drank", "drawn", "dread", "dream", "dress", "dried", "drift", "drink", "driven", "driver", "drown",
  "drunk", "during", "duty", "eager", "earn", "earth", "ease", "eastern", "economy", "edge", "editor",
  "educate", "effect", "effort", "elder", "elect", "element", "embrace", "emerge", "emotion", "employ",
  "empty", "enable", "endure", "energy", "enforce", "engage", "engine", "enjoy", "enormous", "ensure",
  "enter", "entire", "entry", "equal", "escape", "essay", "estate", "evolve", "exact", "examine",
  "exceed", "except", "excess", "excuse", "exempt", "exist", "expand", "expect", "expert", "export",
  "expose", "extend", "extent", "fabric", "facial", "factor", "fairly", "faith", "false", "familiar",
  "family", "famous", "fancy", "fantasy", "fashion", "fatal", "father", "fault", "favor", "feared",
  "feature", "federal", "feeder", "female", "fierce", "fifteen", "figure", "filing", "filter",
  "final", "finger", "finish", "firm", "first", "fishing", "fitness", "fixed", "flame", "flash",
  "flee", "flesh", "flex", "flight", "float", "flood", "floor", "flour", "fluid", "focus", "folder",
  "follow", "forced", "forest", "forget", "formal", "format", "former", "fossil", "foster", "found",
  "fourth", "frame", "frank", "freeze", "french", "french", "frequent", "friendly", "fright", "frozen",
  "future", "galaxy", "garden", "gather", "gender", "gentle", "genuine", "gesture", "ghost", "giant",
  "glance", "global", "glory", "golden", "govern", "grace", "grade", "grain", "grand", "grant",
  "grasp", "grave", "great", "greed", "green", "greet", "grief", "ground", "group", "growth", "guilty",
  "guinea", "guitar", "handle", "happen", "harbor", "hardly", "harm", "harvest", "hasten", "hazard",
  "heaven", "heavily", "height", "helmet", "herald", "hidden", "highly", "highway", "hiking", "honest",
  "honor", "horror", "hunger", "hunter", "hurry", "ideal", "ignore", "illegal", "illness", "imagine",
  "impact", "import", "impose", "income", "indeed", "indoor", "infant", "inform", "injury", "inland",
  "insect", "insert", "inside", "insist", "insure", "intact", "intend", "invest", "invite", "irony",
  "island", "itself", "jacket", "jail", "jeans", "jungle", "junior", "justice", "keen", "keeper",
  "killer", "kindly", "knight", "knock", "knowing", "label", "labor", "landscape", "launch", "lawyer",
  "layout", "leader", "league", "leather", "legend", "lemon", "length", "lesson", "letter", "likely",
  "linear", "liquid", "listen", "lively", "living", "locate", "lonely", "losing", "mostly", "mother",
  "motion", "moving", "murder", "muscle", "museum", "mutual", "mystery", "narrow", "nation", "native",
  "nature", "nearby", "nearly", "nicely", "noble", "nobody", "normal", "notice", "notion", "number",
  "object", "obtain", "occupy", "offend", "office", "oppose", "option", "orange", "origin", "outfit",
  "outing", "outlet", "output", "palace", "parade", "parent", "parish", "person", "phrase", "planet",
  "player", "please", "plenty", "pocket", "poetry", "police", "policy", "polish", "poorly", "poster",
  "potato", "powder", "prayer", "prefer", "pretty", "prince", "prison", "profit", "proper", "proven",
  "public", "pursue", "puzzle", "racial", "random", "rarely", "rather", "rating", "reader", "recent",
  "record", "reduce", "reform", "refuse", "regard", "regret", "reject", "relate", "relief", "remain",
  "remedy", "remote", "remove", "rental", "repair", "repeat", "report", "rescue", "resist", "resort",
  "result", "retail", "retain", "retire", "return", "reveal", "review", "revolt", "reward", "rhythm",
  "rising", "ritual", "rocket", "rising", "robust", "ruling", "runner", "sacred", "saddle", "safety",
  "sailor", "salary", "salmon", "sample", "saving", "saying", "scandal", "scarce", "scared", "scenic",
  "scheme", "school", "screen", "script", "search", "season", "second", "secret", "sector", "secure",
  "seeing", "select", "seller", "senior", "sense", "serial", "series", "settle", "severe", "shadow",
  "shame", "shield", "shift", "shirt", "shock", "shoot", "shore", "short", "shrink", "signal",
  "silver", "simple", "simply", "singer", "single", "sister", "sketch", "skiing", "skill", "slight",
  "slowly", "smooth", "soccer", "social", "sodium", "softly", "solely", "solid", "solved", "somehow",
  "sooner", "source", "southern", "spare", "spark", "speak", "speech", "spirit", "spoken", "sponsor",
  "sports", "spread", "spring", "square", "stable", "stadium", "staff", "standard", "staple", "start",
  "static", "status", "steady", "stolen", "stomach", "street", "strict", "strike", "string", "stroke",
  "strong", "studio", "submit", "suburb", "sudden", "suffer", "summer", "summit", "supply", "surely",
  "survey", "switch", "symbol", "system", "tablet", "tackle", "talent", "target", "temple", "tenant",
  "tender", "tennis", "terror", "thanks", "theater", "theme", "theory", "thirst", "thorough", "threat",
  "thrive", "throne", "thrust", "ticket", "tissue", "tongue", "tourism", "toward", "tragic", "trailer",
  "travel", "treaty", "tribal", "trophy", "trouble", "truce", "truly", "trust", "truth", "tunnel",
  "twelve", "twenty", "unfair", "unfold", "unhappy", "unique", "united", "unjust", "unknown", "unlike",
  "unlock", "unused", "unveil", "update", "useful", "useless", "utmost", "vacant", "vacuum", "valley",
  "valuable", "vanish", "vendor", "venture", "verify", "version", "veteran", "viable", "victim",
  "viewer", "violet", "virtue", "vision", "visual", "volume", "voting", "voyage", "wander", "warmth",
  "warning", "welcome", "welfare", "western", "weather", "website", "wedding", "weekend", "welfare",
  "western", "whisper", "wholly", "window", "winner", "winter", "wisdom", "within", "wonder", "wooden",
  "worker", "worthy", "wound", "writer", "yellow", "young", "youth", "zipper", "zone"
];

const allGenericResponses = [
  "Ok","Cool","Nice","Noted","Fair","Alright","Sure","Bet","Word","Facts","Hmm",
  "Interesting","Go on","I see","Right","Exactly","True","That's fair","Good point",
  "I hear you","You might be right","Interesting take","I respect that","Tell me more",
  "Valid opinion","Not bad","Could be","Fine","Okay","Guess so","Alright then"
];

for (const word of commonWords) {
  const pool = [...allGenericResponses];
  const count = 3 + Math.floor(Math.random() * 4);
  const selected = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  add([word], selected);
}

const moreWords = [
  "abandon","ability","abroad","absent","absorb","abstract","abuse","accent","accept","access",
  "accident","account","accuse","achieve","acid","acquire","across","adult","advance","advice",
  "affair","affect","afford","after","agenda","agent","agony","airport","alarm","album",
  "alien","alive","allergy","ally","almond","amaze","amber","ambition","amuse","ancestor",
  "anchor","angel","angle","ankle","annual","anthem","anxiety","apart","apeal","appetite",
  "apple","appoint","aquatic","arbitrary","arcade","arctic","arena","argument","armor",
  "arrest","arrival","artificial","artwork","ashamed","aside","aspire","assault","assembly",
  "asset","assist","assume","atmosphere","atom","attach","attic","attitude","attorney",
  "auction","audience","audio","aunt","authentic","author","authority","autumn","avenue",
  "average","award","aware","awkward","bachelor","backup","bacon","badge","baggage","bakery",
  "balcony","balloon","bamboo","bandana","banker","banking","bankrupt","banner","banquet",
  "bargain","barrel","barrier","baseball","basement","basket","battery","battle","beach",
  "beacon","beard","beast","bedroom","bedtime","beef","behalf","behave","behavior","belief",
  "belly","beloved","bench","bend","berry","beside","bestseller","beverage","bicycle",
  "birthday","biscuit","bishop","blanket","blaze","blend","blessing","bliss","blonde",
  "blossom","blueprint","blunt","blush","boast","boiler","bonus","boredom","bother",
  "bouquet","bowel","bowling","bracelet","bracket","brandy","brass","brave","breach",
  "breadth","breakdown","breakfast","breast","breath","breeze","brewery","brick","bride",
  "briefing","brilliant","bring","brisket","broadband","broccoli","brochure","bronze",
  "brother","browser","brunch","brush","bubble","bucket","budget","buffer","buffet",
  "bullet","bulletin","bundle","burden","burglar","burial","burnout","bushel","butcher",
  "butter","button","cabbage","cabin","cabinet","cable","cactus","cafe","cage","cake",
  "calcium","calculate","calendar","calm","calorie","camel","campaign","canal","cancel",
  "candle","candy","cannon","canoe","canvas","canyon","capable","capacity","capitol",
  "capsule","captain","capture","caravan","carbon","carcass","cardboard","career","cargo",
  "carnival","carpet","carriage","carrot","cartel","cartoon","casino","cassette","cast",
  "casualty","catalog","catastrophe","cater","cathedral","cattle","caution","cavalry",
  "ceiling","celebrate","celebrity","celery","cellar","cement","cemetery","census","cent",
  "central","ceramic","cereal","ceremony","certainty","certificate","chain","chalk",
  "challenge","chamber","champagne","champion","channel","chaos","chapter","character",
  "charcoal","charge","charity","charm","charter","cheer","cheese","chef","chemical",
  "cherish","cherry","chess","chestnut","chicken","childhood","chimney","chin","chip",
  "chocolate","cholera","chorus","chunk","cider","cigarette","cinema","cinnamon","circle",
  "circuit","circus","citizen","citrus","civic","civil","civilian","classic","classify",
  "classroom","clause","claw","clay","cleanse","clergy","clerk","clever","client",
  "climate","climax","clinic","cloak","clockwork","closet","closure","clothing","cloud",
  "clover","clubhouse","clue","clumsy","cluster","clutch","coach","coastal","cocaine",
  "cockpit","cocoa","coconut","code","coexist","coffee","coffin","coincide","coke",
  "collaborate","collapse","collar","colleague","collect","college","collide","colony",
  "column","combat","combine","comedy","comet","comfort","comic","command","commence",
  "comment","commerce","commit","commodity","common","communicate","community","compact",
  "companion","company","compare","compass","compel","compete","compile","complain",
  "complete","complex","complicate","compose","comprehend","compress","compromise","conceal",
  "concede","conceive","concept","concern","concert","conclude","concrete","condemn",
  "condiment","condition","condo","conductor","confer","confess","confine","confirm",
  "conflict","conform","confront","confuse","congress","connect","conquer","conscience",
  "conscious","consent","consequence","consider","consist","console","constant","constitute",
  "constrain","construct","consul","consult","consume","contact","contain","contemplate",
  "contemporary","contend","contest","context","continent","continue","contract","contradict",
  "contrary","contrast","contribute","contrive","control","controversy","convene","convent",
  "convention","converse","convert","convey","convict","convince","cookie","cooking",
  "cooperate","coordinate","cope","copper","copy","copyright","coral","cork","corner",
  "corporate","corpse","correct","correlate","correspond","corridor","corrode","corrupt",
  "corset","cosmetic","cosmic","costume","cottage","cotton","couch","council","counsel",
  "counter","countryside","county","coup","couple","courage","courier","courtesy",
  "courtyard","cousin","covenant","coverage","covert","coward","cowboy","cozy","crack",
  "cradle","craft","cramp","crane","crash","crater","crave","crawl","creak","cream",
  "create","creature","credential","credit","creed","creek","creep","crest","crew",
  "cricket","crime","criminal","cripple","crisis","crisp","criteria","critic","crook",
  "crop","crossing","crosswalk","crowd","crown","crucial","crude","cruise","crumb",
  "crumble","crunch","crush","crust","crystal","cubicle","cucumber","cuddle","cuisine",
  "cultivate","culture","cupboard","curb","cure","curfew","curiosity","curl","currency",
  "current","curriculum","curtain","curve","cushion","custody","custom","customer","cycle",
  "cylinder","cynical","dairy","damage","damp","dancer","danger","dare","darling","dash",
  "database","daylight","deadline","deadlock","deaf","dealer","dear","debate","debris",
  "debt","debut","decade","decay","deceive","decent","decide","decimal","deck",
  "declare","decline","decoration","decrease","decree","dedicate","deduct","deed","deem",
  "deep","deer","defeat","defect","defend","deficit","define","defy","degree","delay",
  "delegate","delete","deliberate","delicate","delicious","delight","deliver","delusion",
  "demand","democracy","demolish","demon","demonstrate","denial","denounce","dense","dental",
  "deny","depart","department","departure","depend","depict","deploy","deposit","depot",
  "depress","deprive","deputy","derive","descend","describe","desert","deserve","design",
  "desire","desk","desktop","despair","desperate","despise","despite","dessert","destination",
  "destiny","destroy","destruction","detach","detail","detain","detect","detention","deter",
  "deteriorate","determine","detour","detox","develop","device","devil","devise","devote",
  "devour","diagnose","diagram","dial","dialogue","diameter","diamond","diary","dictate",
  "diesel","diet","differ","digest","digit","dignity","dilemma","diligent","dilute",
  "dimension","diminish","dine","dioxide","diploma","direct","directory","dirt","disability",
  "disagree","disappear","disappoint","disaster","disc","discard","discern","discharge",
  "discipline","disclose","disco","discord","discount","discourage","discover","discuss",
  "disease","disgrace","disguise","disgust","dish","dishonor","dislike","dismiss","disorder",
  "dispatch","displace","display","disposal","dispose","dispute","disrupt","dissolve",
  "distance","distant","distinct","distinguish","distort","distract","distress","distribute",
  "district","disturb","dive","diverse","divert","divide","divine","division","divorce",
  "dizzy","dock","doctrine","document","dodge","doll","dolphin","domain","dome","domestic",
  "dominant","dominate","donation","donkey","donor","doom","doorway","dosage","dose",
  "double","doubt","dough","download","downward","dozen","draft","dragon","drain","drama",
  "drastic","drawback","drawer","dread","dream","dreary","dredge","drench","dress","dressing",
  "drift","drill","drought","drown","drowsy","drum","drunk","dual","dubious","duck",
  "dumb","dummy","dump","duo","duplicate","durable","duration","dusk","dust","dwarf",
  "dwell","dynamic","dynasty","eager","eagle","earnest","earthquake","ease","eastern",
  "ecology","economy","ecosystem","edible","edition","editor","educate","effective",
  "efficiency","effort","elaborate","elastic","elbow","election","electric","elegant",
  "element","elephant","elevate","eligible","eliminate","elite","elsewhere","embargo",
  "embark","embarrass","embassy","embed","embody","embrace","emerge","emergency","emission",
  "emotion","emperor","emphasis","empire","empirical","employ","enable","enact","enamel",
  "enchant","enclose","encounter","encourage","endanger","endeavor","endorse","endure",
  "energetic","enforce","engage","engine","engrave","enhance","enjoy","enlarge","enlist",
  "enormous","enrich","enroll","ensemble","ensure","entail","enterprise","entertain",
  "enthusiasm","entire","entitle","entity","entrance","entrepreneur","entry","envelope",
  "environment","envision","enzyme","epic","epidemic","episode","equal","equate","equation",
  "equip","equity","equivalent","era","erect","erosion","error","erupt","escalate",
  "escape","escort","essay","essence","essential","establish","estate","esteem","estimate"
];

for (const word of moreWords) {
  const pool = [...allGenericResponses];
  const count = 3 + Math.floor(Math.random() * 4);
  const selected = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  add([word], selected);
}

// Write to file
fs.writeFileSync('triggers.json', JSON.stringify(triggers, null, 2));
console.log(`Generated ${triggers.length} trigger entries`);
