from django.db import models
from django.utils.translation import gettext as _

class CharacterRole(models.TextChoices):
	TANK = 'tank', _('Tank')
	HEALER = 'healer', _('Healer')
	DAMAGE = 'damage', _('Damage')

class CharacterClass(models.TextChoices):
    WARLOCK = 'warlock', _('Warlock')
    MAGE = 'mage', _('Mage')
    ROGUE = 'rogue', _('Rogue')
    WARRIOR = 'warrior', _('Warrior')
    PRIEST = 'priest', _('Priest')
    DRUID = 'druid', _('Druid')
    HUNTER = 'hunter', _('Hunter')
    SHAMAN = 'shaman', _('Shaman')
    PALADIN = 'paladin', _('Paladin')
    DEATH_KNIGHT = 'death_knight', _('Death Knight')
    MONK = 'monk', _('Monk')
    DEMON_HUNTER = 'demon_hunter', _('Demon Hunter')
    EVOKER = 'evoker', _('Evoker')

class CharacterSpec(models.TextChoices):
    # Warlock Specializations
    AFFLICTION = 'affliction', _('Affliction Warlock')
    DEMONOLOGY = 'demonology', _('Demonology Warlock')
    DESTRUCTION = 'destruction', _('Destruction Warlock')

    # Mage Specializations
    ARCANE = 'arcane', _('Arcane Mage')
    FIRE = 'fire', _('Fire Mage')
    FROST = 'frost', _('Frost Mage')

    # Rogue Specializations
    ASSASSINATION = 'assassination', _('Assassination Rogue')
    OUTLAW = 'outlaw', _('Outlaw Rogue')
    SUBTLETY = 'subtlety', _('Subtlety Rogue')

    # Warrior Specializations
    ARMS = 'arms', _('Arms Warrior')
    FURY = 'fury', _('Fury Warrior')
    PROTECTION = 'protection', _('Protection Warrior')

    # Priest Specializations
    DISCIPLINE = 'discipline', _('Discipline Priest')
    HOLY = 'holy', _('Holy Priest')
    SHADOW = 'shadow', _('Shadow Priest')

    # Druid Specializations
    BALANCE = 'balance', _('Balance Druid')
    FERAL = 'feral', _('Feral Druid')
    GUARDIAN = 'guardian', _('Guardian Druid')
    RESTORATION = 'restoration', _('Restoration Druid')

    # Hunter Specializations
    BEAST_MASTERY = 'beast_mastery', _('Beast Mastery Hunter')
    MARKSMANSHIP = 'marksmanship', _('Marksmanship Hunter')
    SURVIVAL = 'survival', _('Survival Hunter')

    # Shaman Specializations
    ELEMENTAL = 'elemental', _('Elemental Shaman')
    ENHANCEMENT = 'enhancement', _('Enhancement Shaman')
    RESTORATION_SHAMAN = 'restoration_shaman', _('Restoration Shaman')

    # Paladin Specializations
    HOLY_PALADIN = 'holy_paladin', _('Holy Paladin')
    PROTECTION_PALADIN = 'protection_paladin', _('Protection Paladin')
    RETRIBUTION = 'retribution', _('Retribution Paladin')

    # Death Knight Specializations
    BLOOD = 'blood', _('Blood Death Knight')
    FROST_DEATH_KNIGHT = 'frost_death_knight', _('Frost Death Knight')
    UNHOLY = 'unholy', _('Unholy Death Knight')

    # Monk Specializations
    BREWMASTER = 'brewmaster', _('Brewmaster Monk')
    MISTWEAVER = 'mistweaver', _('Mistweaver Monk')
    WINDWALKER = 'windwalker', _('Windwalker Monk')

    # Demon Hunter Specializations
    HAVOC = 'havoc', _('Havoc Demon Hunter')
    VENGEANCE = 'vengeance', _('Vengeance Demon Hunter')