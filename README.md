# Var är Vargen v2.3

Viktigt: denna version stödjer både @vararvargen.se och @vararvargen.com för roller.

## Firestore Rules för test
Klistra in under Firestore > Rules och Publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Detta är okej under bygg/test. Sen gör vi striktare regler.
