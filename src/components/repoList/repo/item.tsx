import { MixedRepo } from "~/types/repo";
import { useState } from "react";
import CustomizeInfo from "./customizeInfo";

const RepoItem: React.FC<{ repo: MixedRepo }> = ({ repo }) => {
  const [editable, setEditable] = useState(false);
  const {
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
        className="absolute top-4 right-4 hover:text-primary-500 text-txt-4 focus:block group-hover:block hidden"
      >
        <i className="i-tabler-edit-circle"></i>
      </button>

      <h4 className="pb-2 text-lg">
        <a
          href={repo.html_url}
          target="_blank"
          className="hover:text-primary-500 font-bold"
        >
          {repo.full_name}
          <i className="i-tabler-arrow-up-right ml-1 text-primary-300"></i>
        </a>
      </h4>

      {description && <p className="text-sm text-txt-2 pb-2">{description}</p>}

      <CustomizeInfo
        repo={repo}
        editable={editable}
        setEditable={(val: boolean) => setEditable(val)}
      />

      <footer className="flex gap-4 text-txt-3 text-xs border-t border-dashed border-bd-1 pt-2">
        <span className="flex-center gap-1">
          <i className="i-tabler-star"></i>
          {stargazers_count}
        </span>
        <span className="flex-center gap-1">
          <i className="i-tabler-git-fork"></i>
          {forks_count}
        </span>
        <span className="flex-center gap-1">
          <i className="i-tabler-eye"></i>
          {watchers_count}
        </span>
      </footer>
    </li>
  );
};

export default RepoItem;
