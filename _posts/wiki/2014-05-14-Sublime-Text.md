---
layout: wiki
published: true
category: wiki
---

* [繁体版的 Sublime Text 手册](http://docs.sublimetext.tw)

## Sublime text 设置
```json
{
  "color_scheme": "Packages/Color Scheme - Default/Bespin.tmTheme",
  "default_line_ending": "unix",
  "font_size": 10,
  "highlight_line": true,
  "highlight_modified_tabs": true,
  "ignored_packages":
  [
    "Drupal",
    "Vintage"
  ],
  "scroll_past_end": false,
  // The number of spaces a tab is considered equal to
  "tab_size": 2,

  // Set to true to insert spaces when tab is pressed
  "translate_tabs_to_spaces": true
}

```
## SFTP插件设置
```json
{
  // The tab key will cycle through the settings when first created
  // Visit http://wbond.net/sublime_packages/sftp/settings for help
    
  // sftp, ftp or ftps
  "type": "sftp",
 
  "save_before_upload": true,
  "upload_on_save": true,
  "sync_down_on_open": true,
  "sync_skip_deletes": false,
  "sync_same_age": true,
  "confirm_downloads": false,
  "confirm_sync": true,
  "confirm_overwrite_newer": false,
    
  "host": "skip.office.sekkeistudio.com",
  "user": "skip",
  "password": "s3kk31studio$",
  //"port": "22",
    
  "remote_path": "/home/skip/public_html/sites",
  "ignore_regexes": [
      "\\.sublime-(project|workspace)", "sftp-config(-alt\\d?)?\\.json",
      "sftp-settings\\.json", "/venv/", "\\.svn", "\\.hg", "\\.git",
      "\\.bzr", "_darcs", "CVS", "\\.DS_Store", "Thumbs\\.db", "desktop\\.ini"
  ],
  //"file_permissions": "664",
  //"dir_permissions": "775",
    
  "extra_list_connections": 4,
 
  "connect_timeout": 30,
  //"keepalive": 120,
  //"ftp_passive_mode": true,
  //"ssh_key_file": "~/.ssh/id_rsa",
  //"sftp_flags": ["-F", "/path/to/ssh_config"],
    
  "preserve_modification_times": true,
  //"remote_time_offset_in_hours": 0,
  //"remote_encoding": "utf-8",
  //"remote_locale": "C",
}
```