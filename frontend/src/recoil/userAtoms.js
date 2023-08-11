import { atom } from 'recoil';

export const userCoursesState = atom({
    key: 'userCoursesState',
    default: [],
});

export const userIsLoggedInState = atom({
    key: 'userIsLoggedInState',
    default: false,
});
