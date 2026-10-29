// Storyline: linked missions with text-only conversations and reply choices.
// A mission is offered at a dock once its predecessors are done; its steps are travel ("go") or combat ("kill");
// finishing the last step plays its closing conversation and unlocks whatever follows.

const P = (sys, id) => `${sys}:${id}`;

export const MISSIONS = [
  {
    id: 's1', title: 'Sealed Cargo', at: [P('kaltos', 'station')], pay: 60000,
    brief: 'Carry Dr. Ilse Varga\'s sealed data core to her contact at Tessaly Relay Station.',
    steps: [{ go: P('tessaly', 'station') }],
    offer: { a: {
      who: 'Dr. Ilse Varga',
      text: 'A woman in a rumpled Helion Survey jacket slides into the seat across from you before you can finish your drink. She keeps one hand flat on a small grey case.\n\n"You\'re the captain with the ship nobody\'s watching. Good. My name is Ilse Varga. I need this case taken to Tessaly Relay Station, to a man called Pell Danner. Sixty thousand on delivery. No customs, no questions."',
      choices: [
        { t: '"What\'s in the case?"', to: 'b' },
        { t: '"Sixty thousand for one jump? Who\'s chasing you?"', to: 'c' },
        { t: '"Fine. I\'ll take it."', to: 'yes' },
        { t: '"Not interested."', act: 'decline', to: 'no' },
      ] },
    b: {
      who: 'Dr. Ilse Varga',
      text: '"Numbers. Very old, very boring numbers that a lot of people would very much like to stay boring." She smiles without any humour. "The less you know, the less anyone can pull out of you. Pell will know what to do with it."',
      choices: [{ t: '"And who would try to pull it out of me?"', to: 'c' }, { t: '"All right. Hand it over."', to: 'yes' }, { t: '"Find another pilot."', act: 'decline', to: 'no' }] },
    c: {
      who: 'Dr. Ilse Varga',
      text: 'She glances at the bar\'s door, then back at you. "I worked twelve years decoding signal archives for the Survey. Last week I decoded the wrong one. Since then two very polite men in grey Combine suits have been sitting in every café I visit." She pushes the case an inch toward you. "Tessaly is Federation space. You\'ll be fine."',
      choices: [{ t: '"I\'ve flown worse. Deal."', to: 'yes' }, { t: '"That sounds like your problem, not mine."', act: 'decline', to: 'no' }] },
    yes: {
      who: 'Dr. Ilse Varga',
      text: '"Thank you." The relief in her voice is real. "Tessaly Relay Station. Pell Danner. Don\'t open it, don\'t scan it, and don\'t stop for anyone." She is gone before you have finished stowing the case.',
      choices: [{ t: 'Plot a course for Tessaly.', act: 'accept' }] },
    no: {
      who: 'Dr. Ilse Varga',
      text: 'She nods, unsurprised, and stands. "If you change your mind, I\'ll be here a little longer. Not much longer."',
      choices: [{ t: 'Leave.', act: 'close' }] },
    },
    end: { a: {
      who: 'Tessaly Relay Station',
      text: 'Pell Danner\'s berth is sealed with yellow Security tape. A dock officer tells you, without much interest, that Danner\'s cabin depressurised two days ago. A tragic accident. Nobody has asked about his belongings.\n\nYour comm chimes as you walk back to your ship. The caller ID says only VANTA COMBINE — ASSET RECOVERY.',
      choices: [{ t: 'Answer it.', to: 'b' }, { t: 'Let it ring.', to: 'skip' }] },
    b: {
      who: 'Agent Sorel Quist',
      text: '"Captain. My name is Sorel Quist. I believe you are carrying a piece of Combine property that Dr. Varga removed from a Survey archive without authorisation." His voice is warm, reasonable, and completely certain. "I will pay you three hundred thousand to transfer it to my courier. You keep your ship, your licence and your health. Doctor Varga is not your concern."',
      choices: [
        { t: '"The case isn\'t for sale."', set: 'refused', to: 'r' },
        { t: '"Make it four hundred and we\'ll talk." (stall)', to: 's' },
        { t: '"Pell Danner had an accident. Should I expect one too?"', to: 'd' },
      ] },
    d: {
      who: 'Agent Sorel Quist',
      text: '"Accidents happen to people who make poor decisions, Captain. I am offering you a good one."',
      choices: [{ t: '"No deal."', set: 'refused', to: 'r' }, { t: '"Let me think about it." (stall)', to: 's' }] },
    s: {
      who: 'Agent Sorel Quist',
      text: 'There is a pause just long enough to be insulting. "You are stalling. I understand. Think quickly." The line goes dead. On your scanner, three ships detach from the traffic around the jump gate.',
      choices: [{ t: 'Head back to the ship.', act: 'close' }] },
    r: {
      who: 'Agent Sorel Quist',
      text: '"Then I have wasted a courtesy." The line clicks off. On your scanner, three ships detach from the traffic around the jump gate.',
      choices: [{ t: 'Head back to the ship.', act: 'close' }] },
    skip: {
      who: 'Tessaly Relay Station',
      text: 'The comm stops ringing. A moment later your scanner flags three ships breaking away from the traffic around the jump gate, Clan transponders badly disguised as freight haulers.',
      choices: [{ t: 'Head back to the ship.', act: 'close' }] },
    },
  },
  {
    id: 's2', title: 'Loose Ends', after: ['s1'], at: [P('tessaly', 'station')], pay: 90000,
    brief: 'Destroy the Clan recovery team Quist hired, then return to Tessaly Relay Station.',
    steps: [{ kill: { sys: 'tessaly', kinds: ['cutlass', 'raider', 'raider'], name: 'Recovery Team', anchor: 'jump' } }, { go: P('tessaly', 'station') }],
    offer: { a: {
      who: 'Tessaly Traffic Control',
      text: '"Captain, Traffic Control. We have three unregistered ships loitering near the jump gate and they\'ve requested your departure time twice. Nobody does that politely. Station Security is stretched thin. If you\'re going to deal with it, we\'ll pay the usual pest-control rate and look the other way."',
      choices: [{ t: '"I\'ll deal with them."', act: 'accept', to: 'go' }, { t: '"Not yet. I need to get ready."', act: 'decline', to: 'no' }] },
    go: { who: 'Tessaly Traffic Control', text: '"Understood. Marking them on your overview as RECOVERY TEAM. Good hunting."', choices: [{ t: 'Undock.', act: 'close' }] },
    no: { who: 'Tessaly Traffic Control', text: '"Copy. They\'re not going anywhere, and neither is that case of yours."', choices: [{ t: 'Close the channel.', act: 'close' }] },
    },
    end: { a: {
      who: 'Encrypted message',
      text: 'Back in your berth, a message is waiting in your inbox. It is text only, routed through four relays and signed with a single letter: V.\n\n"I heard about Pell. I am so sorry I dragged you into this. I\'m alive and hidden at Pellam Customs Station. Please bring the case. You deserve to know what you\'re carrying, and I can\'t finish this alone."',
      choices: [{ t: 'Read it again, then delete it.', act: 'close' }] },
    },
  },
  {
    id: 's3', title: 'The Varga Key', after: ['s2'], at: [P('tessaly', 'station')], pay: 50000,
    brief: 'Bring the data core to Dr. Varga at Pellam Customs Station.',
    steps: [{ go: P('pellam', 'station') }],
    offer: { a: {
      who: 'Your ship\'s computer',
      text: 'The data core sits in your cargo hold, humming faintly. Varga is waiting at Pellam Customs Station, one or two jumps away depending on your route. Quist knows your ship now.',
      choices: [{ t: 'Set course for Pellam.', act: 'accept' }, { t: 'Not yet.', act: 'decline' }] },
    },
    end: { a: {
      who: 'Dr. Ilse Varga',
      text: 'Varga has rented the cheapest cabin on the station. Cables run from the data core to a battered survey terminal, and columns of numbers scroll past faster than you can read.\n\n"It\'s a ledger," she says. "Combine payment records, eleven years of them. Every one is a transfer to a Clan warlord, paid the week before that clan raided a Federation convoy. The Combine is buying piracy, Captain, to make Federation lanes look unsafe so the colonies sign Combine security contracts."',
      choices: [{ t: '"Can you prove it?"', to: 'b' }, { t: '"Why would the Clans take Combine money?"', to: 'c' }] },
    b: {
      who: 'Dr. Ilse Varga',
      text: '"I can prove the money moved. I can\'t prove who spent it, not without someone powerful willing to look." She unplugs the core and holds it out to you. "There are two people who would want this badly enough to act: the Helion Navy, who lose ships to these raids, and the Clan Moot at Ruin, who would very much like to know which of their own have been sold."',
      choices: [{ t: '"We take it to the Navy at Aster."', set: 'navy', to: 'n' }, { t: '"We take it to the Clan Moot at Ruin."', set: 'clan', to: 'k' }] },
    c: {
      who: 'Dr. Ilse Varga',
      text: '"Some of them didn\'t. The ledger shows payments stopping, and those clans being wiped out a month later by the clans that did take it." She sighs. "The Combine isn\'t just buying raids. It\'s choosing which pirates survive."',
      choices: [{ t: '"Can you prove it?"', to: 'b' }] },
    n: { who: 'Dr. Ilse Varga', text: '"The Navy, then. Admiral Okafor commands at Aster Fleet Yards; she has lost more convoys than anyone. I\'ll send word ahead that you\'re coming."', choices: [{ t: '"Let\'s go."', act: 'close' }] },
    k: { who: 'Dr. Ilse Varga', text: '"The Moot." She laughs, a little shakily. "Mother Ilsk runs it from Ruin. She hates the Combine more than she hates the Navy, which is saying something. You\'ll have to pay to land. Everyone does."', choices: [{ t: '"Let\'s go."', act: 'close' }] },
    },
  },
  {
    id: 's4n', title: 'Navy Channels', after: ['s3'], need: 'navy', at: [P('pellam', 'station')], pay: 80000,
    brief: 'Take the ledger to Admiral Okafor at Aster Fleet Yards.',
    steps: [{ go: P('aster', 'shipyard') }],
    offer: { a: { who: 'Dr. Ilse Varga', text: '"Admiral Okafor is expecting you at Aster Fleet Yards. I\'ll stay out of sight here. The fewer people who see us together, the better."', choices: [{ t: 'Plot a course to Aster.', act: 'accept' }, { t: '"Give me a little time."', act: 'decline' }] } },
    end: { a: {
      who: 'Admiral Nkem Okafor',
      text: 'The Admiral\'s office overlooks a dry dock where a half-built cruiser hangs in its cradle. She reads the ledger summary twice, without expression, then sets it face down.\n\n"Eleven years. Forty-one convoys." She looks up. "This is enough to start an inquiry. It is not enough to stop one being buried. I need a living link between Combine money and a Clan gun."',
      choices: [{ t: '"Who?"', to: 'b' }, { t: '"With respect, Admiral, isn\'t that your job?"', to: 'c' }] },
    c: { who: 'Admiral Nkem Okafor', text: '"It is. And the moment a Navy warship enters Clan space, the Combine\'s friends in the Senate call it an act of war. You, Captain, are nobody. That is extremely useful."', choices: [{ t: '"Who do you need?"', to: 'b' }] },
    b: { who: 'Admiral Nkem Okafor', text: '"A go-between called Saffron Jax. Every payment in that ledger passes through his accounts. He runs a Reaver out of Sarn with a couple of gunboats for company. Bring me his flight recorder, which means destroying his ship, and I can take this to the Senate."', choices: [{ t: '"Consider it done."', act: 'close' }] },
    },
  },
  {
    id: 's5n', title: 'Saffron Jax', after: ['s4n'], at: [P('aster', 'shipyard')], pay: 450000,
    brief: 'Destroy Saffron Jax\'s Reaver and its escorts in Sarn, then return to Admiral Okafor at Aster Fleet Yards.',
    steps: [{ kill: { sys: 'sarn', kinds: ['reaver', 'cutlass', 'cutlass'], name: 'Saffron Jax', anchor: 'belt' } }, { go: P('aster', 'shipyard') }],
    offer: { a: { who: 'Admiral Nkem Okafor', text: '"Jax will be in Sarn. He likes to hold court near the belts there. Officially, the Navy has never heard of you. Unofficially, there are four hundred and fifty thousand reasons to come back alive."', choices: [{ t: '"I\'ll bring you his recorder."', act: 'accept' }, { t: '"I need to refit first."', act: 'decline' }] } },
    end: { a: {
      who: 'Admiral Nkem Okafor',
      text: 'Okafor plays a few seconds of the recovered flight recorder: Saffron Jax laughing, a second voice reading out account numbers in a calm Combine accent. She stops it.\n\n"That second voice is Sorel Quist. We have him." For the first time, she almost smiles. "Which means he knows we have him. Watch your back, Captain."',
      choices: [{ t: '"I always do."', act: 'close' }] },
    },
  },
  {
    id: 's4c', title: 'The Clan Moot', after: ['s3'], need: 'clan', at: [P('pellam', 'station')], pay: 80000,
    brief: 'Take the ledger to Mother Ilsk at the Ruin Clan Moot. The port charges a landing bribe.',
    steps: [{ go: P('ruin', 'den') }],
    offer: { a: { who: 'Dr. Ilse Varga', text: '"Ruin is three jumps of very bad neighbourhood. Land at the Clan Moot, pay whatever they ask, and ask for Mother Ilsk by name. Don\'t mention the Navy."', choices: [{ t: 'Plot a course to Ruin.', act: 'accept' }, { t: '"Give me a little time."', act: 'decline' }] } },
    end: { a: {
      who: 'Mother Ilsk',
      text: 'The Moot is a hollowed asteroid lined with salvaged hull plates, each one painted with a clan sigil. Mother Ilsk is small, grey and missing three fingers, and the hall goes quiet when she speaks.\n\n"So. Somebody finally brought me proof." She runs a finger down the list of clan names. Several have been crossed out in red, by hand, long before you arrived. "Twelve clans dead because they wouldn\'t take Vanta coin. I buried some of those children myself."',
      choices: [{ t: '"What will you do?"', to: 'b' }, { t: '"I want paying for this."', to: 'c' }] },
    c: { who: 'Mother Ilsk', text: 'She laughs, a dry rattle. "Of course you do. You\'ll be paid when you\'ve earned it, Federation."', choices: [{ t: '"Then tell me how to earn it."', to: 'b' }] },
    b: { who: 'Mother Ilsk', text: '"The Combine pays its clans through a paymaster ship that runs out of Quell under Clan colours. Kill it, and every clan on the take learns the money has stopped. Kill it in front of witnesses, and they learn who stopped it."', choices: [{ t: '"Where in Quell?"', act: 'close' }] },
    },
  },
  {
    id: 's5c', title: 'The Paymaster', after: ['s4c'], at: [P('ruin', 'den')], pay: 450000,
    brief: 'Destroy the Combine paymaster and its escorts in Quell, then return to Mother Ilsk at the Ruin Clan Moot.',
    steps: [{ kill: { sys: 'quell', kinds: ['reaver', 'raider', 'raider'], name: "Paymaster's Escort", anchor: 'belt' } }, { go: P('ruin', 'den') }],
    offer: { a: { who: 'Mother Ilsk', text: '"The paymaster flies a Reaver with two raiders for company and keeps near the Quell belts. Bring back the war chest it carries and half of it is yours."', choices: [{ t: '"Done."', act: 'accept' }, { t: '"Not yet."', act: 'decline' }] } },
    end: { a: {
      who: 'Mother Ilsk',
      text: 'By the time you land, the news has beaten you to Ruin. Three clans have already sent envoys to the Moot. Two others have gone quiet and dark.\n\n"You did well, Federation," Mother Ilsk says. "Too well. A man called Quist has put a price on your ship that would buy this asteroid. Be careful who you drink with."',
      choices: [{ t: '"I\'ll manage."', act: 'close' }] },
    },
  },
  {
    id: 's6', title: "Vanta's Answer", afterAny: ['s5n', 's5c'], at: [P('aster', 'shipyard'), P('ruin', 'den')], pay: 600000,
    brief: 'A Combine-hired warlord is hunting you in Bastide. Destroy it, then meet Dr. Varga at Ardent Relay Station in Kaltos.',
    steps: [{ kill: { sys: 'bastide', kinds: ['ravager', 'reaver', 'cutlass'], name: 'Quist\'s Hunter', anchor: 'jump' } }, { go: P('kaltos', 'station') }],
    offer: { a: {
      who: 'Encrypted message',
      text: '"Captain. V again. Quist has stopped being subtle. He has hired a Ravager, a full Clan warlord battleship, and it is sitting in Bastide waiting for you, because Bastide is the route between me and everyone else. Finish this and come back to Kaltos. I will be at Ardent Relay, where we started. — V"',
      choices: [{ t: 'Head for Bastide.', act: 'accept' }, { t: 'Not yet. Refit first.', act: 'decline' }] },
    },
    end: { a: {
      who: 'Dr. Ilse Varga',
      text: 'Varga is sitting at the same table where she first found you, with two drinks in front of her. She pushes one across.\n\n"Quist\'s battleship is scrap, Quist himself has been recalled to Vanta Prime, and I have every page of the ledger copied six times over." She raises her glass. "There\'s just one decision left, and I think it should be yours."',
      choices: [{ t: '"Go on."', act: 'close' }] },
    },
  },
  {
    id: 's7', title: 'The Ledger', after: ['s6'], at: [P('kaltos', 'station')],
    brief: 'Decide what happens to the ledger.',
    steps: [],
    offer: { a: {
      who: 'Dr. Ilse Varga',
      text: '"We can publish everything, on every public relay, all at once. The Combine will deny it, the Senate will fight for a year, and the raids will slow down." She turns her glass slowly. "Or we can sell the original back to the Combine. They\'ll pay a fortune for it and stop paying the Clans for a while, just to be safe. Nobody would ever know."',
      choices: [
        { t: '"Publish it. All of it."', set: 'published', pay: 250000, to: 'pub' },
        { t: '"Sell it back. We\'ve earned it."', set: 'sold', pay: 1500000, to: 'sell' },
      ] },
    pub: { who: 'Dr. Ilse Varga', text: 'She smiles and touches a key. Across thirty systems, a hundred public relays begin scrolling the same columns of numbers.\n\n"The Survey sent me a bonus, believe it or not. Half of it is yours." She stands, leaving her drink. "Thank you, Captain. Look me up if you ever need someone to read the wrong archive."\n\nTHE END — for now.', choices: [{ t: 'Finish your drink.', act: 'accept' }] },
    sell: { who: 'Dr. Ilse Varga', text: 'Her smile fades a little, but she nods. A Combine courier arrives within the hour, polite and grey-suited, and a very large sum appears in your account.\n\n"Pell would have hated this," she says quietly. "But Pell is dead, and we\'re not." She leaves without finishing her drink.\n\nTHE END — for now.', choices: [{ t: 'Finish your drink.', act: 'accept' }] },
    },
  },
];
export const MISSION = Object.fromEntries(MISSIONS.map((m) => [m.id, m]));

// ---------------------------------------------------------------- conversation panel
let el = null, keyFn = null;
export const convOpen = () => !!el;

function esc(s) { return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

// Plays a conversation tree; onChoice(choice) applies effects and returns false to stop the conversation.
export function playConv(title, tree, flags, onChoice, onEnd) {
  closeConv();
  el = document.createElement('div');
  el.id = 'conv';
  document.body.appendChild(el);
  const show = (key) => {
    const n = tree[key];
    const ch = n.choices.filter((c) => (!c.if || flags[c.if]) && (!c.ifnot || !flags[c.ifnot]));
    el.innerHTML = `<div class="cbox"><div class="ctitle">${esc(title)}</div><div class="cwho">${esc(n.who)}</div>
      <div class="ctext">${n.text.split('\n\n').map((p) => `<p>${esc(p)}</p>`).join('')}</div>
      <div class="cchoices">${ch.map((c, i) => `<button data-i="${i}"><span class="cn">${i + 1}</span>${esc(c.t)}</button>`).join('')}</div></div>`;
    const pick = (i) => {
      const c = ch[i];
      if (!c) return;
      const go = onChoice(c);
      if (c.to && go !== false) show(c.to);
      else { closeConv(); onEnd?.(c); }
    };
    el.querySelectorAll('button').forEach((b) => { b.onclick = () => pick(+b.dataset.i); });
    keyFn = (ev) => {
      ev.stopPropagation(); ev.stopImmediatePropagation();
      const d = /^Digit([1-9])$/.exec(ev.code) || /^Numpad([1-9])$/.exec(ev.code);
      if (d && !ev.repeat) pick(+d[1] - 1);
    };
  };
  window.addEventListener('keydown', onKey, true);
  show('a');
}
function onKey(ev) { keyFn?.(ev); }
export function closeConv() {
  if (!el) return;
  el.remove(); el = null; keyFn = null;
  window.removeEventListener('keydown', onKey, true);
}

// ---------------------------------------------------------------- mission state
export function newStory() { return { done: [], active: null, step: 0, flags: {} }; }
export function loadStory(s) {
  const o = newStory();
  if (!s || typeof s !== 'object') return o;
  o.done = Array.isArray(s.done) ? s.done.filter((x) => MISSION[x]) : [];
  if (s.active && MISSION[s.active] && !o.done.includes(s.active)) { o.active = s.active; o.step = Math.max(0, Math.min(MISSION[s.active].steps.length, Number(s.step) || 0)); }
  o.flags = s.flags && typeof s.flags === 'object' ? { ...s.flags } : {};
  return o;
}
export const curStep = (S) => (S.active ? MISSION[S.active].steps[S.step] || null : null);

export function available(S, here) {
  if (S.active) return null;
  return MISSIONS.find((m) => !S.done.includes(m.id) && m.at.includes(here)
    && (!m.after || m.after.every((x) => S.done.includes(x)))
    && (!m.afterAny || m.afterAny.some((x) => S.done.includes(x)))
    && (!m.need || S.flags[m.need])) || null;
}
