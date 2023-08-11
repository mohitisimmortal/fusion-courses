import { atom } from 'recoil';

export const adminCoursesState = atom({
    key: 'adminCoursesState',
    default: [],
});

export const adminIsLoggedInState = atom({
    key: 'adminIsLoggedInState',
    default: false,
});
