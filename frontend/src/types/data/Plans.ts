import { v4 as uuidv4 } from 'uuid'
import { bosses } from './Raid'

export const plans = [
	{
		boss: bosses[0],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 17, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 51, cooldowns: [], id: uuidv4() },
			{ spellName: '80% Hp AOE', time: 63, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 94, cooldowns: [], id: uuidv4() },
			{ spellName: '60% Hp AOE', time: 123, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 138, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 172, cooldowns: [], id: uuidv4() },
			{ spellName: '40% Hp AOE', time: 183, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 216, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 250, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 284, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 291, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 327, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE', time: 364, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[1],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield x 2', time: 29, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield x 2', time: 35, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs', time: 45, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 85, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 91, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Right)', time: 101, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 141, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 147, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Left)', time: 157, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 185, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 191, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Right)', time: 201, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 241, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 247, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Left)', time: 257, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 285, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 291, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Right)', time: 301, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 341, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 347, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Left)', time: 357, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Shield', time: 357, cooldowns: [], id: uuidv4() },
			{ spellName: 'Debuffs(Left)', time: 357, cooldowns: [], id: uuidv4() },
			{ spellName: 'Phase 2', time: 357, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 375, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 411, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 448, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 484, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 520, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[2],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'Void Run Away Dmg', time: 38, cooldowns: [], id: uuidv4() },
			{ spellName: 'Fire Meteor Soak', time: 40, cooldowns: [], id: uuidv4() },
			{ spellName: 'Void Run Away Dmg', time: 74, cooldowns: [], id: uuidv4() },
			{ spellName: 'Fire Meteor Soak', time: 76, cooldowns: [], id: uuidv4() },
			{ spellName: 'Void Run Away Dmg', time: 109, cooldowns: [], id: uuidv4() },
			{ spellName: 'Fire Meteor Soak', time: 111, cooldowns: [], id: uuidv4() },
			{ spellName: 'Void Run Away Dmg', time: 111, cooldowns: [], id: uuidv4() },
			{ spellName: 'Fire Meteor Soak', time: 111, cooldowns: [], id: uuidv4() },
			{ spellName: 'Void Run Away Dmg', time: 111, cooldowns: [], id: uuidv4() },
			{ spellName: 'Fire Meteor Soak', time: 111, cooldowns: [], id: uuidv4() },
			{ spellName: 'Phase 2', time: 120, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 161, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 207, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 254, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 300, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 346, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 392, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 438, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 484, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[3],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 9, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris Dot', time: 21, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 46, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris Dot', time: 55, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 68, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 91, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris Dot', time: 100, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 114, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 137, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris Dot', time: 137, cooldowns: [], id: uuidv4() },
			{ spellName: 'Neldris AOE', time: 137, cooldowns: [], id: uuidv4() },
			{ spellName: 'Phase 2', time: 137, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion Debuff', time: 148, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion AOE 8 sec', time: 170, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion Debuff', time: 187, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion Debuff', time: 214, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion AOE 8 sec', time: 238, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion Debuff', time: 250, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion Debuff', time: 250, cooldowns: [], id: uuidv4() },
			{ spellName: 'Thadrion AOE 8 sec', time: 250, cooldowns: [], id: uuidv4() },
			{ spellName: 'Phase 2', time: 250, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Ball', time: 266, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Breath', time: 283, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Beam', time: 300, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Ball', time: 313, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Breath', time: 325, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Beam', time: 344, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Ball', time: 356, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Breath', time: 369, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Beam', time: 388, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Ball', time: 400, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Breath', time: 412, cooldowns: [], id: uuidv4() },
			{ spellName: 'Rionthus Beam', time: 431, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[4],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 14, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 26, cooldowns: [], id: uuidv4() },
			{ spellName: 'Soaks Run', time: 41, cooldowns: [], id: uuidv4() },
			{ spellName: 'Soak', time: 49, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 57, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 69, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 90, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal Bait', time: 98, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 0/20 sec', time: 105, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 5/20 sec', time: 110, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 10/20 sec', time: 115, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 15/20 sec', time: 120, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission End', time: 125, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 141, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 153, cooldowns: [], id: uuidv4() },
			{ spellName: 'Soaks Run', time: 168, cooldowns: [], id: uuidv4() },
			{ spellName: 'Soak', time: 176, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 184, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 196, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 217, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal Bait', time: 225, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 0/20 sec', time: 232, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 5/20 sec', time: 238, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 10/20 sec', time: 242, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission 15/20 sec', time: 248, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission End', time: 251, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 267, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 279, cooldowns: [], id: uuidv4() },
			{ spellName: 'Soaks Run', time: 294, cooldowns: [], id: uuidv4() },
			{ spellName: 'Soak', time: 302, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 310, cooldowns: [], id: uuidv4() },
			{ spellName: 'Meteor Soak', time: 322, cooldowns: [], id: uuidv4() },
			{ spellName: 'Jump AOE', time: 343, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal Bait', time: 351, cooldowns: [], id: uuidv4() },
			{ spellName: 'Enrage', time: 360, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[5],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 13, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 53, cooldowns: [], id: uuidv4() },
			{ spellName: 'Run Away', time: 58, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 93, cooldowns: [], id: uuidv4() },
			{ spellName: 'Run Away', time: 131, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 133, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 173, cooldowns: [], id: uuidv4() },
			{ spellName: 'Run Away', time: 204, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 213, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 253, cooldowns: [], id: uuidv4() },
			{ spellName: 'Run Away', time: 276, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 292, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 332, cooldowns: [], id: uuidv4() },
			{ spellName: 'Run Away', time: 349, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 372, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock AOE Dot', time: 412, cooldowns: [], id: uuidv4() },
			{ spellName: 'Run Away', time: 415, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[6],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 11, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 33, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 51, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 61, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock Dmg', time: 81, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 96, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 103, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 125, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 147, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 165, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 174, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock Dmg', time: 194, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 209, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 217, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 238, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 260, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 278, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 288, cooldowns: [], id: uuidv4() },
			{ spellName: 'Knock Dmg', time: 307, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 322, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 330, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 351, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 373, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE + Soaks', time: 391, cooldowns: [], id: uuidv4() },
			{ spellName: 'Frontal', time: 401, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[7],
		rows: [
			{ spellName: 'On Pull', time: 3, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 16, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 35, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 50, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 69, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 84, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 103, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 118, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 118, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 118, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 118, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 118, cooldowns: [], id: uuidv4() },
			{ spellName: 'Intermission', time: 120, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 10 sec', time: 127, cooldowns: [], id: uuidv4() },
			{ spellName: 'Phase 2', time: 137, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 155, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 164, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 186, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 193, cooldowns: [], id: uuidv4() },
			{ spellName: 'AOE Hit', time: 215, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 221, cooldowns: [], id: uuidv4() },
			{ spellName: 'Phase 3', time: 221, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 273, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 289, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 303, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 319, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 333, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 349, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 363, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 379, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 393, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 409, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 423, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 439, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 453, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 469, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 483, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 499, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 513, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 529, cooldowns: [], id: uuidv4() },
			{ spellName: 'Break Walls', time: 543, cooldowns: [], id: uuidv4() },
			{ spellName: 'Dot 15 sec', time: 559, cooldowns: [], id: uuidv4() },
		],
	},
	{
		boss: bosses[8],
		rows: [],
	},
]
