export default class Team {
  constructor() {
    this.members = new Set();
  }

  add(character) {
    if (this.members.has(character)) throw new Error('This character is already in the team!');
    this.members.add(character);
  }

  addAll(characterList) {
    this.members = new Set([...this.members, ...characterList]);
  }

  toArray() {
    return [...this.members];
  }

  [Symbol.iterator]() {
    const members = this.toArray();
    let current = 0;
    const last = members.length;

    return {
      next() {
        if (current < last) {
          const valueCurrent = members[current];
          current += 1;
          return {
            done: false,
            value: valueCurrent,
          };
        }
        return {
          done: true,
        };
      },
    };
  }
}
