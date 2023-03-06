enum MenuState {
  auth = 'auth',
  pin = 'pin',
  profile = 'profile',
}

const menuStateNumb: Record<string, number> = {
  [MenuState.auth]: 0,
  [MenuState.pin]: 1,
  [MenuState.profile]: 2,
};

export { MenuState, menuStateNumb };
