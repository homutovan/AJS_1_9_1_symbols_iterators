import characterFabric, { Person, params } from '../person';

const testCharacters = [
  {
    type: 'Magician', name: 'Merlin', range: -5, stoned: false, attack: 10,
  },
  {
    type: 'Magician', name: 'Merlin', range: 0, stoned: false, attack: 10,
  },
  {
    type: 'Magician', name: 'Merlin', range: 1, stoned: false, attack: 10,
  },
  {
    type: 'Magician', name: 'Merlin', range: 6, stoned: false, attack: 5,
  },
  {
    type: 'Magician', name: 'Merlin', range: 11, stoned: false, attack: 0,
  },
  {
    type: 'Magician', name: 'Merlin', range: 15, stoned: false, attack: 0,
  },
  {
    type: 'Magician', name: 'Merlin', range: -5, stoned: true, attack: 10,
  },
  {
    type: 'Magician', name: 'Merlin', range: 0, stoned: true, attack: 10,
  },
  {
    type: 'Magician', name: 'Merlin', range: 1, stoned: true, attack: 10,
  },
  {
    type: 'Magician', name: 'Merlin', range: 2, stoned: true, attack: 4,
  },
  {
    type: 'Magician', name: 'Merlin', range: 2, stoned: 'true', attack: 9,
  },
  {
    type: 'Magician', name: 'Merlin', range: 6, stoned: true, attack: 0,
  },
  {
    type: 'Magician', name: 'Merlin', range: 11, stoned: true, attack: 0,
  },
  {
    type: 'Magician', name: 'Merlin', range: 15, stoned: true, attack: 0,
  },
];

test.each(testCharacters)(('Test №%#: check attack for range and stoned: %p'),
  ({
    type, name, range, stoned, attack,
  }) => {
    const character = characterFabric(name, type, Person);
    character.range = range;
    character.stoned = stoned;
    expect(attack).toBe(character.attack);
  });

test('checking the name is too short', () => {
  expect(() => {
    const character = characterFabric('J', 'Zombie', Person);
  }).toThrow('the name must not be shorter than 2 characters!');
});

test('checking a name that is too long', () => {
  expect(() => {
    const character = characterFabric('Jhon Lennon', 'Bowman', Person);
  }).toThrow('the name must not be longer than 10 characters!');
});

test('checking a name that is too long', () => {
  expect(() => {
    const character = characterFabric(123, 'Bowman', Person);
  }).toThrow('the name must be of the string type!');
});

test('checking a uncorrect type', () => {
  expect(() => {
    const character = characterFabric('John', 'Wizard', Person);
  }).toThrow('the type must be from Bowman, Swordsman, Wizard, Daemon, Undead, Zombie');
});

test('checking a name', () => {
  const character = characterFabric('John', 'Undead', Person);
  expect('John').toBe(character.name);
});

test('checking a type', () => {
  const character = characterFabric('John', 'Undead', Person);
  expect('Undead').toBe(character.type);
});


test.each(Object.entries(params))(('check params up 1LVL: type=%s, expects: %s *1.2'), (type, param) => {
  const character = characterFabric('Merlin', type, Person);
  character.levelUp();
  let { attack, defense } = param;
  attack = Math.ceil(attack * 1.2);
  defense = Math.ceil(defense * 1.2);
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...{ attack, defense }, ...{ level: 2, health: 100 } });
});

test.each(Object.entries(params))(('check params gup 2LVL: type=%s, expects: %s *1.44'), (type, param) => {
  const character = characterFabric('Merlin', type, Person);
  character.levelUp();
  character.levelUp();
  let { attack, defense } = param;
  attack = Math.ceil(attack * 1.2 * 1.2);
  defense = Math.ceil(defense * 1.2 * 1.2);
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...{ attack, defense }, ...{ level: 3, health: 100 } });
});

test.each(Object.entries(params))(('check damage 50%: type=%s'), (type, param) => {
  const character = characterFabric('Merlin', type, Person);
  const point = 5000 / (100 - param.defense);
  character.damage(point);
  expect(character.health).toBeCloseTo(50);
});
