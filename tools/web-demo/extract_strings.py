"""Extracts lumen-app's English UI strings into src/lib/appStrings.json.

The demo page shows the app's exact wording. Run from the repository root:

    python3 tools/web-demo/extract_strings.py ../lumen-app/lib/src/l10n/app_strings.dart
"""
import json
import re
import sys

source = open(sys.argv[1], encoding="utf-8").read()
body = re.search(r"<String, String>\{(.*?)\n  \};", source, re.S).group(1)
literal = r"""(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")"""
strings = {}
for key, value in re.findall(r"'(\w+)':\s*((?:%s\s*)+)," % literal, body):
    parts = re.findall(literal, value)
    text = "".join(p[1:-1] for p in parts)
    strings[key] = text.replace("\\'", "'").replace('\\"', '"')

with open("src/lib/appStrings.json", "w", encoding="utf-8") as out:
    json.dump(strings, out, ensure_ascii=False, indent=1, sort_keys=True)
    out.write("\n")
print(len(strings), "strings")
