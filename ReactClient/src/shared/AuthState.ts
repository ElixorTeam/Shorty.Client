enum AuthState {
  auth = 'auth',
  pin = 'pin',
}

const authStateNumb: Record<string, number> = {
  [AuthState.auth]: 0,
  [AuthState.pin]: 1,
};

export { AuthState, authStateNumb };
