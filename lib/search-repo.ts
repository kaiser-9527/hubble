import { MixedRepo } from "@/types/base"

import { fullMatch, stringContains } from "./utils"

const SearchTypeRex = [
  { type: "pure", regexp: /pure:/i },
  { type: "lang", regexp: /lang:(.+)/i },
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
    .replace(/lang:\".+\"/, (match) => {
      tagList.push(match.replaceAll('"', ""))
      return ""
    })
    .split(" ")
    .filter(Boolean)

  let result: MixedRepo[] = repos

  ;[...tagList, ...keywordList].forEach((val) => {
    const matchResult = matchSearchType(val)
    switch (matchResult.type) {
      case "pure":
        result = result.filter((repo) => !repo.comment && !repo.tags)
        break
      case "lang":
        result = result.filter((repo) => {
          if (fullMatch(matchResult.value, "unknown")) {
            return !repo.language
          }
          return fullMatch(matchResult.value, repo.language ?? "")
        })
        break
      case "tag":
        result = result.filter((repo) =>
          repo.tags?.some((tag) => fullMatch(tag.title, matchResult.value))
        )
        break
      case "comment":
        result = result.filter((repo) =>
          repo.comment ? stringContains(matchResult.value, repo.comment) : false
        )
        break
      default:
        result = result.filter((repo) => {
          // match title
          if (stringContains(matchResult.value, repo.name)) {
            return true
          }

          // match descriptin
          if (stringContains(matchResult.value, repo.description)) {
            return true
          }

          // lang
          if (stringContains(matchResult.value, repo.language)) {
            return true
          }

          // tag
          if (
            repo.tags?.some((tag) =>
              stringContains(matchResult.value, tag.title)
            )
          ) {
            return true
          }

          // comment
          if (repo.comment && stringContains(matchResult.value, repo.comment)) {
            return true
          }

          return false
        })
    }
  })

  return result
}

export const filterRepoByDate = (
  repos: MixedRepo[],
  [startDate, endDate]: [Date | undefined, Date | undefined]
) => {
  if (!startDate && !endDate) {
    return repos
  }

  return repos.filter((repo) => {
    const starred_at = new Date(repo.starred_at).getTime()

    if (startDate && startDate.getTime() > starred_at) {
      return false
    }

    if (endDate && endDate.getTime() < starred_at) {
      return false
    }

    return true
  })
}
