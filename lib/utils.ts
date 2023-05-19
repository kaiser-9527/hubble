import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { TagItem } from "@/types/base"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as Pick<T, K>)
}

export function fuzzyMatch(str: string, pattern: string): boolean {
  // 将字符串和模式都转换为小写字母，方便比较
  str = str.toLowerCase()
  pattern = pattern.toLowerCase()
  // 构建正则表达式
  pattern = pattern
    .split("")
    .map(function (char) {
      return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    })
    .join(".*?")
  // 匹配
  return str.match(new RegExp(pattern)) !== null
}

export function fullMatch(str1: string, str2: string) {
  return str1.trim().toLowerCase() === str2.trim().toLowerCase()
}

export function compareTags(tags1: TagItem[], tags2: TagItem[]) {
  const addedTags = tags2.filter(
    (item2) => !tags1.find((item1) => item1.id === item2.id)
  )
  const removedTags = tags1.filter(
    (item1) => !tags2.find((item2) => item2.id === item1.id)
  )
  const createdTags = addedTags.filter((tag) => tag.id < 0)
  return { addedTags, removedTags, createdTags }
}
