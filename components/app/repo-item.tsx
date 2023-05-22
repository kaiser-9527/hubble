import { useState } from "react"
import Link from "next/link"
import {
  EditIcon,
  ExternalLinkIcon,
  EyeIcon,
  GitForkIcon,
  StarIcon,
} from "lucide-react"

import { MixedRepo } from "@/types/base"

import { Box } from "../ui/box"
import { IconButton } from "../ui/icon-button"
import RepoItemCustomizeInfo from "./repo-item-customize-info"

export default function RepoItem({ data }: { data: MixedRepo }) {
  const {
    description,
    stargazers_count,
    forks_count,
    watchers_count,
    html_url,
    full_name,
  } = data

  const [isEditable, setIsEditable] = useState(false)

  return (
    <Box className=" group relative">
      <h4 className="flex justify-between">
        <Link
          href={html_url}
          target="_blank"
          className="flex items-center gap-1 text-lg font-bold underline-offset-4 hover:text-primary hover:underline"
        >
          {full_name}
          <ExternalLinkIcon size={14} />
        </Link>

        <IconButton
          onClick={() => setIsEditable(true)}
          size="sm"
          variant="ghost"
          className="translate-x-3 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
        >
          <EditIcon size={14} />
        </IconButton>
      </h4>

      {description && (
        <p className="py-2 text-sm text-muted-foreground">{description}</p>
      )}

      <RepoItemCustomizeInfo
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        data={data}
      />

      <footer className="flex gap-4 border-t border-dashed pt-2 text-xs text-muted-foreground">
        <span className="flex gap-1">
          <StarIcon size={14} />
          {stargazers_count}
        </span>
        <span className="flex gap-1">
          <GitForkIcon size={14} />
          {forks_count}
        </span>
        <span className="flex gap-1">
          <EyeIcon size={14} />
          {watchers_count}
        </span>
      </footer>
    </Box>
  )
}
