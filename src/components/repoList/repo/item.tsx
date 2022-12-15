import { MixedRepo } from "~/types/repo";
import { useState } from "react";
import CustomizeInfo from "./customizeInfo";

const RepoItem: React.FC<{ repo: MixedRepo }> = ({ repo }) => {
  const [editable, setEditable] = useState(false);
  const {
    comment,
    tags,
    description,
    stargazers_count,
    forks_count,
    language,
    watchers_count,
  } = repo;

  return (
    <li className="box relative group">
      <button
        onClick={() => setEditable((e) => !e)}
        className="absolute top-4 right-4 text-xs text-txt-4 focus:block group-hover:block hidden"
      >
        Edit
      </button>

      <h4 className="pb-2 text-lg">
        <a
          href={repo.html_url}
          target="_blank"
          className="hover:text-primary-500"
        >
          {repo.full_name}
          {/* TODO icon */}
        </a>
      </h4>

      {description && <p className="text-sm text-txt-2 pb-2">{description}</p>}

      <CustomizeInfo comment={comment} tags={tags} editable={editable} />

      <footer className="flex gap-4 text-txt-3 text-xs border-t border-dashed border-bd-1 pt-2">
        {/* TODO icons */}
        <span>{stargazers_count}</span>
        <span>{forks_count}</span>
        <span>{watchers_count}</span>

        {language && <span>{language}</span>}
      </footer>
    </li>
  );
};

export default RepoItem;
