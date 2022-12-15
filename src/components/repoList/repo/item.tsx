import { MixedRepo } from "~/types/repo";
import style from "~/styles/repo-item.module.css";

const RepoItem: React.FC<{ repo: MixedRepo }> = ({ repo }) => {
  return (
    <li className="box">
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
      <p className="text-xs text-txt-3 pb-2 font-italic">
        A simple javascript utility for conditionally joining classNames
        together
      </p>
      <div className="flex gap-1 text-xs text-txt-2 pb-2">
        <span className={style["tag-item"]}>Vue</span>
        <span className={style["tag-item"]}>Component</span>
      </div>

      <footer className="flex gap-4 text-txt-3 text-xs border-t border-dashed border-bd-1 pt-2">
        {/* TODO icons */}
        <span>{repo.stargazers_count}</span>
        <span>{repo.forks_count}</span>
        <span>{repo.watchers_count}</span>
      </footer>
    </li>
  );
};

export default RepoItem;
