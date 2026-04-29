import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHilDK1hKBOfk0lmH4y4yR8PeWLDp37m0",
  authDomain: "emx-pc-builder-login.firebaseapp.com",
  projectId: "emx-pc-builder-login",
  storageBucket: "emx-pc-builder-login.firebasestorage.app",
  messagingSenderId: "964818945598",
  appId: "1:964818945598:web:e748b0c1cdaf5e4a62b36f",
  measurementId: "G-57GS4SQFC2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let guestMode = false;

window.emxCurrentUser = null;
window.emxGuestMode = false;
window.emxCloudBuilds = [];

function waitForBody() {
  return new Promise((resolve) => {
    if (document.body) {
      resolve();
      return;
    }

    document.addEventListener("DOMContentLoaded", resolve, { once: true });
  });
}

function setAuthStatus(message, type = "info") {
  const status = document.getElementById("emxAuthStatus");

  if (!status) {
    return;
  }

  status.textContent = message;
  status.className = "emx-auth-status " + type;
}

function getAuthEmail() {
  const input = document.getElementById("emxAuthEmail");
  return input ? input.value.trim() : "";
}

function getAuthPassword() {
  const input = document.getElementById("emxAuthPassword");
  return input ? input.value : "";
}

function getAuthName() {
  const input = document.getElementById("emxAuthName");
  return input ? input.value.trim() : "";
}

function lockApp() {
  document.body.classList.add("emx-auth-locked");
}

function unlockApp() {
  document.body.classList.remove("emx-auth-locked");
}

function hideAuthScreen() {
  const screen = document.getElementById("emxAuthScreen");

  if (!screen) {
    return;
  }

  screen.classList.add("hidden");
  unlockApp();
}

function showAuthScreen() {
  const screen = document.getElementById("emxAuthScreen");

  if (!screen) {
    return;
  }

  screen.classList.remove("hidden");
  lockApp();
}

function createAuthScreen() {
  if (document.getElementById("emxAuthScreen")) {
    return;
  }

  const html = `
    <div id="emxAuthScreen" class="emx-auth-screen">
      <div class="emx-auth-bg-grid"></div>
      <div class="emx-auth-orb orb-one"></div>
      <div class="emx-auth-orb orb-two"></div>

      <div class="emx-auth-card">
        <div class="emx-auth-logo-wrap">
          <div class="emx-auth-ring"></div>
          <div class="emx-auth-ring second"></div>
          <img src="emx-logo.png" alt="EMX" class="emx-auth-logo">
        </div>

        <div class="emx-auth-kicker">EMX BUILDER ACCESS</div>
        <h1>System Login</h1>
        <p class="emx-auth-subtitle">
          Create an account to save PC builds to your profile.
        </p>

        <div class="emx-auth-fields">
          <input id="emxAuthName" type="text" placeholder="Display name optional">
          <input id="emxAuthEmail" type="email" placeholder="Email address" autocomplete="email">
          <input id="emxAuthPassword" type="password" placeholder="Password" autocomplete="current-password">
        </div>

        <div id="emxAuthStatus" class="emx-auth-status info">
          Sign in or create an EMX Builder account.
        </div>

        <div class="emx-auth-actions">
          <button id="emxSignInBtn" type="button">SIGN IN</button>
          <button id="emxCreateAccountBtn" type="button">CREATE ACCOUNT</button>
          <button id="emxGoogleBtn" type="button">CONTINUE WITH GOOGLE</button>
          <button id="emxGuestBtn" type="button">CONTINUE AS GUEST</button>
        </div>

        <div class="emx-auth-foot">
          Cloud saves require login. Guest mode keeps local saves only.
        </div>
      </div>
    </div>

    <div id="emxUserChip" class="emx-user-chip hidden">
      <span id="emxUserLabel">Guest</span>
      <button id="emxSignOutBtn" type="button">SIGN OUT</button>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", html);
}

async function loadUserBuilds(user) {
  if (!user) {
    return [];
  }

  const buildsRef = collection(db, "builderUsers", user.uid, "builds");
  const buildQuery = query(buildsRef, orderBy("id", "asc"));
  const snapshot = await getDocs(buildQuery);

  return snapshot.docs.map((item) => item.data());
}

async function saveUserProfile(user) {
  if (!user) {
    return;
  }

  await setDoc(
    doc(db, "builderUsers", user.uid, "profile", "main"),
    {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

function updateUserChip(user) {
  const chip = document.getElementById("emxUserChip");
  const label = document.getElementById("emxUserLabel");

  if (!chip || !label) {
    return;
  }

  if (guestMode) {
    label.textContent = "Guest Mode";
    chip.classList.remove("hidden");
    return;
  }

  if (user) {
    label.textContent = user.displayName || user.email || "EMX User";
    chip.classList.remove("hidden");
    return;
  }

  chip.classList.add("hidden");
}

function dispatchAuthChanged(user, builds) {
  window.emxCurrentUser = user || null;
  window.emxGuestMode = guestMode;
  window.emxCloudBuilds = builds || [];

  window.dispatchEvent(
    new CustomEvent("emxAuthChanged", {
      detail: {
        user: window.emxCurrentUser,
        guestMode: window.emxGuestMode,
        builds: window.emxCloudBuilds
      }
    })
  );
}

async function afterLogin(user) {
  guestMode = false;
  window.emxGuestMode = false;

  setAuthStatus("Loading your EMX cloud builds...", "good");

  await saveUserProfile(user);
  const builds = await loadUserBuilds(user);

  hideAuthScreen();
  updateUserChip(user);
  dispatchAuthChanged(user, builds);
}

async function handleCreateAccount() {
  const name = getAuthName();
  const email = getAuthEmail();
  const password = getAuthPassword();

  if (!email || !password) {
    setAuthStatus("Enter email and password first.", "bad");
    return;
  }

  if (password.length < 6) {
    setAuthStatus("Password must be at least 6 characters.", "bad");
    return;
  }

  try {
    setAuthStatus("Creating EMX account...", "info");

    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(result.user, {
        displayName: name
      });
    }

    await afterLogin(auth.currentUser || result.user);
  } catch (error) {
    console.error(error);
    setAuthStatus(error.message || "Could not create account.", "bad");
  }
}

async function handleSignIn() {
  const email = getAuthEmail();
  const password = getAuthPassword();

  if (!email || !password) {
    setAuthStatus("Enter email and password first.", "bad");
    return;
  }

  try {
    setAuthStatus("Signing in...", "info");
    const result = await signInWithEmailAndPassword(auth, email, password);
    await afterLogin(result.user);
  } catch (error) {
    console.error(error);
    setAuthStatus(error.message || "Could not sign in.", "bad");
  }
}

async function handleGoogleSignIn() {
  try {
    setAuthStatus("Opening Google login...", "info");
    const result = await signInWithPopup(auth, googleProvider);
    await afterLogin(result.user);
  } catch (error) {
    console.error(error);
    setAuthStatus(error.message || "Google login failed.", "bad");
  }
}

function handleGuestMode() {
  guestMode = true;
  window.emxGuestMode = true;
  window.emxCurrentUser = null;
  window.emxCloudBuilds = [];

  hideAuthScreen();
  updateUserChip(null);
  dispatchAuthChanged(null, []);

  if (typeof showToast === "function") {
    showToast("Guest mode active. Saves stay local.", "warn");
  }
}

async function handleSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }

  guestMode = false;
  window.emxGuestMode = false;
  window.emxCurrentUser = null;
  window.emxCloudBuilds = [];

  updateUserChip(null);
  dispatchAuthChanged(null, []);
  showAuthScreen();

  if (typeof showToast === "function") {
    showToast("Signed out.", "warn");
  }
}

function bindAuthButtons() {
  const signInBtn = document.getElementById("emxSignInBtn");
  const createBtn = document.getElementById("emxCreateAccountBtn");
  const googleBtn = document.getElementById("emxGoogleBtn");
  const guestBtn = document.getElementById("emxGuestBtn");
  const signOutBtn = document.getElementById("emxSignOutBtn");

  if (signInBtn) {
    signInBtn.addEventListener("click", handleSignIn);
  }

  if (createBtn) {
    createBtn.addEventListener("click", handleCreateAccount);
  }

  if (googleBtn) {
    googleBtn.addEventListener("click", handleGoogleSignIn);
  }

  if (guestBtn) {
    guestBtn.addEventListener("click", handleGuestMode);
  }

  if (signOutBtn) {
    signOutBtn.addEventListener("click", handleSignOut);
  }
}

window.emxAuthAPI = {
  getCurrentUser() {
    return auth.currentUser;
  },

  async loadBuilds() {
    if (!auth.currentUser) {
      return [];
    }

    return await loadUserBuilds(auth.currentUser);
  },

  async saveBuild(save) {
    if (!auth.currentUser) {
      throw new Error("No logged-in EMX user.");
    }

    const saveId = String(save.id || Date.now());

    await setDoc(
      doc(db, "builderUsers", auth.currentUser.uid, "builds", saveId),
      {
        ...save,
        id: Number(save.id || Date.now()),
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email || "",
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    return await loadUserBuilds(auth.currentUser);
  },

    async deleteBuild(saveId) {
    if (!auth.currentUser) {
      throw new Error("No logged-in EMX user.");
    }

    await deleteDoc(
      doc(db, "builderUsers", auth.currentUser.uid, "builds", String(saveId))
    );

    return await loadUserBuilds(auth.currentUser);
  },

  async renameBuild(saveId, newName) {
    if (!auth.currentUser) {
      throw new Error("No logged-in EMX user.");
    }

    await setDoc(
      doc(db, "builderUsers", auth.currentUser.uid, "builds", String(saveId)),
      {
        name: newName,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    return await loadUserBuilds(auth.currentUser);
  },

  async signOut() {
    await handleSignOut();
  }
};

await waitForBody();
document.body.classList.add("emx-auth-locked");
createAuthScreen();
bindAuthButtons();
showAuthScreen();

onAuthStateChanged(auth, async (user) => {
  if (guestMode) {
    return;
  }

  if (!user) {
    window.emxCurrentUser = null;
    window.emxCloudBuilds = [];
    updateUserChip(null);
    dispatchAuthChanged(null, []);
    showAuthScreen();
    return;
  }

  try {
    await afterLogin(user);
  } catch (error) {
    console.error(error);
    setAuthStatus("Signed in, but cloud builds failed to load.", "bad");
    hideAuthScreen();
    updateUserChip(user);
    dispatchAuthChanged(user, []);
  }
});