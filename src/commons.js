import fetch from 'isomorphic-fetch';

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const retrieveAllAthletes = async () => {
  try {
    const data = await fetch('http://localhost:8080/data/athletes.json');
    const athletes = await data.json();
    return athletes;
  } catch (e) {
    return new Error('Failed to fetch athletes - ' + e.message);
  }
};

export const retrieveSelectedAthlete = async (id) => {
  try {
    const data = await fetch('http://localhost:8080/data/athletes.json');
    const athletes = await data.json();
    return athletes.find(athlete => athlete.id === id);
  } catch (e) {
    return new Error('Failed to fetch selected athlete - ' + e.message);
  }
};
