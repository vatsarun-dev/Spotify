# Spotify Clone

A Spotify-inspired music player built with React, Vite, Tailwind CSS, Redux Toolkit, React Router, and React Hook Form.

This project includes:
- authentication with register/login forms
- localStorage-based user session handling
- protected dashboard routing
- music playback with play, pause, next, and previous controls
- a three-panel dashboard layout
- song data loaded from a local JSON file

## Overview

The app has two main areas:

1. Auth section
   - `Register` page
   - `Login` page

2. Dashboard section
   - left sidebar library UI
   - center song listing area
   - right now-playing panel
   - bottom player controls

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Redux Toolkit
- React Redux
- React Router
- React Hook Form
- React Resizable Panels
- Remix Icon

## Features

### Authentication

- Register form built with `react-hook-form`
- Login form built with `react-hook-form`
- Registered user data stored in localStorage
- Active login session stored in localStorage
- Authenticated users are redirected to `/dashboard`
- Unauthenticated users cannot open the dashboard directly
- Logout button clears the current session from localStorage

### Dashboard

- Fixed top navbar
- Left sidebar with Spotify-style library cards
- Center content area showing the list of songs
- Right sidebar showing currently selected song details
- Bottom player UI inspired by Spotify

### Music Player

- Play selected song
- Pause/resume current song
- Next song support
- Previous song support
- Playback progress display
- Auto-play next song when current song ends
- Maintains queue with:
  - `songList`
  - `currentIndex`
  - `playedHistory`

## Project Structure

```text
src/
  app/
    layout/
      AuthLayout.jsx
      DashboardLayout.jsx
    routes/
      AppRoutes.jsx
    store/
      store.jsx

  feature/
    auth/
      ui/pages/
        Login.jsx
        Register.jsx

    dashboard/
      api/
        songsApi.jsx
      hook/
        useDashboard.jsx
      ui/
        components/
          Navbar.jsx
          SongCard.jsx
        pages/
          HomePage.jsx
          LeftSide.jsx
          RightSide.jsx

    player/
      hook/
        usePlayer.jsx
      state/
        musicPlayer.jsx
      ui/components/
        Player.jsx

  utils/
    authStorage.js
    songs.json

  main.jsx
  index.css
```

## Routing

Defined in `src/app/routes/AppRoutes.jsx`.

### Public routes

- `/login`
- `/register`

### Redirect behavior

- `/` redirects to `/login`
- If a user is already authenticated, auth pages redirect to `/dashboard`

### Protected route

- `/dashboard`

If there is no active auth session in localStorage, the dashboard route redirects back to `/login`.

## Authentication Flow

Authentication is intentionally simple and fully client-side.

### Files involved

- `src/feature/auth/ui/pages/Register.jsx`
- `src/feature/auth/ui/pages/Login.jsx`
- `src/utils/authStorage.js`
- `src/app/routes/AppRoutes.jsx`
- `src/feature/dashboard/ui/components/Navbar.jsx`

### Register flow

When the user submits the register form:

1. form values are validated by `react-hook-form`
2. user data is saved in localStorage
3. auth session is saved in localStorage
4. user is redirected to `/dashboard`

### Login flow

When the user submits the login form:

1. form values are validated by `react-hook-form`
2. saved registered user is read from localStorage
3. email and password are compared
4. if valid, auth session is stored
5. user is redirected to `/dashboard`

### Logout flow

The logout button in the navbar:

1. removes the active auth session from localStorage
2. redirects the user to `/login`

## localStorage Keys

Defined in `src/utils/authStorage.js`.

- `spotifyRegisteredUser`
  - stores the registered user object

- `spotifyAuthSession`
  - stores the current logged-in session

## Redux Store

Configured in `src/app/store/store.jsx`.

Current reducer:

- `player`

### Player state shape

Defined in `src/feature/player/state/musicPlayer.jsx`.

```js
{
  songList: [],
  currentIndex: -1,
  playedHistory: [],
  currentPlayingSong: null,
  isPlaying: false
}
```

### Player reducers

- `playNewSong`
  - loads a full song queue and starts playback from a clicked index

- `play`
  - resumes playback

- `pause`
  - pauses playback

- `nextSong`
  - moves to the next song in the current queue

- `prevSong`
  - moves back using playback history

## Player Logic

The main playback logic lives in `src/feature/player/hook/usePlayer.jsx`.

### Responsibilities of `usePlayer`

- creates and manages the `Audio` instance
- syncs current time and duration
- reacts to Redux player state
- starts audio when song changes
- pauses/resumes audio from Redux state
- moves to next song automatically on track end
- exposes:
  - `togglePlayAndPause`
  - `goToNextSong`
  - `goToPrevSong`

### Previous / Next logic

Simple queue logic is used:

- `songList` stores the current song queue
- `currentIndex` stores the current song position
- `playedHistory` stores previous indexes for going back

This makes the player work like:

- click a song -> queue is set
- next -> move forward in queue
- previous -> go back through played history

## Song Data

Song data comes from:

- `src/utils/songs.json`

Accessed through:

- `src/feature/dashboard/api/songsApi.jsx`

Used in:

- `src/feature/dashboard/ui/pages/HomePage.jsx`
- `src/feature/dashboard/ui/components/SongCard.jsx`

Each song object includes fields like:

- `title`
- `artist`
- `album`
- `year`
- `thumbnail`
- `url`

## UI Breakdown

### `Navbar.jsx`

- top navigation bar
- Spotify logo
- search input
- premium button
- logout button

### `LeftSide.jsx`

- library panel UI
- create playlist card
- browse podcasts card

### `HomePage.jsx`

- renders the main songs grid

### `SongCard.jsx`

- displays song thumbnail and metadata
- clicking play dispatches `playNewSong`
- passes full song array and clicked index to the player queue

### `RightSide.jsx`

- shows currently selected song title
- shows artist and album image
- reads current song from Redux

### `Player.jsx`

- bottom player controls
- play/pause
- next/previous
- progress bar
- timing information

## Styling

- Tailwind CSS is used for styling
- global styles are in `src/index.css`
- hidden scrollbar helper is also defined there
- Spotify-inspired dark UI is used across the dashboard and player

## How To Run

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run lint

```bash
npm run lint
```

## Important Notes

- Authentication is client-side only and not secure for production
- User data is stored in browser localStorage
- Audio is played using the browser `Audio` API
- Song data is local JSON, not fetched from a backend

## Future Improvements

- backend-based authentication
- encrypted password handling
- playlist creation and persistence
- shuffle and repeat modes
- seek bar drag support
- volume state management
- favorites / liked songs
- recently played section
- profile management
- mobile-specific player improvements

## Author Notes

This project is a learning-focused Spotify clone that combines:

- React component design
- form handling with React Hook Form
- route protection with React Router
- state management with Redux Toolkit
- browser storage with localStorage
- audio playback handling with a custom hook

If you want, the next step can be:
- adding shuffle/repeat
- improving the right sidebar UI
- creating playlist persistence
- converting localStorage auth into real API auth
