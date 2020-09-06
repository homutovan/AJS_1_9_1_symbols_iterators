export const params = {
  Bowman: {
    attack: 25,
    defense: 25,
  },
  Swordsman: {
    attack: 40,
    defense: 10,
  },
  Magician: {
    attack: 10,
    defense: 40,
  },
  Undead: {
    attack: 25,
    defense: 25,
  },
  Zombie: {
    attack: 40,
    defense: 10,
  },
  Daemon: {
    attack: 10,
    defense: 40,
  },
};

export class Person {
  constructor(name) {
    this.name = name;
    this.stoned = false;
    this.range = 1;
    this.stonedMod = 0;
    this.rangeMod = 1;
  }

  set stoned(value) {
    if (typeof value !== 'boolean') return;
    this._stoned = value;
    this.setMod();
  }

  get stoned() {
    return this._stoned;
  }

  set range(value) {
    this._range = (value > 0) ? value : 1;
    this.setMod();
  }

  get range() {
    return this._range;
  }

  setMod() {
    this.rangeMod = (11 - this.range) / 10;
    this.stonedMod = this.stoned ? Math.log2(this.range) * 5 : 0;
  }

  set attack(value) {
    this._attack = value;
  }

  get attack() {
    const attack = this._attack * this.rangeMod - this.stonedMod;
    return (attack > 0) ? Math.ceil(attack) : 0;
  }

  set name(value) {
    if (typeof value !== 'string') throw new Error('the name must be of the string type!');
    if (value.length < 2) throw new Error('the name must not be shorter than 2 characters!');
    if (value.length > 10) throw new Error('the name must not be longer than 10 characters!');
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set type(value) {
    if (!(value in params)) throw new Error('the type must be from Bowman, Swordsman, Wizard, Daemon, Undead, Zombie');
    this.health = 100;
    this.level = 1;
    if (value) ({ attack: this.attack, defense: this.defense } = params[value]);
    this._type = value;
  }

  get type() {
    return this._type;
  }

  set defense(value) {
    this._defense = value;
  }

  get defense() {
    return Math.ceil(this._defense);
  }

  levelUp() {
    if (this.health === 0) throw new Error('it is impossible to raise the level of a dead character!');
    this.level += 1;
    this.attack *= 1.2;
    this.defense *= 1.2;
    this.health = 100;
  }

  damage(points) {
    const damage = points * (1 - this.defense / 100);
    this.health -= damage;
    if (this.health < 0.01) this.health = 0;
  }
}

function typeFabric(type, parent) {
  return class extends parent {
    constructor(name) {
      super(name);
      this.type = type;
    }
  };
}

export default function characterFabric(name, type, parent) {
  const SpecCharachter = typeFabric(type, parent);
  return new SpecCharachter(name);
}
