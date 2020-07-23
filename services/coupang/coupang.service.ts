import * as util from '../../lib/util';

export const addHits = (code: string) => {
  return fetch('/api/coupang/hit', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
}

export const addViewCount = (code: string) => {
  return fetch('/api/coupang/view', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
}

export const login = (id: string, pw: string) => {
  return fetch('/api/coupang/auth/login', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, pw })
  })
}

export const getCoupangItems = (cookie, domain?: string) => {
  return fetch(`${domain ?? ""}/api/coupang/items`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      cookie
    }
  })
}

export const uploadImage = (formData: FormData) => {
  return fetch('/api/coupang/upload', {
    method: "POST",
    body: formData
  })
}

export const deleteCoupangItem = (code: string) => {
  return fetch('/api/coupang/items', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
}