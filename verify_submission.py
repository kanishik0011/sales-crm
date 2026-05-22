from pathlib import Path
import os, glob

def info(path: Path):
    if not path.exists():
        return None
    return path.stat().st_size

root = Path('.')
items = {
    'SOLUTION.docx': root/'SOLUTION.docx',
    'screenshots/login.png': root/'screenshots'/'login.png',
    'screenshots/dashboard.png': root/'screenshots'/'dashboard.png',
    'screenshots/customers.png': root/'screenshots'/'customers.png',
    'screenshots/activities.png': root/'screenshots'/'activities.png',
    'screenshots/opportunities.png': root/'screenshots'/'opportunities.png',
    'screenshots/leads.png': root/'screenshots'/'leads.png',
    'screenshots/campaigns.png': root/'screenshots'/'campaigns.png',
    'screenshots/sales-manager.png': root/'screenshots'/'sales-manager.png',
    'screenshots/account-manager.png': root/'screenshots'/'account-manager.png',
    'screenshots/marketing.png': root/'screenshots'/'marketing.png',
    'screenshots/product.png': root/'screenshots'/'product.png',
    'screenshots/executive.png': root/'screenshots'/'executive.png',
    'sales_dashboard.pbix': root/'sales_dashboard.pbix',
    'sample_data.xlsx': root/'sample_data.xlsx',
}

missing = []
file_sizes = {}
for k,p in items.items():
    if not p.exists():
        missing.append(k)
    else:
        file_sizes[k] = p.stat().st_size

completion_score = int(round((len(items)-len(missing))/len(items)*100))

# Print file paths + sizes
print('=== File Paths & Sizes ===')
for k in sorted(items.keys()):
    p = items[k]
    sz = file_sizes.get(k)
    if sz is None:
        print(f'- {k}: MISSING')
    else:
        print(f'- {k}: {sz} bytes')

print('\n=== Missing Items ===')
if missing:
    for m in missing:
        print('-', m)
else:
    print('None')

print('\ncompletion score:', completion_score)

ready = len(missing)==0
print('submission readiness:', 'READY' if ready else 'NOT READY')

