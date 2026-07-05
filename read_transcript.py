import json, re
with open('c:/laragon/www/portfolio/transcript_backup.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

matches = re.finditer(r'\{"step_index".*?"type":"USER_INPUT".*?\}', text)
for m in matches:
    try:
        data = json.loads(m.group(0))
        print('USER:', data.get('content'))
        print('---')
    except:
        pass
