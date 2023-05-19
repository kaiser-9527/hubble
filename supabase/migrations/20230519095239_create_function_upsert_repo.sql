set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.upsert_repo(req json)
 RETURNS json
 LANGUAGE plv8
AS $function$

const { repo_id, repo_comment, github_id, added_tag_ids,removed_tag_ids,created_tag_titles } = req;

-- check repo
if (!repo_id) {
  if (!github_id) {
    throw new Error('github_id is required')
  }
  -- try update repo without repo_id
  
}

return {
  repo_id, repo_comment, github_id, added_tag_ids,removed_tag_ids,created_tag_titles
}

$function$;


