

def main [directory_glob: external_arg] {
  let dir = $directory_glob | into string;

  let temp_file_path = $'($dir)/template/article-template.html';

  let name_list = ls $'($dir)/content/markdown/' | get name | each { |elt|
    let filename = $elt | cut -d/ -z -f3;
    let filename_len = $filename | str length;
    $filename | str substring 0..($filename_len - 5) 
  }
  let md_path_list = ls $'($dir)/content/markdown/' | get name | each { |elt| $'($dir)/($elt)' };
  let conf_path_list = ls $'($dir)/content/metadata/' | get name | each { |elt| $'($dir)/($elt)' };

  let zipped = $name_list | zip $md_path_list | zip $conf_path_list;

  $zipped | each { |elt|
    nu $'($dir)/scripts/markdown_to_html.nu' $elt.0.1 $elt.1 $temp_file_path o> $'($dir)/pages/($elt.0.0).html';
  }

}

