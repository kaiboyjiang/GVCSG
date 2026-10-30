// Side storylines and one-off side missions. Same format as MISSIONS in story.js; `side` names the chain.
// Side offers are listed on the Job Board (Talk) instead of popping up on docking.

const P = (sys, id) => `${sys}:${id}`;
const close = (t = 'Leave.') => ({ t, act: 'close' });

export const SIDE = [
  // ---------------------------------------------------------------- The Wheel's Children
  {
    id: 'a1', side: "The Wheel's Children", title: 'Missing Brother', at: [P('kaltos', 'habitat')], pay: 30000,
    brief: 'Find Tamsin Rook\'s brother Jory. He was last seen boarding a freighter to Vexal Logistics Hub.',
    steps: [{ go: P('vexal', 'station') }],
    offer: { a: {
      who: 'Tamsin Rook',
      text: 'A welder in a scorched coverall is pinning hand-drawn flyers to the habitat\'s notice wall. MISSING: JORY ROOK, 17. She notices you reading one.\n\n"He took a berth on a freighter to Vexal four days ago and hasn\'t answered since. Security says he\'s an adult and it\'s none of their business. I can pay thirty thousand. It\'s most of what I have."',
      choices: [{ t: '"I\'ll find him."', act: 'accept', to: 'y' }, { t: '"Why did he leave?"', to: 'b' }, close('"Sorry. Not my line of work."')] },
    b: { who: 'Tamsin Rook', text: '"He owes money. He won\'t tell me who to." She looks at the flyer. "Jory thinks every problem goes away if he runs fast enough."', choices: [{ t: '"I\'ll find him."', act: 'accept', to: 'y' }, close('"I hope he turns up."')] },
    y: { who: 'Tamsin Rook', text: '"Thank you. Vexal Logistics Hub. He\'ll be the skinny one pretending not to be scared."', choices: [close('Set off for Vexal.')] },
    },
    end: { a: {
      who: 'Vexal Logistics Hub',
      text: 'The freighter\'s purser remembers Jory: he got off here and bought a seat on the next shuttle to Sarn, paid in cash. He left a note for "anyone my sister sends", which the purser hands over for a small consideration.\n\n"Tam — I owe Uncle Fenwick at Freeport, Sarn II. If I pay him back in person maybe he lets it go. Don\'t come. — J"',
      choices: [close('Fold the note away.')] },
    },
  },
  {
    id: 'a2', side: "The Wheel's Children", title: "Uncle Fenwick's Ledger", after: ['a1'], at: [P('vexal', 'station')], pay: 0,
    brief: 'Follow Jory Rook to Freeport, Sarn II, where he owes money to a loan shark called Uncle Fenwick. Landing there costs a bribe.',
    steps: [{ go: P('sarn', 'port-0') }],
    offer: { a: { who: 'Your ship\'s computer', text: 'Freeport, Sarn II is a Clan port in a lawless system. Whatever Jory owes, "Uncle" Fenwick will want more by now.', choices: [{ t: 'Go after Jory.', act: 'accept' }, close('Not yet.')] } },
    end: { a: {
      who: 'Uncle Fenwick',
      text: 'Fenwick runs his business from a booth at the back of a noodle bar, flanked by two very large men. Jory sits beside them with a black eye, staring at the table.\n\n"The boy borrowed twenty and lost it at cards. With interest, sixty. You\'re paying, or you\'re leaving, and he stays until somebody pays."',
      choices: [
        { t: 'Pay the sixty thousand.', pay: -60000, set: 'a_paid', to: 'p' },
        { t: '"Let him go, or I\'ll take him."', set: 'a_fight', to: 'f' },
      ] },
    p: { who: 'Uncle Fenwick', text: 'He counts it twice. "Pleasure doing business. Go home, boy." Jory stands up shakily. "Thanks," he mutters. "I\'ll pay you back. Somehow."', choices: [close('Take Jory to your ship.')] },
    f: { who: 'Uncle Fenwick', text: 'Fenwick sighs. "Everyone wants to be a hero." The big men stand up. In the confusion that follows, Jory bolts for the door and you follow. Behind you, Fenwick is shouting into a comm. His enforcers are already launching.', choices: [close('Run for your ship.')] },
    },
  },
  {
    id: 'a3', side: "The Wheel's Children", title: 'Jory Comes Home', after: ['a2'], need: 'a_paid', at: [P('sarn', 'port-0')], pay: 30000,
    brief: 'Bring Jory Rook home to his sister at Kaltos Wheel Habitat.',
    steps: [{ go: P('kaltos', 'habitat') }],
    offer: { a: { who: 'Jory Rook', text: '"Can we just go? Please?"', choices: [{ t: 'Head for Kaltos.', act: 'accept' }, close('"In a minute."')] } },
    end: { a: { who: 'Tamsin Rook', text: 'Tamsin hugs her brother hard enough to lift him off the deck, then cuffs him round the ear. She pays you the thirty thousand and, when Jory isn\'t looking, quietly promises to pay back the sixty as well, a little at a time.', choices: [close('"Look after him."')] } },
  },
  {
    id: 'a4', side: "The Wheel's Children", title: "Fenwick's Boys", after: ['a2'], need: 'a_fight', at: [P('sarn', 'port-0')], pay: 110000,
    brief: 'Destroy Uncle Fenwick\'s enforcers in Sarn, then bring Jory home to Kaltos Wheel Habitat.',
    steps: [{ kill: { sys: 'sarn', kinds: ['cutlass', 'raider', 'raider'], name: "Fenwick's Enforcers", anchor: 'jump' } }, { go: P('kaltos', 'habitat') }],
    offer: { a: { who: 'Jory Rook', text: '"Three ships, they\'re waiting near the gate. I\'m sorry. I\'m so sorry."', choices: [{ t: '"Strap in."', act: 'accept' }, close('"Stay low. We wait."')] } },
    end: { a: { who: 'Tamsin Rook', text: 'Tamsin listens to the whole story with her arms folded. Then she hugs her brother, pays you, and adds a bonus from a collection the habitat\'s welders took up when they heard. "Nobody touches Wheel kids," she says.', choices: [close('"Nobody touches Wheel kids."')] } },
  },
  // ---------------------------------------------------------------- Ghost Signal
  {
    id: 'b1', side: 'Ghost Signal', title: 'The Ghost Signal', at: [P('orin', 'station')], pay: 40000,
    brief: 'Investigate a thirty-year-old distress beacon pinging from Drak. Start at Redwater, Drak II.',
    steps: [{ go: P('drak', 'port-0') }],
    offer: { a: {
      who: 'Signals Officer Desh Amari',
      text: '"Captain, this will sound mad. Three days ago our array picked up a distress beacon from Drak. The ID code belongs to the liner Kestrel\'s Lament, which vanished with four hundred passengers thirty-one years ago. I can\'t send Federation ships into Drak. I can pay you to look."',
      choices: [{ t: '"I\'ll take a look."', act: 'accept', to: 'y' }, { t: '"What happened to the Lament?"', to: 'b' }, close('"Ghost stories aren\'t my thing."')] },
    b: { who: 'Signals Officer Desh Amari', text: '"Officially, a reactor failure. Unofficially, nobody ever found a single piece of wreckage. My grandmother was on it."', choices: [{ t: '"Then let\'s find out."', act: 'accept', to: 'y' }, close('"I\'m sorry. Not this time."')] },
    y: { who: 'Signals Officer Desh Amari', text: '"Ask at Redwater, Drak II. Salvagers there hear about everything that floats."', choices: [close('Set course for Drak.')] },
    },
    end: { a: {
      who: 'Old Henrik Salt',
      text: 'The old salvager laughs when you mention the beacon. "Everyone in Redwater\'s heard it. Problem is, a crew from the Moot found the wreck first. They\'re cutting her up for scrap right now, out past the belt. You want anything off that ship, you\'ll have to argue with them. With guns."',
      choices: [close('"Thanks for the warning."')] },
    },
  },
  {
    id: 'b2', side: 'Ghost Signal', title: 'Picking the Bones', after: ['b1'], at: [P('drak', 'port-0')], pay: 120000,
    brief: 'Drive off the salvage crew stripping the Kestrel\'s Lament in Drak, recover its black box, and take it to Corsa Logistics Hub.',
    steps: [{ kill: { sys: 'drak', kinds: ['reaver', 'raider'], name: 'Salvage Crew', anchor: 'belt' } }, { go: P('corsa', 'station') }],
    offer: { a: { who: 'Old Henrik Salt', text: '"The black box\'ll be in the stern. If the crew haven\'t sold it yet. Corsa\'s got the old Lament line offices, if anyone still cares."', choices: [{ t: 'Go after the wreck.', act: 'accept' }, close('Not yet.')] } },
    end: { a: {
      who: 'Corsa Logistics Hub',
      text: 'An archivist plays the black box for you in a cramped back office. The Lament\'s captain is calm in the recording, almost bored, reading out a course into Drak. Then a second voice, an owner\'s representative, thanking him for "a quiet retirement". The ship wasn\'t lost. She was hidden and written off for the insurance, with her passengers abandoned aboard.\n\nThe archivist looks pale. "The Lament line\'s successor company would pay a fortune to keep this quiet. The families\' association has been asking questions for thirty years."',
      choices: [
        { t: '"Send it to the families."', set: 'b_families', to: 'f' },
        { t: '"Call the company. Let\'s hear their offer."', set: 'b_sold', pay: 200000, to: 's' },
      ] },
    f: { who: 'Signals Officer Desh Amari', text: 'A message arrives from Orin that evening. "I heard her name read out on the news tonight. Grandmother\'s. After thirty-one years. Thank you, Captain."', choices: [close('Close the message.')] },
    s: { who: 'Corsa Logistics Hub', text: 'A lawyer arrives within the hour, polite and grey-suited. The black box leaves with her, and two hundred thousand appears in your account. The archivist doesn\'t look at you as you go.', choices: [close('Leave.')] },
    },
  },
  // ---------------------------------------------------------------- Company Town
  {
    id: 'c1', side: 'Company Town', title: 'Shift Six', at: [P('ledger', 'port-0')], unless: 'c_report', pay: 70000,
    brief: 'Smuggle the union organiser Ana Brisk out of Ledger to Mirel Orbital Station.',
    steps: [{ go: P('mirel', 'station') }],
    offer: { a: {
      who: 'Ana Brisk',
      text: 'The canteen of the company town smells of protein paste and machine oil. A wiry woman sits down next to you with her tray, eyes on her food.\n\n"Don\'t look at me. I\'m Ana. I organise the Shift Six crews, which the Combine calls \'unauthorised association\'. Compliance comes for me tomorrow. I need a ride to Federation space, tonight. We\'ve pooled seventy thousand."',
      choices: [
        { t: '"Get in the cargo hold. Mirel Orbital?"', act: 'accept', set: 'c_union', to: 'y' },
        { t: '"What happens to the others if you run?"', to: 'b' },
        { t: 'Tell her no, then report her to Combine Security.', set: 'c_report', to: 'r' },
        close('"Not my fight."'),
      ] },
    b: { who: 'Ana Brisk', text: '"They keep working, slower. Every day I\'m free is a day Compliance doesn\'t know who\'s next." She shrugs. "If I\'m in a cell, everybody gets quiet again."', choices: [{ t: '"Get in the cargo hold."', act: 'accept', set: 'c_union', to: 'y' }, { t: 'Tell her no, then report her.', set: 'c_report', to: 'r' }, close('"Not my fight."')] },
    y: { who: 'Ana Brisk', text: '"Mirel Orbital. There\'s a Federation labour office there." For the first time she looks at you directly. "Thank you."', choices: [close('Go to your ship.')] },
    r: { who: 'Combine Security', text: 'The Compliance officer takes your statement with a thin smile. "The Combine values loyal partners, Captain. Asset Control at Vanta Headquarters would like her file delivered personally. There is a fee."', choices: [close('Leave.')] },
    },
    end: { a: { who: 'Ana Brisk', text: 'Ana climbs out of the cargo hold stiff and grinning. Before she leaves for the labour office she gives you a data chip. "Our supply runs from Pellam keep getting hit. Not pirates. Hired guns with Combine money. If you ever want more work."', choices: [close('Pocket the chip.')] } },
  },
  {
    id: 'c2', side: 'Company Town', title: 'Strikebreakers', after: ['c1'], at: [P('mirel', 'station')], pay: 160000,
    brief: 'Destroy the hired strikebreakers ambushing union supply runs in Pellam, then tell the Shift Six crews in Ledger II.',
    steps: [{ kill: { sys: 'pellam', kinds: ['cutlass', 'cutlass', 'raider'], name: 'Strikebreakers', anchor: 'jump' } }, { go: P('ledger', 'port-0') }],
    offer: { a: { who: 'Ana Brisk', text: '"Three ships, Clan crews on Combine pay, sitting on the Pellam lanes. Stop them and the strike holds."', choices: [{ t: '"Consider them stopped."', act: 'accept' }, close('"Not yet."')] } },
    end: { a: { who: 'Shift Six', text: 'When you land, the company town is quiet. The machines have stopped. Hundreds of workers in grey coveralls are sitting on the floor of the main hall, and someone has painted SHIFT SIX across the Combine banner. They cheer when they hear who you are.', choices: [close('Raise a fist and leave.')] } },
  },
  {
    id: 'c2r', side: 'Company Town', title: 'Loyal Partner', after: [], need: 'c_report', unless: 'c_union', at: [P('ledger', 'port-0')], pay: 150000,
    brief: 'Deliver Ana Brisk\'s file to Asset Control at Vanta Combine Headquarters.',
    steps: [{ go: P('vanta', 'station') }],
    offer: { a: { who: 'Combine Security', text: '"Her file, Captain. Vanta Headquarters, Asset Control. Do not open it."', choices: [{ t: 'Take the file.', act: 'accept' }, close('Not yet.')] } },
    end: { a: { who: 'Asset Control', text: 'A clerk takes the file without a word, scans it, and transfers your fee. On the newsfeed behind her, a headline scrolls past: UNAUTHORISED ASSOCIATION DISBANDED AT LEDGER II.', choices: [close('Leave.')] } },
  },
  // ---------------------------------------------------------------- Pilgrims of the Blue Star
  {
    id: 'd1', side: 'Pilgrims of the Blue Star', title: 'The Blue Star Pilgrims', at: [P('aster', 'station')], pay: 90000,
    brief: 'Clear the raiders preying on pilgrims in Lyra, then meet Brother Oswin\'s pilgrims at Lyra II Crater Colony.',
    steps: [{ kill: { sys: 'lyra', kinds: ['raider', 'raider'], name: 'Pilgrim Hunters', anchor: 'jump' } }, { go: P('lyra', 'port-0') }],
    offer: { a: {
      who: 'Brother Oswin',
      text: 'A round, cheerful man in a blue robe waves you over. "Captain! We are the Fellowship of the Blue Star. Every year we travel to Lyra to watch the star rise over the Crater Colony. This year, raiders have been waiting for our shuttles at the gate. We have ninety thousand, and our prayers."',
      choices: [{ t: '"I\'ll clear the way."', act: 'accept', to: 'y' }, { t: '"Why Lyra?"', to: 'b' }, close('"Try the Navy."')] },
    b: { who: 'Brother Oswin', text: '"Because it is beautiful, Captain. Is that not reason enough?"', choices: [{ t: '"Fair enough. I\'ll clear the way."', act: 'accept', to: 'y' }, close('"Try the Navy."')] },
    y: { who: 'Brother Oswin', text: '"Bless you! We will follow behind and meet you at the Crater Colony."', choices: [close('Head for Lyra.')] },
    },
    end: { a: {
      who: 'Brother Oswin',
      text: 'The pilgrims are gathered at the colony\'s viewing dome when you arrive. The blue star climbs over the crater rim and floods the dome with cold light, and two hundred people go completely silent.\n\nAfterwards Brother Oswin presses your hand. "You must take our blessing as well as our money."',
      choices: [{ t: '"I\'ll take both. Thank you."', to: 'k' }, { t: '"The money will do."', to: 'k' }] },
    k: { who: 'Brother Oswin', text: '"Then you have both regardless." He beams. "We return to Aster in a few days. If you were flying that way, we would feel much safer."', choices: [close('Leave.')] },
    },
  },
  {
    id: 'd2', side: 'Pilgrims of the Blue Star', title: 'Return Passage', after: ['d1'], at: [P('lyra', 'port-0')], pay: 60000,
    brief: 'Fly ahead of the Blue Star pilgrims back to Aster Orbital Station.',
    steps: [{ go: P('aster', 'station') }],
    offer: { a: { who: 'Brother Oswin', text: '"Lead the way home, Captain? We will follow your wake."', choices: [{ t: '"Follow me."', act: 'accept' }, close('"Not today."')] } },
    end: { a: { who: 'Brother Oswin', text: 'The pilgrim shuttles land one by one behind you. Brother Oswin hands over the fee and a small blue glass star on a cord. "For your cockpit. So you always know your way home."', choices: [close('Hang it from the canopy frame.')] } },
  },
  // ---------------------------------------------------------------- odd jobs
  {
    id: 'o1', side: 'Odd jobs', title: 'Overdue Parcel', at: [P('pellam', 'habitat')], pay: 35000,
    brief: 'Deliver a parcel, eight months late, to Bastide Customs Station.',
    steps: [{ go: P('bastide', 'station') }],
    offer: { a: { who: 'Postmaster Ilka Venn', text: '"This parcel was posted to Bastide Customs eight months ago and has been to six systems since, none of them Bastide. I am retiring next week and I refuse to retire with it on my shelf."', choices: [{ t: '"I\'ll take it."', act: 'accept' }, close('"Good luck with it."')] } },
    end: { a: { who: 'Bastide Customs Station', text: 'The customs officer opens it in front of you: a hand-knitted scarf, a birthday card, and a jar of pickles that has very definitely gone off. "My mother," he says, deeply moved, then puts the jar straight in the incinerator.', choices: [close('Leave.')] } },
  },
  {
    id: 'o2', side: 'Odd jobs', title: 'The Debt Collector', at: [P('khar', 'den')], pay: 140000,
    brief: 'Destroy Deadbeat Dallow\'s Reaver in Nyx, then report back to the Khar Black Market.',
    steps: [{ kill: { sys: 'nyx', kinds: ['reaver'], name: 'Deadbeat Dallow', anchor: 'belt' } }, { go: P('khar', 'den') }],
    offer: { a: { who: 'The Broker', text: '"Dallow borrowed a Reaver from my associates and forgot to bring it back. He is hiding in Nyx and thinks nobody will look. Make an example of him. We are not sentimental about the ship."', choices: [{ t: '"Done."', act: 'accept' }, close('"Collect your own debts."')] } },
    end: { a: { who: 'The Broker', text: '"Dallow, I hear, is now a very fine cloud of particles." The Broker pays you in clean credit chits. "My associates will remember your name. Mostly fondly."', choices: [close('Leave.')] } },
  },
  {
    id: 'o3', side: 'Odd jobs', title: 'Drone Recovery', at: [P('mirel', 'habitat')], pay: 80000,
    brief: 'Destroy the scavengers who stole a research drone in Corsa, then return to Mirel Halo Habitat.',
    steps: [{ kill: { sys: 'corsa', kinds: ['raider', 'raider'], name: 'Drone Scavengers', anchor: 'belt' } }, { go: P('mirel', 'habitat') }],
    offer: { a: { who: 'Dr. Pim Okoro', text: '"Our atmospheric survey drone went down in Corsa and two scavenger crews grabbed it before we could. It carries four years of data. Destroy them; the drone\'s memory core will survive, it is built like a brick."', choices: [{ t: '"I\'ll get it back."', act: 'accept' }, close('"Not today."')] } },
    end: { a: { who: 'Dr. Pim Okoro', text: 'Dr. Okoro hugs the scorched memory core like a baby. "Four years! You have no idea. Actually, would you like to? It is mostly about cloud chemistry." You decline politely and take your fee.', choices: [close('Leave.')] } },
  },
  {
    id: 'o4', side: 'Odd jobs', title: 'The Wedding Cake', at: [P('vexal', 'port-2')], pay: 45000,
    brief: 'Deliver a seven-tier wedding cake to Tessaly II Stratos Aerostat. Gently.',
    steps: [{ go: P('tessaly', 'port-0') }],
    offer: { a: { who: 'Chef Marguerite Lund', text: '"Seven tiers. Sugar orchids. The wedding is tomorrow at Tessaly\'s aerostat and the courier I hired has just been arrested. Please. If you fly like an animal I will know."', choices: [{ t: '"I\'ll fly like a feather."', act: 'accept' }, close('"I fly like an animal."')] } },
    end: { a: { who: 'Tessaly II Stratos Aerostat', text: 'The cake arrives with only one sugar orchid slightly bent. The bride cries. The groom cries. You are invited to stay for the reception, and you leave several hours later with a slice of cake and no memory of agreeing to dance.', choices: [close('Leave, eventually.')] } },
  },
  {
    id: 'o5', side: 'Odd jobs', title: 'Bad Medicine', at: [P('halden', 'station')], pay: 60000,
    brief: 'Deliver a crate of fever vaccine to the free clinic at Redwater, Grav II.',
    steps: [{ go: P('grav', 'port-0') }],
    offer: { a: { who: 'Nurse Teodor Haas', text: '"There\'s a fever outbreak at Redwater in Grav. Clan space, so no Federation ship will go. This crate of vaccine will save a few hundred people, if it reaches the free clinic and not the black market."', choices: [{ t: '"It\'ll reach the clinic."', act: 'accept' }, close('"Too risky."')] } },
    end: { a: {
      who: 'Redwater, Grav II',
      text: 'Before you can find the clinic, a man in an expensive coat steps in front of you. "Vaccine, yes? I pay triple what anyone else does. The clinic can\'t pay at all. Think about it."',
      choices: [
        { t: 'Push past him and deliver it to the clinic.', to: 'c' },
        { t: 'Sell it to him.', set: 'o5_sold', pay: 150000, to: 's' },
      ] },
    c: { who: 'Redwater Free Clinic', text: 'The clinic is a converted cargo bay full of cots. The doctor opens the crate, looks at you, and doesn\'t say anything at all. She doesn\'t need to.', choices: [close('Leave.')] },
    s: { who: 'Redwater, Grav II', text: 'The man counts out the money with a smile. Behind him, through the clinic\'s open door, you can see rows of cots.', choices: [close('Leave quickly.')] },
    },
  },
];
