# Little Lemon App

Three screens, one native-stack navigator:

- **Onboarding** — Name + Email form (regex-validated), shown only when no user is stored yet.
- **Home** — Restaurant hero + menu list. Tapping the avatar in the header goes to Profile.
- **Profile** — Editable personal info, notification checkboxes, Save/Discard/Log out.

## How navigation is decided

`App.js` doesn't hardcode which screen is "first." It reads `user` from `AuthContext`
(backed by AsyncStorage) and renders either the Onboarding screen or the Home+Profile
stack. That means:

- Completing onboarding, or logging out, automatically swaps the whole navigator —
  no manual `navigation.reset()` calls scattered around.
- Restarting the app skips onboarding if a user was already saved.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (iOS/Android), or press `i` / `a` in the
terminal for a simulator, or `w` for web.


