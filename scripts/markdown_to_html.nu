

def main [md_path_glob: external_arg, conf_path_glob: external_arg, temp_path_glob: external_arg] {
  let md_path = $md_path_glob | into string;
  let conf_path = $conf_path_glob | into string;
  let temp_path = $temp_path_glob | into string;

  # Start with getting the config stuff + sanitizing for SED
  let title = cat $conf_path | head -1 | sed -z 's/\\/\\\\/g; s/\//\\\//g;'; 
  let author = cat $conf_path | head -2 | tail -1 | sed -z 's/\\/\\\\/g; s/\//\\\//g;';
  let date = cat $conf_path | head -3 | tail -1 | sed -z 's/\\/\\\\/g; s/\//\\\//g;';

  # Lets get the html from the markdown
  let article_html = pandoc $md_path;

  # Sanitize the html article for SED
  let article_sanitized = $article_html | sed -z 's/\\n/escaped-newline/g; s/\n/\\n/g; s/\\/\\\\/g; s/\//\\\//g; s/\&/\\\&/g; ';

  # Now to input all of it into the template!
  let final_file = cat $temp_path
    | sed $'s/<!--TITLE-->/($title)/g'
    | sed $'s/<!--AUTHOR-->/($author)/g'
    | sed $'s/<!--DATE-->/($date)/g'
    | sed $'s/<!--ARTICLE-->/($article_sanitized)/g'
    | sed 's/\\n/\n/g; s/escaped-newline/\\n/g';

  $final_file
}
