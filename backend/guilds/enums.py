from django.db import models
from django.utils.translation import gettext as _

class CharacterRole(models.TextChoices):
    TANK = 'tank', _('Tank')
    HEALER = 'healer', _('Healer')
    DAMAGE = 'melee', _('Melee DPS')
    RANGED = 'ranged', _('Ranged DPS')

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
    AFFLICTION = 'affliction', _('Affliction')
    DEMONOLOGY = 'demonology', _('Demonology')
    DESTRUCTION = 'destruction', _('Destruction')

    # Mage Specializations
    ARCANE = 'arcane', _('Arcane')
    FIRE = 'fire', _('Fire')
    FROST = 'frost', _('Frost')

    # Rogue Specializations
    ASSASSINATION = 'assassination', _('Assassination')
    OUTLAW = 'outlaw', _('Outlaw')
    SUBTLETY = 'subtlety', _('Subtlety')

    # Warrior Specializations
    ARMS = 'arms', _('Arms')
    FURY = 'fury', _('Fury')
    PROTECTION = 'protection', _('Protection')

    # Priest Specializations
    DISCIPLINE = 'discipline', _('Discipline')
    HOLY = 'holy', _('Holy')
    SHADOW = 'shadow', _('Shadow')

    # Druid Specializations
    BALANCE = 'balance', _('Balance')
    FERAL = 'feral', _('Feral')
    GUARDIAN = 'guardian', _('Guardian')
    RESTORATION = 'restoration', _('Restoration')

    # Hunter Specializations
    BEAST_MASTERY = 'beast_mastery', _('Beast Mastery')
    MARKSMANSHIP = 'marksmanship', _('Marksmanship')
    SURVIVAL = 'survival', _('Survival')

    # Shaman Specializations
    ELEMENTAL = 'elemental', _('Elemental')
    ENHANCEMENT = 'enhancement', _('Enhancement')

    # Paladin Specializations
    RETRIBUTION = 'retribution', _('Retribution')

    # Death Knight Specializations
    BLOOD = 'blood', _('Blood')
    UNHOLY = 'unholy', _('Unholy')

    # Monk Specializations
    BREWMASTER = 'brewmaster', _('Brewmaster')
    MISTWEAVER = 'mistweaver', _('Mistweaver')
    WINDWALKER = 'windwalker', _('Windwalker')

    # Demon Hunter Specializations
    HAVOC = 'havoc', _('Havoc')
    VENGEANCE = 'vengeance', _('Vengeance')

class BossRosterCharacterStatus(models.TextChoices):
    IN = 'in', _('In')
    BENCH = 'bench', _('Bench')