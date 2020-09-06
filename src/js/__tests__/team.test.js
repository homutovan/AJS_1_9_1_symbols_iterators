import characterFabric, { Person, params } from '../person';
import Team from '../team';

const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
const types = Object.keys(params);
const names = ['Jack', 'Oliver', 'James', 'Charlie', 'Harris', 'Lewis'];
const characterVars = zip(names, types);
const characters = characterVars.map((vars) => characterFabric(...vars, Person));

test('Test case 1: cadding two identical characters', () => {
  expect(() => {
    const team = new Team();
    team.add(characters[0]);
    team.add(characters[0]);
  }).toThrow('This character is already in the team!');
});

test('Test case 2: cadding two identical characters', () => {
  expect(() => {
    const team = new Team();
    team.add(characters[0]);
    team.add(characters[1]);
    team.add(characters[0]);
  }).toThrow('This character is already in the team!');
});

test('Test case 3: adding different characters', () => {
  const team = new Team();
  team.add(characters[1]);
  team.add(characters[2]);
  team.add(characters[3]);
  expect(team.members.size).not.toBe(2);
});

test('Test case 4: adding different characters', () => {
  const team = new Team();
  team.add(characters[1]);
  team.add(characters[2]);
  team.add(characters[3]);
  expect(team.members.size).toBe(3);
});

test('Test case 5: checking an empty command', () => {
  const team = new Team();
  expect(team.members.size).toBe(0);
});

test('Test case 6: checking an empty command', () => {
  const team = new Team();
  expect(team.members.size).not.toBe(1);
});

test('Test case 7: multiple character additions', () => {
  const team = new Team();
  team.addAll(characters);
  expect(team.members.size).toBe(6);
});

test('Test case 8: multiple character additions', () => {
  const team = new Team();
  team.addAll([...characters, characters[0]]);
  expect(team.members.size).toBe(6);
});

test('Test case 9: multiple character additions', () => {
  const team = new Team();
  team.addAll([...characters, characters[0]]);
  expect(team.members.size).not.toBe(7);
});

test('Test case 10: checking method toArray', () => {
  const team = new Team();
  team.addAll(characters);
  expect(team.toArray()).not.toEqual([characters[3], characters[4], characters[5]]);
});

test('Test case 11: checking method toArray', () => {
  const team = new Team();
  team.addAll([characters[3], characters[4], characters[5]]);
  expect(team.toArray()).toEqual([characters[3], characters[4], characters[5]]);
});

test('Test case 12: checking method toArray', () => {
  const team = new Team();
  team.addAll(characters);
  expect(team.toArray()).toEqual(characters);
});

test('Test case 13: checking uterator', () => {
  const team = new Team();
  team.addAll(characters);
  expect([...team][0]).toEqual(characters[0]);
});

test('Test case 14: checking uterator', () => {
  const team = new Team();
  team.addAll(characters);
  expect([...team][6]).toEqual(characters[6]);
});
