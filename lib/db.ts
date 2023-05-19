import { del, get, set } from "idb-keyval"

class DB {
  uid?: string

  setUid(uid: string) {
    this.uid = uid
  }

  get(key: string) {
    return get(`${this.uid}-${key}`)
  }

  set(key: string, data: any) {
    return set(`${this.uid}-${key}`, data)
  }

  del(key: string) {
    return del(`${this.uid}-${key}`)
  }
}

export const db = new DB()
