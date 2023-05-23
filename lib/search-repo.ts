import { MixedRepo } from "@/types/base"

import { fullMatch, stringContains } from "./utils"

const SearchTypeRex = [
  { type: "pure", regexp: /pure:/i },
  { type: "lang", regexp: /lang:(\S+)/i },
  { type: "tag", regexp: /tag:(.+)/i },
  { type: "comment", regexp: /comment:(\S+)/i },
]

export const matchSearchType = (val: string) => {
  const result = { type: "plain", value: val }
  SearchTypeRex.some((item) => {
    const matchResult = val.match(item.regexp)
    if (matchResult) {
      result.type = item.type
      result.value = matchResult[1]
      return true
    }
  })

  return result
}

export const searchRepo = ({
  repos,
  keyword,
}: {
  repos?: MixedRepo[]
  keyword?: string
}) => {
  if (!repos) return []
  if (!keyword) return repos
  // pick tag
  const tagList: string[] = []
  const keywordList = keyword
    .replace(/tag:\".+\"/, (match) => {
      tagList.push(match.replaceAll('"', ""))
      return ""
    })
    .split(" ")
    .filter(Boolean)

  let result: MixedRepo[] = repos
  ;[...tagList, ...keywordList].forEach((val) => {
    const valType = matchSearchType(val)
    switch (valType.type) {
      case "pure":
        result = result.filter((repo) => !repo.comment && !repo.tags)
        break
      case "lang":
        result = result.filter((repo) => {
          if (fullMatch(valType.value, "unknown")) {
            return !repo.language
          }
          return fullMatch(valType.value, repo.language ?? "")
        })
        break
      case "tag":
        result = result.filter((repo) =>
          repo.tags?.some((tag) => fullMatch(tag.title, valType.value))
        )
        break
      case "comment":
        result = result.filter((repo) =>
          repo.comment ? stringContains(valType.value, repo.comment) : false
        )
        break
      default:
        result = result.filter((repo) => {
          // match title
          if (stringContains(valType.value, repo.full_name)) {
            return true
          }

          // match descriptin
          if (stringContains(valType.value, repo.description)) {
            return true
          }

          // lang
          if (stringContains(valType.value, repo.language)) {
            return true
          }

          // tag
          if (
            repo.tags?.some((tag) => stringContains(valType.value, tag.title))
          ) {
            return true
          }

          // comment
          if (repo.comment && stringContains(valType.value, repo.comment)) {
            return true
          }

          return false
        })
    }
  })

  return result
}
