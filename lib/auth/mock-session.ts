"use client";

import { SESSION_COOKIE } from "./session-cookie";

const SESSION_KEY = "ciel_mock_session";

export interface MockSession {
  userId: string;
  email: string;
  name: string;
  workspaceId: string;
}

function setSessionCookie() {
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

function clearSessionCookie() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function getMockSession(): MockSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockSession;
  } catch {
    return null;
  }
}

export function setMockSession(session: MockSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  setSessionCookie();
}

export function clearMockSession() {
  localStorage.removeItem(SESSION_KEY);
  clearSessionCookie();
}

export function createMockSession(email: string, name: string): MockSession {
  return {
    userId: "user_1",
    email,
    name,
    workspaceId: "ws_1",
  };
}
