import { MixedRepo } from "~/types/repo";
import { useState } from "react";

const RepoItem: React.FC<{ repo: MixedRepo }> = ({ repo }) => {
  const [editable, setEditable] = useState(false);

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

      {repo.description && (
        <p className="text-sm text-txt-2 pb-2">{repo.description}</p>
      )}

      {repo.comment && (
        <p className="text-xs text-txt-3 pb-2 font-italic">{repo.comment}</p>
      )}

      {repo.tags && (
        <div className="flex gap-1 text-xs text-txt-2 pb-2">
          {repo.tags.map((tag) => (
            <span className="bg-fill-3 px-1 rounded text-txt-2" key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {editable && <div className="h-10">nice</div>}

      <footer className="flex gap-4 text-txt-3 text-xs border-t border-dashed border-bd-1 pt-2">
        {/* TODO icons */}
        <span>{repo.stargazers_count}</span>
        <span>{repo.forks_count}</span>
        <span>{repo.watchers_count}</span>

        {repo.language && <span>{repo.language}</span>}
      </footer>
    </li>
  );
};

export default RepoItem;
